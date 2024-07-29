import express from "express";
import {
  registerUser,
  loginUser,
  verifyOtp,
  changePassword,
} from "../controllers/userController.js";

const router = express.Router();

// User Registration
router.post("/register", registerUser);

// User Login
router.post("/login", loginUser);

// Verify OTP
router.post("/verify-otp", verifyOtp);

//Change Password
router.post("/change-password", changePassword);
export default router;
