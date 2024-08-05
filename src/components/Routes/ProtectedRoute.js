// src/components/ProtectedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, allowedRoles, role }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/Login" />;
  }

  if (!allowedRoles.includes(role)) {
    // Redirect to home if the user role is not allowed
    return <Navigate to="/" />;
  }

  return Component;
};

export default ProtectedRoute;
