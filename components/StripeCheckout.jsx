import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

/**
 * I'm trying to create a stripe session and then redirect to the stripe checkout page.
 * </code>
 * @returns The session.data.url is being returned.
 * </code>
 */
export default function StripeCheckout({ formulario, envio, cupon }) {
  const [loading, setLoading] = useState(false);
  const actualCart = useSelector((state) => state.cartReducer.cart);
  const router = useRouter();
  React.useEffect(() => {
    paypal
      .Buttons({
        // Sets up the transaction when a payment button is clicked
        createOrder: function (data, actions) {
          return fetch("/api/paypalorders", {
            method: "post",
            // use the "body" param to optionally pass additional order information
            // like product ids or amount
          })
            .then((response) => response.json())
            .then((order) => order.id);
        },
        // Finalize the transaction after payer approval
        onApprove: function (data, actions) {
          return fetch(`/api/capture?=${data.orderID}`, {
            method: "post",
            body: {
              orderID: data.orderID,
            },
          })
            .then((response) => response.json())
            .then((orderData) => {
              // Successful capture! For dev/demo purposes:
              console.log(
                "Capture result",
                orderData,
                JSON.stringify(orderData, null, 2)
              );
              var transaction =
                orderData.purchase_units[0].payments.captures[0];
              alert(
                "Transaction " +
                  transaction.status +
                  ": " +
                  transaction.id +
                  "\n\nSee console for all available details"
              );
              // When ready to go live, remove the alert and show a success message within this page. For example:
              // var element = document.getElementById('paypal-button-container');
              // element.innerHTML = '<h3>Thank you for your payment!</h3>';
              // Or go to another URL:  actions.redirect('thank_you.html');
            });
        },
      })
      .render("#paypal-button-container");
  }, []);

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
      <button className="items-center" onClick={(e) => handle(e)}>
        Pagar {loading && <ClipLoader size="16px" color="white" />}
      </button>
      <div id="paypal-button-container"></div>

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
