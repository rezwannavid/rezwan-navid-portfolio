import type { Metadata } from "next";
import { ConnectSection } from "@/components/home/ConnectSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PortfolioDownload } from "@/components/portfolio/PortfolioDownload";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, pageSchema, schemaIds, webPageSchema } from "@/lib/structuredData";
import { absoluteUrl } from "@/lib/site";
import { getPortfolioPdfMetadata } from "@/lib/portfolioPdf";

const title = "Product Design Portfolio 2026 — Rezwan Navid";
const description = "View and download Mir Rezwan Navid’s 2026 product design portfolio featuring product studies, design systems, AI exploration, and product thinking.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/portfolio",
  keywords: ["Rezwan Navid portfolio", "Rezwan portfolio", "product designer portfolio", "product design portfolio", "UX portfolio PDF"],
  category: "Product Design Portfolio",
});

export default function PortfolioPage() {
  const pdf = getPortfolioPdfMetadata();
  const portfolioSchema = {
    "@type": "CreativeWork",
    "@id": `${absoluteUrl("/portfolio")}#portfolio`,
    name: title,
    description,
    genre: "Product design portfolio",
    creator: { "@id": schemaIds.person },
    dateModified: "2026-07-18",
    inLanguage: "en",
    url: absoluteUrl("/portfolio"),
    associatedMedia: {
      "@type": "MediaObject",
      contentUrl: absoluteUrl(pdf.href),
      contentSize: pdf.fileSize,
      encodingFormat: "application/pdf",
    },
  };

  return (
    <>
      <SiteHeader />
      <main className="portfolio-page">
        <JsonLd data={pageSchema(
          webPageSchema({ name: title, description, path: "/portfolio", type: "CollectionPage" }),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }]),
          portfolioSchema,
        )} />
        <PortfolioDownload />
        <ConnectSection />
      </main>
      <SiteFooter />
    </>
  );
}
