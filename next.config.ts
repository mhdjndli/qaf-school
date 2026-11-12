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
      // The JK/SK program closed in December 2026.
      { source: "/program", destination: "/", permanent: true },
      { source: "/parents", destination: "/", permanent: true },
    ];
  },
  experimental: {
    serverActions: {
      // Admin uploads (signed handbooks, invoices) go through server actions.
      bodySizeLimit: "16mb",
      allowedOrigins: [
        "qafschool.com",
        "www.qafschool.com",
        "*.up.railway.app",
      ],
    },
  },
};

export default nextConfig;
