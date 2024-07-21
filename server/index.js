import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3133;

app.use(cors());
//MongoDB connection
const quickrush = async () => {
  try {
    await mongoose.connect(process.env.quickrush_MONGODB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Connection failed");
  }
};
quickrush();
//Routes

app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("Running quickrush server");
});
app.listen(PORT, (error) => {
  if (error) {
    console.log("Failed to connect server");
  } else {
    console.log(`Server started and Server running on ${PORT}`);
  }
});
