import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State variable to track selected doctor
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_VERCEL_URL}/api/doctors`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      const data = await response.json();
      setDoctors(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (doctorId) => {
    navigate(`/Admin/edit-doctor/${doctorId}`);
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
        if (!response.ok) {
          throw new Error("Failed to delete doctor");
        }
        fetchDoctors();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleDisplayDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDetailsModal(true);
  };
  return (
    <div className="w-4/5 mx-auto">
      <h2 className="text-2xl font-bold mb-4">View Doctors</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Specialist</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr
              key={doctor._id}
              className="border-b border-gray-300 hover:bg-gray-100"
            >
              <td className="px-4 py-2">{doctor.fullname}</td>
              <td className="px-4 py-2">{doctor.specialist}</td>
              <td className="px-4 py-2">{doctor.email}</td>
              <td className="px-4 py-2">{doctor.phone_number}</td>
              <td className="px-4 py-2">
                <div className="flex justify-center space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEdit(doctor._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDisplayDetails(doctor)}
                  >
                    Display
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(doctor._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to display doctor details */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Doctor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDoctor && (
            <div>
              <p className="mb-2">
                <span className="font-bold">Name:</span>{" "}
                {selectedDoctor.fullname}
              </p>
              <p className="mb-2">
                <span className="font-bold">Specialist:</span>{" "}
                {selectedDoctor.specialist}
              </p>
              <p className="mb-2">
                <span className="font-bold">Email:</span> {selectedDoctor.email}
              </p>
              <p className="mb-2">
                <span className="font-bold">Phone Number:</span>{" "}
                {selectedDoctor.phone_number}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowDetailsModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminViewDoctors;
