import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = ({ onClose }) => {
  const Id = localStorage.getItem("id");
  const userRole = localStorage.getItem("role");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    const apiUrl =
      userRole === "doctor"
        ? `${process.env.REACT_APP_VERCEL_URL}/api/doctors/change-password`
        : `${process.env.REACT_APP_VERCEL_URL}/api/users/change-password`;

    try {
      const response = await axios.post(apiUrl, {
        _id: Id,
        oldPassword,
        newPassword,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Password changed successfully");
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while changing the password");
    }
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={formRef}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Old Password
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 mt-4 flex items-center"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              <FontAwesomeIcon
                icon={showOldPassword ? faEyeSlash : faEye}
                className="text-gray-500"
              />
            </button>
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 mt-4 flex items-center"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              <FontAwesomeIcon
                icon={showNewPassword ? faEyeSlash : faEye}
                className="text-gray-500"
              />
            </button>
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmNewPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Change Password
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
