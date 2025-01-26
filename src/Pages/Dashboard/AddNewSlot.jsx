import { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AddNewSlot = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [trainerData, setTrainerData] = useState(null);
  const [classes, setClasses] = useState([]);
  const [slotData, setSlotData] = useState({
    slotName: "",
    slotTime: "",
    days: [],
    selectedClasses: [],
    additionalInfo: "",
  });

  // Fetch trainer data and available classes
  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        const response = await axiosSecure.get(
          `/trainers/email/${user?.email}`
        );
        if (response.data) {
          setTrainerData(response.data);
        }
      } catch (error) {
        console.error("Error fetching trainer data:", error);
      }
    };

    const fetchClasses = async () => {
      try {
        const response = await axiosSecure.get("/classes");
        if (response.data) {
          setClasses(response.data);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    if (user?.email) {
      fetchTrainerData();
      fetchClasses();
    }
  }, [user?.email, axiosSecure]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSlotData({ ...slotData, [name]: value });
  };

  // Handle changes for days and classes
  const handleDaysChange = (selectedDays) => {
    setSlotData({ ...slotData, days: selectedDays });
  };

  const handleClassesChange = (selectedClasses) => {
    setSlotData({ ...slotData, selectedClasses });
  };

  // Submit new slot data
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedSlotData = {
      ...slotData,
      days: slotData.days.map((day) => day.value), // Map the selected days to just values
      selectedClasses: slotData.selectedClasses.map((cls) => cls.value), // Only send the class IDs
      trainerName: trainerData.fullName,
      trainerEmail: trainerData.email,
      trainerProfileImage: trainerData.profileImage, // Add the profile image
      trainerId: trainerData._id, // Add the trainer's ID
    };
  
    // console.log("Slot Data to Submit:", updatedSlotData); // Log the data before sending
  
    try {
      const response = await axiosSecure.post("/slots", updatedSlotData);
      if (response.data.success) {
        Swal.fire("Slot Added Successfully!", "", "success");
        setSlotData({
          slotName: "",
          slotTime: "",
          days: [],
          selectedClasses: [],
          additionalInfo: "",
        });
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      Swal.fire("Failed to add slot. Please try again.", "", "error");
    }
  };
  
  

  if (!trainerData) return <p>Loading trainer data...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 my-14 bg-white text-secondary rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Add New Slot
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Trainer Info */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Full Name</label>
          <input
            type="text"
            value={trainerData.fullName || ""}
            readOnly
            className="w-full border border-secondary p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Email</label>
          <input
            type="email"
            value={trainerData.email || ""}
            readOnly
            className="w-full border border-secondary p-2 rounded bg-gray-200"
          />
        </div>

        {/* Skills */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Skills</label>
          <textarea
            value={trainerData.skills?.join(", ") || ""}
            readOnly
            className="w-full border border-secondary p-2 rounded bg-gray-200 h-24 resize-none"
          />
        </div>

        {/* Available Days */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Available Days</label>
          <div className="w-full border border-secondary p-2 rounded bg-gray-200">
            {trainerData?.availableDays?.map((day, index) => (
              <span key={index}>
                {day.label}
                {index < trainerData.availableDays.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </div>

        {/* Available Time */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Available Time</label>
          <div className="w-full border border-secondary p-2 rounded bg-gray-200">
            {Array.isArray(trainerData?.availableTime) &&
            trainerData.availableTime.length > 0 ? (
              trainerData.availableTime.map((time, index) => (
                <span key={index}>
                  {time}
                  {index < trainerData.availableTime.length - 1 ? ", " : ""}
                </span>
              ))
            ) : (
              <span>No available times specified</span>
            )}
          </div>
        </div>

        {/* Slot Name */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Slot Name *</label>
          <input
            type="text"
            name="slotName"
            value={slotData.slotName}
            onChange={handleInputChange}
            required
            className="w-full border border-secondary p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Slot Time */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Slot Time *</label>
          <input
            type="text"
            name="slotTime"
            value={slotData.slotTime}
            onChange={handleInputChange}
            required
            placeholder="e.g., 1 Hour"
            className="w-full border border-secondary p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Available Days */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Available Days *</label>
          <Select
            isMulti
            options={trainerData?.availableDays?.map((day) => ({
              value: day.value,
              label: day.label,
            }))}
            value={slotData.days}
            onChange={handleDaysChange}
            className="w-full"
          />
        </div>

        {/* Classes Include */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Classes Include *</label>
          <Select
            isMulti
            options={classes.map((cls) => ({
              value: cls._id,
              label: cls.className,
              ...cls, // Include full class data
            }))}
            value={slotData.selectedClasses}
            onChange={handleClassesChange}
            className="w-full"
          />
        </div>

        {/* Additional Info */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Additional Info</label>
          <textarea
            name="additionalInfo"
            value={slotData.additionalInfo}
            onChange={handleInputChange}
            className="w-full border border-secondary p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition"
        >
          Add Slot
        </button>
      </form>
    </div>
  );
};

export default AddNewSlot;
