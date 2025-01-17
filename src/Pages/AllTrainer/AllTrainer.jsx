import React, { useEffect, useState } from 'react';
import TrainerCard from './AllTrainerComponenet/TrainerCard';

const AllTrainer = () => {
    const [trainers,setTrainers] = useState([]);
    useEffect(()=>{
        fetch('trainerData.json')
        .then(res=>res.json())
        .then(data=> setTrainers(data))
    },[])
    console.log(trainers)
    return (
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <TrainerCard key={trainer._id} trainer={trainer} />
        ))}
      </div>
    );
};

export default AllTrainer;