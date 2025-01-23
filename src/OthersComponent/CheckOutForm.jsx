import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!stripe || !elements){
        return;
    }

    const card = elements.getElement(CardElement)

    if(card === null){
        return
    }
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card
    })
    if(error){
        console.log('[error]', error)
    }
    else{
        console.log('[paymentMethod]', paymentMethod)
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
        <button className="mt-10 w-full bg-gradient-to-r from-green-400 to-teal-500 text-white py-3 px-6 rounded-full shadow-lg text-lg font-semibold hover:scale-105 transition-transform duration-200" type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckOutForm;
