import express from "express";
import {
  addAppointment,
  getAppointments,
  updateAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

// Create Appointment
router.post("/", addAppointment);

// Get Appointments
router.get("/", getAppointments);

// Update Appointment
router.put("/:id", updateAppointment);

export default router;
