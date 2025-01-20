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
      <div className="overflow-x-auto">
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
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary">
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
