import express from "express";
import {
  registerDoctor,
  loginDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  changePassword,
  verifyOtp,
  resetPassword,
  requestPasswordResetOtp,
  updateAvatar,
} from "../controllers/doctorController.js";

const router = express.Router();

router.post("/register", registerDoctor);
router.post("/login", loginDoctor);
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);
router.post("/change-password", changePassword);
router.post("/verify-otp", verifyOtp);
// Send OTP
router.post("/send-otp", requestPasswordResetOtp);
router.post("/reset-password", resetPassword);
router.post("/update-avatar", updateAvatar);

export default router;
