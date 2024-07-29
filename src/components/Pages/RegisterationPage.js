import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import illustration from "../images/3736765.jpg";
import open from "../images/eye.png";
import close from "../images/eye-crossed.png";

const RegistrationPage = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [otp, setOtp] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    fetch(`${process.env.REACT_APP_VERCEL_URL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (
          data.message.includes(
            "User registered successfully! OTP sent to email."
          )
        ) {
          setShowOtpPopup(true);
        } else if (
          data.message.includes(
            "Email already exists but is not verified. OTP has been resent."
          )
        ) {
          setShowOtpPopup(true);
          toast.success(
            "Email already exists but is not verified. OTP has been resent."
          );
        } else {
          toast.error(data.error || "Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Registration failed. Please try again.");
      });
  }

  function handleOtpSubmit(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_VERCEL_URL}/api/users/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "OTP verified successfully") {
          toast.success("Registration and OTP verification successful.");
          setShowOtpPopup(false);
          setTimeout(() => {
            navigate("/Login");
          }, 2000);
        } else {
          toast.error(
            data.error || "OTP verification failed. Please try again."
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("OTP verification failed. Please try again.");
      });
  }

  function handleChangeFullname(e) {
    setFullname(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  function handleChangeOtp(e) {
    setOtp(e.target.value);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex w-3/4">
        <div className="w-1/2">
          <img
            src={illustration}
            alt="Illustration"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4">User Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={fullname}
                placeholder="Enter Full Name"
                onChange={handleChangeFullname}
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter Email"
                onChange={handleChangeEmail}
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter Password"
                  onChange={handleChangePassword}
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <img src={close} alt="Hide" style={{ width: "25px" }} />
                  ) : (
                    <img src={open} alt="Show" style={{ width: "25px" }} />
                  )}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={handleChangeConfirmPassword}
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-400 text-white p-2 rounded"
              >
                Register
              </button>
              <Link to="/Login" className="block text-blue-500 mt-4">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* OTP Popup */}
      {showOtpPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  placeholder="Enter OTP"
                  onChange={handleChangeOtp}
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Verify OTP
                </button>
                <button
                  type="button"
                  className="ml-4 bg-red-500 text-white p-2 rounded"
                  onClick={() => setShowOtpPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default RegistrationPage;
