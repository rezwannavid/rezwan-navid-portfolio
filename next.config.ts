import type { NextConfig } from "next";

const cachedPublicAssets = [
  "/rezwan-navid-logo.svg",
  "/mir-rezwan-navid-portrait.svg",
  "/pixel-brain-product-thinking.png",
  "/pixel-eye-human-centered-design.png",
  "/rezwan-navid-product-design-portfolio-cover.png",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/icon-192.png",
  "/icon-512.png",
  "/safari-pinned-tab.svg",
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { minimumCacheTTL: 86400 },
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
        source: "/Rezwan-Navid-Portfolio-2026.pdf",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
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
