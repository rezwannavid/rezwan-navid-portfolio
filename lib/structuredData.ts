import { absoluteUrl, projects, siteConfig, socialProfiles } from "@/lib/site";

export const schemaIds = {
  person: `${siteConfig.url}/#person`,
  website: `${siteConfig.url}/#website`,
};

export const personSchema = {
  "@type": "Person",
  "@id": schemaIds.person,
  name: siteConfig.name,
  alternateName: siteConfig.alternateNames,
  jobTitle: ["Product Designer", "UX Designer", "UI Designer", "Product Manager"],
  description: siteConfig.description,
  url: siteConfig.url,
  image: absoluteUrl(siteConfig.personImage),
  email: `mailto:${siteConfig.email}`,
  homeLocation: {
    "@type": "Place",
    name: `${siteConfig.location.city}, ${siteConfig.location.country}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.countryCode,
    },
  },
  knowsAbout: siteConfig.knowsAbout,
  sameAs: socialProfiles,
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": schemaIds.website,
  url: siteConfig.url,
  name: siteConfig.applicationName,
  alternateName: `${siteConfig.shortName} Website`,
  description: siteConfig.description,
  inLanguage: siteConfig.language,
  publisher: { "@id": schemaIds.person },
};

export const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [personSchema, websiteSchema],
};

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageSchema({ name, description, path, type = "WebPage" }: { name: string; description: string; path: string; type?: string }) {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": schemaIds.website },
    about: { "@id": schemaIds.person },
    author: { "@id": schemaIds.person },
    primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(siteConfig.openGraphImage.url) },
  };
}

export const projectItemListSchema = {
  "@type": "ItemList",
  name: "Selected product design projects by Mir Rezwan Navid",
  numberOfItems: projects.length,
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(`/work/${project.slug}`),
    name: project.title,
  })),
};

export const pageSchema = (...nodes: unknown[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
