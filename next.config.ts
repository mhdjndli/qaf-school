import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: [
        "qafschool.com",
        "www.qafschool.com",
        "*.up.railway.app",
      ],
    },
  },
};

export default nextConfig;
