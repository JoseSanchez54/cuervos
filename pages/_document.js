import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
          async=""
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5Q7WG63" height="0" width="0" style="display: none; visibility: hidden;" />`,
          }}
        />
      </body>
    </Html>
  );
}
