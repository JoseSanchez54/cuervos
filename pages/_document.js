import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
          async=""
        ></script>
        <script
          async=""
          src="https://www.paypal.com/sdk/js?client-id=AVbAI_7_F8U_6sR6QBDOWXY2bOpPfgbNFsBYn8wkAvNngJUPmADuObbPEgIa8qayu09XfAEPKInRTyZm&currency=EUR"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
          }}
        />
      </body>
    </Html>
  );
}
