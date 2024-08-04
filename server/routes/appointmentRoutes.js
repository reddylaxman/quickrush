import express from "express";
import {
  addAppointment,
  getAppointments,
  updateAppointment,
  cancelAppointment,
  getAppointmentsByUserId,
} from "../controllers/appointmentController.js";

const router = express.Router();

// Create Appointment
router.post("/", addAppointment);

// Get Appointments
router.get("/", getAppointments);
router.get("/:id", getAppointmentsByUserId);

// Update Appointment
router.put("/:id", updateAppointment);
// cancel Appointment
router.delete("/:id", cancelAppointment);
export default router;
