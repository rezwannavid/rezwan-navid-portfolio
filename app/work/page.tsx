import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, pageSchema, projectItemListSchema, webPageSchema } from "@/lib/structuredData";

const title = "Product Design Work and Case Studies — Rezwan Navid";
const description = "Explore selected product design, UX, UI, product management, design-system, branding, and AI projects by Mir Rezwan Navid in Dhaka, Bangladesh.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/work",
  keywords: ["Rezwan Navid projects", "Rezwan Navid case study", "product design case studies", "UX portfolio", "UI portfolio"],
  category: "Design Portfolio",
});

export default function WorkPage() {
  return <main className="placeholder-page">
    <JsonLd data={pageSchema(
      webPageSchema({ name: title, description, path: "/work", type: "CollectionPage" }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }]),
      projectItemListSchema,
    )} />
    <h1>Work archive coming soon.</h1>
    <Link href="/">Visit Rezwan Navid’s homepage</Link>
  </main>;
}
