import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FindDoctor() {
  const [doctorList, setDoctorList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_VERCEL_URL}/api/doctors`)
      .then((response) => response.json())
      .then((data) => {
        setDoctorList(data);
        setFilteredList(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the doctor data!", error);
      });
  }, []);

  const filterBySearch = (e) => {
    const query = e.target.value;
    const updatedList = doctorList.filter((item) => {
      return (
        item.fullname.toLowerCase().includes(query.toLowerCase()) ||
        item.specialist.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredList(updatedList);
  };
  const handleBookAppointment = (doctor) => {
    navigate(
      `/User/AppointmentForm?doctor=${doctor.fullname}&specialist=${doctor.specialist}`
    );
  };

  return (
    <div className="container mx-auto mt-16 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Find a Doctor</h1>
      <input
        type="text"
        placeholder="Search for doctor"
        className="mb-8 p-2 border border-gray-300 rounded w-full md:w-3/4 mx-auto"
        onChange={filterBySearch}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredList.map((doctor, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="w-50 h-50 mx-auto mt-4">
              <img
                className="w-full h-full object-cover rounded-full"
                src={doctor.img || "default_photo_url_here"}
                alt="Doctor"
              />
            </div>
            <div className="p-4">
              <div className="font-bold text-xl mb-2 text-blue-600">
                {doctor.fullname}
              </div>
              <p className="text-gray-700 text-base">{doctor.specialist}</p>
              <button
                onClick={() => handleBookAppointment(doctor)}
                className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindDoctor;
