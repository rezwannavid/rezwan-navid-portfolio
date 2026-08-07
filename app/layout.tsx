import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTransitionLayer } from "@/components/motion/PageTransitionLayer";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { createPageMetadata } from "@/lib/metadata";
import { globalSchema } from "@/lib/structuredData";
import { siteConfig } from "@/lib/site";
import "./globals.css";
import "lenis/dist/lenis.css";

const neueMontreal = localFont({
  src: [
    { path: "../src/fonts/NeueMontreal-Regular.otf", weight: "400", style: "normal" },
    { path: "../src/fonts/NeueMontreal-Medium.otf", weight: "500", style: "normal" },
    { path: "../NeueMontreal/NeueMontreal-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

const fraunces = localFont({
  src: "../src/fonts/Fraunces.ttf",
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const defaultMetadata = createPageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  openGraphDescription: siteConfig.socialDescription,
  keywords: ["Rezwan Navid portfolio", "Product Brain", "Design Heart", "Design Engineering", "AI Product Design", "Systems Thinking"],
  category: "Product Design and Design Engineering",
});

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
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
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${neueMontreal.variable} ${fraunces.variable} ${neueMontreal.className}`}>
        <JsonLd data={globalSchema} />
        <SmoothScrollProvider>
          <PageTransitionLayer />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
