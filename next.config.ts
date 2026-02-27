import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "www.masakapahariini.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.themealdb.com",
        pathname: "/images/**",
      },
            {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.spoonacular.com",
      },
    ],
  },
};

export default nextConfig;
