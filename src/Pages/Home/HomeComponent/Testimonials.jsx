import React, { useEffect, useRef, useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionTitle from "../../../Shared/SectionTitle";

const Testimonials = () => {
  const swiperRef = useRef(null);
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosPublic.get("/reviews");
        setReviews(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    };
    fetchReviews();
  }, [axiosPublic]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  return (
    <div className="bg-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <SectionTitle
            title={"Don’t just take our word for it"}
            subTitle={
              " Witness it first hand, directly from our lovely customers."
            }
          ></SectionTitle>
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
                <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 h-[250px] max-w-md flex flex-col">
                  <FaQuoteLeft className="text-4xl text-primary mb-4" />
                  <div className="flex-1 overflow-hidden">
                    <p className="mb-4 text-ellipsis overflow-hidden whitespace-nowrap">
                      "{review.feedback}"
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={review.userProfileImage || "/default-profile.png"}
                        alt={review.userName}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-bold">{review.userName}</h4>
                        <p className="text-sm text-gray-600">
                          {review.userEmail}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-lg mr-2">★</span>
                      <p className="text-gray-600">{review.rating}/5</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Navigation buttons at the bottom */}
          <div className="hidden md:block">
            <div className="flex justify-center mt-6 space-x-4">
              <button className="swiper-button-prev text-white text-2xl">
                <BsArrowLeftCircle />
              </button>
              <button className="swiper-button-next text-white text-2xl">
                <BsArrowRightCircle />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
