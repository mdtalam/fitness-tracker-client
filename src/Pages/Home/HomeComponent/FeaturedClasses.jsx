import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const FeaturedClasses = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch the top 6 featured classes
  const { data: featuredClasses, isLoading, isError } = useQuery({
    queryKey: ["featuredClasses"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/featured-classes");
      return data;
    },
  });

  if (isLoading) return <p>Loading featured classes...</p>;
  if (isError) return <p>Error loading featured classes.</p>;

  return (
    <div className="bg-gray-100 py-14">
      <div className="container mx-auto md:pl-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Featured Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredClasses.map((classData, index) => (
            <Card key={index} className="max-w-[24rem] overflow-hidden">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <img
                  src={classData.image}
                  alt={classData.className}
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h4" color="blue-gray">
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
