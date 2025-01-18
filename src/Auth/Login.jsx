import Lottie from "lottie-react";
import React from "react";
import { Helmet } from "react-helmet-async";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import signinLotti from "../../src/assets/signin.json";

const Login = () => {
  return (
    <div className="bg-gray-100">
      <Helmet>
        <title>FitFusion | Login</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen flex-col md:flex-row-reverse gap-10 py-10">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Log In Now
          </h2>
          <form>
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
              Log In
            </button>
          </form>

          {/* New User Link */}
          <div className="mt-4 text-center">
            <p>
              Don`t have an account?{" "}
              <Link to="/sign-up" className="text-primary hover:underline">
                Sign Up here
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-gray-300"></div>

          {/* Social Login */}
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
            <FaGoogle />
            Continue with Google
          </button>
        </div>
        <div className="hidden md:block border-r-2 h-96 w-2 border-primary"></div>
        <div>
          <Lottie className="w-96" animationData={signinLotti}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Login;
