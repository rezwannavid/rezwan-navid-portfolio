import type { Metadata } from "next";
import { ConnectSection } from "@/components/home/ConnectSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { WorkArchive } from "@/components/work/WorkArchive";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, pageSchema, projectItemListSchema, webPageSchema } from "@/lib/structuredData";

const title = "Product Design Work and Case Studies — Rezwan Navid";
const description = "Explore selected product strategy, UX, UI, design-system, branding, and AI projects by Mir Rezwan Navid.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/work",
  keywords: ["Rezwan Navid projects", "Rezwan Navid case study", "product design case studies", "UX portfolio", "UI portfolio"],
  category: "Design Portfolio",
});

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main className="work-page">
        <JsonLd data={pageSchema(
          webPageSchema({ name: title, description, path: "/work", type: "CollectionPage" }),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }]),
          projectItemListSchema,
        )} />
        <WorkArchive />
        <ConnectSection />
      </main>
      <SiteFooter />
    </>
  );
}
