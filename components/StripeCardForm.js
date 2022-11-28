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
    theme: "flat",
    variables: {
      fontFamily: ' "Gill Sans", sans-serif',
      fontLineHeight: "1.5",
      borderRadius: "10px",
      colorBackground: "#F6F8FA",
      colorPrimaryText: "#262626",
    },
    rules: {
      ".Block": {
        backgroundColor: "var(--colorBackground)",
        boxShadow: "none",
        padding: "12px",
      },
      ".Input": {
        padding: "12px",
      },
      ".Input:focus": {
        outline: "none",
        boxShadow: "none",
      },
      ".Input:disabled, .Input--invalid:disabled": {
        color: "lightgray",
      },
      ".Tab": {
        padding: "10px 12px 8px 12px",
        border: "none",
      },
      ".Tab:hover": {
        border: "none",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Tab:focus": { outline: "none", boxShadow: "none" },
      ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
        border: "none",
        backgroundColor: "#fff",
        boxShadow: "none",
      },
      ".Label": {
        fontWeight: "500",
      },
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
