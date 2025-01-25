import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FaCaretRight,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Spinner from "./Spinner";

const TrainerDetails = () => {
  const { id } = useParams(); // Get the trainer's ID from the URL
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  // Fetch trainer details
  const {
    data: trainer,
    isLoading: trainerLoading,
    error: trainerError,
  } = useQuery({
    queryKey: ["trainer", id],
    queryFn: async () => {
      const { data } = await axiosPublic(`/trainers/${id}`);
      return data;
    },
  });

  // Fetch slots for the trainer
  const {
    data: slots,
    isLoading: slotsLoading,
    error: slotsError,
  } = useQuery({
    queryKey: ["slots", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/slots/${trainer?.email}`);
      return data;
    },
    enabled: !!id, // Only fetch if ID is available
  });


  // Handle loading states
  if (trainerLoading || slotsLoading) return <Spinner></Spinner>;

  // Handle error states
  if (trainerError || slotsError) return <Spinner></Spinner>;

  return (
    <div>
      <div className="flex gap-10 bg-gray-100">
        <div className="w-2/3 mx-2 p-6 bg-white my-14 shadow-md rounded-lg">
          {/* Trainer Info Section */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={trainer?.profileImage}
              alt={trainer?.fullName}
              className="w-96 h-96 object-cover rounded-lg shadow-lg"
            />
            <div>
              <h1 className="text-3xl mb-6 font-bold">{trainer?.fullName}</h1>
              <p className="text-gray-500 mt-2">
                <span className="text-lg font-semibold">Expertise:</span>
              </p>
              <ul className="list-inside list-none space-y-2 text-gray-700">
                {Array.isArray(trainer?.skills) ? (
                  trainer.skills.map((skill, index) => (
                    <li key={index} className="flex items-center">
                      <FaCaretRight className="mr-2" /> {skill}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No skills available</li>
                )}
              </ul>

              {/* Social Media Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Connect with {trainer?.fullName}:
                </h3>
                <div className="flex items-center gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition text-xl"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600 transition text-xl"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-700 transition text-xl"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://linkedin.com/in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 transition text-xl"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4 pt-8">
            <p className="text-gray-700 mt-2">{trainer?.biography}</p>
          </div>
        </div>

        {/* Slot Section */}
        <div className="w-1/3 p-6 bg-white my-14 mx-2 shadow-md rounded-lg">
          <h3 className="text-xl font-bold mb-4">Available Slots</h3>
          {slotsLoading ? (
            <Spinner />
          ) : slots?.slots?.length > 0 ? (
            <ul className="space-y-4">
              {slots.slots.map((slot) => (
                <li
                  key={slot._id}
                  className="p-4 border border-gray-300 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-semibold capitalize">{slot.slotName}</h4>
                    <p className="text-sm text-gray-600">
                      {slot.slotTime} {slot.slotTime == 1 ? "Hour" : "Hours"}
                    </p>
                  </div>
                  <Link
                    to={`/bookedPage/${slot._id}`}
                    className="bg-gradient-to-r from-primary to-secondary text-white font-semibold px-6 py-3 rounded-full shadow-md transform hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
                  >
                    Book Now
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No slots available</p>
          )}
        </div>
      </div>

      {/* Be A Trainer Section */}
      <section
        className="be-a-trainer h-64 py-14 my-14 bg-cover bg-center p-6 rounded-xl shadow-md mt-6 text-center relative"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/7RPX4Tj/karsten-winegeart-0-Wra5-YYVQJE-unsplash.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-3xl font-semibold text-white mb-4">
            Join Our Trainer Community
          </h3>
          <p className="text-lg text-gray-200 mb-4 pb-2">
            Passionate about fitness? Become a part of our team and help others
            achieve their fitness goals.
          </p>
          <Link
            to="/become-a-trainer"
            className="bg-primary text-white px-6 py-4 rounded-lg hover:bg-green-600 transition"
          >
            Become a Trainer
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TrainerDetails;
