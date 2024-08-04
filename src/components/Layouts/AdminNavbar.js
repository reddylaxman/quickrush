import React, { useState, useRef, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import profile from "./images/dummy.webp";

const AdminNavbar = ({ setRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const username = localStorage.getItem("username");
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setRole("null");
    navigate("/");
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
              to="/Admin/Dashboard"
              className={`nav-link ${
                location.pathname === "/Admin/Dashboard"
                  ? "text-blue-500"
                  : "text-gray-600"
              }`}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Admin/ViewDoctors"
              className={`nav-link ${
                location.pathname === "/Admin/ViewDoctors"
                  ? "text-blue-500"
                  : "text-gray-600"
              }`}
            >
              View Doctors
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Admin/ViewPatients"
              className={`nav-link ${
                location.pathname === "/Admin/ViewPatients"
                  ? "text-blue-500"
                  : "text-gray-600"
              }`}
            >
              View Patients
            </Nav.Link>

            <div
              className="relative flex items-center cursor-pointer"
              onClick={toggleDropdown}
              ref={dropdownRef}
            >
              <img
                src={profile}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <span className="ml-2 font-semibold text-blue-500">
                {username}
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
                    {username}
                  </div>
                  <div className="py-1">
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
    </>
  );
};

export default AdminNavbar;
