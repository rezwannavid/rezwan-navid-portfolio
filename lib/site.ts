export const siteConfig = {
  url: "https://rezwannavid.me",
  name: "Mir Rezwan Navid",
  title: "Mir Rezwan Navid | Product Brain, Design Heart",
  shortName: "Mir Rezwan Navid",
  alternateNames: ["Rezwan Navid", "Rezwan", "Mir Navid"],
  applicationName: "Mir Rezwan Navid",
  description: "Mir Rezwan Navid combines product strategy, thoughtful design, business insight, and AI to turn complex problems into intuitive, scalable digital experiences.",
  email: "m.rezwannavid@gmail.com",
  locale: "en_US",
  language: "en",
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
    alt: "Mir Rezwan Navid | Product Brain, Design Heart",
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

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString();
export const socialProfiles = Object.values(siteConfig.social);
