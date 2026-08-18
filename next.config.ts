import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.goodtimesco.in",
        pathname: "/t/**",
      },
    ],
  },
};

export default nextConfig;