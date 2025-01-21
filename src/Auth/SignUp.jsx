import Lottie from "lottie-react";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import lottiSignUp from "../../src/assets/signUp.json";
import useAuth from "../Hooks/useAuth";
import { imageUpload } from "../ImageAPI/utils";

const SignUp = () => {
  const { createUser, updateUserProfile, setUser, logOut } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.files[0];
    const password = form.password.value;
    console.log(name, email, photo, password);

    // send image data to imgbb
    const photoURL = await imageUpload(photo);

    // Reset previous error message
    setErrorMessage("");

    if (password.length < 6) {
      setErrorMessage("Password should be 6 characters or longer");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Include at least one uppercase letter and lowercase letter"
      );
      return;
    }

    // Create new user
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        // Update user profile with name and photo URL
        updateUserProfile(name, photoURL)
          .then(() => {
            Swal.fire({
              title: "Registration Successful!",
              text: `Welcome, ${user?.displayName}`,
              icon: "success",
              confirmButtonText: "Proceed to Login",
            }).then(() => {
              // Log out the user immediately after registration
              logOut()
                .then(() => {
                  navigate("/login");
                })
                .catch((error) => {
                  setErrorMessage(error.message);
                });
            });
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="bg-gray-100">
      <Helmet>
        <title>FitFusion | Sign Up</title>
      </Helmet>
      <div className="flex justify-center flex-col md:flex-row-reverse items-center min-h-screen bg-white py-10 gap-10">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Sign Up Now
          </h2>
          <form onSubmit={handleRegister}>
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

            {/* Photo Upload */}
            <div className="mb-4">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Photo
              </label>
              <input
                required
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
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

            {/* Password */}
            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 top-2 right-3 flex items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {errorMessage && (
              <label className="label text-red-500 text-sm">
                {errorMessage}
              </label>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-primary text-white rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Sign Up
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
