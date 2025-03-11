import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Spinner from "../../OthersComponent/Spinner";
import SectionTitle from "../../Shared/SectionTitle";
import TrainerCard from "./AllTrainerComponent/TrainerCard";

const AllTrainer = () => {
  const axiosPublic = useAxiosPublic();
  const [sortBy, setSortBy] = useState("default"); // State to manage sorting option

  const { data: trainers, isLoading } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/trainers");
      return data;
    },
  });

  // Function to sort trainers based on experience
  const sortTrainers = (trainers, sortBy) => {
    if (sortBy === "experience_asc") {
      return [...trainers].sort((a, b) => a.experience - b.experience);
    } else if (sortBy === "experience_desc") {
      return [...trainers].sort((a, b) => b.experience - a.experience);
    } else {
      return trainers; // Default order
    }
  };

  const sortedTrainers = sortTrainers(trainers || [], sortBy);

  if (isLoading) return <Spinner></Spinner>;

  return (
    <div className="my-14 mt-[130px] max-w-screen-2xl mx-auto">
      <Helmet>
        <title>FitFusion | All Trainers</title>
      </Helmet>
      <SectionTitle 
      title={"All Trainers"} 
      subTitle={
          "Meet our expert trainers at FitFusion—dedicated professionals ready to guide you on your fitness journey!"
        }></SectionTitle>

      {/* Sorting Dropdown */}
      <div className="px-6 mb-8 flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          <option value="default">Sort by Experience</option>
          <option value="experience_asc">Experience: Low to High</option>
          <option value="experience_desc">Experience: High to Low</option>
        </select>
      </div>

      {/* Trainer Cards */}
      <div className="px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedTrainers?.map((trainer) => (
          <TrainerCard key={trainer._id} trainer={trainer} />
        ))}
      </div>
    </div>
  );
};

export default AllTrainer;