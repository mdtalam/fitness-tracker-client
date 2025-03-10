import React from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ShimmerButton } from "../../../components/magicui/shimmer-button";

const Slider = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="h-[60vh] md:h-[70vh] lg:h-[80vh]"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center flex flex-col justify-center items-center text-center text-white px-4 sm:px-8"
            style={{
              backgroundImage: `url('https://i.ibb.co/LZzFLg6/slider1.jpg')`,
            }}
          >
            <div className="bg-black bg-opacity-30 p-6 sm:p-12 lg:p-16 rounded-lg">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Achieve Your Fitness Goals
              </h1>
              <p className="text-sm sm:text-base lg:text-lg mb-6">
                Join our expert-led classes and start your journey toward a
                healthier you.
              </p>

              <div className="flex justify-center">
                <ShimmerButton className="px-4 py-2 sm:px-6 sm:py-3 bg-primary text-white rounded-md hover:bg-secondary hover:text-primary transition">
                  <Link
                    className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg"
                    to="/all-classes"
                  >
                    Explore Classes
                  </Link>
                </ShimmerButton>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center flex flex-col justify-center items-center text-center text-white px-4 sm:px-8"
            style={{
              backgroundImage: `url('https://i.ibb.co/Zf0WPwL/slider2.jpg')`,
            }}
          >
            <div className="bg-black bg-opacity-30 p-6 sm:p-12 lg:p-16 rounded-lg">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Transform Your Body and Mind
              </h1>
              <p className="text-sm sm:text-base lg:text-lg mb-6">
                Discover the perfect class for your fitness level and goals.
              </p>
              <div className="flex justify-center">
                <ShimmerButton className="px-4 py-2 sm:px-6 sm:py-3 bg-primary text-white rounded-md hover:bg-secondary hover:text-primary transition">
                  <Link
                    className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg"
                    to="/all-classes"
                  >
                    View Classes
                  </Link>
                </ShimmerButton>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center flex flex-col justify-center items-center text-center text-white px-4 sm:px-8"
            style={{
              backgroundImage: `url('https://i.ibb.co/yFfLQC5/slider3.jpg')`,
            }}
          >
            <div className="bg-black bg-opacity-30 p-6 sm:p-12 lg:p-16 rounded-lg">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Join the FitFusion Community
              </h1>
              <p className="text-sm sm:text-base lg:text-lg mb-6">
                Train with top-notch trainers and become a part of a thriving
                fitness family.
              </p>
              <div className="flex justify-center">
                <ShimmerButton className="px-4 py-2 sm:px-6 sm:py-3 bg-primary text-white rounded-md hover:bg-secondary hover:text-primary transition">
                  <Link
                    className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg"
                    to="/all-classes"
                  >
                    Explore Classes
                  </Link>
                </ShimmerButton>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
