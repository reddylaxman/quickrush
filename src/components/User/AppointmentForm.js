import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentForm = () => {
  const [patientname, setPatientname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [doctor, setDoctor] = useState("");
  const checked = "false";
  const [appointment_date, setAppointment_date] = useState("");
  const [appointment_time, setAppointment_time] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingSpecialists, setLoadingSpecialists] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const doctorParam = params.get("doctor");
    const specialistParam = params.get("specialist");
    if (doctorParam) setDoctor(doctorParam);
    if (specialistParam) setSpecialist(specialistParam);

    // Fetch list of doctors
    fetch(`${process.env.REACT_APP_VERCEL_URL}/api/doctors`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setDoctors(data);
        setLoadingDoctors(false);

        // Extract specialists from the doctors list
        const uniqueSpecialists = [
          ...new Set(data.map((doc) => doc.specialist)),
        ];
        setSpecialists(uniqueSpecialists);
        setLoadingSpecialists(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to fetch doctors. Please try again.");
        setLoadingDoctors(false);
        setLoadingSpecialists(false);
      });
  }, [location]);

  function handleSubmit(e) {
    e.preventDefault();
    try {
      fetch(`${process.env.REACT_APP_VERCEL_URL}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientname,
          age,
          gender,
          specialist,
          doctor,
          checked,
          appointment_date,
          appointment_time,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          toast.success("Booking Appointment Successfully");
          setPatientname("");
          setAge("");
          setGender("");
          setSpecialist("");
          setDoctor("");
          setAppointment_date("");
          setAppointment_time("");
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Booking Appointment failed. Please try again.");
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Booking Appointment failed. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Book Appointment
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="patientname"
              placeholder="Enter Patient Name"
              name="patientname"
              value={patientname}
              onChange={(e) => setPatientname(e.target.value)}
              className="form-control input-field mb-4"
              required
            />
            <input
              type="number"
              id="age"
              placeholder="Enter Age"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="form-control input-field mb-4"
              required
            />
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="form-control input-field mb-4"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select
              id="specialist"
              name="specialist"
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
              className="form-control input-field mb-4"
              required
            >
              <option value="">Select Specialist</option>
              {loadingSpecialists ? (
                <option disabled>Loading...</option>
              ) : specialists.length === 0 ? (
                <option disabled>No specialists available</option>
              ) : (
                specialists.map((spec, index) => (
                  <option key={index} value={spec}>
                    {spec}
                  </option>
                ))
              )}
            </select>
            <select
              id="doctor"
              name="doctor"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="form-control input-field mb-4"
              required
            >
              <option value="">Select Doctor</option>
              {loadingDoctors ? (
                <option disabled>Loading...</option>
              ) : doctors.length === 0 ? (
                <option disabled>No doctors available</option>
              ) : (
                doctors
                  .filter((doc) => doc.specialist === specialist)
                  .map((doctor) => (
                    <option key={doctor.id} value={doctor.fullname}>
                      {doctor.fullname}
                    </option>
                  ))
              )}
            </select>
            <input
              type="date"
              id="appointment_date"
              name="appointment_date"
              value={appointment_date}
              onChange={(e) => setAppointment_date(e.target.value)}
              className="form-control input-field mb-4"
              required
            />
            <input
              type="time"
              id="appointment_time"
              name="appointment_time"
              value={appointment_time}
              onChange={(e) => setAppointment_time(e.target.value)}
              className="form-control input-field mb-4"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Book Appointment
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppointmentForm;
