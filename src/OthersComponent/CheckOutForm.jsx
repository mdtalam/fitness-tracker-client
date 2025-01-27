import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const CheckOutForm = ({ packagePrice, slot }) => {
  const [error, setError] = useState("");
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (packagePrice > 0) {
      axiosSecure
        .post("/create-payment", { price: packagePrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, packagePrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
      return;
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "Unavailable",
            name: user?.displayName || "Unavailable",
          },
        },
      });

    if (confirmError) {
      console.error("Payment Confirmation Error:", confirmError);
      return;
    }

    Swal.fire({
      title: "Payment Successful!",
      text: `Your transaction ID is: ${paymentIntent.id}`,
      icon: "success",
      confirmButtonText: "OK",
    });

    // Save payment info to the backend
    const payment = {
      email: user?.email || "No email provided",
      name: user?.displayName || "Anonymous User",
      price: packagePrice || 0,
      transactionId: paymentIntent?.id || "No transaction ID",
      date: new Date(),
      slotId: slot?._id,
      slotName: slot?.slotName || "No slot name",
      slotTime: slot?.slotTime || "No slot time",
      trainerEmail: slot?.trainerEmail || "No trainer email",
      trainerName: slot?.trainerName || "No trainer name",
      slotDay: slot?.days?.length > 0 ? slot.days : ["No days selected"],
      slotClass: slot?.selectedClasses?.[0] || "No class ID",
    };

    try {
      // Send payment info to the backend to save it in the database
      const response = await axiosSecure.post("/payments", payment);
      console.log(response.data.insertedId);
      if (response.data.insertedId) {
        console.log("Payment saved:", response.data);

        // Proceed with booking and updating slot & class
        const updateResponse = await axiosSecure.patch(
          `/classes/${slot?.selectedClasses?.[0]}/booked`,
          {
            slotId: slot?._id,
            bookedBy: user?.displayName,
            bookedUserEmail: user?.email,
          }
        );

        console.log("Update Response:", updateResponse.data);

        if (updateResponse.data.success) {
          Swal.fire({
            title: "Booking Successful!",
            text: "Slot and class details updated.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Booking Failed!",
            text: "Could not update the slot or class. Try again later.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to save payment info.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error saving payment:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while saving the payment information.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>FitFusion | CheckOut</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className={`mt-10 w-full py-3 px-6 rounded-full shadow-lg text-lg font-semibold transition-transform duration-200 ${
            stripe && clientSecret
              ? "bg-gradient-to-r from-green-400 to-teal-500 text-white hover:scale-105"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay ${packagePrice}
        </button>
        <p className="text-red-600">{error}</p>
      </form>
    </div>
  );
};

export default CheckOutForm;
