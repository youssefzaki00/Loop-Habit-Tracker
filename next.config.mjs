/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  logging: {
    fetches: {
      hmrRefreshes: true,
    },
  },
};

export default nextConfig;
