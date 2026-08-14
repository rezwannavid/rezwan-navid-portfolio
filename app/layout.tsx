import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTransitionLayer } from "@/components/motion/PageTransitionLayer";
import { ProjectTransitionProvider } from "@/components/motion/ProjectTransition";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { GlobalNavbar } from "@/components/layout/GlobalNavbar";
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
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" }],
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
  themeColor: "#040404",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${neueMontreal.variable} ${fraunces.variable} ${neueMontreal.className}`}>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-EC75HX0L8X" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EC75HX0L8X');
        `}</Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "y1sysb8aaq");
        `}</Script>
        <JsonLd data={globalSchema} />
        <GlobalNavbar />
        <div className="app-shell">
          <SmoothScrollProvider>
            <ProjectTransitionProvider>
              <PageTransitionLayer />
              {children}
            </ProjectTransitionProvider>
          </SmoothScrollProvider>
        </div>
      </body>
    </html>
  );
}
