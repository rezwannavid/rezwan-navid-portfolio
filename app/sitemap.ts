import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const lastModified = new Date("2026-07-22T00:00:00+06:00");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
  ];
}
