import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Shared/SectionTitle";
import TrainerCard from "./AllTrainerComponent/TrainerCard";

const AllTrainer = () => {
  const [trainers, setTrainers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/trainers")
      .then((res) => res.json())
      .then((data) => setTrainers(data));
  }, []);
  console.log(trainers);
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
