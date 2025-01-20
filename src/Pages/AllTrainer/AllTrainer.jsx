import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Spinner from "../../OthersComponent/Spinner";
import SectionTitle from "../../Shared/SectionTitle";
import TrainerCard from "./AllTrainerComponent/TrainerCard";

const AllTrainer = () => {
    const axiosPublic = useAxiosPublic();
    const {data: trainers, isLoading} = useQuery({
        queryKey: ['trainers'],
        queryFn: async () =>{
            const {data} = await axiosPublic.get('/trainers');
            return data
        }
    })
    if(isLoading) return <Spinner></Spinner>

  return (
    <div className="my-14">
      <Helmet>
        <title>FitFusion | All Trainers</title>
      </Helmet>
      <SectionTitle title={"All Trainers"}></SectionTitle>
      <div className="px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.map((trainer) => (
          <TrainerCard key={trainer._id} trainer={trainer} />
        ))}
      </div>
    </div>
  );
};

export default AllTrainer;
