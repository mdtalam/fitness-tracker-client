import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const { slot, packageName, packagePrice } = location.state || {}; // Access packagePrice

  return (
    <div className="payment-page p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl my-8 mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Payment Information
        </h2>

        {/* Slot Info */}
        <div className="slot-info mb-6 p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Slot Information</h3>
          <p className="text-lg text-gray-700 mb-2 capitalize">
            <span className="font-semibold">Trainer: </span>{slot?.trainerName}
          </p>
          <p className="text-lg text-gray-700 mb-2  capitalize">
            <span className="font-semibold">Selected Slot: </span>{slot?.slotName}
          </p>
          <p className="text-lg text-gray-700 capitalize">
            <span className="font-semibold">Slot Time: </span>{slot?.slotTime}{" "}
            {slot?.slotTime === 1 ? "Hour" : "Hours"}
          </p>
        </div>

        {/* Package Info */}
        <div className="package-info mt-6 mb-6 p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Package Information</h3>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">Package: </span>{packageName}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Price: </span>{packagePrice}
          </p>
        </div>

        {/* Payment Options */}
        <div className="payment-options p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Choose Your Payment Method</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="payment-option bg-white p-4 rounded-lg shadow-md text-center">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Credit/Debit Card</h4>
              <button className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:scale-105 transition-transform duration-200">
                Pay with Card
              </button>
            </div>
            <div className="payment-option bg-white p-4 rounded-lg shadow-md text-center">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">PayPal</h4>
              <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 px-4 rounded-lg hover:scale-105 transition-transform duration-200">
                Pay with PayPal
              </button>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="payment-summary mt-8 text-center">
          <button className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white py-3 px-6 rounded-full shadow-lg text-lg font-semibold hover:scale-105 transition-transform duration-200">
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
