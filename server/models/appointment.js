import mongoose from "mongoose";
const appointmentSchema = new mongoose.Schema({
  patientname: String,
  age: String,
  gender: String,
  specialist: String,
  doctor: String,
  doctorName: { type: String, required: true },
  appointment_date: Date,
  appointment_time: String,
  checked: Boolean,
  consultation_fee: { type: Number },

  userId: { type: String, required: true },
});

export default mongoose.model("Appointment", appointmentSchema);
