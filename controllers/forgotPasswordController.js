import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import otpModel from "../model/otpModel.js";
import userModel from "../model/userModel.js";
import { hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

// Step 1: Send OTP to the user's email
export const sendOTP = async (req, res) => {
  try {
    // Configure nodemailer to send emails (use your email provider settings)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const { email, isOtpLogin } = req.body;
    if (!email) {
      return req.status(404).send({
        success: false,
        message: "Invalid email",
      });
    }

    //Already send otp
    const ExistingOTP = await otpModel.findOne({ email,isotplogin: isOtpLogin? 1 : 0 });
    if (ExistingOTP) {
      return res.status(200).send({
        success: true,
        message: "Already send OTP",
      });
    }

    const otp = uuidv4().substr(0, 6); // Generate a 6-digit OTP
    // Store the OTP and timestamp for later verification

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };

    // Send the email with OTP
    transporter.sendMail(mailOptions, async (error) => {
      if (error) {
        res.status(500).send({
          success: false,
          message: "Error sending OTP email",
          error,
        });
      } else {
        const sendOtp = await new otpModel({
          otp,
          email,
          timestamp: Date.now(),
          isotplogin: isOtpLogin? 1 : 0
        }).save();
        res.status(201).send({
          success: true,
          message: "OTP sent successfully",
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error is sending mail",
      error,
    });
  }
};

// Step 2: Verify OTP
export const otpVerificationController = async (req, res) => {
  try {
    const { email, otp, isOtpLogin } = req.body;
    const otpData = await otpModel.findOne({ email, isotplogin: isOtpLogin? 1 : 0 });
    if (!email) {
      return req.status(404).send({
        success: false,
        message: "Invalid email",
      });
    }
    if (!otp) {
      return res.send({ message: "OTP is Required" });
    }
    if (!otpData) {
      return res.status(404).send({
        success: false,
        message: "Email not found or OTP expired",
      });
    }

    const Originalotp = otpData.otp;
    const timestamp = otpData.timestamp;
    const otpAge = Date.now() - timestamp;

    if (Originalotp !== otp || otpAge > 5 * 60 * 1000) {
      if (otpAge > 5 * 60 * 1000) {
        const otpDelete = await otpModel.findOneAndDelete({ email,isotplogin: isOtpLogin? 1 : 0 });
      }
      return res.status(400).send({
        success: false,
        message: "Invalid OTP",
      });
    }
    if (isOtpLogin) {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User Not exists",
        });
      }
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
     
      res.status(200).send({
        success: true,
        message: "User Login Successfully",
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role
        },
        token,
      });
      const otpDelete = await otpModel.findOneAndDelete({ email,isotplogin: isOtpLogin ? 1 : 0 });
    }else{
      res.status(200).send({
        success: true,
        message: "OTP verified successfully",
      });
    }
    
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Otp verification",
      error,
    });
  }
};

// Step 3: Reset Password
export const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email) {
      return req.status(404).send({
        success: false,
        message: "Invalid email",
      });
    }
    if (!newPassword) {
      return res.send({ message: "New Password is Required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email Not Found",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    const otpDelete = await otpModel.findOneAndDelete({ email, isotplogin: 0 });
    res.status(201).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in reset password",
      error,
    });
  }
};
