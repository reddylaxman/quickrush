import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import "./DoctorPatientList.css"; // Import the CSS file

const DoctorPatientList = () => {
  const headings = [
    "Patient Name",
    "Age",
    "Gender",
    "Appointment Date",
    "Appointment Time",
    "Checked", // New column for marking appointments as checked
  ];

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // State for selected date, default to today
  const doctorName = localStorage.getItem("username");

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_VERCEL_URL}/api/appointments`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Filter the data based on the doctor's name
        const filteredData = data.filter(
          (patient) => patient.doctor === doctorName
        );

        // If a date is selected, further filter appointments based on that date
        const filteredByDate = selectedDate
          ? filteredData.filter((appointment) =>
              appointment.appointment_date.startsWith(selectedDate)
            )
          : filteredData;

        setDetails(filteredByDate);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchPatientDetails();
  }, [doctorName, selectedDate]); // Update the effect when doctorName or selectedDate changes

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleCheck = async (id) => {
    const updatedDetails = details.map((patient) => {
      if (patient._id === id) {
        return { ...patient, checked: true };
      }
      return patient;
    });
    setDetails(updatedDetails);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_VERCEL_URL}/api/appointments/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ checked: true }), // Only send the updated checked status
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update checked status");
      }
      console.log("Checked status updated successfully");
    } catch (error) {
      console.error("Error updating checked status:", error);
    }
  };

  let message = "";
  if (selectedDate === new Date().toISOString().split("T")[0]) {
    message = details.length === 0 ? "No appointments for today" : "";
  } else {
    message = details.length === 0 ? "No appointments for selected date" : "";
  }
  return (
    <div className="w-3/5 mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6 mt-10">
        <div className="flex justify-end mb-4">
          <div className="w-full md:w-auto">
            <Form>
              <Form.Group controlId="datePicker">
                <Form.Label>Select Date:</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="form-control"
                />
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className="row mt-3 table-container">
          <div className="col">
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : details.length === 0 ? (
              <p className="text-center">{message}</p>
            ) : (
              <table className="table-auto w-full border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    {headings.map((h) => (
                      <th key={h} className="px-4 py-2">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {details.map((patient, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-gray-200 text-gray-700`}
                    >
                      <td className="px-4 py-2">{patient.patientname}</td>
                      <td className="px-4 py-2">{patient.age}</td>
                      <td className="px-4 py-2">{patient.gender}</td>
                      <td className="px-4 py-2">{patient.appointment_date}</td>
                      <td className="px-4 py-2">{patient.appointment_time}</td>
                      <td className="px-4 py-2">
                        {!patient.checked ? (
                          <Form.Check
                            type="checkbox"
                            checked={patient.checked}
                            onChange={() => handleCheck(patient._id)}
                          />
                        ) : (
                          <span className="text-green-500">Checked</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DoctorPatientList;
