import type { Metadata } from "next";
import { UnderDevelopmentLanding } from "@/components/home/UnderDevelopmentLanding";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, pageSchema, webPageSchema } from "@/lib/structuredData";

const title = "Mir Rezwan Navid — Portfolio in Development";
const description = "Mir Rezwan Navid is a product designer and product thinker based in Dhaka, Bangladesh. His new portfolio is currently in development.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/",
  keywords: ["Rezwan portfolio", "Rezwan Navid website", "Mir Rezwan Navid portfolio", "product designer in Dhaka"],
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
