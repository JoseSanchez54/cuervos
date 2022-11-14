const { withSentryConfig } = require("@sentry/nextjs");
moduleExports = {
  sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,
  },
  async redirects() {
    return [
      {
        source: "/verdejo",
        destination: "/productos/verdejo",
        permanent: true,
      },
      {
        source: "/rosado",
        destination: "/productos/rosado",
        permanent: true,
      },
      {
        source: "/tempranillo",
        destination: "/productos/tempranillo",
        permanent: true,
      },
    ];
  },

  reactStrictMode: false,
  images: {
    remotePatterns: [],
    domains: ["apicuervos.bitmac.es", "criacuervos.bitmac.es"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  env: {
    URLBASE: process.env.URLBASE,
    PASSSECRET: "Passwordsecretaadefinir",
    URLFINAL: process.env.URLFINAL,
    SIGNAL_ID: process.env.SIGNAL_ID,
    SAFARI_ID: process.env.SAFARI_ID,
    CLIENT_ID: process.env.CLIENT_ID,
    APP_SECRET: process.env.APP_SECRET,
    GTM_ID: process.env.GTM_ID,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    GTM_ID: process.env.GTM_ID,
    FB_ACCESS_TOKEN: process.env.FB_ACCESS_TOKEN,
    NEXT_PUBLIC_FB_PIXEL_ID: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
    WCKEY: process.env.WCKEY,
    WCS: process.env.WCS,
    MAILCHIMPSERVER: process.env.MAILCHIMPSERVER,
    MAILCHIMP: process.env.MAILCHIMP,
    NEXT_PUBLIC_FB_PIXEL_ID: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
    NEXT_PUBLIC_FB_DEBUG: process.env.NEXT_PUBLIC_FB_DEBUG,
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
  swcMinify: true,

  async headers() {
    return [
      {
        // This works, and returns appropriate Response headers:
        source: "/(.*).jpg",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=180, s-maxage=180, stale-while-revalidate=180",
          },
        ],
      },
      {
        // This works, and returns appropriate Response headers:
        source: "/(.*).png",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=180, s-maxage=180, stale-while-revalidate=180",
          },
        ],
      },
      {
        // This works, and returns appropriate Response headers:
        source: "/(.*).webp",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=180, s-maxage=180, stale-while-revalidate=180",
          },
        ],
      },
      {
        // This works, and returns appropriate Response headers:
        source: "/(.*).webm",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=180, s-maxage=180, stale-while-revalidate=180",
          },
        ],
      },
      {
        // This works, and returns appropriate Response headers:
        source: "/(.*).mp4",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=180, s-maxage=180, stale-while-revalidate=180",
          },
        ],
      },
      {
        // This doesn't work for 'Cache-Control' key (works for others though):
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            // Instead of this value:
            value:
              "public, max-age=180, s-maxage=180, stale-while-revalidate=180",
            // Cache-Control response header is `public, max-age=60` in production
            // and `public, max-age=0, must-revalidate` in development
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|png|webp|webm|mp4)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000",
          },
        ],
      },
    ];
  },
};
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
