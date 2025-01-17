import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import ReactStars from "react-rating-stars-component";

const FeaturedClasses = () => {
  const classes = [
    {
      title: "Yoga for Beginners",
      description: "A relaxing and gentle yoga class for those new to yoga.",
      bookings: 200,
      rating: 4.5,
    },
    {
      title: "HIIT Training",
      description: "An intense workout combining cardio and strength training.",
      bookings: 350,
      rating: 5.0,
    },
    {
      title: "Spinning",
      description: "High-energy cycling class for cardio enthusiasts.",
      bookings: 150,
      rating: 4.0,
    },
    {
      title: "Pilates",
      description:
        "A core-strengthening workout with a focus on flexibility and balance.",
      bookings: 180,
      rating: 4.8,
    },
    {
      title: "Zumba Dance",
      description: "Fun, dance-based fitness class for all skill levels.",
      bookings: 250,
      rating: 4.6,
    },
    {
      title: "Boxing",
      description:
        "A full-body workout combining strength and conditioning with boxing techniques.",
      bookings: 300,
      rating: 4.7,
    },
  ];

  return (
    <div className="bg-gray-100 py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Featured Classes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {classes.map((classItem, index) => (
            <Card key={index} className="max-w-[24rem] overflow-hidden">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                  alt="ui/ux review check"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h4" color="blue-gray">
                  {classItem.title}
                </Typography>
                <Typography
                  variant="lead"
                  color="gray"
                  className="mt-3 font-normal"
                >
                  {classItem.description}
                </Typography>
              </CardBody>
              <CardFooter className="flex items-center justify-between">
                <div className="flex flex-col items-start">
                  <ReactStars
                    count={5}
                    value={classItem.rating}
                    size={24}
                    activeColor="#ffd700"
                    isHalf={true}
                    edit={false}
                  />
                  <Typography className="font-normal text-sm text-gray-600">
                    {classItem.rating.toFixed(1)} / 5
                  </Typography>
                </div>
                <Typography className="font-normal text-gray-700">
                  {classItem.bookings} Booked
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
