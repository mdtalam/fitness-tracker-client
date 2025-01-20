import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet-async";
import { RiDeleteBin2Fill } from "react-icons/ri";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Spinner from "../../OthersComponent/Spinner";
import SectionTitle from "../../Shared/SectionTitle";

const Trainer = () => {
  const axiosSecure = useAxiosSecure();
  const { data: trainers, isLoading } = useQuery({
    queryKey: ['trainers'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/trainers');
      return data;
    },
  });

  console.log(trainers);
  if (isLoading) return <Spinner />;

  const handleDelete = (trainerId) => {
    // Add your delete logic here, like calling an API to delete the trainer
    console.log(`Delete trainer with id: ${trainerId}`);
  };

  return (
    <div className="my-14">
      <Helmet>
        <title>Dashboard | All Trainers</title>
      </Helmet>
      <SectionTitle title={"All Trainers"} />
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">#</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Profile Image</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {trainers?.map((trainer, index) => (
              <tr key={trainer._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <img
                    src={trainer.profileImage}
                    alt={`${trainer.fullName}'s profile`}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{trainer.fullName}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{trainer.email}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <button
                    onClick={() => handleDelete(trainer._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <RiDeleteBin2Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trainer;
