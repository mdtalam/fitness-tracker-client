import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaEye } from "react-icons/fa"; // Eye icon
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Spinner from "../../OthersComponent/Spinner";

const ActivityLog = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // Fetch trainers using TanStack Query
  const { data: trainers, error, isLoading } = useQuery({
    queryKey: ["trainers", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/trainers/email/${user?.email}`);
      return data; // Data is a single object
    },
    enabled: !!user?.email, // Ensure query only runs when user email is available
  });

  const handleStatusChange = (email, status) => {
    console.log(`Changing status of ${email} to ${status}`);
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return <div>No logs found.</div>;
  }

  // Ensure trainers is an array for consistency
  const trainerArray = Array.isArray(trainers) ? trainers : [trainers];

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Activity Log</h2>

      <div className="overflow-x-auto">
        {trainerArray.length > 0 ? (
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left text-gray-700">Trainer Name</th>
                <th className="py-2 px-4 text-left text-gray-700">Email</th>
                <th className="py-2 px-4 text-left text-gray-700">Age</th>
                <th className="py-2 px-4 text-left text-gray-700">Status</th>
                <th className="py-2 px-4 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainerArray.map((trainer) => (
                <tr key={trainer._id} className="border-b">
                  <td className="py-4 px-4 text-gray-800 capitalize">{trainer.fullName}</td>
                  <td className="py-4 px-4 text-gray-600">{trainer.email}</td>
                  <td className="py-4 px-4 text-gray-600">{trainer.age}</td>
                  <td className="py-4 px-4 text-yellow-800">{trainer.status}</td>
                  <td className="py-4 px-4 flex items-center space-x-4">
                    <FaEye className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-600 py-4">
            No logs found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
