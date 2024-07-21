import express from "express";
import {
  registerDoctor,
  loginDoctor,
  getDoctorById,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

// Doctor Registration
router.post("/register", registerDoctor);

// Doctor Login
router.post("/login", loginDoctor);

// Get Doctor by ID
router.get("/:id", getDoctorById);

// Get all Doctors
router.get("/", getAllDoctors);

// Update Doctor
router.put("/:id", updateDoctor);

// Delete Doctor
router.delete("/:id", deleteDoctor);

export default router;
