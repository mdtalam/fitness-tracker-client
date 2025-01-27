import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const NewsLetter = () => {
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email } = formData;

    const subscriberData = { name, email };

    try {
      await axiosPublic.post("/subscriber", subscriberData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Subscribed Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset form
      setFormData({ name: "", email: "" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <section
        className="relative bg-cover bg-center bg-no-repeat py-16 px-4"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/GRrVTNp/jonathan-borba-H6w-Tkts-Fxik-unsplash.jpg')", // Replace with your background image URL
        }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          {/* Title */}
          <h2 className="text-4xl font-bold mb-4">Stay Updated!</h2>
          <p className="mb-8 text-lg">
            Subscribe to our newsletter and never miss any updates or offers.
          </p>

          {/* Subscription Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            {/* Name Field */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="w-full md:w-auto px-4 py-3 text-gray-800 rounded-lg focus:outline-none"
              required
            />

            {/* Email Field */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email Address"
              className="w-full md:w-auto px-4 py-3 text-gray-800 rounded-lg focus:outline-none"
              required
            />

            {/* Subscribe Button */}
            <button
              type="submit"
              className="bg-primary hover:bg-teal-600 px-6 py-3 text-white font-semibold rounded-lg transition duration-300"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default NewsLetter;
