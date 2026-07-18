export const siteConfig = {
  url: "https://rezwannavid.me",
  name: "Mir Rezwan Navid",
  shortName: "Rezwan Navid",
  alternateNames: ["Rezwan Navid", "Rezwan", "Mir Navid"],
  applicationName: "Rezwan Navid Portfolio",
  description: "Mir Rezwan Navid is a product designer and product manager in Dhaka, Bangladesh, creating digital products, design systems, brands, and AI-enabled experiences.",
  email: "hello@rezwannavid.me",
  locale: "en_US",
  language: "en",
  location: {
    city: "Dhaka",
    country: "Bangladesh",
    countryCode: "BD",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/rezwannavid",
    medium: "https://medium.com/@rezwannavid",
    github: "https://github.com/rezwannavid",
    instagram: "https://instagram.com/rezwannavid",
  },
  twitterHandle: "@rezwannavid",
  personImage: "/mir-rezwan-navid-portrait.svg",
  logo: "/rezwan-navid-logo.svg",
  openGraphImage: {
    url: "/rezwan-navid-portfolio-og.png",
    width: 1200,
    height: 630,
    alt: "Mir Rezwan Navid — product designer and product manager portfolio",
  },
  knowsAbout: [
    "Product design",
    "UX design",
    "UI design",
    "Product management",
    "Design systems",
    "Interaction design",
    "User research",
    "Prototyping",
    "Brand systems",
    "AI product design",
    "Figma",
  ],
} as const;

export const projects = [
  { title: "RideCentric+", year: "2026", slug: "ridecentric" },
  { title: "Global Mission Institute", year: "2026", slug: "global-mission-institute" },
  { title: "Drivers App", year: "2025", slug: "drivers-app" },
  { title: "RideSync", year: "2024", slug: "ridesync" },
  { title: "Ruckus Games", year: "2026", slug: "ruckus-games" },
  { title: "Kivo", year: "2026", slug: "kivo" },
  { title: "Hobbit", year: "2026", slug: "hobbit" },
  { title: "TygrLabs", year: "2024", slug: "tygrlabs" },
  { title: "Global Mission Summit", year: "2025", slug: "global-mission-summit" },
] as const;

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString();
export const socialProfiles = Object.values(siteConfig.social);
