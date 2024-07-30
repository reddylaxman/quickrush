import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faUserDoctor,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import EditDoctor from "./EditDoctorDetails";
import DoctorRegister from "./DoctorRegister";
import DoctorDetails from "./DoctorDetails";

const AdminViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [doctorToEdit, setDoctorToEdit] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_VERCEL_URL}/api/doctors`
      );
      if (!response.ok) throw new Error("Failed to fetch doctors");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (doctor) => {
    setDoctorToEdit(doctor);
    setShowEditForm(true);
  };

  const handleDelete = async (doctorId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_VERCEL_URL}/api/doctors/${doctorId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete doctor");
        setTimeout(() => {
          fetchDoctors(); // Reload the doctor list
        }, 1000); // 1-second delay
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleDisplayDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDetails(true);
  };

  const handleCloseEditForm = () => {
    const confirmDiscard = window.confirm(
      "Are you sure you want to discard changes?"
    );
    if (confirmDiscard) {
      setShowEditForm(false);
      setDoctorToEdit(null);
    }
  };

  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="relative w-4/5 mx-auto">
      <h2 className="text-2xl font-bold mb-4">View Doctors</h2>

      <div className="flex justify-end mb-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowRegisterForm(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Doctor
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-blue-300">
          <thead>
            <tr className="bg-blue-200 text-black-700 border border-blue-300">
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Specialist</th>
              <th className="px-4 py-2 text-center">Experience</th>
              <th className="px-4 py-2 text-center">Consultation Fee</th>
              <th className="px-4 py-2 text-center">Email</th>
              <th className="px-4 py-2 text-center">Phone Number</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr
                key={doctor._id}
                className="border-b border-blue-300 hover:bg-blue-100"
              >
                <td className="px-4 py-2 text-center">Dr. {doctor.fullname}</td>
                <td className="px-4 py-2 text-center">{doctor.specialist}</td>
                <td className="px-4 py-2 text-center">
                  {doctor.experience} years
                </td>
                <td className="px-4 py-2 text-center">
                  {doctor.consultation_fee}
                </td>
                <td className="px-4 py-2 text-center">{doctor.email}</td>

                <td className="px-4 py-2 text-center">{doctor.phone_number}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleEdit(doctor)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDisplayDetails(doctor)}
                    >
                      <FontAwesomeIcon icon={faUserDoctor} />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(doctor._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overlay for Registration Form */}
      {showRegisterForm && (
        <div className="fixed inset-0 bg-transparent flex justify-center items-center z-50">
          <DoctorRegister onClose={handleCloseRegisterForm} />
        </div>
      )}

      {/* Overlay for Edit Form */}
      {showEditForm && doctorToEdit && (
        <div className="fixed inset-0 bg-transparent flex justify-center items-center z-50">
          <EditDoctor doctor={doctorToEdit} onClose={handleCloseEditForm} />
        </div>
      )}

      {/* Overlay for Doctor Details */}
      {showDetails && selectedDoctor && (
        <DoctorDetails doctor={selectedDoctor} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default AdminViewDoctors;
