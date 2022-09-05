import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
          async=""
        ></script>
        <script src="/pixel.js" async=""></script>
        <noscript>
          <img
            height="1"
            width="1"
            style="display:none"
            src="https://www.facebook.com/tr?id=397822372456827&ev=PageView&noscript=1"
          />
        </noscript>
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
