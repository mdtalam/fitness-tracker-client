import { Spinner } from "@material-tailwind/react";
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from "chart.js";
import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import useRole from "../../Hooks/useRole";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Statistics = () => {
  const [role, isLoading] = useRole();
  // Sample Data
  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Registrations",
        data: [50, 100, 150, 200, 250, 300],
        borderColor: "#16978E",
        backgroundColor: "rgba(22, 151, 142, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [3000, 5000, 7000, 9000, 11000, 13000],
        backgroundColor: [
          "#4A148C",
          "#FF7043",
          "#FFA270",
          "#81C784",
          "#D32F2F",
          "#16978E",
        ],
      },
    ],
  };

  const workoutData = {
    labels: ["Yoga", "HIIT", "Cardio", "Strength", "Pilates"],
    datasets: [
      {
        data: [30, 20, 25, 15, 10],
        backgroundColor: [
          "#FF7043",
          "#4A148C",
          "#81C784",
          "#16978E",
          "#D32F2F",
        ],
        borderWidth: 0,
      },
    ],
  };

  if (isLoading) return <Spinner></Spinner>;
  if (role === "trainer")
    return <Navigate to="/dashboard/manageSlots"></Navigate>;
  if (role === "member")
    return <Navigate to="/dashboard/activityLog"></Navigate>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Helmet>
        <title>FitFusion | Dashboard Statistics</title>
      </Helmet>
      {role === "admin" && (
        <>
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-8 text-center">
              Dashboard Statistics
            </h1>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-600">
                  Total Users
                </h3>
                <p className="text-3xl font-bold text-primary">1,245</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-600">
                  Active Members
                </h3>
                <p className="text-3xl font-bold text-green-500">875</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-600">
                  Monthly Revenue
                </h3>
                <p className="text-3xl font-bold text-purple-500">$12,500</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-600">
                  Workouts Completed
                </h3>
                <p className="text-3xl font-bold text-orange-500">4,320</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* User Growth Chart */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  User Growth
                </h2>
                <Line data={userGrowthData} />
              </div>

              {/* Revenue Chart */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Monthly Revenue
                </h2>
                <Bar data={revenueData} />
              </div>

              {/* Workout Distribution Chart */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Workout Distribution
                </h2>
                <Doughnut data={workoutData} />
              </div>

              {/* Custom Placeholder Chart */}
              <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-center">
                <h2 className="text-xl font-medium text-gray-500">
                  More Insights Coming Soon...
                </h2>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;
