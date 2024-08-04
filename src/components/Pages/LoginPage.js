import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import illustration from "../images/7317079.jpg";
import open from "../images/eye.png";
import close from "../images/eye-crossed.png";

function Login({ setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRoleState] = useState("");
  const navigate = useNavigate();
  console.log(process.env.REACT_APP_VERCEL_URL);
  async function handleSubmit(e) {
    e.preventDefault();

    const endpoints = {
      doctor: `${process.env.REACT_APP_VERCEL_URL}/api/doctors/login`,
      admin: `${process.env.REACT_APP_VERCEL_URL}/api/admins/login`,
      user: `${process.env.REACT_APP_VERCEL_URL}/api/users/login`,
    };

    try {
      const response = await fetch(endpoints[role], {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log("Response status:", response.status);
      console.log("Response Data", data);

      if (!response.ok) {
        if (response.status === 404) {
          toast.error(
            data.error ||
              `${role.charAt(0).toUpperCase() + role.slice(1)} not found`
          );
        } else if (response.status === 401) {
          toast.error(data.error || "Invalid credentials");
        } else if (response.status === 403) {
          toast.error(data.error || "Account not verified");
        } else {
          toast.error("An error occurred while logging in");
        }
      } else {
        localStorage.setItem("id", data.id);
        localStorage.setItem("role", role);
        localStorage.setItem("username", data.username);
        toast.success("You logged in successfully");
        setRole(role);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("An error occurred while logging in");
    }
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeRole(e) {
    setRoleState(e.target.value);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex w-3/4">
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={handleChangeRole}
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter Email"
                onChange={handleChangeEmail}
                required
                className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={handleChangePassword}
                  required
                  className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <img src={close} alt="Hide" style={{ width: "25px" }} />
                  ) : (
                    <img src={open} alt="Show" style={{ width: "25px" }} />
                  )}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-400 text-white p-2 rounded mt-4 hover:bg-blue-500 hover:shadow-lg transition duration-300"
            >
              Login
            </button>

            <Link
              to="/Register"
              className="block text-center text-blue-500 mt-4"
            >
              User Register only
            </Link>
          </form>
        </div>
        <div className="w-1/2">
          <img
            src={illustration}
            alt="Illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
