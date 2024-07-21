import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const DefaultNavbar = () => (
  <Navbar className="navbar" expand="lg">
    <h4>QuickRush</h4>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <Nav.Link as={Link} to="/Login">
          Login
        </Nav.Link>
        <Nav.Link as={Link} to="/Register">
          Register
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
export default DefaultNavbar;
