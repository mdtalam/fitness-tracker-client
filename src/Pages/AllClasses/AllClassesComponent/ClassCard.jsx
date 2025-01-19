import React from "react";

const ClassCard = ({ classData }) => {
  const { className, details, image } = classData;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200">
      {/* Class Image */}
      <img className="w-full h-48 object-cover" src={image} alt={className} />

      {/* Class Details */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{className}</h2>
        <p className="text-gray-700 text-sm">{details}</p>
      </div>
      <div className="my-4 mx-4 border-t border-gray-300"></div>
      {/* Trainers Section */}
      <div className="px-4 pb-4">
        <p className="text-gray-600 text-sm font-semibold mb-2">
          Trainer who took this class
        </p>
        <div className="flex -space-x-2">
          <img
            src={image}
            alt={className}
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
            title={className}
          />
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
