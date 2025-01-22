import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const TrainerCard = ({ trainer }) => {
  const { fullName, profileImage, experience, email } = trainer;
  const axiosPublic = useAxiosPublic()
  const [availableSlots, setAvailableSlots] = useState([]);

  // Fetch available slots for this trainer based on the email
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await axiosPublic.get(`/slots/${email}`);
        if (response.data.success) {
          setAvailableSlots(response.data.slots); // Set slots data
        } else {
          console.error("No slots found for this trainer");
        }
      } catch (error) {
        console.error("Error fetching available slots:", error);
      }
    };

    if (email) {
      fetchAvailableSlots();
    }
  }, [email]);
  console.log(availableSlots)

  return (
    <div className="w-full h-[420px] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Profile Image Section */}
      <div className="relative h-48 flex items-center justify-center group">
        <div className="relative">
          <img
            src={profileImage}
            alt={`${fullName}'s profile`}
            className="w-40 h-40 object-cover rounded-full border-4 border-primary shadow-md"
          />
          {/* Social Icons Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 rounded-full transition-opacity duration-1000 ease-in-out">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-blue-500"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-blue-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-blue-700"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between flex-1">
        {/* Name and Experience */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{fullName}</h2>
            <p className="text-sm text-gray-500">
              {experience} yrs experience
            </p>
          </div>

          {/* Available Slots */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Available Slots:</h3>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              {availableSlots.length > 0 ? (
                availableSlots.map((slot, index) => (
                  <li key={index}>
                    {slot.slotName} {/* Only showing slotName */}
                  </li>
                ))
              ) : (
                <li>No slots available</li>
              )}
            </ul>
          </div>
        </div>

        {/* Know More Button */}
        <Link
          to={`/details/${trainer._id}`}
          className="mt-4 w-full bg-primary text-secondary py-2 px-4 rounded hover:bg-secondary hover:text-primary transition-all duration-1000 ease-in-out"
        >
          Know More
        </Link>
      </div>
    </div>
  );
};

export default TrainerCard;
