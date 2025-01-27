import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AppliedTrainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    const fetchTrainerDetails = async () => {
      try {
        const response = await axiosSecure.get(
          `/appliedTrainings/${id}`
        );
        setTrainer(response.data);
      } catch (error) {
        console.error("Error fetching trainer details:", error);
      }
    };

    fetchTrainerDetails();
  }, [id]);

  const handleConfirm = async () => {
    try {
      const response = await axiosSecure.put(
        `/confirmTrainer/${id}`
      );
  
      if (response.data.success) {
        alert("Trainer confirmed successfully!");
        navigate("/dashboard/allTrainer");
      } else {
        alert("Failed to confirm trainer.");
      }
    } catch (error) {
      console.error("Error confirming trainer:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleReject = async () => {
    try {
      await axiosSecure.delete(`/rejectTrainer/${id}`);
      navigate("/dashboard/appliedTrainer");
    } catch (error) {
      console.error("Error rejecting trainer:", error);
    }
  };

  if (!trainer)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Trainer Details
        </h1>

        {/* Trainer Profile and Details */}
        <div className="flex flex-col md:flex-row items-center gap-6 pb-6">
          {/* Trainer Profile Image */}
          <div className="w-full md:w-[400px] h-[300px] sm:h-[370px]">
            <img
              src={trainer.profileImage}
              alt={trainer.fullName}
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </div>

          {/* Trainer Details */}
          <div className="space-y-2 w-full">
            <p className="text-lg">
              <strong>Name:</strong> {trainer.fullName}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {trainer.email}
            </p>
            <p className="text-lg">
              <strong>Age:</strong> {trainer.age}
            </p>
            <p className="text-lg">
              <strong>Experience:</strong> {trainer.experience} years
            </p>
            <p className="text-lg">
              <strong>Class Duration:</strong> {trainer.classDuration} hours
            </p>
            <p className="text-lg">
              <strong>Skills:</strong> {trainer.skills.join(", ")}
            </p>
            <p className="text-lg">
              <strong>Available Days:</strong>{" "}
              {trainer.availableDays.map((day) => day.label).join(", ")}
            </p>
            <p className="text-lg">
              <strong>Status:</strong>{" "}
              {trainer.status.charAt(0).toUpperCase() + trainer.status.slice(1)}
            </p>
          </div>
        </div>

        {/* Biography Section */}
        <div className="pb-6">
          <h1 className="text-xl font-bold text-center">Biography</h1>
          <p className="text-lg">{trainer.biography}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center flex-col md:flex-row gap-4">
          <button
            onClick={handleConfirm}
            className="bg-green-500 text-white px-6 py-2 rounded-md shadow hover:bg-green-600"
          >
            Confirm Application
          </button>
          <button
            onClick={handleReject}
            className="bg-red-500 text-white px-6 py-2 rounded-md shadow hover:bg-red-600"
          >
            Reject Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppliedTrainerDetails;
