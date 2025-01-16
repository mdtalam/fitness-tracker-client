import React from "react";
import SectionTitle from "../../../Shared/SectionTitle";
import aboutImg from '../../../assets/about.jpg';

const About = () => {
  return (
    <section className="bg-gray-100 pt-14">
      <SectionTitle
        title={"About Us"}
        subTitle={
          "Empowering You to Achieve Your Fitness Goals with Expertise, Support, and Innovation"
        }
      ></SectionTitle>
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        {/* Left: Image */}
        <div className="w-full h-[500px] md:w-1/2">
          <img
            src={aboutImg}
            alt="About Us"
            className="shadow-lg w-[350px] mx-auto h-full object-cover rounded-tl-[200px] rounded-br-[200px]"
          />
        </div>

        {/* Right: About Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            About FitFusion
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            At FitFusion, we are committed to helping you achieve your fitness
            goals through expert guidance, state-of-the-art equipment, and a
            supportive community. Our mission is to empower individuals to live
            healthier, happier lives by offering tailored fitness programs for
            all levels.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            With certified trainers, dynamic classes, and cutting-edge
            facilities, we ensure every workout is not only effective but also
            enjoyable. Whether you're looking to build strength, improve
            endurance, or simply lead a more active lifestyle, FitFusion is here
            to guide you every step of the way.
          </p>
          <button className="px-6 py-3 bg-primary text-white rounded-md hover:bg-secondary transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
