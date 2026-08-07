import type { Metadata } from "next";
import { ContactCTA } from "@/components/home/ContactCTA";
import { EditorialSiteHeader } from "@/components/home/EditorialSiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { WorkProjectBrowser } from "@/components/work/WorkProjectBrowser";
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
    <div className="home-page work-page-shell">
      <EditorialSiteHeader activeRoute="/work" />
      <main className="work-page">
        <JsonLd data={pageSchema(
          webPageSchema({ name: title, description, path: "/work", type: "CollectionPage" }),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }]),
          projectItemListSchema,
        )} />
        <WorkProjectBrowser />
        <ContactCTA variant="portfolio" />
      </main>
      <SiteFooter />
    </div>
  );
}
