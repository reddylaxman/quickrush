import React, { useState, useEffect } from "react";

const MyBookings = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noBookings, setNoBookings] = useState(false);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_VERCEL_URL}/api/appointments/${userId}`
        );
        if (response.status === 404) {
          setNoBookings(true);
          setAppointments([]);
        } else if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        } else {
          const data = await response.json();
          setAppointments(data);
          setNoBookings(false);
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setNoBookings(true);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  const handleCancel = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_VERCEL_URL}/api/appointments/${appointmentId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to cancel appointment");
        setAppointments(
          appointments.filter(
            (appointment) => appointment._id !== appointmentId
          )
        );
        alert("Appointment canceled successfully");
      } catch (err) {
        console.error("Error canceling appointment:", err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {noBookings ? (
        <div>No bookings found.</div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-blue-200 text-black-700">
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Time</th>
              <th className="py-2 px-4 border-b">Doctor</th>
              <th className="py-2 px-4 border-b">Specialty</th>
              <th className="py-2 px-4 border-b">Consultation Fee</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-blue-100" : "bg-white"
                } hover:text-gray-700`}
              >
                <td className="py-2 px-4 border-b">
                  {new Date(appointment.appointment_date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {appointment.appointment_time}
                </td>
                <td className="py-2 px-4 border-b">{appointment.doctorName}</td>
                <td className="py-2 px-4 border-b">{appointment.specialist}</td>
                <td className="py-2 px-4 border-b">
                  ₹{appointment.consultation_fee}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleCancel(appointment._id)}
                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 focus:outline-none"
                  >
                    Cancel Appointment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBookings;
