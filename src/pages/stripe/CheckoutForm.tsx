import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
// Use your publishable key, not secret key
const stripePromise = loadStripe(
  "pk_test_51Rqrc8FIul2piRnkQOku9aWaI8EEzTrteGTF4Yym8Zb9GrPxwSLki748KsgV61sB7QjOedlaoUVd8EvpRO7OHpEK00DxbkFMqS"
);

const CheckoutForm = () => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        return data.clientSecret;
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
        throw error;
      });
  }, []);

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Rqrc8FIul2piRnkQOku9aWaI8EEzTrteGTF4Yym8Zb9GrPxwSLki748KsgV61sB7QjOedlaoUVd8EvpRO7OHpEK00DxbkFMqS"
    );

    const body = {
      products: [
        {
          title: "Cart Items",
          img: "cart_image_url",
          price: 200,
          quantity: 10,
        },
        {
          title: "Another Item",
          img: "another_image_url",
          price: 300,
          quantity: 5,
        },
      ],
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:5000/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      {/* <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider> */}

      <Button onClick={makePayment} className="mt-80">
        Pay Now
      </Button>
    </div>
  );
};

export default CheckoutForm;
