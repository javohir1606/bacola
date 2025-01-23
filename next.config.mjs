/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "https://klbtheme.com/bacola",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
