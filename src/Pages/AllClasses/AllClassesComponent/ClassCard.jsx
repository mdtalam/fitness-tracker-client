import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"; // Import tooltip CSS
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const ClassCard = ({ classData }) => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();  // Initialize useNavigate
  const { className, details, image, _id, bookedCount } = classData;

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
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200 flex flex-col h-full">
      {/* Class Image */}
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt={className}
      />

      {/* Class Details */}
      <div className="p-4 flex-1 flex flex-col justify-between"> {/* Flex layout for consistent spacing */}
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold mb-2">{className}</h2>
            <p className="text-gray-600">Booked {bookedCount || "0"}</p>
          </div>
          <p className="text-gray-700 text-sm line-clamp-3">{details}</p> {/* Truncate long text */}
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-gray-200"></div> {/* Add divider here */}

        {/* Trainers Section */}
        <div>
          <p className="text-gray-600 text-sm font-semibold mb-2">
            Trainers who took this class
          </p>
          {isLoading ? (
            <p>Loading trainers...</p> // Show loading message for trainers
          ) : trainers.length > 0 ? (
            <div className="flex space-x-2">
              {/* Apply space between images */}
              {trainers.slice(0, 5).map((slot, index) => ( // Show only first 5 trainers
                <div key={index} className="relative flex-shrink-0">
                  {/* Trainer Image with Tooltip */}
                  <img
                    src={slot.trainerProfileImage || "/path/to/default-image.jpg"}
                    alt={slot.trainerName}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm cursor-pointer"
                    data-tooltip-id={`trainer-tooltip-${_id}-${index}`} // Use a unique ID for each tooltip
                    data-tooltip-content={slot.trainerName} // Set tooltip content directly
                    onClick={() => handleTrainerClick(slot.trainerId)} // Handle click event
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No trainers assigned</p> // Show this if no trainer info is available
          )}
        </div>
      </div>

      {/* Render Tooltip Component */}
      {trainers.slice(0, 5).map((slot, index) => (
        <Tooltip
          key={index}
          id={`trainer-tooltip-${_id}-${index}`} // Use a unique ID for each tooltip
          place="top"
          content={slot.trainerName} // Set tooltip content
          className="!bg-black !text-white !p-2 !rounded !z-50" // Ensure tooltip styles are applied
        />
      ))}
    </div>
  );
};

export default ClassCard;