import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet-async";
import { RiDeleteBin2Fill } from "react-icons/ri";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Spinner from "../../OthersComponent/Spinner";
import SectionTitle from "../../Shared/SectionTitle";

const Subscribers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: subscribers, isLoading, refetch } = useQuery({
    queryKey: ['subscriber'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/subscriber');
      return data;
    },
  });

  console.log(subscribers);
  if (isLoading) return <Spinner />;

  const handleDelete = (subscriberId) => {
    // Add your delete logic here, like calling an API to delete the subscriber
    console.log(`Delete subscriber with id: ${subscriberId}`);
    refetch();
  };

  return (
    <div className="my-14 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Dashboard | Subscribers</title>
      </Helmet>
      <SectionTitle title={"All Subscribers"} />
      <p className="text-center font-bold text-lg mb-4">
        Total Subscribers: {subscribers.length}
      </p>

      {/* Mobile and Tablet View: Card Layout */}
      <div className="block sm:hidden">
        {subscribers?.map((subscriber, index) => (
          <div
            key={subscriber._id}
            className="bg-white shadow-md p-4 mb-4 rounded-lg border border-gray-300"
          >
            <p className="font-semibold text-gray-700">Subscriber {index + 1}</p>
            <p className="text-gray-600">Name: {subscriber?.name}</p>
            <p className="text-gray-600">Email: {subscriber?.email}</p>
            <button
              onClick={() => handleDelete(subscriber._id)}
              className="text-red-500 hover:text-red-700 mt-2"
            >
              <RiDeleteBin2Fill />
            </button>
          </div>
        ))}
      </div>

      {/* Tablet and Desktop View: Table Layout */}
      <div className="overflow-x-auto hidden sm:block">
        <table className="min-w-full table-auto bg-white border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">#</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {subscribers?.map((subscriber, index) => (
              <tr key={subscriber._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{subscriber?.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{subscriber?.email}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <button
                    onClick={() => handleDelete(subscriber._id)}
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

export default Subscribers;
