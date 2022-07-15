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

function MyApp({ Component, pageProps }) {
  const [cookies, setCookies] = useState(false);
  const store = useStore();
  const dispatch = useDispatch();
  /*   const tasas = axios.get("/api/taxes").then((e) =>
    dispatch({
      type: "@setTaxes",
      taxes: e.data,
    })
  ); */
  const e = axios.get("/api/testing").then((e) => console.log(e));
  /*   const envios = axios.get("/api/envios/").then((e) =>
    dispatch({
      type: "@setShipping",
      envios: e.data,
    })
  ); */

  return (
    <SWRConfig
      value={{
        fetcher: fetcher,

        refreshInterval: 30,
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
