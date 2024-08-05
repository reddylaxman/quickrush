import React, { useState, useRef, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ChangePassword from "./changePassword";
import ProfileUpdate from "./ProfileUpdate"; // Ensure this is the correct path to your ProfileUpdate component
import ProfileImage from "./images/dummy.webp";
const DoctorNavbar = ({ setRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showProfileUpdate, setShowProfileUpdate] = useState(false); // State for profile update popup
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [doctor, setDoctor] = useState(null); // State to hold doctor details
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Fetch doctor details when component mounts
    const fetchDoctorDetails = async () => {
      const doctorId = sessionStorage.getItem("id");

      try {
        const response = await fetch(
          `${process.env.REACT_APP_VERCEL_URL}/api/doctors/${doctorId}`
        );
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctorDetails();
  }, []);

  const handleLogout = () => {
    setRole("null");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const handleChangePasswordClick = () => {
    setShowChangePassword(true);
    setDropdownOpen(false); // Close the dropdown when changing password
  };

  const handleProfileUpdateClick = () => {
    setShowProfileUpdate(true);
    setDropdownOpen(false); // Close the dropdown when updating profile
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Handle click outside of dropdown to close it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Navbar className="bg-white shadow-md" expand="lg">
        <h4
          className="text-xl font-bold text-blue-600"
          style={{ marginLeft: "6px" }}
        >
          <Link to="/" style={{ textDecorationLine: "none" }}>
            QuickRush
          </Link>
        </h4>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto flex items-center space-x-4">
            <Nav.Link
              as={Link}
              to="/Doctor/Dashboard"
              className={`nav-link ${
                location.pathname === "/Doctor/Dashboard"
                  ? "text-blue-500"
                  : "text-gray-600"
              }`}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Doctor/PatientsList"
              className={`nav-link ${
                location.pathname === "/Doctor/PatientsList"
                  ? "text-blue-500"
                  : "text-gray-600"
              }`}
            >
              Patients List
            </Nav.Link>
            <div
              className="relative flex items-center cursor-pointer"
              onClick={toggleDropdown}
              ref={dropdownRef}
            >
              <img
                src={doctor?.img || ProfileImage} // Display doctor's image or default if not available
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <span className="ml-2 font-semibold text-blue-500">
                {doctor?.fullname || "Username"}
              </span>
              <svg
                className="ml-2 w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <div className="py-2 px-4 border-b border-gray-200 text-gray-800 font-semibold">
                    {doctor?.fullname || "Username"}
                  </div>
                  <div className="py-1">
                    <button
                      onClick={handleProfileUpdateClick}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 hover:underline"
                    >
                      Update Profile
                    </button>
                    <button
                      onClick={handleChangePasswordClick}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 hover:underline"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 hover:underline"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}
      {showProfileUpdate && (
        <ProfileUpdate onClose={() => setShowProfileUpdate(false)} />
      )}
    </>
  );
};

export default DoctorNavbar;
