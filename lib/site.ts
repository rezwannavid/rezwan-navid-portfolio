import { allProjects } from "@/lib/projectRegistry";

export const siteConfig = {
  url: "https://rezwannavid.me",
  name: "Mir Rezwan Navid",
  title: "Mir Rezwan Navid, Design Engineer, Product Thinker",
  shortName: "Mir Rezwan Navid",
  alternateNames: ["Rezwan Navid"],
  applicationName: "Mir Rezwan Navid",
  description: "Product designer and design engineer working across strategy, UX, systems and AI-enabled products. Explore selected products, case studies and ideas by Mir Rezwan Navid.",
  entityDescription: "Mir Rezwan Navid is a product designer and design engineer working across product strategy, UX, systems, technology and AI-enabled products.",
  socialDescription: "I build products where business strategy, design and technology intersect.",
  jobTitle: "Design Engineer, Product Thinker",
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
    alt: "Mir Rezwan Navid, Design Engineer, Product Thinker",
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

export const projects = allProjects.map(({ title, year, slug, indexable }) => ({ title, year, slug, indexable }));

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString();
export const socialProfiles = [siteConfig.social.linkedin, siteConfig.social.github, siteConfig.social.medium];
