import Lottie from "lottie-react";
import React from "react";
import { Link } from "react-router-dom";
import errorAnimation from "../../src/assets/errorLotti.json"; // Replace with your Lottie file

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <div className="max-w-lg w-full">
        <Lottie animationData={errorAnimation} className="w-full h-64" />
        <h1 className="text-4xl font-bold text-primary mt-4">
          Oops! Something Went Wrong
        </h1>
        <p className="text-gray-600 mt-2">
          We can’t seem to find the page you’re looking for.
        </p>
        <p className="text-gray-500 mt-1">
          Error Code: <span className="font-medium">404</span>
        </p>
        <Link to="/">
          <button className="mt-6 px-6 py-3 bg-primary text-white text-lg font-semibold rounded-md hover:bg-secondary transition duration-200">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
