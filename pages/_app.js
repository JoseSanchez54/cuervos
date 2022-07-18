import "../styles/globals.css";
import { SWRConfig } from "swr";
import fetcher from "../utils/fetcher";
import { NextUIProvider } from "@nextui-org/react";
import CookieAd from "../components/generales/CookieAd";
import { useState } from "react";
import StripeCheckout from "../components/StripeCheckout";
import { wrapper } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

function MyApp({ Component, pageProps }) {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: process.env.STRIPE_SECRET_KEY,
  };
  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.URLFINAL;
  const [cookies, setCookies] = useState(false);
  const store = useStore();
  const dispatch = useDispatch();
  const tasas = axios.get(redirectURL + "/api/taxes").then((e) =>
    dispatch({
      type: "@setTaxes",
      taxes: e.data,
    })
  );
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const envios = axios.get(redirectURL + "/api/envios/").then((e) =>
    dispatch({
      type: "@setShipping",
      envios: e.data,
    })
  );

  return (
    <SWRConfig
      value={{
        fetcher: fetcher,

        refreshInterval: 30,
      }}
    >
      <PersistGate persistor={store.__persistor}>
        <NextUIProvider>
          <StripeCheckout />
          <Component {...pageProps} />
        </NextUIProvider>
      </PersistGate>
    </SWRConfig>
  );
}

export default wrapper.withRedux(MyApp);
