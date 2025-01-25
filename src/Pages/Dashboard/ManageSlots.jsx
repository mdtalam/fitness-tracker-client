import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageSlots = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch all slots for the trainer
  const {
    data: slots = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["slots", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/slots/${user?.email}`);
      return data.slots || [];
    },
    enabled: !!user?.email, // Only fetch if the user email is provided
  });

  const handleDelete = async (slotId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/slots/${slotId}`);
          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Slot has been deleted successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
            refetch(); // Refetch the slots list to update the UI
          }
        } catch (error) {
          console.error("Error deleting slot:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the slot. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading slots...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Manage Slots</h2>
        {slots.length === 0 ? (
          <p className="text-lg text-gray-700">No slots available.</p>
        ) : (
          <div className="bg-white shadow rounded-lg p-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-4 font-semibold text-gray-600">Slot Name</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Date</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Time</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot, index) => (
                  <tr
                    key={slot._id}
                    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td className="py-3 px-4 text-gray-700">{slot.slotName}</td>
                    <td className="py-3 px-4 text-gray-700">{slot.days[0]}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {slot.slotTime} {slot?.slotTime === "1" ? "Hour" : "Hours"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {slot.booked ? `Booked by ${slot.bookedBy}` : "Available"}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
                        onClick={() => handleDelete(slot._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSlots;
