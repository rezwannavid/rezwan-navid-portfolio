import type { Metadata } from "next";
import { UnderDevelopmentLanding } from "@/components/home/UnderDevelopmentLanding";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, pageSchema, webPageSchema } from "@/lib/structuredData";
import { siteConfig } from "@/lib/site";

const title = siteConfig.title;
const description = siteConfig.description;

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/",
  keywords: ["Rezwan portfolio", "Rezwan Navid website", "Mir Rezwan Navid portfolio", "Product Brain", "Design Heart", "product strategy", "AI product design"],
  category: "Product Design",
});

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <JsonLd data={pageSchema(
        webPageSchema({ name: title, description, path: "/" }),
        breadcrumbSchema([{ name: "Home", path: "/" }]),
      )} />
      <UnderDevelopmentLanding />
    </>
  );
}
