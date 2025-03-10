
import React from "react";
import {
  FaAward,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaDumbbell,
  FaHeartbeat,
  FaRunning,
  FaSpa,
  FaUsers,
} from "react-icons/fa";
import SectionTitle from "../../../Shared/SectionTitle";
import { BorderBeam } from "../../../components/magicui/border-beam";

const Featured = () => {
  const features = [
    {
      icon: <FaDumbbell size={40} className="text-primary" />,
      title: "State-of-the-Art Equipment",
      description:
        "Train with top-quality gym equipment designed for all fitness levels.",
    },
    {
      icon: <FaUsers size={40} className="text-primary" />,
      title: "Community Support",
      description:
        "Join a supportive fitness community and reach your goals together.",
    },
    {
      icon: <FaChalkboardTeacher size={40} className="text-primary" />,
      title: "Expert Trainers",
      description:
        "Learn from certified trainers who are passionate about your success.",
    },
    {
      icon: <FaRunning size={40} className="text-primary" />,
      title: "Dynamic Classes",
      description:
        "Choose from a variety of engaging classes that fit your schedule.",
    },
    {
      icon: <FaHeartbeat size={40} className="text-primary" />,
      title: "Personalized Plans",
      description:
        "Get a customized fitness and nutrition plan tailored to your needs.",
    },
    {
      icon: <FaCalendarAlt size={40} className="text-primary" />,
      title: "Flexible Scheduling",
      description:
        "Easily book your classes and sessions to match your busy lifestyle.",
    },
    {
      icon: <FaAward size={40} className="text-primary" />,
      title: "Proven Results",
      description:
        "Join thousands of satisfied members who have achieved their goals.",
    },
    {
      icon: <FaSpa size={40} className="text-primary" />,
      title: "Relaxation Zone",
      description:
        "Unwind with our spa services and recovery options after workouts.",
    },
  ];

  return (
    <div className="bg-gray-100 pt-14">
      <div className="container mx-auto px-4">
        {/* 🔹 Section Title */}
        <SectionTitle
          title={"Why Choose Us"}
          subTitle={
            "Discover the Perfect Blend of Expertise, Community, and Innovation for Your Fitness Journey"
          }
        />

        {/* 🔹 Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 h-full items-stretch">
          {features.map((feature, index) => (
            <div key={index} className="relative overflow-hidden h-full flex rounded-md">
              {/* 🔹 Border Effects */}
              <BorderBeam
                duration={6}
                size={400}
                className="from-transparent via-red-500 to-transparent"
              />
              <BorderBeam
                duration={6}
                delay={3}
                size={400}
                className="from-transparent via-[#5D8736] to-transparent"
              />

              {/* 🔹 Feature Card */}
              <div className="p-6 bg-white rounded-lg text-center shadow-lg transition-shadow duration-300 flex flex-col justify-between h-full min-h-[250px]">
                <div className="flex justify-center items-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
