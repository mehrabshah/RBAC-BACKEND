const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post("/forget-password",authController.sendOTP);
router.post("/verify-otp",authController.verifyOTP);
router.post("/reset-password/:token",authController.resetPassword);


module.exports = router;


