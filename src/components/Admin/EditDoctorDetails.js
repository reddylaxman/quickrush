import React, { useState, useEffect } from "react";

const EditDoctor = ({ doctor, onClose }) => {
  const [doctorData, setDoctorData] = useState(doctor);

  useEffect(() => {
    setDoctorData(doctor);
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmUpdate = window.confirm(
      "Do you want to update these details?"
    );
    if (confirmUpdate) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_VERCEL_URL}/api/doctors/${doctor._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(doctorData),
          }
        );

        if (!response.ok) throw new Error("Failed to update doctor");
        alert("Details updated successfully");
        setTimeout(() => {
          window.location.reload(false);
        }, 500);
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while updating the doctor details.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Doctor</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="col-span-1">
            <label htmlFor="fullname" className="block font-medium mb-1">
              Full Name:
            </label>
            <input
              type="text"
              name="fullname"
              value={doctorData.fullname}
              onChange={handleChange}
              id="fullname"
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="qualification" className="block font-medium mb-1">
              Qualification:
            </label>
            <input
              type="text"
              name="qualification"
              value={doctorData.qualification}
              onChange={handleChange}
              id="qualification"
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="specialist" className="block font-medium mb-1">
              Specialist:
            </label>
            <input
              type="text"
              name="specialist"
              value={doctorData.specialist}
              onChange={handleChange}
              id="specialist"
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="email" className="block font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={doctorData.email}
              onChange={handleChange}
              id="email"
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="phone_number" className="block font-medium mb-1">
              Phone Number:
            </label>
            <input
              type="tel"
              name="phone_number"
              value={doctorData.phone_number}
              onChange={handleChange}
              id="phone_number"
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="experience" className="block font-medium mb-1">
              Experience (in years):
            </label>
            <input
              type="number"
              name="experience"
              value={doctorData.experience}
              onChange={handleChange}
              id="experience"
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="hospital_name" className="block font-medium mb-1">
              Hospital/Clinic Name:
            </label>
            <input
              type="text"
              name="hospital_name"
              value={doctorData.hospital_name}
              onChange={handleChange}
              id="hospital_name"
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="consultation_fee"
              className="block font-medium mb-1"
            >
              Consultation Fee:
            </label>
            <input
              type="number"
              name="consultation_fee"
              value={doctorData.consultation_fee}
              onChange={handleChange}
              id="consultation_fee"
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              required
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="address" className="block font-medium mb-1">
              Address:
            </label>
            <textarea
              name="address"
              value={doctorData.address}
              onChange={handleChange}
              id="address"
              className="border border-gray-300 rounded-md py-2 px-3 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center justify-between mt-2 space-x-4 col-span-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full max-w-[200px]"
            >
              Update
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md w-full max-w-[200px]"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDoctor;
