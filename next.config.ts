import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow external image domains if HIPER product images are hosted externally
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.hiper.com.br",
      },
      {
        protocol: "https",
        hostname: "**.hipersistemas.com.br",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
