import Lottie from "lottie-react";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import lottiSignUp from "../../src/assets/signUp.json";

const SignUp = () => {
  return (
    <div className="bg-gray-100">
      <Helmet>
        <title>FitFusion | Sign Up</title>
      </Helmet>
      <div className="flex justify-center flex-col md:flex-row-reverse items-center min-h-screen bg-white py-10 gap-10">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
          <form>
            {/* Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
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
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Photo URL */}
            <div className="mb-4">
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium text-gray-700"
              >
                Photo URL
              </label>
              <input
                type="url"
                id="photoURL"
                name="photoURL"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-primary text-white rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Register
            </button>
          </form>

          {/* Link to Login */}
          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline focus:outline-none"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden md:block border-r-2 h-96 w-2 border-primary"></div>
        <div>
          <Lottie className="w-96" animationData={lottiSignUp}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
