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
import * as fbq from "../utils/fbpixel";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const mainDataLayer = {
      pageTypeName: pageProps.page || null,
      url: router.pathname,
    };

    gtmVirtualPageView(mainDataLayer);
    fbq.pageview();

    const handleRouteChange = () => {
      fbq.pageview();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [pageProps, router.events]);

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
        refreshInterval: 1000000,
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
        })(window,document,'script','dataLayer','${process.env.GTM_ID}');`}
          </Script>
          <Script
            id="fb-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', 397822372456827);`,
            }}
          />

          <Component {...pageProps} />
          {cookies === "false" && <CookieAd funcion={setCookies} />}
          <Washapp />
        </NextUIProvider>
      </PersistGate>
    </SWRConfig>
  );
}

export default wrapper.withRedux(MyApp);
