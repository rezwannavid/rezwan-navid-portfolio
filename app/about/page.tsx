import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, pageSchema, personSchema, webPageSchema } from "@/lib/structuredData";

const title = "About";
const description = "Learn how Mir Rezwan Navid approaches product design, design engineering, strategy, systems and AI-enabled products.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/about",
  keywords: ["About Mir Rezwan Navid", "Product Designer", "Design Engineer", "Product Thinker"],
  category: "Professional Profile",
});

export default function AboutPage() {
  const profilePage = {
    ...webPageSchema({ name: title, description, path: "/about", type: "ProfilePage" }),
    mainEntity: { "@id": personSchema["@id"] },
  };

  return <main className="placeholder-page">
    <JsonLd data={pageSchema(
      profilePage,
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
    )} />
    <h1>About Mir Rezwan Navid</h1>
    <p>Mir Rezwan Navid is a product designer and design engineer working where business strategy, design and technology intersect.</p>
    <p>A fuller profile is coming soon.</p>
    <Link href="/work">Explore selected work</Link>
  </main>;
}
