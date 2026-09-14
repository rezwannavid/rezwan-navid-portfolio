import type { Metadata } from "next";
import { PhotographyGallery } from "@/components/photography/PhotographyGallery";
import { createPageMetadata } from "@/lib/metadata";
import { getPhotographyGallery } from "@/lib/photographyGallery";

export const metadata: Metadata = createPageMetadata({
  title: "Photography",
  description: "Photography by Mir Rezwan Navid.",
  path: "/photography",
});

export default function PhotographyPage() {
  return <PhotographyGallery items={getPhotographyGallery()} />;
}
