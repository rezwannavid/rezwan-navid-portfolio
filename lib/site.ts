export const siteConfig = {
  url: "https://rezwannavid.me",
  name: "Mir Rezwan Navid",
  title: "Mir Rezwan Navid — Product Designer & Design Engineer",
  shortName: "Mir Rezwan Navid",
  alternateNames: ["Rezwan Navid"],
  applicationName: "Mir Rezwan Navid",
  description: "Product designer and design engineer working across strategy, UX, systems and AI-enabled products. Explore selected products, case studies and ideas by Mir Rezwan Navid.",
  entityDescription: "Mir Rezwan Navid is a product designer and design engineer working across product strategy, UX, systems, technology and AI-enabled products.",
  socialDescription: "I build products where business strategy, design and technology intersect.",
  jobTitle: "Product Designer & Design Engineer",
  secondaryRole: "Product Thinker",
  email: "hello@rezwannavid.me",
  locale: "en_US",
  language: "en",
  social: {
    linkedin: "https://www.linkedin.com/in/rezwannavid",
    medium: "https://medium.com/@rezwannavidalvee",
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
    alt: "Mir Rezwan Navid — Product Designer & Design Engineer",
  },
  knowsAbout: [
    "Product Design",
    "Design Engineering",
    "Product Strategy",
    "User Experience Design",
    "Product Management",
    "Design Systems",
    "Frontend Prototyping",
    "AI-Enabled Products",
    "Systems Thinking",
    "Interaction Design",
    "Product Discovery",
  ],
} as const;

export const projects = [
  { title: "RideCentric+", year: "2025", slug: "ridecentric", indexable: false },
  { title: "Global Mission Institute", year: "2026", slug: "global-mission-institute", indexable: true },
  { title: "Drivers App", year: "2025", slug: "drivers-app", indexable: true },
  { title: "RideSync", year: "2024", slug: "ridesync", indexable: false },
  { title: "Ruckus Games", year: "2026", slug: "ruckus-games", indexable: false },
  { title: "Kivo", year: "2026", slug: "kivo", indexable: false },
  { title: "Hobbit", year: "2026", slug: "hobbit", indexable: false },
  { title: "TygrLabs", year: "2024", slug: "tygrlabs", indexable: false },
  { title: "Global Mission Summit", year: "2025", slug: "global-mission-summit", indexable: false },
] as const;

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString();
export const socialProfiles = [siteConfig.social.linkedin, siteConfig.social.github, siteConfig.social.medium];
