import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTransitionLayer } from "@/components/motion/PageTransitionLayer";
import { createPageMetadata } from "@/lib/metadata";
import { globalSchema } from "@/lib/structuredData";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const neueMontreal = localFont({
  src: [
    { path: "../src/fonts/NeueMontreal-Regular.otf", weight: "400", style: "normal" },
    { path: "../src/fonts/NeueMontreal-Medium.otf", weight: "500", style: "normal" },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

const defaultMetadata = createPageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  keywords: ["Rezwan portfolio", "Rezwan Navid portfolio", "Mir Rezwan Navid portfolio", "Product Brain", "Design Heart", "product strategy", "AI product design"],
  category: "Product Design, Product Management, UX Design, UI Design, Web Development",
});

export const metadata: Metadata = {
  ...defaultMetadata,
  metadataBase: new URL("https://rezwannavid.me"),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#101010" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.shortName,
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#101010",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={neueMontreal.variable}>
        <JsonLd data={globalSchema} />
        <PageTransitionLayer />
        {children}
      </body>
    </html>
  );
}
