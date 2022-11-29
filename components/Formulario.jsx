import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import Image from "next/image";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Collapse } from "@nextui-org/react";
const Formulario = ({ cupon, formulario, envio }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMsg, setErrorMsg] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const total = useSelector((state) => state.cartReducer.total);
  let unidad = total;
  if (cupon.tipo === "porcentaje") {
    let descuento = total * cupon.descuento;
    unidad = total - descuento;
    unidad = parseFloat(unidad).toFixed(2);
  } else if (cupon.tipo === "fijo") {
    unidad = unidad - cupon.descuento;
    unidad = parseFloat(unidad).toFixed(2);
  }
  const costo =
    (parseFloat(unidad) < 50 && formulario.shipping.state !== "GC") ||
    (parseFloat(unidad) < 50 && formulario.shipping.state !== "TF") ||
    (parseFloat(unidad) < 50 && formulario.shipping.state !== "PM")
      ? parseFloat(unidad) + parseFloat(envio)
      : formulario.shipping.state === "GC" ||
        formulario.shipping.state === "TF" ||
        formulario.shipping.state === "PM"
      ? parseFloat(unidad) + parseFloat(envio)
      : parseFloat(unidad);
  const final = (parseFloat(costo) + parseFloat(unidad)).toFixed(2);
  console.log(costo, unidad, final);
  const unidad1 = {
    amount: {
      currency: "EUR",
      value: String(costo),
    },
  };

  /*   const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),

      },
    });

    if (payload.error) {
      setErrorMsg(`Payment failed ${payload.error.message}`);

      setProcessing(false);
    } else {
      setErrorMsg(null);

      setProcessing(false);
      setSucceeded(true);
    }
  }; */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const wcID = await axios
      .post("/api/orders", { formulario: formulario, tipo: "stripe" })
      .then((e) => e.data.id);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/success" + wcID
            : "https://vinoscriacuervos.com/success" + wcID,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("Ha ocurrido un error");
    }
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setErrorMsg(event.error ? event.error.message : "");
  };
  console.log(unidad1);
  return (
    <>
      <div
        style={{ backgroundColor: "#f5f5f57a", padding: "21px" }}
        className="flex mt-9 flex-col w-full justify-center"
      >
        <span
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#000",
            fontFamily: "Fjalla One",
          }}
        >
          Elige tu método de pago
        </span>
        <form
          style={{ width: "100%", textAlign: "center", boxShadow: "none" }}
          id="payment-form w-full"
          onSubmit={handleSubmit}
        >
          <Collapse.Group>
            <Collapse
              contentLeft={
                <Image
                  objectFit="contain"
                  width="50px"
                  height="50px"
                  src="/creditcard.png"
                ></Image>
              }
              css={{
                fontFamily: "Futura PT",
              }}
              title="Tarjeta de crédito"
            >
              <PaymentElement />
              <button
                style={{
                  fontFamily: "Helvetica",
                  fontSize: "14px",
                  fontWeight: "normal",
                  color: "white",
                  backgroundColor: "#000000",
                  padding: "10px 20px",
                  marginTop: "20px",
                }}
                id="submit"
              >
                <span id="button-text">
                  {processing ? (
                    <div className="spinner" id="spinner"></div>
                  ) : (
                    "Pagar ahora"
                  )}
                </span>
              </button>
              {errorMsg && (
                <div className="card-error" role="alert">
                  {errorMsg}
                </div>
              )}
              {/* Show a success message upon completion */}
              <p>{message}</p>
            </Collapse>
            <Collapse
              css={{
                fontFamily: "Futura PT",
              }}
              contentLeft={
                <Image
                  objectFit="contain"
                  width="50px"
                  height="50px"
                  src="/paypal.png"
                ></Image>
              }
              title="Paypal"
            >
              {" "}
              <PayPalScriptProvider
                options={{
                  "client-id": process.env.CLIENT_ID,
                  currency: "EUR",
                }}
              >
                <>
                  <PayPalButtons
                    currency="EUR"
                    style={{ layout: "horizontal" }}
                    createOrder={(data, actions) => {
                      axios
                        .post("/api/orders", {
                          formulario: formulario,
                        })
                        .then((res) => {
                          localStorage.setItem("idPedido", res.data.id);
                          setIdPedidoPaypal(res.data.id);
                        })
                        .catch((err) => {
                          console.log("error StripeCheckout");
                        });
                      return actions.order.create({
                        purchase_units: [unidad1],
                      });
                    }}
                    onApprove={(data, actions) => {
                      axios.post("/api/orders", {
                        id: localStorage.getItem("idPedido"),
                      });

                      return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        router.push(
                          "/success?wc_order_id=" +
                            localStorage.getItem("idPedido")
                        );
                      });
                    }}
                  />
                </>
              </PayPalScriptProvider>
            </Collapse>
          </Collapse.Group>

          {/*      <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          /> */}

          {/* Show any error that happens when processing the payment */}
        </form>
      </div>
      <style jsx>{`
        #root {
          display: flex;
          align-items: center;
        }

        form {
          width: 30vw;
          align-self: center;
          box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
            0px 2px 5px 0px rgba(50, 50, 93, 0.1),
            0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
          border-radius: 7px;
          padding: 10px;
        }

        input {
          border-radius: 6px;
          margin-bottom: 6px;
          padding: 12px;
          border: 1px solid rgba(50, 50, 93, 0.1);
          max-height: 44px;
          font-size: 16px;
          width: 100%;
          background: white;
          box-sizing: border-box;
        }

        .result-message {
          line-height: 22px;
          font-size: 16px;
        }

        .result-message a {
          color: rgb(89, 111, 214);
          font-weight: 600;
          text-decoration: none;
        }

        .hidden {
          display: none;
        }

        #card-error {
          color: rgb(105, 115, 134);
          font-size: 16px;
          line-height: 20px;
          margin-top: 12px;
          text-align: center;
        }

        #card-element {
          border-radius: 4px 4px 0 0;
          padding: 12px;
          border: 1px solid rgba(50, 50, 93, 0.1);
          max-height: 44px;
          width: 100%;
          background: white;
          box-sizing: border-box;
        }

        #payment-request-button {
          margin-bottom: 32px;
        }

        button:hover {
          filter: contrast(115%);
        }

        button:disabled {
          opacity: 0.5;
          cursor: default;
        }

        /* spinner/processing state, errors */
        .spinner,
        .spinner:before,
        .spinner:after {
          border-radius: 50%;
        }

        .spinner {
          color: #ffffff;
          font-size: 22px;
          text-indent: -99999px;
          margin: 0px auto;
          position: relative;
          width: 20px;
          height: 20px;
          box-shadow: inset 0 0 0 2px;
          -webkit-transform: translateZ(0);
          -ms-transform: translateZ(0);
          transform: translateZ(0);
        }

        .spinner:before,
        .spinner:after {
          position: absolute;
          content: "";
        }

        .spinner:before {
          width: 10.4px;
          height: 20.4px;
          background: undefined;
          border-radius: 20.4px 0 0 20.4px;
          top: -0.2px;
          left: -0.2px;
          -webkit-transform-origin: 10.4px 10.2px;
          transform-origin: 10.4px 10.2px;
          -webkit-animation: loading 2s infinite ease 1.5s;
          animation: loading 2s infinite ease 1.5s;
        }

        .spinner:after {
          width: 10.4px;
          height: 10.2px;
          background: undefined;
          border-radius: 0 10.2px 10.2px 0;
          top: -0.1px;
          left: 10.2px;
          -webkit-transform-origin: 0px 10.2px;
          transform-origin: 0px 10.2px;
          -webkit-animation: loading 2s infinite ease;
          animation: loading 2s infinite ease;
        }

        @keyframes loading {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }

        @media only screen and (max-width: 600px) {
          form {
            width: 80vw;
          }
        }
      `}</style>
    </>
  );
};
export default Formulario;
