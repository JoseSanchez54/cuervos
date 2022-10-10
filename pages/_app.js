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
import WooCommerce from "../woocommerce/Woocommerce";
import {
  FBPixelProvider,
  FBPixelScript,
} from "@rivercode/facebook-conversion-api-nextjs/components";
import { hotjar } from "react-hotjar";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    hotjar.initialize("3194824", "6");
    const mainDataLayer = {
      pageTypeName: pageProps.page || null,
      url: router.pathname,
    };
    gtmVirtualPageView(mainDataLayer);
  }, [pageProps]);
  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("397822372456827");
        ReactPixel.pageView();

        router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  }, [router.events]);

  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.URLFINAL;
  const [cookies, setCookies] = useState(false);
  const store = useStore();
  const dispatch = useDispatch();
  WooCommerce.get("taxes")
    .then((e) => {
      dispatch({
        type: "@setTaxes",
        taxes: e.data,
      });
    })
    .catch((error) => {});
  axios.get(process.env.URLBASE + "wp-json/jet-cct/envios").then((e) =>
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
          <Script
            id="hotjar"
            strategy="afterInteractive"
          >{`(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3194824,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}</Script>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GTM_ID}');`}
          </Script>
          <FBPixelScript />

          <Component {...pageProps} />

          {cookies === "false" && <CookieAd funcion={setCookies} />}
          <Washapp />
        </NextUIProvider>
      </PersistGate>
    </SWRConfig>
  );
}

export default wrapper.withRedux(MyApp);
