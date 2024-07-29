import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import profile from "./images/dummy.webp";
import "./style.css";

const AdminNavbar = ({ setRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    setRole("null");
    navigate("/");
  };

  return (
    <Navbar className="navbar shadow-md" expand="lg">
      <h4 className="text-xl font-bold text-gray-800">QuickRush</h4>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
        <Nav className="ms-auto">
          <Nav.Link
            as={Link}
            to="/Admin/Dashboard"
            className={
              location.pathname === "/Admin/Dashboard"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/Admin/ViewDoctors"
            className={
              location.pathname === "/Admin/ViewDoctors"
                ? "nav-link active"
                : "nav-link"
            }
          >
            View Doctors
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/Admin/ViewPatients"
            className={
              location.pathname === "/Admin/ViewPatients"
                ? "nav-link active"
                : "nav-link"
            }
          >
            View Patients
          </Nav.Link>
          <div className="flex items-center relative">
            <img
              src={profile}
              alt="Profile"
              className="w-12 h-12 rounded-full mr-2"
            />
            <select
              onChange={handleLogout}
              className="w-48 h-10 px-2 py-1 dropdown text-base focus:outline-none"
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

export default AdminNavbar;
