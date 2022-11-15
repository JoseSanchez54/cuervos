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
  const [idPedidoPaypal, setIdPedidoPaypal] = useState("");
  const [loading, setLoading] = useState(false);
  const actualCart = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  /*   actualCart.map((e) => {
    const actual = e.meta_data.find((x) => x.key === "_subscription_period");
    if (actual && sub == false) {
      setSub(true);
    }
  }); */

  const costo =
    (parseFloat(total) < 50 && formulario.shipping.state !== "GC") ||
    (parseFloat(total) < 50 && formulario.shipping.state !== "TF") ||
    (parseFloat(total) < 50 && formulario.shipping.state !== "PM")
      ? parseFloat(total) + parseFloat(envio)
      : formulario.shipping.state === "GC" ||
        formulario.shipping.state === "TF" ||
        formulario.shipping.state === "PM"
      ? parseFloat(total) + parseFloat(envio)
      : parseFloat(total);

  let unidad = {
    amount: {
      currency: "EUR",
      value: !cupon
        ? costo
        : cupon.tipo !== "porcentaje"
        ? costo - parseFloat(cupon.amount)
        : (costo - parseFloat((total * cupon.amount) / 100)).toFixed(2),
    },
  };

  const router = useRouter();

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    const lineItems = [];
    await actualCart.map((i) => {
      lineItems.push({
        price_data: {
          currency: "EUR",
          unit_amount_decimal:
            i.sale_price !== "" ? i.sale_price * 100 : i.regular_price * 100,
          product_data: {
            name: i.nombrePadre,
            images: i?.images ? [i?.images[0]?.src] : [i?.image?.src],
          },
        },

        quantity: 1,
      });
    });
    axios
      .post("/api/checkout_sessions", {
        items: lineItems,
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
      {loading && (
        <>
          <div className="flex fixed z-50 bg-black opacity-60 top-0 right-0 left-0 bottom-0 flex-row w-screen h-screen justify-center items-center">
            <div className="flex flex-col w-full h-full justify-center items-center ">
              <ClipLoader color={"#000"} loading={loading} size="45px" />
              <span
                style={{
                  color: "white",
                  fontSize: "23px",
                  fontWeight: "bold",
                  fontFamily: "Helvetica",
                  textAlign: "center",
                }}
              >
                Espera unos momentos mientras te redirigimos de forma segura
              </span>
              <span
                style={{
                  color: "white",
                  fontSize: "19px",
                  fontWeight: "bold",
                  fontFamily: "Helvetica",
                  textAlign: "center",
                }}
              >
                No abandones ni recargues la página
              </span>
            </div>
          </div>
        </>
      )}
      <button className="items-center my-3" onClick={(e) => handle(e)}>
        Pagar {loading && <ClipLoader size="16px" color="white" />}
      </button>
      <PayPalScriptProvider
        options={{ "client-id": process.env.CLIENT_ID, currency: "EUR" }}
      >
        {sub === false && (
          <>
            <PayPalButtons
              currency="EUR"
              style={{ layout: "horizontal" }}
              createOrder={(data, actions) => {
                axios
                  .post("/api/orders", {
                    formulario: formulario,
                    actualCart: actualCart,
                  })
                  .then((res) => {
                    localStorage.setItem("idPedido", res.data.id);
                    setIdPedidoPaypal(res.data.id);
                  })
                  .catch((err) => {
                    console.log("error StripeCheckout");
                  });
                return actions.order.create({
                  purchase_units: [unidad],
                });
              }}
              onApprove={(data, actions) => {
                axios.post("/api/orders", {
                  id: localStorage.getItem("idPedido"),
                });

                return actions.order.capture().then((details) => {
                  const name = details.payer.name.given_name;
                  Router.push(
                    "/success?wc_order_id=" + localStorage.getItem("idPedido")
                  );
                });
              }}
            />
          </>
        )}
      </PayPalScriptProvider>

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
