const User = require('../models/User');

const requireApprovedInstructor = async (req, res, next) => {
    try {
        if (req.user.role !== 'instructor') return res.status(403).json({ success: false, message: 'Instructor access required' });
        const user = await User.findById(req.user._id).select('instructorVerification.status');
        if (user?.instructorVerification?.status !== 'approved') return res.status(403).json({ success: false, message: 'Instructor approval required', status: user?.instructorVerification?.status || 'incomplete' });
        next();
    } catch (error) { next(error); }
};
module.exports = requireApprovedInstructor;
