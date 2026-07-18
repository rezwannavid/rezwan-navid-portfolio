import type { Metadata } from "next";
import { ConnectSection } from "@/components/home/ConnectSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PortfolioDownload } from "@/components/portfolio/PortfolioDownload";

export const metadata: Metadata = {
  title: "Portfolio 2026 — Mir Rezwan Navid",
  description: "Download Mir Rezwan Navid’s 2026 product design portfolio.",
};

export default function PortfolioPage() {
  return (
    <>
      <SiteHeader />
      <main className="portfolio-page">
        <PortfolioDownload />
        <ConnectSection />
      </main>
      <SiteFooter />
    </>
  );
}
