import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["*", "OAI-SearchBot", "ChatGPT-User", "GPTBot", "PerplexityBot", "ClaudeBot", "Google-Extended"],
        allow: "/",
        disallow: ["/api/", "/work/*/full"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
