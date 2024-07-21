import Appointment from "../models/appointment.js";

// Create Appointment
const addAppointment = async (req, res) => {
  const {
    patientname,
    age,
    gender,
    specialist,
    doctor,
    appointment_date,
    appointment_time,
    checked,
  } = req.body;

  if (
    !patientname ||
    !age ||
    !gender ||
    !specialist ||
    !doctor ||
    !appointment_date ||
    !appointment_time ||
    !checked
  ) {
    return res
      .status(422)
      .json({ error: "Please fill all the required fields properly!!!" });
  }

  try {
    const newAppointment = new Appointment({
      patientname,
      age,
      gender,
      specialist,
      doctor,
      appointment_date,
      appointment_time,
      checked,
    });
    await newAppointment.save();
    res.status(201).json({ message: "Appointment Added Successfully..." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the appointment." });
  }
};

// Retrieve Appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving appointments." });
  }
};

// Update Appointment
const updateAppointment = async (req, res) => {
  const {
    patientname,
    age,
    gender,
    specialist,
    doctor,
    appointment_date,
    appointment_time,
    checked,
  } = req.body;

  try {
    // Find the appointment by ID and update the fields
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        patientname,
        age,
        gender,
        specialist,
        doctor,
        appointment_date,
        appointment_time,
        checked,
      },
      { new: true } // Set to true to return the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Return the updated appointment
    return res.json({
      message: "Appointment updated successfully",
      updatedAppointment,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export { getAppointments, addAppointment, updateAppointment };
