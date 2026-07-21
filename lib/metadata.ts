import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

const sharedKeywords = [
  "Rezwan Navid",
  "Mir Rezwan Navid",
  "product designer",
  "UX designer",
  "UI designer",
  "product manager",
  "product design portfolio",
];

export const sharedRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  nocache: false,
  googleBot: {
    index: true,
    follow: true,
    noimageindex: false,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  category?: string;
  image?: typeof siteConfig.openGraphImage;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  category = "Design",
  image = siteConfig.openGraphImage,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image.url);

  return {
    title,
    description,
    applicationName: siteConfig.applicationName,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category,
    referrer: "origin-when-cross-origin",
    keywords: [...new Set([...sharedKeywords, ...keywords])],
    alternates: { canonical },
    robots: sharedRobots,
    openGraph: {
      title: siteConfig.title,
      description: siteConfig.description,
      url: canonical,
      type: "website",
      siteName: siteConfig.applicationName,
      locale: siteConfig.locale,
      images: [{ ...image, url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      creator: siteConfig.twitterHandle,
      images: [{ url: imageUrl, alt: image.alt }],
    },
  };
}
