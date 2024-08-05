// controllers/doctor.controller.js

import Doctor from "../models/doctor.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  sendOtpEmail,
  generateOtp,
  getOtpExpiration,
  resetOtpEmail,
} from "../mailer.js";

// Register Doctor
const registerDoctor = async (req, res) => {
  const {
    fullname,
    qualification,
    specialist,
    email,
    phone_number,
    experience,
    address,
    hospital_name,
    consultation_fee,
  } = req.body;

  const password = "quickrush@dr";

  if (
    !fullname ||
    !qualification ||
    !specialist ||
    !email ||
    !phone_number ||
    !experience ||
    !address ||
    !hospital_name ||
    !consultation_fee
  ) {
    return res
      .status(422)
      .json({ error: "Please fill all the fields properly!!!" });
  }

  try {
    const doctorExist = await Doctor.findOne({ email });
    if (doctorExist) {
      return res
        .status(422)
        .json({ error: "Doctor already exists with this email!!!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOtp();
    const otpExpiration = getOtpExpiration();

    const newDoctor = new Doctor({
      fullname,
      qualification,
      specialist,
      email,
      phone_number,
      experience,
      address,
      hospital_name,
      consultation_fee,
      password: hashedPassword,
      otp,
      otpExpiration,
      verified: false, // Initially unverified
    });

    await sendOtpEmail(email, otp);

    // Save the doctor with verified status as false
    await newDoctor.save();

    res
      .status(201)
      .json({ message: "Doctor registered successfully. OTP sent to email." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the Doctor." });
  }
};

// Verify OTP
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Please provide email and OTP" });
  }

  try {
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    if (doctor.otp !== otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    if (new Date() > doctor.otpExpiration) {
      return res.status(401).json({ error: "OTP has expired" });
    }

    // Update the doctor’s record to mark it as verified
    doctor.verified = true;
    doctor.otp = undefined; // Clear OTP after successful verification
    doctor.otpExpiration = undefined; // Clear OTP expiration date

    await doctor.save(); // Save the updated record

    res
      .status(200)
      .json({ message: "OTP verified successfully, doctor data saved" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while verifying the OTP" });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ error: "Please provide email and new password" });
  }

  try {
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Validate the new password (optional but recommended)
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "New password must be at least 6 characters long" });
    }

    // Hash the new password and update it in the database
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    doctor.password = hashedNewPassword;

    await doctor.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while resetting the password" });
  }
};

// Login Doctor
const loginDoctor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Check if the doctor is verified
    if (!doctor.verified) {
      return res.status(403).json({ error: "Doctor account is not verified" });
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "Login successful!",
      token,
      id: doctor._id,
      username: doctor.fullname,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};
const requestPasswordResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Please provide an email" });
  }

  try {
    const doctor = await Doctor.findOne({ email }); // Use Doctor model

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const otp = generateOtp();
    const otpExpiration = getOtpExpiration();
    doctor.otp = otp;
    doctor.otpExpiration = otpExpiration;
    await doctor.save();
    await resetOtpEmail(email, otp); // Send OTP for password reset

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "An error occurred while sending OTP" });
  }
};

// Get All Doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving doctors." });
  }
};

// Get Doctor By ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving doctor details" });
  }
};

// Update Doctor
const updateDoctor = async (req, res) => {
  const {
    fullname,
    qualification,
    specialist,
    email,
    phone_number,
    password,
    img,
    experience,
    address,
    hospital_name,
    consultation_fee,
  } = req.body;

  try {
    const updateData = {
      fullname,
      qualification,
      specialist,
      email,
      phone_number,
      img,
      experience,
      address,
      hospital_name,
      consultation_fee,
    };

    if (img) {
      updateData.img = img;
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json({ message: "Doctor updated successfully", updatedDoctor });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the Doctor" });
  }
};

// Delete Doctor
const deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the Doctor" });
  }
};

// Change Password
const changePassword = async (req, res) => {
  const { _id, oldPassword, newPassword } = req.body;

  if (!_id || !oldPassword || !newPassword) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  try {
    const doctor = await Doctor.findById(_id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, doctor.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Old password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    doctor.password = hashedNewPassword;
    await doctor.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while changing the password" });
  }
};

//Update Image/Avatar
const updateAvatar = async (req, res) => {
  const { Id, img } = req.body; // img is the base64 string

  // Validate input
  if (!Id || !img || !img.startsWith("data:image/")) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    // Find doctor by ID
    const doctor = await Doctor.findById(Id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Update the avatar image
    doctor.img = img;
    await doctor.save();

    res
      .status(200)
      .json({ success: true, message: "Avatar updated successfully" });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export {
  registerDoctor,
  loginDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  changePassword,
  requestPasswordResetOtp,
  verifyOtp,
  updateAvatar,
  resetPassword,
};
