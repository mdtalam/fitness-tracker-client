import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import "animate.css";
import React, { useEffect, useRef, useState } from "react";
import { BorderBeam } from "../../../components/magicui/border-beam";
import { Lens } from "../../../components/magicui/lens";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionTitle from "../../../Shared/SectionTitle";

const FeaturedClasses = () => {
  const axiosPublic = useAxiosPublic();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Fetch the top 6 featured classes
  const {
    data: featuredClasses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featuredClasses"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/featured-classes");
      return data;
    },
  });

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

  if (isLoading) return <Spinner />;
  if (isError) return <Spinner />;

  return (
    <div className="bg-gray-100 py-14" ref={sectionRef}>
      <div className="container mx-auto md:pl-8">
        <SectionTitle
          title={"Featured Classes"}
          subTitle={
            "FitFusion offers expert-led, dynamic fitness classes for all levels to achieve health goals."
          }
        />
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
        isVisible ? "animate__animated animate__zoomIn" : "opacity-0"
      }`}>
          {featuredClasses.map((classData, index) => (
            <Card
              key={index}
              className="relative max-w-[24rem] overflow-hidden flex flex-col justify-between"
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
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <Lens zoomFactor={2}
          lensSize={150}
          isStatic={false}
          ariaLabel="Zoom Area">
                  <img
                  src={classData.image}
                  alt={classData.className}
                  className="h-48 w-full object-cover"
                />
                </Lens>
                
              </CardHeader>
              <CardBody className="h-[200px] flex flex-col justify-between">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="font-semibold"
                >
                  {classData.className}
                </Typography>
                <Typography
                  variant="lead"
                  color="gray"
                  className="mt-3 font-normal"
                >
                  {classData.details}
                </Typography>
              </CardBody>
              <CardFooter className="flex items-center justify-between">
                <Typography className="font-normal text-gray-700">
                  {classData.bookedCount} Booked
                </Typography>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedClasses;
