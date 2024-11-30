/** @type {import('next').NextConfig} */
const nextConfig = {
  webpackDevMiddleware: (config) => {
    config.clientLogLevel = 'silent'; // Silence webpack's client-side logging
    return config;
  },
  reactStrictMode: false,
  logging: {
    fetches: {
      hmrRefreshes: true,
    },
  },
};

export default nextConfig;
