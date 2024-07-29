import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminNavbar from "./components/Layouts/AdminNavbar";
import PatientNavbar from "./components/Layouts/UserNavbar";
import DoctorNavbar from "./components/Layouts/DoctorNavbar";
import Home from "./components/Layouts/Home";
import DefaultNavbar from "./components/Layouts/MyNavbar";
import Register from "./components/Pages/RegisterationPage";
import AppointmentForm from "./components/User/AppointmentForm";
import FindDoctor from "./components/User/FindADoctor";
import Services from "./components/User/Services";
import DoctorPatientList from "./components/Doctor/DoctorPatientList";
import DoctorDashboard from "./components/Doctor/Dashboard";
import AdminViewDoctors from "./components/Admin/ViewDoctors";
import ViewPatientList from "./components/Admin/ViewPatient";
import Dashboard from "./components/Admin/Dashboard";
import Login from "./components/Pages/LoginPage";
import "./App.css";
const App = () => {
  const [role, setRole] = useState(
    () => localStorage.getItem("role") || "null"
  );

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  const handleLogout = () => {
    setRole("null");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    window.location.reload(true);
  };

  return (
    <div>
      <BrowserRouter basename="quickrush">
        <div>
          {role === "null" && <DefaultNavbar setRole={setRole} />}
          {role === "admin" && (
            <AdminNavbar setRole={setRole} onLogout={handleLogout} />
          )}
          {role === "doctor" && (
            <DoctorNavbar setRole={setRole} onLogout={handleLogout} />
          )}
          {role === "patient" && (
            <PatientNavbar setRole={setRole} onLogout={handleLogout} />
          )}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login setRole={setRole} />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/User/FindDoctor" element={<FindDoctor />} />
          <Route path="/User/Services" element={<Services />} />
          <Route path="/User/AppointmentForm" element={<AppointmentForm />} />
          <Route path="/Doctor/PatientsList" element={<DoctorPatientList />} />
          <Route path="/Doctor/Dashboard" element={<DoctorDashboard />} />
          <Route path="/Admin/ViewDoctors" element={<AdminViewDoctors />} />
          <Route path="/Admin/ViewPatients" element={<ViewPatientList />} />
          <Route path="/Admin/Dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
