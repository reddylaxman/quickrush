import mongoose from "mongoose";
const appointmentSchema = new mongoose.Schema({
  patientname: String,
  age: String,
  gender: String,
  specialist: String,
  doctor: String,
  appointment_date: Date,
  appointment_time: String,
  checked: Boolean,
});

export default mongoose.model("Appointment", appointmentSchema);
