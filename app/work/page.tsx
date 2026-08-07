import type { Metadata } from "next";
import { ConnectSection } from "@/components/home/ConnectSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { WorkArchive } from "@/components/work/WorkArchive";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, pageSchema, projectItemListSchema, webPageSchema } from "@/lib/structuredData";

const title = "Selected Work";
const description = "Explore product design, design engineering, product strategy, AI and systems-oriented work by Mir Rezwan Navid.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/work",
  keywords: ["Rezwan Navid projects", "Product Design case studies", "Design Engineering portfolio", "AI Product Design"],
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
