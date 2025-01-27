import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Spinner from "./Spinner";

const TrainerBooked = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {
    data: slot,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["slot", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/slots/book/${id}`);
      return data;
    },
  });

  const packages = [
    {
      name: "Basic Membership",
      price: 10, // Integer price
      benefits: ["Access to gym facilities during regular operating hours"],
    },
    {
      name: "Standard Membership",
      price: 50, // Integer price
      benefits: [
        "All benefits of the basic membership",
        "Use of cardio and strength training equipment",
        "Access to group fitness classes such as yoga, spinning, and Zumba",
      ],
    },
    {
      name: "Premium Membership",
      price: 100, // Integer price
      benefits: [
        "All benefits of the basic membership",
        "All benefits of the standard membership",
        "Access to personal training sessions with certified trainers",
        "Access to locker rooms and showers",
        "Use of additional amenities like a sauna or steam room",
        "Discounts on additional services such as massage therapy or nutrition counseling",
      ],
    },
  ];

  if (isLoading) return <Spinner />;
  if (error) return <Spinner />;

  return (
    <div className="trainer-booked-page p-6 bg-gray-100">
      {/* Trainer Info and Slot */}
      <div className="trainer-info p-6 bg-white shadow-md rounded-lg mb-6 my-14">
        <h2 className="text-3xl font-bold mb-4 capitalize">
          Trainer: {slot.trainerName}
        </h2>
        <p className="text-xl font-semibold mb-4 capitalize">
          Selected Slot: {slot.slotName}
        </p>
        <p className="text-gray-600">
          Slot time: {slot.slotTime} {slot.slotTime === 1 ? "Hour" : "Hours"}
        </p>
      </div>

      {/* Packages Section */}
      <div className="packages bg-white p-6 shadow-md rounded-lg mb-6">
        <h3 className="text-2xl font-bold mb-4">Choose Your Package</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="package-card bg-primary p-6 rounded-lg shadow-lg flex flex-col justify-between min-h-[400px] hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <div>
                <h4 className="text-xl font-semibold mb-3 text-secondary">
                  {pkg.name}
                </h4>
                {/* Dynamically display the price with a $ symbol */}
                <p className="text-lg font-semibold text-secondary">
                  ${pkg.price}
                </p>
                <ul className="mt-4 list-inside list-none text-secondary">
                  {pkg.benefits.map((benefit, i) => (
                    <li key={i} className="text-sm flex items-center mb-2">
                      <span className="text-green-500 mr-2">✔</span> {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Join Now Button */}
              <div className="mt-auto">
                <Link
                  to="/payment"
                  state={{
                    slot,
                    packageName: pkg.name,
                    packagePrice: pkg.price, // Pass the integer price
                  }}
                  className="bg-secondary text-white font-semibold text-lg px-6 py-3 rounded-full shadow-lg transform hover:text-secondary hover:bg-white hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out w-full text-center"
                >
                  Join Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainerBooked;
