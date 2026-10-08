const router = require('express').Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { registerValidation, loginValidation, validate } = require('../middleware/validation');
const registrationImageUpload = require('../utils/registrationImageUpload');

router.post('/register', registrationImageUpload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'certification', maxCount: 1 },
]), registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);
router.get('/notifications', protect, authController.getNotifications);
router.put('/notifications/:id/read', protect, authController.markNotificationRead);

module.exports = router;
