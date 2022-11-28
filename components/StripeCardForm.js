import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Formulario from "./Formulario";
import { useState, useEffect } from "react";
const StripeCardForm = ({ items, cupon, formulario, envio }) => {
  const [clientSecret, setClientSecret] = useState("");
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const appearance = {
    theme: "night",
    labels: "floating",
    variables: {
      boxShadow: "none",
      // See all possible variables below
    },
  };
  const options = {
    clientSecret,
    appearance,
  };
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await fetch("/api/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items,
          cupon: cupon,
        }),
      });
      const data = await response.json();

      setClientSecret(data.client_secret);
      return data.client_secret;
    };
    getClientSecret();
  }, []);

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <Formulario
            envio={envio}
            formulario={formulario}
            clientSecret={clientSecret}
            cupon={cupon}
            items={items}
          />
        </Elements>
      )}
    </>
  );
};
export default StripeCardForm;
