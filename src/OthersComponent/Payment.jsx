import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";

// add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);
const Payment = () => {
  const location = useLocation();
  const { slot, packageName, packagePrice } = location.state || {}; // Access packagePrice

  return (
    <div className="payment-page p-8 bg-gray-100 min-h-screen">
      <Helmet>
        <title>FitFusion | Payment</title>
      </Helmet>
      <div className="max-w-4xl my-8 mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Payment Information
        </h2>

        {/* Slot Info */}
        <div className="slot-info mb-6 p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Slot Information
          </h3>
          <p className="text-lg text-gray-700 mb-2 capitalize">
            <span className="font-semibold">Trainer: </span>
            {slot?.trainerName}
          </p>
          <p className="text-lg text-gray-700 mb-2  capitalize">
            <span className="font-semibold">Selected Slot: </span>
            {slot?.slotName}
          </p>
          <p className="text-lg text-gray-700 capitalize">
            <span className="font-semibold">Slot Time: </span>
            {slot?.slotTime} {slot?.slotTime === "1" ? "Hour" : "Hours"}
          </p>
        </div>

        {/* Package Info */}
        <div className="package-info mt-6 mb-6 p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Package Information
          </h3>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">Package: </span>
            {packageName}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Price: $</span>
            {packagePrice}
          </p>
        </div>

        {/* Payment Options */}
        <div className="payment-options p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8">
            Choose Your Payment Method
          </h3>
          <Elements stripe={stripePromise}>
            <CheckOutForm
              key={slot?._id}
              packagePrice={packagePrice}
              slot={slot}
            ></CheckOutForm>
          </Elements>
        </div>

        {/* Payment Summary */}
        {/* <div className="payment-summary mt-8 text-center">
          <button className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white py-3 px-6 rounded-full shadow-lg text-lg font-semibold hover:scale-105 transition-transform duration-200">
            Confirm Payment
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Payment;
