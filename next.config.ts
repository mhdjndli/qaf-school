import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.qafschool.com" }],
        destination: "https://qafschool.com/:path*",
        permanent: true,
      },
    ];
  },
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
