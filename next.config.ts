import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://scripts.clarity.ms",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com https://*.clarity.ms https://*.bing.com",
  "font-src 'self' data:",
  "media-src 'self' blob:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.clarity.ms https://*.bing.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const cachedPublicAssets = [
  "/rezwan-navid-logo.svg",
  "/mir-rezwan-navid-portrait.svg",
  "/pixel-brain-product-thinking.png",
  "/pixel-eye-human-centered-design.png",
  "/rezwan-navid-product-design-portfolio-cover.png",
  "/favicon.ico",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/apple-touch-icon.png",
  "/icon-192.png",
  "/icon-512.png",
  "/safari-pinned-tab.svg",
];

const nextConfig: NextConfig = {
  agentRules: false,
  poweredByHeader: false,
  images: { minimumCacheTTL: 86400, qualities: [75, 90, 92] },
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
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
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
