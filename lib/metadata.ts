import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

const sharedKeywords = [
  "Rezwan Navid",
  "Mir Rezwan Navid",
  "Product Designer",
  "Design Engineer",
  "Product Thinker",
  "Product Design",
  "Product Strategy",
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
  openGraphDescription?: string;
  indexable?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  category = "Design",
  image = siteConfig.openGraphImage,
  openGraphDescription = description,
  indexable = true,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image.url);
  const socialTitle = path === "/" ? title : `${title}, ${siteConfig.name}`;

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
    robots: indexable ? sharedRobots : { index: false, follow: false, nocache: true },
    openGraph: {
      title: socialTitle,
      description: openGraphDescription,
      url: canonical,
      type: "website",
      siteName: siteConfig.applicationName,
      locale: siteConfig.locale,
      images: [{ ...image, url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: openGraphDescription,
      creator: siteConfig.twitterHandle,
      images: [{ url: imageUrl, alt: image.alt }],
    },
  };
}
