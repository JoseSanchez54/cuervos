module.exports = {
  loaders: [
    {
      test: /\.css$/,
      loaders: ["style?insertAt=top", "css"],
    },
  ],
  experimental: {
    concurrentFeatures: true,
    urlImports: [
      "https://framer.com/m/",
      "https://framerusercontent.com/",
      "https://ga.jspm.io/",
      "https://jspm.dev/",
    ],
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
    domains: ["api.printly.es", "criacuervos.bitmac.es"],
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
