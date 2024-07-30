import React, { useEffect, useRef } from "react";

const DoctorDetails = ({ doctor, onClose }) => {
  const detailsRef = useRef(null);

  const handleClickOutside = (event) => {
    if (detailsRef.current && !detailsRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div
        ref={detailsRef}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Doctor Details</h2>
        <div className="space-y-4">
          <div>
            <strong>Full Name:</strong> {doctor.fullname}
          </div>
          <div>
            <strong>Qualification:</strong> {doctor.qualification}
          </div>
          <div>
            <strong>Specialist:</strong> {doctor.specialist}
          </div>
          <div>
            <strong>Email:</strong> {doctor.email}
          </div>
          <div>
            <strong>Phone Number:</strong> {doctor.phone_number}
          </div>
          <div>
            <strong>Experience:</strong> {doctor.experience} years
          </div>
          <div>
            <strong>Address:</strong> {doctor.address}
          </div>
          <div>
            <strong>Hospital/Clinic Name:</strong> {doctor.hospital_name}
          </div>
          <div>
            <strong>Consultation Fee:</strong> {doctor.consultation_fee}
          </div>
        </div>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DoctorDetails;
