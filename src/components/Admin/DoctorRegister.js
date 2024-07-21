import React, { useState } from "react";
import "./DoctorRegister.css";

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    date_of_birth: "",
    qualification: "",
    specialist: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const capitalizedSpecialist =
      formData.specialist.charAt(0).toUpperCase() +
      formData.specialist.slice(1);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_VERCEL_URL}/api/doctors/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            specialist: capitalizedSpecialist,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register doctor");
      }

      // If registration is successful, reset form fields
      setFormData({
        fullname: "",
        date_of_birth: "",
        qualification: "",
        specialist: "",
        email: "",
        phone_number: "",
        password: "",
      });

      alert("Doctor registered successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Doctor registration failed. Please try again.");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mt-10 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Doctor Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div>
            <label htmlFor="fullname" className="block font-medium mb-1">
              Full Name:
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              id="fullname"
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="date_of_birth" className="block font-medium mb-1">
              Date of Birth:
            </label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              id="date_of_birth"
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="qualification" className="block font-medium mb-1">
              Qualification:
            </label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              id="qualification"
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="specialist" className="block font-medium mb-1">
              Specialist:
            </label>
            <input
              type="text"
              name="specialist"
              value={formData.specialist}
              onChange={handleChange}
              id="specialist"
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="phone_number" className="block font-medium mb-1">
              Phone Number:
            </label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              id="phone_number"
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              id=" password"
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegister;
