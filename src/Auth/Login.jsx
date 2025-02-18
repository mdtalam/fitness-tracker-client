import Lottie from "lottie-react";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import signinLotti from "../../src/assets/signin.json";
import useAuth from "../Hooks/useAuth";
import { saveUserToDb } from "../ImageAPI/utils";

const Login = () => {
  const { signin, googleSignin, setUser } = useAuth();
  const [userError, setUserError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const from = location.state?.from?.pathname || "/";
  const onSubmit = (data) => {
    signin(data.email, data.password)
      .then((result) => {
        const signinUser = result.user;
        setUser(signinUser);
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setUserError({ ...userError, login: err.code });
      });
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const data = await googleSignin();
    //   save user data to database
    await saveUserToDb(data?.user)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    } catch (err) {
      setUserError((prevError) => ({ ...prevError, login: err.code }));
    }
  };

  return (
    <div className="bg-gray-100 mt-[74px]">
      <Helmet>
        <title>FitFusion | Login</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen flex-col md:flex-row-reverse gap-10 py-10">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Log In Now
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("email", { required: "Email is required" })}
                name="email"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {errors.email.message}
                </span>
              )}
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
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
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            {userError.login && (
              <p className="text-red-600 text-sm">{userError.login}</p>
            )}

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
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
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
