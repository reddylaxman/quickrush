import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [numDoctors, setNumDoctors] = useState(0);
  const [numCheckedPatients, setNumCheckedPatients] = useState(0);
  const [numTodayAppointments, setNumTodayAppointments] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch number of doctors
        const responseDoctors = await fetch(
          `${process.env.REACT_APP_VERCEL_URL}/api/doctors`
        );
        if (!responseDoctors.ok) {
          throw new Error("Failed to fetch doctors data");
        }
        const doctorsData = await responseDoctors.json();
        setNumDoctors(doctorsData.length);

        // Fetch number of checked patients
        const responsePatients = await fetch(
          `${process.env.REACT_APP_VERCEL_URL}/api/appointments`
        );
        if (!responsePatients.ok) {
          throw new Error("Failed to fetch patients data");
        }
        const patientsData = await responsePatients.json();
        console.log(patientsData);
        const checkedPatients = patientsData.filter(
          (patient) => patient.checked
        );
        setNumCheckedPatients(checkedPatients.length);

        // Format today's date in the UTC format
        const today = new Date().toISOString().split("T")[0] + "T00:00:00.000Z";

        // Filter appointments for today
        const todayAppointments = patientsData.filter(
          (patient) => patient.appointment_date === today
        );
        console.log("fetch data" + todayAppointments.appointment_date);
        setNumTodayAppointments(todayAppointments.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Number of Doctors</h3>
            <p className="text-4xl font-bold">{numDoctors}</p>
          </div>
        </div>
        <div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">
              Number of Checked Patients
            </h3>
            <p className="text-4xl font-bold">{numCheckedPatients}</p>
          </div>
        </div>
        <div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">
              Number of Today's Appointments
            </h3>
            <p className="text-4xl font-bold">{numTodayAppointments}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
