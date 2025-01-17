import React, { useEffect, useRef } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "../../../Shared/SectionTitle";

const Testimonials = () => {
  const swiperRef = useRef(null);

  const reviews = [
    {
      name: "Daniel Berg",
      position: "Founder, Some Company",
      image: "https://via.placeholder.com/100",
      text: "Cras sit amet urna lorem accumsan facilisis. Donec enim quam, venenatis eget purus eget, tempus pulvinar turpis.",
    },
    {
      name: "Anna Smith",
      position: "CEO, Creative Agency",
      image: "https://via.placeholder.com/100",
      text: "Proin quis sapien in metus congue dapibus eu facilisis erat. Integer ut justo commodo, feugiat justo nec, suscipit justo.",
    },
    {
      name: "Michael Doe",
      position: "Manager, TechCorp",
      image: "https://via.placeholder.com/100",
      text: "Suspendisse sollicitudin enim eu justo commodo, dapibus vel facilisis libero placerat. Ut tincidunt tincidunt erat.",
    },
    {
      name: "Michael Doe",
      position: "Manager, TechCorp",
      image: "https://via.placeholder.com/100",
      text: "Suspendisse sollicitudin enim eu justo commodo, dapibus vel facilisis libero placerat. Ut tincidunt tincidunt erat.",
    },
    {
      name: "Michael Doe",
      position: "Manager, TechCorp",
      image: "https://via.placeholder.com/100",
      text: "Suspendisse sollicitudin enim eu justo commodo, dapibus vel facilisis libero placerat. Ut tincidunt tincidunt erat.",
    },
    {
      name: "Michael Doe",
      position: "Manager, TechCorp",
      image: "https://via.placeholder.com/100",
      text: "Suspendisse sollicitudin enim eu justo commodo, dapibus vel facilisis libero placerat. Ut tincidunt tincidunt erat.",
    },
    // Add more reviews as needed
  ];

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, []);

  return (
    <div className="bg-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <SectionTitle title={"Don’t just take our word for it"} subTitle={" Witness it first hand, directly from our lovely customers."}></SectionTitle>
        </div>
        {/* Swiper with autoplay and custom navigation */}
        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000, // Autoplay every 3 seconds
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 max-w-md">
                  <FaQuoteLeft className="text-4xl text-primary mb-4" />
                  <p className="mb-4">{review.text}</p>
                  <div className="flex items-center">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold">{review.name}</h4>
                      <p className="text-sm text-gray-600">{review.position}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Navigation buttons at the bottom */}
          <div className="flex justify-center mt-6 space-x-4">
            <button className="swiper-button-prev text-white text-2xl">
              <BsArrowLeftCircle />
            </button>
            <button className="swiper-button-next text-white text-2xl">
              <BsArrowRightCircle />
            </button>
          </div>
        </div>
        {/* <div className="text-center mt-8">
          <button className="text-white underline">See All Reviews</button>
        </div> */}
      </div>
    </div>
  );
};

export default Testimonials;
