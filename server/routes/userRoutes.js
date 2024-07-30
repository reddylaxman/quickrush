import express from "express";
import {
  registerUser,
  loginUser,
  verifyOtp,
  changePassword,
  updateAvatar,
  getById,
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

router.post("/update-avatar", updateAvatar);

router.get("/:id", getById);
export default router;
