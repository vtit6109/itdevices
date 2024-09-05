// routes/authRouter.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.post('/login', authController.login);
router.post('/register', authController.register);
// router.post('/logout', authController.logout);
router.post('/change-password', authController.changePassword);
module.exports = router;
module.exports = router;
