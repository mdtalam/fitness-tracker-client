import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
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
  // console.log(slot.selectedClasses.map(class => {}))
  // const selectClass = slot.selectedClasses[0](sClass=>{console.log(sClass)})
  console.log(slot?.selectedClasses?.[0]);
  console.log(slot);

  useEffect(() => {
    if (packagePrice > 0) {
      axiosSecure
        .post("/create-payment", { price: packagePrice })
        .then((res) => {
          console.log(res.data.clientSecret);
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
      console.log("[error]", error);
      setError(error.message);
      return;
    } else {
      console.log("[paymentMethod]", paymentMethod);
      setError("");
    }

    // Confirm payment
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
      console.log("Confirm Error:", confirmError);
      return;
    }

    console.log("Payment Intent:", paymentIntent);


    Swal.fire({
      title: "Payment Successful!",
      text: `Your transaction ID is: ${paymentIntent.id}`,
      icon: "success",
      confirmButtonText: "OK",
    });

    // Save payment info in the database
    const payment = {
      email: user?.email || "No email provided",
      name: user?.displayName || "Anonymous User",
      price: packagePrice || 0,
      transactionId: paymentIntent?.id || "No transaction ID",
      date: new Date(),
      slotName: slot?.slotName || "No slot name",
      slotTime: slot?.slotTime || "No slot time",
      trainerEmail: slot?.trainerEmail || "No trainer email",
      trainerName: slot?.trainerName || "No trainer name",
      slotDay: slot?.days?.length > 0 ? slot.days : ["No days selected"],
      slotClass: slot?.selectedClasses?.[0] || "No class ID",
    };

    const res = await axiosSecure.post("/payments", payment);
    console.log("Payment Saved:", res);

    
    const classId = slot?.selectedClasses?.[0];
    if (classId) {
      const updateRes = await axiosSecure.patch(`/classes/${classId}/booked`);
      console.log("Class Booked Count Updated:", updateRes);
    }
  };

  return (
    <div>
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
