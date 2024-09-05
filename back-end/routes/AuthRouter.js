const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const { authMiddleware, adminMiddleware, userMiddleware } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.get('/account', userMiddleware, authController.getAccount);
router.post('/register', authController.register);
router.post('/change-password', authController.changePassword);

module.exports = router;