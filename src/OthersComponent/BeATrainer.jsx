import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Select from "react-select";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const BeATrainer = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({
    fullName: user?.displayName || "",
    email: user?.email,
    age: "",
    profileImage: "",
    skills: [],
    availableDays: [],
    availableTime: [],
    experience: "",
    classDuration: "",
    biography: "",
    status: "pending",
  });

  const resetFormData = () => {
    setFormData({
      fullName: user?.displayName || "",
      email: user?.email,
      age: "",
      profileImage: "",
      skills: [],
      availableDays: [],
      availableTime: [],
      experience: "",
      classDuration: "",
      biography: "",
      status: "pending",
    });
  };

  const skillOptions = [
    "HIIT Blast",
    "Yoga Flow",
    "Pilates Core",
    "Cardio Kickboxing",
    "Zumba Dance",
    "Spin Cycle",
    "Barre Fitness",
    "Meditation and Mindfulness",
    "CrossFit Fundamentals",
    "Powerlifting Basics",
    "Core Blast",
    "Body Combat",
  ];

  const dayOptions = [
    { value: "Sunday", label: "Sunday" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    const updatedSkills = checked
      ? [...formData.skills, value]
      : formData.skills.filter((skill) => skill !== value);
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleDayChange = (selectedDays) => {
    setFormData({ ...formData, availableDays: selectedDays });
  };

  const handleAvailableTimeChange = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFormData({ ...formData, availableTime: selectedValues });
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const uploadFormData = new FormData();
      uploadFormData.append("image", imageFile);

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGE_API_KEY
          }`,
          uploadFormData
        );
        if (response.data.success) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            profileImage: response.data.data.url,
          }));
          Swal.fire("Image uploaded successfully!", "", "success");
        }
      } catch (error) {
        Swal.fire("Failed to upload image. Please try again.", "", "error");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPublic.post("/trainers", formData);

      if (response.data.success) {
        Swal.fire("Request Submitted Successfully!", "", "success");
        resetFormData();
      } else {
        Swal.fire("Error", response.data.message, "error");
        resetFormData();
      }
    } catch (error) {
      Swal.fire(
        "You have already submitted a request to become a trainer.",
        "",
        "error"
      );
      resetFormData();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 my-14 bg-white text-secondary rounded-lg shadow-md mt-6">
      <Helmet>
        <title>FitFusion | Be A Trainer</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Become a Trainer
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="w-full border border-secondary p-2 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData?.email}
            readOnly
            className="w-full border border-secondary p-2 rounded bg-gray-200 focus:outline-none"
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Age *</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
            className="w-full border border-secondary p-2 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Profile Image */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Profile Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
            className="w-full border border-secondary p-2 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {formData.profileImage && (
            <img
              src={formData.profileImage}
              alt="Profile Preview"
              className="mt-4 w-32 h-32 object-cover rounded-full"
            />
          )}
        </div>

        {/* Skills */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Skills *</label>
          <div className="grid grid-cols-2 gap-2">
            {skillOptions.map((skill, index) => (
              <label key={index} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={skill}
                  checked={formData?.skills?.includes(skill)}
                  onChange={handleSkillChange}
                  className="mr-2 accent-primary"
                />
                {skill}
              </label>
            ))}
          </div>
        </div>

        {/* Available Days */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Select Available Days *
          </label>
          <Select
            isMulti
            options={dayOptions}
            onChange={handleDayChange}
            className="w-full"
            value={formData.availableDays}
          />
        </div>

        {/* Available Time */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Available Time *</label>
          <Select
            isMulti
            options={[
              { value: "Morning", label: "Morning" },
              { value: "Afternoon", label: "Afternoon" },
              { value: "Evening", label: "Evening" },
              { value: "Night", label: "Night" },
            ]}
            onChange={handleAvailableTimeChange}
            className="w-full"
            value={formData.availableTime.map((time) => ({
              value: time,
              label: time,
            }))}
          />
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Experience (Years) *
          </label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            required
            className="w-full border border-secondary p-2 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Class Duration */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Class Duration (Hours) *
          </label>
          <input
            type="number"
            name="classDuration"
            value={formData.classDuration}
            onChange={handleInputChange}
            required
            className="w-full border border-secondary p-2 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Biography */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Biography *</label>
          <textarea
            name="biography"
            value={formData.biography}
            onChange={handleInputChange}
            required
            className="w-full border border-secondary p-2 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default BeATrainer;
