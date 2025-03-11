import "animate.css";
import React, { useEffect, useRef, useState } from "react";
import SectionTitle from "../../../Shared/SectionTitle";
import aboutImg from "../../../assets/about.jpg";
import { ShimmerButton } from "../../../components/magicui/shimmer-button";

const About = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(false); // Remove animation class
            setTimeout(() => {
              setIsVisible(true); // Reapply animation class
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
    <section className="bg-gray-100 pt-14" ref={sectionRef}>
      <SectionTitle
        title={"About Us"}
        subTitle={
          "Empowering You to Achieve Your Fitness Goals with Expertise, Support, and Innovation"
        }
      ></SectionTitle>
      <div
        className={`container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 bg-gray-100 pt-14 transition-all duration-700 ${
          isVisible ? "animate__animated animate__zoomIn" : "opacity-0"
        }`}
      >
        {/* Left: Image */}
        <div className="w-full h-[500px] md:w-1/2">
          <img
            src={aboutImg}
            alt="About Us"
            className="shadow-lg w-[350px] mx-auto h-full object-cover rounded-tl-[200px] rounded-br-[200px]"
          />
        </div>

        {/* Right: About Content */}
        <div className="w-full md:w-2/3 pr-20 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            About FitFusion
          </h2>
          <p className="text-lg text-justify text-gray-600 mb-4">
            At FitFusion, we are committed to helping you achieve your fitness
            goals through expert guidance, state-of-the-art equipment, and a
            supportive community. Our mission is to empower individuals to live
            healthier, happier lives by offering tailored fitness programs for
            all levels.
          </p>
          <p className="text-lg text-justify text-gray-600 mb-4">
            With certified trainers, dynamic classes, and cutting-edge
            facilities, we ensure every workout is not only effective but also
            enjoyable. Whether you're looking to build strength, improve
            endurance, or simply lead a more active lifestyle, FitFusion is here
            to guide you every step of the way.
          </p>
          <ShimmerButton className="px-6 py-3 bg-primary text-white rounded-md transition">
            <button className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Learn More
            </button>
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
};

export default About;
