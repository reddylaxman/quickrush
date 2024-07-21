import Doctor from "../models/doctor.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register Doctor
const registerDoctor = async (req, res) => {
  const {
    fullname,
    date_of_birth,
    qualification,
    specialist,
    email,
    phone_number,
    password,
  } = req.body;

  if (
    !fullname ||
    !date_of_birth ||
    !qualification ||
    !specialist ||
    !email ||
    !phone_number ||
    !password
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

    const newDoctor = new Doctor({
      fullname,
      date_of_birth,
      qualification,
      specialist,
      email,
      phone_number,
      password: hashedPassword,
    });

    await newDoctor.save();
    res.status(201).json({ message: "Doctor registered successfully..." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the Doctor." });
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

    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res
      .status(200)
      .json({ message: "Login successful!", token, username: doctor.fullname });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in" });
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
    date_of_birth,
    qualification,
    specialist,
    email,
    phone_number,
    password,
  } = req.body;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      {
        fullname,
        date_of_birth,
        qualification,
        specialist,
        email,
        phone_number,
        password,
      },
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

export {
  registerDoctor,
  loginDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
