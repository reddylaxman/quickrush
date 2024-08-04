import React, { useState, useEffect } from "react";

function DoctorDashboard() {
  const [patientsCount, setPatientsCount] = useState(0);
  const [checkedPatientsCount, setCheckedPatientsCount] = useState(0);

  useEffect(() => {
    // Fetch data from the URL
    fetch(`${process.env.REACT_APP_VERCEL_URL}/api/appointments`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        // Get doctor's name from session storage
        const storedDoctorName = localStorage.getItem("username");
        if (!storedDoctorName) {
          throw new Error("Doctor name not found in Local storage");
        }

        // Filter data based on the doctor's name
        const doctorPatients = data.filter(
          (patient) => patient.doctorName === storedDoctorName
        );

        // Count the number of patients
        const patientsCount = doctorPatients.length;
        setPatientsCount(patientsCount);

        // Count the number of checked patients
        const checkedPatients = doctorPatients.filter(
          (patient) => patient.checked
        );
        setCheckedPatientsCount(checkedPatients.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-2 gap-4" style={{ marginTop: "-25rem" }}>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">Total Patients</h3>
          <p className="text-4xl font-bold">{patientsCount}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">Checked Patients</h3>
          <p className="text-4xl font-bold">{checkedPatientsCount}</p>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
