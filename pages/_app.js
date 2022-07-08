import "../styles/globals.css";
import { SWRConfig } from "swr";
import fetcher from "../utils/fetcher";
import { NextUIProvider } from "@nextui-org/react";
import CookieAd from "../components/generales/CookieAd";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { wrapper } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
import { useDispatch } from "react-redux";

function MyApp({ Component, pageProps }) {
  const [cookies, setCookies] = useState(false);
  const store = useStore();
  const dispatch = useDispatch();
  /*   const tasas = axios.get("/api/taxes").then((e) =>
    dispatch({
      type: "@setTaxes",
      taxes: e.data,
    })
  );
  const envios = axios.get("/api/envios").then((e) =>
    dispatch({
      type: "@setShipping",
      envios: e.data,
    })
  ); */
  useEffect(() => {
    let cookie = localStorage.getItem("cookieAd");
    if (cookie === "true") {
      setCookies("true");
    } else {
      setCookies("false");
    }
  }, [cookies]);
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        revalidate: 1,
        refreshInterval: 30,
      }}
    >
      <PersistGate persistor={store.__persistor}>
        <NextUIProvider>
          <Component {...pageProps} />
          <AnimatePresence>
            {cookies === "false" && <CookieAd funcion={setCookies} />}
          </AnimatePresence>
        </NextUIProvider>
      </PersistGate>
    </SWRConfig>
  );
}

export default wrapper.withRedux(MyApp);
