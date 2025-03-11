import "animate.css";
import React, { useEffect, useRef, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionTitle from "../../../Shared/SectionTitle";
import { BorderBeam } from "../../../components/magicui/border-beam";
import { Lens } from "../../../components/magicui/lens";

const Team = () => {
  const axiosPublic = useAxiosPublic();
  const [trainers, setTrainers] = useState([]);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const { data } = await axiosPublic.get("/trainers");
        setTrainers(data.slice(0, 3)); // Limit to three trainers
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, [axiosPublic]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(false); // Reset animation
            setTimeout(() => {
              setIsVisible(true); // Trigger animation again
            }, 100);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return (
    <div className="container mx-auto px-4 py-8" ref={sectionRef}>
      <SectionTitle
        title={"Meet Our Trainers"}
        subTitle={
          "Meet our expert trainers at FitFusion—dedicated professionals ready to guide you on your fitness journey!"
        }
      />
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${
          isVisible ? "animate__animated animate__zoomIn" : "opacity-0"
        }`}
      >
        {trainers?.map((trainer) => (
          <div
            key={trainer._id}
            className="relative overflow-hidden bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
          >
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
            <Lens
              zoomFactor={2}
              lensSize={150}
              isStatic={false}
              ariaLabel="Zoom Area"
            >
              <img
                src={trainer.profileImage}
                alt={trainer.fullName}
                className="w-full h-60 rounded-md object-cover mb-4"
              />
            </Lens>
            <h3 className="text-xl font-semibold">{trainer.fullName}</h3>
            <p className="text-gray-600 text-sm text-center mt-2 mb-4">
              {trainer.biography}
            </p>
            <div>
              <h4 className="text-lg font-medium">Areas of Expertise:</h4>
              <ul className="list-disc list-inside mt-2">
                {trainer?.skills?.map((area, index) => (
                  <li key={index} className="text-gray-700 text-sm">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
