import "../styles/globals.css";
import { SWRConfig } from "swr";
import fetcher from "../utils/fetcher";
import { NextUIProvider } from "@nextui-org/react";
import CookieAd from "../components/generales/CookieAd";
import { useState } from "react";
import { wrapper } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useUser } from "../hooks/useUser";

function MyApp({ Component, pageProps }) {
  const test = useUser();
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
  const envios = axios
    .get(process.env.URLBASE + "wp-json/jet-cct/envios")
    .then((e) =>
      dispatch({
        type: "@setShipping",
        envios: e.data,
      })
    );

  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        refreshInterval: 10,
      }}
    >
      <PersistGate persistor={store.__persistor}>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </PersistGate>
    </SWRConfig>
  );
}

export default wrapper.withRedux(MyApp);
