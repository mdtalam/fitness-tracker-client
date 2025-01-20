import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet-async";
import { RiDeleteBin2Fill } from "react-icons/ri";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Spinner from "../../OthersComponent/Spinner";
import SectionTitle from "../../Shared/SectionTitle";

const Trainer = () => {
  const axiosSecure = useAxiosSecure();
  const { data: trainers, isLoading, refetch } = useQuery({
    queryKey: ['trainers'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/trainers');
      return data;
    },
  });

  if (isLoading) return <Spinner />;

  const handleDelete = async (trainerId, trainerEmail) => {
    try {
      // 1. Delete the trainer from the Trainer API
      const trainerDeleteResponse = await axiosSecure.delete(`/trainers/${trainerId}`);
      console.log("Trainer deleted from Trainer API", trainerDeleteResponse.data);

      // 2. Update the trainer's role to "Member" in the User API (using email)
      const userRoleUpdateResponse = await axiosSecure.patch('/users', {
        email: trainerEmail,
        role: 'Member', // changing the role to "Member"
      });
      console.log("Trainer role updated to Member in User API", userRoleUpdateResponse.data);

      // 3. Refetch the trainers list to ensure the UI is updated
      refetch();

      // Optionally, show feedback
      alert("Trainer deleted and role updated successfully!");

    } catch (error) {
      console.error("Error deleting trainer or updating role:", error);
      alert("Failed to delete trainer or update role. Please try again.");
    }
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
                    onClick={() => handleDelete(trainer._id, trainer.email)}
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
