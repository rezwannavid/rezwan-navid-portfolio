import type { Metadata } from "next";
import { PortfolioHomepage } from "@/components/home/PortfolioHomepage";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, pageSchema, projectItemListSchema, webPageSchema } from "@/lib/structuredData";
import { siteConfig } from "@/lib/site";

const title = siteConfig.title;
const description = siteConfig.description;

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/",
  keywords: ["Rezwan portfolio", "Rezwan Navid website", "Product Brain", "Design Heart", "product strategy", "AI product design"],
  category: "Product Design",
});

export default function HomePage() {
  return (
    <>
      <main className="home-page">
        <JsonLd data={pageSchema(
          webPageSchema({ name: title, description, path: "/" }),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          projectItemListSchema,
        )} />
        <PortfolioHomepage />
      </main>
    </>
  );
}
