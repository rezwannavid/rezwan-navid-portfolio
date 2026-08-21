import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Opinion",
  description: "Writing and opinions by Mir Rezwan Navid on product, design, technology, and culture.",
  path: "/opinion",
  indexable: false,
});

export default function OpinionPage() {
  notFound();
}
