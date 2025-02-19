import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import SectionTitle from '../../Shared/SectionTitle';

const AppliedTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const { data: trainers, error, isLoading } = useQuery({
    queryKey: ['appliedTrainers'],
    queryFn: async () => {
      const response = await axiosSecure.get('/appliedTrainings');
      return response.data;
    }
  });

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4">Error fetching trainers</div>;

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Dashboard | Applied Trainers</title>
      </Helmet>
      <SectionTitle title={"Applied Trainers"} />
      
      {/* Mobile View: Cards Layout */}
      <div className="block sm:hidden">
        {trainers.map((trainer) => (
          <div key={trainer._id} className="bg-white shadow-md p-4 mb-4 rounded-lg border border-gray-300">
            <p className="font-semibold text-gray-700">Name: {trainer.fullName}</p>
            <p className="text-gray-600">Email: {trainer.email}</p>
            <p className="text-gray-600">Status: {trainer.status}</p>
            <Link to={`/dashboard/trainer-details/${trainer._id}`}>
              <button className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Tablet and Desktop View: Table Layout */}
      <div className="overflow-x-auto hidden sm:block">
        <table className="min-w-full table-auto bg-white border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">{trainer.fullName}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{trainer.email}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{trainer.status}</td>
                <td className="px-4 py-2 text-sm">
                  <Link to={`/dashboard/trainer-details/${trainer._id}`} className="text-blue-500 hover:text-blue-700">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary hover:text-primary">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedTrainer;
