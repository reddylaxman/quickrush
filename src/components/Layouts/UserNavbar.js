import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import profile from "./images/dummy.webp";

const PatientNavbar = ({ setRole }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    setRole("null");
    navigate("/");
  };

  return (
    <Navbar className="navbar bg-white shadow-md" expand="lg">
      <h4 className="text-xl font-bold text-gray-800">QuickRush</h4>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/" className="text-gray-700">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/User/FindDoctor" className="text-gray-700">
            Find a Doctor
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/User/AppointmentForm"
            className="text-gray-700"
          >
            Book Appointment
          </Nav.Link>
          <Nav.Link as={Link} to="/User/Services" className="text-gray-700">
            Services
          </Nav.Link>

          <div className="flex items-center relative">
            <img
              src={profile}
              alt="Profile"
              className="w-12 h-12 rounded-full mr-2"
            />
            <select
              onChange={handleLogout}
              className="w-48 h-10 px-2 py-1 bg-white text-base  focus:outline-none"
              style={{ fontSize: "20px" }}
            >
              <option value="" disabled selected hidden>
                {username}
              </option>
              <option
                value="logout"
                className="bg-white text-black text-sm cursor-pointer"
              >
                Logout
              </option>
            </select>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PatientNavbar;
