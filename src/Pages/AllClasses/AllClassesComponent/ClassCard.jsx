import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Tooltip } from "react-tooltip";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const ClassCard = ({ classData }) => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();  // Initialize useNavigate
  const { className, details, image, _id,bookedCount} = classData;

  // Use useQuery hook to fetch slot info by class ID
  const { data: slots, isLoading } = useQuery({
    queryKey: ["slotsByClass", _id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/slots/by-class/${_id}`);
      return data;
    },
    enabled: !!_id,
  });

  // Handling trainer data
  const trainers = slots && slots.length > 0 ? slots : [];

  const handleTrainerClick = (trainerId) => {
    // Navigate to the trainer's details page using their ID
    navigate(`/details/${trainerId}`);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200">
      {/* Class Image */}
      <img className="w-full h-48 object-cover" src={image} alt={className} />

      {/* Class Details */}
      <div className="p-4">
        <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-2">{className}</h2>
        <p className="text-gray-600">Booked {bookedCount || "0"}</p>
        </div>
        <p className="text-gray-700 text-sm">{details}</p>
      </div>
      <div className="my-4 mx-4 border-t border-gray-300"></div>

      {/* Trainers Section */}
      <div className="px-4 pb-4">
        <p className="text-gray-600 text-sm font-semibold mb-2">
          Trainers who took this class
        </p>
        {isLoading ? (
          <p>Loading trainers...</p> // Show loading message for trainers
        ) : trainers.length > 0 ? (
          <div className="flex space-x-2">
            {/* Apply space between images */}
            {trainers.map((slot, index) => (
              <div key={index} className="relative flex-shrink-0">
                {/* Trainer Image with Tooltip */}
                <img
                  src={slot.trainerProfileImage || "/path/to/default-image.jpg"}
                  alt={slot.trainerName}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm cursor-pointer"
                  data-tooltip-id={`trainer-tooltip-${index}`} // Use a unique ID for each tooltip
                  onClick={() => handleTrainerClick(slot.trainerId)} // Handle click event
                />
                
                {/* Tooltip Component */}
                <Tooltip
                  id={`trainer-tooltip-${index}`}
                  place="top"
                  content={slot.trainerName}
                  className="bg-black text-white p-2 rounded z-10"
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No trainers assigned</p> // Show this if no trainer info is available
        )}
      </div>
    </div>
  );
};

export default ClassCard;
