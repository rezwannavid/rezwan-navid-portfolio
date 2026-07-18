import type { MetadataRoute } from "next";
import { absoluteUrl, projects } from "@/lib/site";

const lastModified = new Date("2026-07-18T00:00:00+06:00");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/work"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/portfolio"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
