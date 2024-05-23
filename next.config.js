const withWorkbox = require("next-with-workbox");
const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

(module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        optimizeImagesInDev: true,
      },
    ],
  ],
  {
    future: {
      webpack5: true,
    },
  }
)),
  withWorkbox({
    workbox: {
      swDest: "static/service-worker.js",
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: "NetworkFirst",
          options: {
            cacheName: "https-calls",
            networkTimeoutSeconds: 15,
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
  });
