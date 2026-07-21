import type { Metadata } from "next";
import { ConnectSection } from "@/components/home/ConnectSection";
import { DesignPhilosophy } from "@/components/home/DesignPhilosophy";
import { HeroSection } from "@/components/home/HeroSection";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, pageSchema, projectItemListSchema, webPageSchema } from "@/lib/structuredData";
import { siteConfig } from "@/lib/site";

const title = "Mir Rezwan Navid — Product Designer in Dhaka";
const description = siteConfig.description;

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/",
  keywords: ["Rezwan portfolio", "Rezwan Navid website", "UX designer in Dhaka", "UI designer in Bangladesh", "product manager in Asia"],
  category: "Product Design",
});

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <JsonLd data={pageSchema(
          webPageSchema({ name: title, description, path: "/" }),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          projectItemListSchema,
        )} />
        <HeroSection />
        <ProjectGrid />
        <DesignPhilosophy />
        <ConnectSection />
      </main>
      <SiteFooter />
    </>
  );
}
