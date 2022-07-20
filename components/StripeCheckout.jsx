import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function StripeCheckout({ formulario }) {
  const actualCart = useSelector((state) => state.cartReducer.cart);
  const router = useRouter();
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);
  const handle = (e) => {
    e.preventDefault();
    axios
      .post("/api/checkout_sessions", {
        items: actualCart,
        formulario: formulario,
      })
      .then((session) => {
        router.push(session.data.url);
      });
  };

  return (
    <>
      <button onClick={(e) => handle(e)}>Pagar</button>

      <style jsx>
        {`
          button {
            background-color: #000000;
            color: #ffffff;
            padding: 10px 20px;
            border: 1px solid black;
            text-transform: uppercase;
            display: block;
            width: 100%;
            margin-top: 10px;
          }
          button:hover {
            color: white;
            padding: 10px 20px;
            border: 1px solid white;
          }
        `}
      </style>
    </>
  );
}
