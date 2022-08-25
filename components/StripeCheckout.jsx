import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Router from "next/router";

/**
 * I'm trying to create a stripe session and then redirect to the stripe checkout page.
 * </code>
 * @returns The session.data.url is being returned.
 * </code>
 */
export default function StripeCheckout({ formulario, envio, cupon }) {
  const [sub, setSub] = useState(false);
  const [loading, setLoading] = useState(false);
  const actualCart = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  envio = envio.replace(",", ".");

  const unidad = {
    amount: {
      currency: "EUR",
      value: total,
    },
  };
  const router = useRouter();

  const handle = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/checkout_sessions", {
        items: actualCart,
        formulario: formulario,
        envio: envio,
        cupon: cupon,
      })
      .then((session) => {
        setLoading(false);
        router.push(session.data.url);
      });
  };

  return (
    <>
      <button className="items-center my-3" onClick={(e) => handle(e)}>
        Pagar {loading && <ClipLoader size="16px" color="white" />}
      </button>
      {/* <PayPalScriptProvider options={{ "client-id": process.env.CLIENT_ID }}>
        {sub === false && (
          <>
            <PayPalButtons
              currency="EUR"
              style={{ layout: "horizontal" }}
              createOrder={(data, actions) => {
                axios.post("/api/orders", {
                  formulario: formulario,
                  actualCart: actualCart,
                });
                return actions.order.create({
                  purchase_units: [unidad],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  const name = details.payer.name.given_name;
                  Router.push("/success");
                });
              }}
            />
          </>
        )}
      </PayPalScriptProvider> */}

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
            display: flex;
            justify-content: center;
            gap: 10px;
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
