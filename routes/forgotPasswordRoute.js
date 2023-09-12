import express from 'express';
import { otpVerificationController, resetPasswordController, sendOTP } from '../controllers/forgotPasswordController.js';

//router object
const router = express.Router();

//forget-password || Post
router.post('/sendOtp',sendOTP);

//otp-verify || Post
router.post('/otp-verify',otpVerificationController);

//resetPassword
router.post('/reset-password',resetPasswordController);

export default router;