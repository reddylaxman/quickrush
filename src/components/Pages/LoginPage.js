import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import illustration from "../images/7317079.jpg";
import open from "../images/eye.png";
import close from "../images/eye-crossed.png";
function Login({ setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRoleState] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [forgotRole, setForgotRole] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  console.log(process.env.REACT_APP_VERCEL_URL);
  const endpoints = {
    login: {
      doctor: `${process.env.REACT_APP_VERCEL_URL}/api/doctors/login`,
      admin: `${process.env.REACT_APP_VERCEL_URL}/api/admins/login`,
      user: `${process.env.REACT_APP_VERCEL_URL}/api/users/login`,
    },
    sendOtp: {
      doctor: `${process.env.REACT_APP_VERCEL_URL}/api/doctors/send-otp`,
      user: `${process.env.REACT_APP_VERCEL_URL}/api/users/send-otp`,
    },
    verifyOtp: {
      doctor: `${process.env.REACT_APP_VERCEL_URL}/api/doctors/verify-otp`,
      user: `${process.env.REACT_APP_VERCEL_URL}/api/users/verify-otp`,
    },
    resetPassword: {
      doctor: `${process.env.REACT_APP_VERCEL_URL}/api/doctors/reset-password`,
      user: `${process.env.REACT_APP_VERCEL_URL}/api/users/reset-password`,
    },
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(endpoints.login[role], {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          toast.error(
            data.error ||
              `${role.charAt(0).toUpperCase() + role.slice(1)} not found`
          );
        } else if (response.status === 401) {
          toast.error(data.error || "Invalid credentials");
        } else if (response.status === 403) {
          toast.error(data.error || "Account not verified");
        } else {
          toast.serror("An error occurred while logging in");
        }
      } else {
        sessionStorage.setItem("id", data.id);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("token", data.token);
        toast.success("You logged in successfully");
        setRole(role);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("An error occurred while logging in");
    }
  }

  async function handleForgotPasswordSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(endpoints.sendOtp[forgotRole], {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "An error occurred while sending OTP");
      } else {
        toast.success("OTP sent to your email");
        setOtpSent(true);
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("An error occurred while sending OTP");
    }
  }

  async function handleOtpSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(endpoints.verifyOtp[forgotRole], {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        setOtpError(data.error || "Invalid OTP");
      } else {
        toast.success("OTP verified. You can now reset your password");
        setOtpVerified(true);
        setOtpSent(false); // Reset OTP sent state
      }
    } catch (error) {
      console.error("Error:", error.message);
      setOtpError("An error occurred while verifying OTP");
    }
  }

  async function handleResetPasswordSubmit(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(endpoints.resetPassword[forgotRole], {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "An error occurred while resetting password");
      } else {
        toast.success("Password reset successfully");
        setTimeout(() => {
          window.location.reload(false); // Reload the page
        }, 2000);
        setIsPopupOpen(false);
        setOtpVerified(false); // Reset OTP verified state
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("An error occurred while resetting password");
    }
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeRole(e) {
    setRoleState(e.target.value);
  }

  function handleForgotRoleChange(e) {
    setForgotRole(e.target.value);
  }

  function handleOtpChange(e) {
    setOtp(e.target.value);
  }

  function handleNewPasswordChange(e) {
    setNewPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="bg-white shadow-lg rounded-lg flex w-3/4">
        <div className="w-1/2 p-8 mt-5">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={handleChangeRole}
                required
                style={{ fontSize: "18px" }}
                className="mt-1 block w-full pl-3 pr-10 py-2  border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="mb-4 relative">
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
                className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  placeholder="Enter password"
                  onChange={handleChangePassword}
                  required
                  className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            <p className="mt-4 text-sm">
              <button
                type="button"
                onClick={() => setIsPopupOpen(true)}
                className="text-blue-500 hover:underline"
              >
                Forgot your password ?{" "}
              </button>
            </p>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
            <div style={{ marginTop: "15px" }}>
              <p>
                Dont have an account? <Link to="/Register">Register here</Link>
              </p>
            </div>
          </form>
        </div>
        <div className="w-1/2">
          <img
            src={illustration}
            alt="Illustration"
            className="object-cover w-full h-85"
          />
        </div>
      </div>

      {/* Forgot Password Popup */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg w-1/3 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {otpVerified ? (
              <form onSubmit={handleResetPasswordSubmit}>
                <h2 className="text-xl font-bold mb-4">Reset Password</h2>
                <div className="mb-4 relative">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <img src={close} alt="Hide" style={{ width: "25px" }} />
                      ) : (
                        <img src={open} alt="Show" style={{ width: "25px" }} />
                      )}
                    </span>
                  </div>
                </div>
                <div className="mb-4 relative">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                >
                  Reset Password
                </button>
              </form>
            ) : otpSent ? (
              <form onSubmit={handleOtpSubmit}>
                <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
                {otpError && <p className="text-red-500 mb-4">{otpError}</p>}
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
                    onChange={handleOtpChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                >
                  Verify OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit}>
                <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
                <div className="mb-4">
                  <label
                    htmlFor="forgotRole"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <select
                    id="forgotRole"
                    value={forgotRole}
                    onChange={handleForgotRoleChange}
                    required
                    style={{ fontSize: "18px" }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    <option value="doctor">Doctor</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="forgotEmail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="forgotEmail"
                    name="forgotEmail"
                    value={email}
                    onChange={handleChangeEmail}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                >
                  Send OTP
                </button>
              </form>
            )}
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setIsPopupOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Login;
