import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 p-4"
      style={{ marginTop: "-75px" }}
    >
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src="https://img.freepik.com/free-vector/404-error-concept-with-man-holding-screen_23-2147738152.jpg?t=st=1722870982~exp=1722874582~hmac=70237e385a7932b957c9baba395989b77f1bb80ae50105d239477918449214ba&w=740"
          alt="404 Illustration"
          className="w-full md:w-1/2 object-cover mt-5"
        />
        <div className="p-8 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-500 transition duration-300"
            style={{ textDecorationLine: "none" }}
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
