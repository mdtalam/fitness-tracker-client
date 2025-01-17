import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const TrainerCard = ({ trainer }) => {
  return (
    <div className="w-80 h-[420px] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Profile Image Section */}
      <div className="relative h-48 flex items-center justify-center group">
        <div className="relative">
          <img
            src={trainer.profileImage}
            alt={`${trainer.name}'s profile`}
            className="w-40 h-40 object-cover rounded-full border-4 border-primary shadow-md"
          />
          {/* Social Icons Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 rounded-full transition-opacity duration-1000 ease-in-out">
            <a
              href={trainer.socialIcons.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-blue-500"
            >
              <FaFacebook />
            </a>
            <a
              href={trainer.socialIcons.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-blue-400"
            >
              <FaTwitter />
            </a>
            <a
              href={trainer.socialIcons.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href={trainer.socialIcons.linkedin}
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
            <h2 className="text-lg font-semibold">{trainer.name}</h2>
            <p className="text-sm text-gray-500">
              {trainer.yearsOfExperience} yrs experience
            </p>
          </div>

          {/* Available Slots */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Available Slots:</h3>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              {trainer.availableSlots.map((slot, index) => (
                <li key={index}>{slot}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Know More Button */}
        <button className="mt-4 w-full bg-primary text-secondary py-2 px-4 rounded hover:bg-secondary hover:text-primary transition-all duration-1000 ease-in-out">
          Know More
        </button>
      </div>
    </div>
  );
};

export default TrainerCard;
