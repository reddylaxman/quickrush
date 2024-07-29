import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

const DefaultNavbar = () => (
  <Navbar className="navbar" expand="lg">
    <h4 className="text-xl font-bold text-gray-800">QuickRush</h4>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto text-center">
        <Nav.Link
          as={Link}
          to="/Login"
          className="login"
          style={{ width: "100px", height: "45px" }}
        >
          Log In
        </Nav.Link>
        <Button
          as={Link}
          to="/Register"
          className="btn-register"
          style={{ width: "150px", height: "45px" }}
        >
          Sign Up
        </Button>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default DefaultNavbar;
