const { reapplicationState, denyCooldown } = require('../services/instructorReapplication');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { streamInstructorDocument } = require('../utils/instructorDocumentStream');
const safeUser = async (id) => User.findById(id).select('firstName lastName email role instructorVerification');

exports.status = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ success: false, message: 'Instructor account not found' });
        const publicUser = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            instructorVerification: { ...user.toObject().instructorVerification },
        };
        res.json({ success: true, data: { user: publicUser, reapplication: reapplicationState(user.instructorVerification) } });
    } catch (error) { next(error); }
};

// Reject locked uploads before Multer writes any files to private storage.
exports.requireEditable = (req, res, next) => {
    const v = req.user.instructorVerification || {};
    if (['pending', 'approved'].includes(v.status)) return res.status(409).json({ success: false, message: 'This application cannot currently be edited' });
    const eligibility = reapplicationState(v);
    if (eligibility.locked) return denyCooldown(res, eligibility);
    next();
};

exports.updateApplication = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (['pending', 'approved'].includes(user.instructorVerification.status)) return res.status(409).json({ success: false, message: 'This application cannot currently be edited' });
        const eligibility = reapplicationState(user.instructorVerification);
        if (eligibility.locked) return denyCooldown(res, eligibility);
        const fields = ['organization', 'expertise', 'qualification', 'experienceYears', 'bio', 'professionalUrl'];
        for (const field of fields) if (req.body[field] !== undefined) user.instructorVerification[field] = req.body[field];
        if (user.instructorVerification.professionalUrl) {
            try { new URL(user.instructorVerification.professionalUrl); } catch { return res.status(400).json({ success: false, message: 'Invalid professional profile URL' }); }
        }
        const resume = req.files?.resume?.[0];
        const proof = req.files?.proof?.[0];
        if (req.body.removeResume === 'true' && !resume) user.instructorVerification.resumeDocument = undefined;
        if (req.body.removeProof === 'true' && !proof) user.instructorVerification.proofDocument = undefined;
        if (resume) user.instructorVerification.resumeDocument = { storageId: resume.filename, originalName: resume.originalname, mimeType: resume.mimetype, size: resume.size };
        if (proof) user.instructorVerification.proofDocument = { storageId: proof.filename, originalName: proof.originalname, mimeType: proof.mimetype, size: proof.size };
        await user.save();
        res.json({ success: true, data: { user: await safeUser(user._id) } });
    } catch (error) { next(error); }
};

exports.submit = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        const verification = user.instructorVerification;
        if (['approved', 'pending'].includes(verification.status)) return res.status(409).json({ success: false, message: 'This application cannot currently be submitted.' });
        const now = new Date();
        const eligibility = reapplicationState(verification, now);
        if (eligibility.locked) return denyCooldown(res, eligibility);
        if (!verification.organization || !verification.expertise || !verification.qualification || verification.experienceYears === undefined || !verification.bio) return res.status(400).json({ success: false, message: 'Complete all required professional information' });
        if (!verification.resumeDocument?.storageId) return res.status(400).json({ success: false, message: 'Please upload your Resume/CV.' });
        if (!verification.proofDocument?.storageId) return res.status(400).json({ success: false, message: 'Please upload Instructor Verification Proof.' });
        const set = { 'instructorVerification.status': 'pending', 'instructorVerification.submittedAt': now, 'instructorVerification.adminMessage': '' };
        if (eligibility.reset) {
            set['instructorVerification.rejectionCount'] = 0;
            set['instructorVerification.rejectionWindowStartedAt'] = null;
            set['instructorVerification.reapplyAvailableAt'] = null;
        }
        const updated = await User.findOneAndUpdate({ _id: user._id, 'instructorVerification.status': verification.status, 'instructorVerification.reviewedAt': verification.reviewedAt || null }, {
            $set: set, $push: { 'instructorVerification.submissionHistory': { submittedAt: now } },
        }, { new: true, runValidators: true });
        if (!updated) return res.status(409).json({ success: false, message: 'Application changed. Refresh before submitting again.' });
        const admins = await User.find({ role: 'admin' }).select('_id');
        if (admins.length) await Notification.insertMany(admins.map((admin) => ({ user: admin._id, title: 'New Instructor Request', message: `${user.fullName} submitted an instructor verification request.`, type: 'info', link: '/admin/instructors' })));
        res.json({ success: true, message: 'Application submitted for review' });
    } catch (error) { next(error); }
};

exports.document = async (req, res, next) => {
    try {
        const kind = req.params.kind;
        if (!['resume', 'proof'].includes(kind)) return res.status(400).json({ success: false, message: 'Invalid document type' });
        const user = await User.findById(req.user._id);
        const document = kind === 'resume' ? user.instructorVerification?.resumeDocument : user.instructorVerification?.proofDocument;
        if (!document?.storageId) return res.status(404).json({ success: false, message: 'Document not found' });
        streamInstructorDocument(res, document, next);
    } catch (error) { next(error); }
};
