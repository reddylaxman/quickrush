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
import MyBookings from "./components/User/MyBookings";
import DoctorPatientList from "./components/Doctor/DoctorPatientList";
import DoctorDashboard from "./components/Doctor/Dashboard";
import AdminViewDoctors from "./components/Admin/ViewDoctors";
import ViewPatientList from "./components/Admin/ViewPatient";
import Dashboard from "./components/Admin/Dashboard";
import Login from "./components/Pages/LoginPage";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import "./App.css";
import PageNotFound from "./components/Routes/PageNotFound";

const App = () => {
  const [role, setRole] = useState(
    () => sessionStorage.getItem("role") || "null"
  );

  useEffect(() => {
    sessionStorage.setItem("role", role);
  }, [role]);

  const handleLogout = () => {
    setRole("null");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("token");
    window.location.reload(false);
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
          {role === "user" && (
            <PatientNavbar setRole={setRole} onLogout={handleLogout} />
          )}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login setRole={setRole} />} />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/User/FindDoctor"
            element={
              <ProtectedRoute
                element={<FindDoctor />}
                allowedRoles={["user"]}
                role={role}
              />
            }
          />
          <Route
            path="/User/MyBookings"
            element={
              <ProtectedRoute
                element={<MyBookings />}
                allowedRoles={["user"]}
                role={role}
              />
            }
          />
          <Route
            path="/User/AppointmentForm"
            element={
              <ProtectedRoute
                element={<AppointmentForm />}
                allowedRoles={["user"]}
                role={role}
              />
            }
          />
          <Route
            path="/Doctor/PatientsList"
            element={
              <ProtectedRoute
                element={<DoctorPatientList />}
                allowedRoles={["doctor"]}
                role={role}
              />
            }
          />
          <Route
            path="/Doctor/Dashboard"
            element={
              <ProtectedRoute
                element={<DoctorDashboard />}
                allowedRoles={["doctor"]}
                role={role}
              />
            }
          />
          <Route
            path="/Admin/ViewDoctors"
            element={
              <ProtectedRoute
                element={<AdminViewDoctors />}
                allowedRoles={["admin"]}
                role={role}
              />
            }
          />
          <Route
            path="/Admin/ViewPatients"
            element={
              <ProtectedRoute
                element={<ViewPatientList />}
                allowedRoles={["admin"]}
                role={role}
              />
            }
          />
          <Route
            path="/Admin/Dashboard"
            element={
              <ProtectedRoute
                element={<Dashboard />}
                allowedRoles={["admin"]}
                role={role}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
