import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://rezwannavid.me"),
  title: "Mir Rezwan Navid — Product Thinker",
  description: "Mir Rezwan Navid is a product thinker and designer building systems with impact.",
  icons: { icon: "/rnfavicon.png" },
  openGraph: {
    title: "Mir Rezwan Navid — Product Thinker",
    description: "Designing thoughtful products, brands, and systems with impact.",
    type: "website",
    images: [{ url: "/linkheader.png", width: 1200, height: 630, alt: "Mir Rezwan Navid portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mir Rezwan Navid — Product Thinker",
    description: "Designing thoughtful products, brands, and systems with impact.",
    images: ["/linkheader.png"],
  },
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
      <body className={neueMontreal.variable}>{children}</body>
    </html>
  );
}
