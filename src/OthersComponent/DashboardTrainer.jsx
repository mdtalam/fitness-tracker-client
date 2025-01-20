import React from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";

const DashboardTrainer = ({ trainerData}) => {
  console.log(trainerData);


  

  return (
    <div className="my-14">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Applied Trainers</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white border border-gray-300 shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  SN
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Image
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {trainerData.map((trainer, index) => (
                <tr key={trainer._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <img src={trainer.profileImage} alt="Trainer Profile" />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">{trainer.fullName}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{trainer.email}</td>
                  <td className="px-4 py-2 text-sm">
                    <button className="btn">
                      <RiDeleteBin2Fill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardTrainer;
