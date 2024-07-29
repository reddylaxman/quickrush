import React, { useState } from "react";
import "./DoctorRegister.css"; // Ensure you have the correct styles

const DoctorRegister = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    qualification: "",
    specialist: "",
    email: "",
    phone_number: "",
    experience: "",
    address: "",
    hospital_name: "",
    consultation_fee: "",
  });

  const [otpPopupVisible, setOtpPopupVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

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

      // Show OTP popup
      setOtpPopupVisible(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Doctor registration failed. Please try again.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_VERCEL_URL}/api/doctors/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            otp,
          }),
        }
      );

      if (!response.ok) {
        const { error } = await response.json();
        setOtpError(error || "Failed to verify OTP");
        return;
      }

      setOtpPopupVisible(false);
      alert("Doctor registered successfully!");
      setFormData({
        fullname: "",
        qualification: "",
        specialist: "",
        email: "",
        phone_number: "",
        experience: "",
        address: "",
        hospital_name: "",
        consultation_fee: "",
      });
      onClose();
    } catch (error) {
      console.error("Error:", error);
      setOtpError("An error occurred while verifying OTP");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Doctor Registration
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Full Name */}
            <div className="col-span-1">
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

            {/* Qualification */}
            <div className="col-span-1">
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

            {/* Specialist */}
            <div className="col-span-1">
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

            {/* Email */}
            <div className="col-span-1">
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

            {/* Phone Number */}
            <div className="col-span-1">
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

            {/* Experience */}
            <div className="col-span-1">
              <label htmlFor="experience" className="block font-medium mb-1">
                Experience (in years):
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                id="experience"
                className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Consultation Fee */}
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
                value={formData.consultation_fee}
                onChange={handleChange}
                id="consultation_fee"
                className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Hospital Name */}
            <div className="col-span-1">
              <label htmlFor="hospital_name" className="block font-medium mb-1">
                Hospital Name:
              </label>
              <input
                type="text"
                name="hospital_name"
                value={formData.hospital_name}
                onChange={handleChange}
                id="hospital_name"
                className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label htmlFor="address" className="block font-medium mb-1">
                Address:
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                id="address"
                rows="4"
                className="border border-gray-300 rounded-md py-2 px-3 w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="col-span-2 flex items-center justify-between mt-4 space-x-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full max-w-[200px]"
              >
                Register
              </button>
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md w-full max-w-[200px]"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>

      {otpPopupVisible && (
        <div className="otp-popup">
          <div className="otp-popup-content">
            <h2 className="text-xl font-bold mb-6 text-center">Verify OTP</h2>
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label htmlFor="otp" className="block font-medium mb-1">
                  Enter OTP:
                </label>
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  id="otp"
                  className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {otpError && (
                  <p className="text-red-500 text-sm mt-1">{otpError}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full"
              >
                Verify OTP
              </button>
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md w-full"
                onClick={() => setOtpPopupVisible(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorRegister;
