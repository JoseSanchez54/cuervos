import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import axios from "axios";
const Formulario = ({ items, cupon, clientSecret, formulario }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const total = useSelector((state) => state.cartReducer.total);
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
        return_url: "http://localhost:3000/success?wc_order_id=" + wcID,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setErrorMsg(event.error ? event.error.message : "");
  };
  const cardStyle = {
    hidePostalCode: true,
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      <div className="flex flex-col w-full justify-center">
        <form
          style={{ width: "100%", textAlign: "center" }}
          id="payment-form w-full"
          onSubmit={handleSubmit}
        >
          <PaymentElement />
          {/*      <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          /> */}
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
          {/* Show any error that happens when processing the payment */}
          {errorMsg && (
            <div className="card-error" role="alert">
              {errorMsg}
            </div>
          )}
          {/* Show a success message upon completion */}
          <p>{message}</p>
        </form>
        <PayPalScriptProvider
          options={{ "client-id": process.env.CLIENT_ID, currency: "EUR" }}
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
        </PayPalScriptProvider>
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
          padding: 40px;
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
