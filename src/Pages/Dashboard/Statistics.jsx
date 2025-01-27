import { useQuery } from "@tanstack/react-query";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useRole from "../../Hooks/useRole";
import Spinner from "../../OthersComponent/Spinner";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Statistics = () => {
  const [role, isLoading] = useRole();
  const axiosSecure = useAxiosSecure();
  const [statistics, setStatistics] = useState({
    totalSlots: 0,
    totalBookedSlots: 0,
    totalTrainers: 0,
    totalMembers: 0,
  });

  const { data, isLoading: reLoading, error } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const response = await axiosSecure.get("/dashboard/stats"); // Adjust the endpoint as needed
      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      setStatistics(data);
    }
  }, [data]);

  if (reLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error fetching statistics: {error.message}</p>
      </div>
    );
  }

  if (isLoading) return <Spinner />;
  if (role === "trainer") return <Navigate to="/dashboard/manageSlots" />;
  if (role === "member") return <Navigate to="/dashboard/activityLog" />;

  const chartData = {
    labels: ['Total Slots', 'Total Booked Slots', 'Total Trainers', 'Total Members'],
    datasets: [
      {
        label: 'Statistics',
        data: [statistics.totalSlots, statistics.totalBookedSlots, statistics.totalTrainers, statistics.totalMembers],
        backgroundColor: ['#4A148C', '#FF7043', '#81C784', '#0ff5da'],
        borderColor: ['#4A148C', '#FF7043', '#81C784', '#0ff5da'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(statistics.totalSlots, statistics.totalBookedSlots, statistics.totalTrainers, statistics.totalMembers) + 10,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Helmet>
        <title>Dashboard | Statistics</title>
      </Helmet>
      {role === "admin" && (
        <>
          <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Dashboard Statistics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-700">Total Slots</h3>
                  <p className="text-3xl font-bold text-gray-900">{statistics.totalSlots}</p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-700">Total Booked Slots</h3>
                  <p className="text-3xl font-bold text-gray-900">{statistics.totalBookedSlots}</p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-700">Total Trainers</h3>
                  <p className="text-3xl font-bold text-gray-900">{statistics.totalTrainers}</p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-700">Total Members</h3>
                  <p className="text-3xl font-bold text-gray-900">{statistics.totalMembers}</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">Statistics Chart</h3>
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;
