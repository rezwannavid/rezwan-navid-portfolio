import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Opinion",
  description: "Writing and opinions by Mir Rezwan Navid on product, design, technology, and culture.",
  path: "/opinion",
});

export default function OpinionPage() {
  return <div className="home-page"><main className="placeholder-page"><h1>Opinion</h1><p>Writing and ideas are coming soon.</p></main><SiteFooter /></div>;
}
