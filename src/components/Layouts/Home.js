import React from "react";
import illustration from "../images/3962156.jpg";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="landing-page">
      <div className="flex justify-between items-center bg-blue-500 text-white py-10 px-5">
        <div className="w-1/2">
          <h1 className="text-4xl font-bold typewriter">
            Book Your Doctor Appointment Online
          </h1>
          <p className="mt-3 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="mt-5 bg-white text-blue-500 py-2 px-4 rounded">
            <Link to="/Login" style={{ textDecoration: "none" }}>
              Quick and Rush to Book Appointment
            </Link>
          </button>
        </div>
        <div className="w-1/2">
          <img
            src={illustration}
            alt="Doctor Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="how-it-works bg-gray-100 py-10">
        <h2 className="text-3xl font-bold mb-5 text-center text-blue-600">
          How It Works!
        </h2>
        <div className="flex justify-around">
          <div className="bg-white shadow-lg rounded-lg p-5 text-center w-1/3 mx-2">
            <img
              src="path/to/your/image1.jpg"
              alt="Find Doctors"
              className="w-24 h-24 mx-auto"
            />
            <p className="mt-2 font-semibold text-blue-600">Find Doctors</p>
            <p className="mt-2 text-gray-600">
              Search and find the best doctors in your area.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-5 text-center w-1/3 mx-2">
            <img
              src="path/to/your/image2.jpg"
              alt="Book Appointment"
              className="w-24 h-24 mx-auto"
            />
            <p className="mt-2 font-semibold text-blue-600">Book Appointment</p>
            <p className="mt-2 text-gray-600">
              Schedule your appointment online with ease.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-5 text-center w-1/3 mx-2">
            <img
              src="path/to/your/image3.jpg"
              alt="Get Consultation"
              className="w-24 h-24 mx-auto"
            />
            <p className="mt-2 font-semibold text-blue-600">Get Consultation</p>
            <p className="mt-2 text-gray-600">
              Receive consultation from the comfort of your home.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-500 text-white py-10 text-center">
        <h2 className="text-3xl font-bold mb-5">
          Healing Starts Here: Your Journey, Our Commitment
        </h2>
        <p>2000+ Happy Patients & 50+ Specialized Doctors</p>
      </div>

      <div className="top-doctors py-10">
        <h2 className="text-3xl font-bold mb-5 text-center text-blue-600">
          Our Top Doctors
        </h2>
        <div className="flex justify-around">
          <div className="bg-white shadow-lg rounded-lg p-5 text-center w-1/3 mx-2">
            <img
              src="path/to/your/image1.jpg"
              alt="Doctor 1"
              className="w-24 h-24 mx-auto rounded-full"
            />
            <p className="mt-2 font-semibold text-blue-600">Dr. John Doe</p>
            <p className="mt-2 text-gray-600">Cardiologist</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-5 text-center w-1/3 mx-2">
            <img
              src="path/to/your/image2.jpg"
              alt="Doctor 2"
              className="w-24 h-24 mx-auto rounded-full"
            />
            <p className="mt-2 font-semibold text-blue-600">Dr. Jane Smith</p>
            <p className="mt-2 text-gray-600">Dermatologist</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-5 text-center w-1/3 mx-2">
            <img
              src="path/to/your/image3.jpg"
              alt="Doctor 3"
              className="w-24 h-24 mx-auto rounded-full"
            />
            <p className="mt-2 font-semibold text-blue-600">Dr. Alan Brown</p>
            <p className="mt-2 text-gray-600">Neurologist</p>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-5 text-center">
        <p>2000+ Patients | 60+ Cities | 80+ Doctors | 24/7 Support</p>
      </footer>
    </div>
  );
}

export default Home;
