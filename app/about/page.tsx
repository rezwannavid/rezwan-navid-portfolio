import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";
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

  return <>
    <JsonLd data={pageSchema(
      profilePage,
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
    )} />
    <AboutPageContent />
  </>;
}
