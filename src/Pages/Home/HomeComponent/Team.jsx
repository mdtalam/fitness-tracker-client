import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import SectionTitle from "../../../Shared/SectionTitle";

const Team = () => {
  const trainers = [
    {
      name: "John Doe",
      bio: "John is a certified personal trainer with over 10 years of experience in fitness and nutrition.",
      expertise: "Strength Training, Cardio, Nutrition",
      image: "https://i.ibb.co.com/mSYygKL/testi-img1.jpg",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Jane Smith",
      bio: "Jane specializes in yoga and mental wellness, helping clients achieve balance and flexibility.",
      expertise: "Yoga, Meditation, Mindfulness",
      image: "https://i.ibb.co.com/9wZBPpQ/ai-generative-happy-business-man.jpg",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Michael Johnson",
      bio: "Michael focuses on high-intensity workouts and sports-specific training for athletes.",
      expertise: "HIIT, Sports Training, Endurance",
      image: "https://i.ibb.co.com/RzW1tPN/8f02334a-307d-4bed-811a-594474d3.jpg",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <SectionTitle title={"Meet Our Trainers"} subTitle={"Our team of expert trainers is here to help you achieve your fitness goals."}></SectionTitle>
        </div>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-center">
                    <h4 className="text-white text-xl font-semibold mb-2">
                      {trainer.name}
                    </h4>
                    <div className="flex justify-center space-x-4 mt-4">
                      {trainer.social.facebook && (
                        <a
                          href={trainer.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-2xl hover:text-primary transition"
                        >
                          <FaFacebook />
                        </a>
                      )}
                      {trainer.social.twitter && (
                        <a
                          href={trainer.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-2xl hover:text-primary transition"
                        >
                          <FaTwitter />
                        </a>
                      )}
                      {trainer.social.instagram && (
                        <a
                          href={trainer.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-2xl hover:text-primary transition"
                        >
                          <FaInstagram />
                        </a>
                      )}
                      {trainer.social.linkedin && (
                        <a
                          href={trainer.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-2xl hover:text-primary transition"
                        >
                          <FaLinkedin />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {trainer.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{trainer.bio}</p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">Expertise:</span>{" "}
                  {trainer.expertise}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
