import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionTitle from "../../../Shared/SectionTitle";

const Team = () => {
  const axiosPublic = useAxiosPublic();
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const { data } = await axiosPublic.get("/trainers");
        setTrainers(data.slice(0, 3)); // Limit to three trainers
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, [axiosPublic]);
  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle title={"Meet Our Trainers"}
          subTitle={
            "Meet our expert trainers at FitFusion—dedicated professionals ready to guide you on your fitness journey!"
          } />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers?.map((trainer) => (
          <div
            key={trainer._id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
          >
            <img
              src={trainer.profileImage}
              alt={trainer.fullName}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">{trainer.fullName}</h3>
            <p className="text-gray-600 text-sm text-center mt-2 mb-4">
              {trainer.biography}
            </p>
            <div>
              <h4 className="text-lg font-medium">Areas of Expertise:</h4>
              <ul className="list-disc list-inside mt-2">
                {trainer?.skills?.map((area, index) => (
                  <li key={index} className="text-gray-700 text-sm">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
