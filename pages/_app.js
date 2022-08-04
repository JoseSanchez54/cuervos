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
import Washapp from "../components/Washapp";
import Script from "next/script";
import { gtmVirtualPageView } from "../utils/gtm";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const mainDataLayer = {
      pageTypeName: pageProps.page || null,
      url: router.pathname,
    };

    gtmVirtualPageView(mainDataLayer);
  }, [pageProps]);

  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.URLFINAL;
  const [cookies, setCookies] = useState(false);
  const store = useStore();
  const dispatch = useDispatch();
  const tasas = axios
    .get(redirectURL + "/api/taxes", {
      headers: { "User-Agent": "Axios 0.21.1" },
    })
    .then((e) =>
      dispatch({
        type: "@setTaxes",
        taxes: e.data,
      })
    );
  const envios = axios
    .get(process.env.URLBASE + "wp-json/jet-cct/envios", {
      headers: { "User-Agent": "Axios 0.21.1" },
    })
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
        refreshInterval: 100000,
      }}
    >
      <PersistGate persistor={store.__persistor}>
        <NextUIProvider>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GTM_ID}');
      `}
          </Script>
          <Component {...pageProps} />
          <Washapp />
        </NextUIProvider>
      </PersistGate>
    </SWRConfig>
  );
}

export default wrapper.withRedux(MyApp);
