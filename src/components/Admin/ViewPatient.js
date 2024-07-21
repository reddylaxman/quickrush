import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import "./ViewPatient.css";

const ViewPatientList = () => {
  const headings = [
    "Patient Name",
    "Age",
    "Gender",
    "Appointment Date",
    "Appointment Time",
    "Checked",
  ];

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // Initialize with today's date
  );

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

        // Format today's date in the appointment_date format
        const formattedDate = new Date(selectedDate).toISOString();
        // Filter appointments based on the formatted date
        const filteredByDate = data.filter(
          (appointment) => appointment.appointment_date === formattedDate
        );
        setDetails(filteredByDate);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchPatientDetails();
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  let message = "";
  if (selectedDate === new Date().toISOString().split("T")[0]) {
    message = details.length === 0 ? "No appointments for today" : "";
  } else {
    message = details.length === 0 ? "No appointments for selected date" : "";
  }
  return (
    <div className="w-3/5 mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-end mb-4">
          <div className="w-full md:w-auto">
            <Form controlId="datePicker">
              <Form.Group>
                <Form.Label className="text-gray-700 font-medium">
                  Select Date:
                </Form.Label>
                <Form.Control
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="form-control bg-gray-100 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className="row mt-3 table-container">
          <div className="col">
            {loading ? (
              <p className="text-center text-gray-700 font-medium">
                Loading...
              </p>
            ) : details.length === 0 ? (
              <p className="text-center text-gray-700 font-medium">{message}</p>
            ) : (
              <table className="table-auto w-full border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 font-medium">
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
                        <input
                          type="checkbox"
                          checked={patient.checked}
                          className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
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
export default ViewPatientList;
