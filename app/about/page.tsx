import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, pageSchema, personSchema, webPageSchema } from "@/lib/structuredData";

const title = "About Mir Rezwan Navid — Product Designer in Dhaka";
const description = "Learn about Mir Rezwan Navid, a product designer and product manager based in Dhaka, Bangladesh, focused on useful digital products, design systems, and brands.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/about",
  keywords: ["about Rezwan Navid", "Rezwan designer", "product designer in Dhaka", "product manager in Bangladesh"],
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
    <h1>About page coming soon.</h1>
    <Link href="/">Visit Rezwan Navid’s homepage</Link>
  </main>;
}
