import { useQuery } from "@tanstack/react-query";
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Tooltip,
} from "chart.js";
import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const Balance = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch payments data
  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/payments");
      return data;
    },
  });

  // Fetch subscribers data
  const { data: subscribers = [], isLoading: subscribersLoading } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/subscriber");
      return data;
    },
  });

  if (paymentsLoading || subscribersLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  // Calculate Total Balance
  const totalBalance = payments.reduce((sum, payment) => sum + payment.price, 0);

  // Get the last six transactions
  const recentTransactions = payments.slice(-6).reverse();

  // Data for the bar chart
  const barChartData = {
    labels: ["Newsletter Subscribers", "Paid Members"],
    datasets: [
      {
        label: "Count",
        data: [subscribers.length, payments.length],
        backgroundColor: ["#4A90E2", "#50E3C2"],
        borderRadius: 10,
        barThickness: 50,
      },
    ],
  };

  // Data for the pie chart
  const pieChartData = {
    labels: ["Newsletter Subscribers", "Paid Members"],
    datasets: [
      {
        data: [subscribers.length, payments.length],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Overview Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Financial Overview</h2>
            <p className="text-lg">
              Total Remaining Balance:{" "}
              <span className="font-semibold">${totalBalance.toFixed(2)}</span>
            </p>
          </div>
          <div className="w-1/3">
            <Pie data={pieChartData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Recent Transactions
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-4 font-semibold text-gray-600">
                    Transaction ID
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Name</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Date</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction, index) => (
                  <tr
                    key={transaction.transactionId}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-3 px-4 text-gray-700">
                      {transaction.transactionId}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{transaction.name}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      ${transaction.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            User Statistics
          </h3>
          <div className="w-full max-w-lg mx-auto">
            <Bar
              data={barChartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
