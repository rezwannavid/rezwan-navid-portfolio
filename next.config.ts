import type { NextConfig } from "next";

const cachedPublicAssets = [
  "/rezwan-navid-logo.svg",
  "/mir-rezwan-navid-portrait.svg",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/icon-192.png",
  "/icon-512.png",
  "/safari-pinned-tab.svg",
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { minimumCacheTTL: 86400 },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.rezwannavid.me" }],
        destination: "https://rezwannavid.me/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
      {
        source: "/rezwan-navid-portfolio-og.png",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
      ...cachedPublicAssets.map((source) => ({
        source,
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      })),
    ];
  },
};

export default nextConfig;
