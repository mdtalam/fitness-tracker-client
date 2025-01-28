import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2"; // Import SweetAlert
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Spinner from "../../OthersComponent/Spinner";

const BookedTrainer = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [trainerDetails, setTrainerDetails] = useState(null);
  const [classDetails, setClassDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    feedback: "",
    rating: 0,
  });

  const fetchTrainerDetails = async () => {
    try {
      const response = await axiosSecure.get("/payments");
      const trainer = response.data.find(
        (payment) => payment.email === user?.email // Filter logged-in user
      );
      setTrainerDetails(trainer);

      // Fetch class details if slotClass is available
      if (trainer?.slotClass) {
        const classResponse = await axiosSecure.get(`/class/${trainer.slotClass}`);
        setClassDetails(classResponse.data);
      }
    } catch (error) {
      console.error("Error fetching trainer or class details", error);
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const reviewPayload = {
        trainerEmail: trainerDetails?.trainerEmail,
        trainerName: trainerDetails?.trainerName,
        feedback: reviewData.feedback,
        rating: reviewData.rating,
        userEmail: user?.email,
        userName: user?.displayName,
        userProfileImage: user?.photoURL,
      };

      // Submit the review
      await axiosSecure.post("/reviews", reviewPayload);

      // Reset the modal and form
      setShowModal(false);
      setReviewData({ feedback: "", rating: 0 });

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Review Submitted",
        text: "Your review has been submitted successfully!",
      });
    } catch (error) {
      // Handle error when the user has already submitted a review
      if (error.response?.status === 400) {
        Swal.fire({
          icon: "warning",
          title: "Duplicate Review",
          text: "You have already submitted a review for this trainer.",
        });
      } else {
        console.error("Error submitting review", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Please try again later.",
        });
      }
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchTrainerDetails();
    }
  }, [loading]);

  // Star rating component
  const StarRating = ({ rating, onChange }) => {
    const handleStarClick = (index) => {
      onChange(index + 1); // 1-based index for star rating
    };

    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            fill={index < rating ? "gold" : "none"}
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-6 h-6 cursor-pointer"
            viewBox="0 0 24 24"
            onClick={() => handleStarClick(index)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 17.27l6.18 3.73-4.68-7.73 6.5-.27L12 3l-2.18 10.27-6.5.27 4.68 7.73L12 17.27z"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Helmet>
        <title>Dashboard | Booked Trainer</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">Booked Trainer Details</h1>
      {trainerDetails ? (
        <div className="shadow-lg mb-4 p-4 rounded-lg bg-white">
          <h2 className="text-xl font-semibold">Trainer Info</h2>
          <p>Name: {trainerDetails.trainerName}</p>
          <p>Email: {trainerDetails.trainerEmail}</p>
          <hr className="my-2" />

          <h2 className="text-xl font-semibold">Classes Info</h2>
          {classDetails ? (
            <>
              <p>Class Name: {classDetails.className || "Unavailable"}</p>
              <p>Description: {classDetails.description || "Unavailable"}</p>
            </>
          ) : (
            <Spinner></Spinner>
          )}
          <hr className="my-2" />

          <h2 className="text-xl font-semibold">Slot Info</h2>
          <p>Slot Day: {trainerDetails.slotDay.join(", ")}</p>
          <p>Slot Name: {trainerDetails.slotName}</p>
          <p>Slot Time: {trainerDetails.slotTime} hour(s)</p>
          <hr className="my-2" />

          <h2 className="text-xl font-semibold">Other Info</h2>
          <p>Price: ${trainerDetails.price}</p>
          <p>Date: {new Date(trainerDetails.date).toLocaleDateString()}</p>

          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowModal(true)}
          >
            Leave a Review
          </button>
        </div>
      ) : (
        <p>There is no booking info</p>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Write your feedback here..."
              value={reviewData.feedback}
              onChange={(e) =>
                setReviewData({ ...reviewData, feedback: e.target.value })
              }
            />
            <StarRating
              rating={reviewData.rating}
              onChange={(rating) => setReviewData({ ...reviewData, rating })}
            />
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleReviewSubmit}
            >
              Submit Review
            </button>
            <button
              className="mt-2 text-gray-500 hover:underline"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedTrainer;
