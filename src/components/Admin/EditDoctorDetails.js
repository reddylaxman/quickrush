import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({
    fullname: "",
    date_of_birth: "",
    qualification: "",
    specialist: "",
    email: "",
    phone_number: "",
    password: "",
  });

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_VERCEL_URL}/api/doctors/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch doctor");
      }
      const data = await response.json();
      const dateOfBirth = new Date(data.date_of_birth)
        .toISOString()
        .split("T")[0];

      // Update the doctor object with the parsed date
      setDoctor({
        ...data,
        date_of_birth: dateOfBirth,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleCancel = () => {
    alert("Are to want to cancel the updates");
    navigate("/Admin/ViewDoctors");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_VERCEL_URL}/api/doctors/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doctor),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update doctor");
      }
      alert("Details updated successfully");
      navigate("/Admin/ViewDoctors");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 m-0 ">Edit Doctor</h2>
      <div className="max-w-md mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 shadow-lg"
        >
          <div className="mb-4">
            <label
              htmlFor="fullname"
              className="block text-gray-700 font-bold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={doctor.fullname}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="dateOfBirth"
              className="block text-gray-700 font-bold mb-2"
            >
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              value={doctor.date_of_birth}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="qualification"
              className="block text-gray-700 font-bold mb-2"
            >
              Qualification
            </label>
            <input
              type="text"
              name="qualification"
              value={doctor.qualification}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="specialist"
              className="block text-gray-700 font-bold mb-2"
            >
              Specialist
            </label>
            <input
              type="text"
              name="specialist"
              value={doctor.specialist}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={doctor.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone_number"
              value={doctor.phone_number}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={doctor.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDoctor;
