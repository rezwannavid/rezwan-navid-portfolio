export const workCategories = [
  { id: "all", label: "All" },
  { id: "product-study", label: "Product Study" },
  { id: "interface", label: "Interface" },
  { id: "design-system", label: "Design System" },
  { id: "product-management", label: "Product Management" },
  { id: "brand", label: "Brand" },
] as const;

export type WorkCategory = (typeof workCategories)[number]["id"];

export type WorkProject = {
  number: string;
  title: string;
  pillLabel?: string;
  browserDescription: string;
  browserRole: string;
  shortDescription: string;
  categories: Exclude<WorkCategory, "all">[];
  categoryLabel: string;
  year: string;
  role: string;
  client: string;
  cover: string;
  thumbnail?: string;
  thumbnailAlt: string;
  href: string;
  slug: string;
  locked: boolean;
  protected: boolean;
  passwordIdentifier?: string;
  theme?: "checker" | "dark";
  seoTitle: string;
  seoDescription: string;
};

const project = (value: WorkProject) => value;

export const workProjects: WorkProject[] = [
  project({
    number: "01", title: "RideCentric+", browserDescription: "Enterprise mobility platform", browserRole: "Product Manager / Product Direction",
    shortDescription: "An enterprise mobility platform for corporate travel, events and transportation operations.", categories: ["product-study", "interface", "design-system"], categoryLabel: "Product Study", year: "2026", role: "Product Manager", client: "RideCentric",
    cover: "/home-design/project-ridecentric.png?v=2", thumbnail: "/home-design/project-ridecentric.png?v=2", thumbnailAlt: "RideCentric+ enterprise transportation operating system", href: "/work/ridecentric", slug: "ridecentric", locked: true, protected: true, passwordIdentifier: "RIDECENTRIC", theme: "dark",
    seoTitle: "RideCentric+ — Enterprise Mobility Product Design", seoDescription: "Designing an enterprise mobility platform for managing complex ride operations, events, teams and workflows at scale.",
  }),
  project({
    number: "02", title: "RideSync", browserDescription: "Transportation operations platform", browserRole: "Product Manager", shortDescription: "A connected transportation operations platform for dispatch, teams and ride coordination.", categories: ["product-study", "product-management"], categoryLabel: "Product Study", year: "2025", role: "Product Manager", client: "RideCentric",
    cover: "/home-design/thumb-dashboard.png?v=2", thumbnailAlt: "RideSync transportation operations dashboard", href: "/work/ridesync", slug: "ridesync", locked: true, protected: false, theme: "dark", seoTitle: "RideSync — Transportation Operations Platform", seoDescription: "A transportation operations platform designed for dispatch, teams and coordinated ride delivery.",
  }),
  project({
    number: "03", title: "10MS for Parents", browserDescription: "Parent trust experience", browserRole: "Product Executive / Product Strategy", shortDescription: "A parent-facing trust experience designed around visibility, confidence and learning outcomes.", categories: ["product-study", "interface"], categoryLabel: "Product Study", year: "2023", role: "Product Executive", client: "10 Minute School",
    cover: "/home-design/thumb-phone-green.png?v=2", thumbnailAlt: "10 Minute School parent experience", href: "/work/10ms-for-parents", slug: "10ms-for-parents", locked: true, protected: false, seoTitle: "10MS for Parents — Parent Trust Experience", seoDescription: "A parent-facing product experience centered on trust, visibility and learning outcomes.",
  }),
  project({
    number: "04", title: "Nav AI", browserDescription: "AI impact advisor", browserRole: "Product Manager", shortDescription: "An AI impact advisor that turns early ideas into structured product opportunities.", categories: ["product-study", "interface", "product-management"], categoryLabel: "AI Product", year: "2026", role: "Product Manager", client: "Independent",
    cover: "/home-design/project-navi-ai.png?v=2", thumbnailAlt: "Nav AI idea generation interface", href: "/work/nav-ai", slug: "nav-ai", locked: false, protected: false, theme: "dark", seoTitle: "Nav AI — AI Impact Advisor", seoDescription: "An AI impact advisor for turning early ideas into structured product opportunities.",
  }),
  project({
    number: "05", title: "EventFlow", browserDescription: "World Cup ride planning", browserRole: "Product Manager", shortDescription: "A focused ride-planning workflow for complex World Cup events and transportation teams.", categories: ["product-study", "interface"], categoryLabel: "Product Study", year: "2026", role: "Product Manager", client: "RideCentric",
    cover: "/home-design/project-trewhub.png?v=2", thumbnailAlt: "EventFlow event planning interface", href: "/work/eventflow", slug: "eventflow", locked: false, protected: false, seoTitle: "EventFlow — World Cup Ride Planning", seoDescription: "A ride-planning workflow for complex World Cup events and transportation teams.",
  }),
  project({
    number: "06", title: "RC Drivers App", pillLabel: "Drivers App", browserDescription: "Driver operations companion", browserRole: "Product Manager / Product Direction", shortDescription: "A focused mobile companion for professional drivers coordinating trips and updates.", categories: ["product-study", "interface", "product-management"], categoryLabel: "Product Study", year: "2026", role: "Product Manager", client: "RideCentric",
    cover: "/home-design/thumb-phone-coral.png?v=2", thumbnailAlt: "Professional driver operations mobile app", href: "/work/drivers-app", slug: "drivers-app", locked: false, protected: false, seoTitle: "RC Drivers App — Driver Operations Companion", seoDescription: "A mobile workflow helping professional drivers coordinate trips, communicate updates and stay on schedule.",
  }),
  project({
    number: "07", title: "Ruckus Games", browserDescription: "Multiplayer party games", browserRole: "Product Direction / Design Engineering", shortDescription: "A collection of fast, expressive multiplayer party games built for shared rooms.", categories: ["product-study", "interface"], categoryLabel: "Product Direction", year: "2026", role: "Product Direction", client: "Ruckus Games",
    cover: "/home-design/video-poster.png?v=1", thumbnailAlt: "Ruckus multiplayer party game experience", href: "/work/ruckus-games", slug: "ruckus-games", locked: false, protected: false, theme: "dark", seoTitle: "Ruckus Games — Multiplayer Party Games", seoDescription: "Product direction and design engineering for expressive multiplayer party games.",
  }),
  project({
    number: "08", title: "Fodo", browserDescription: "Tactile camera experiment", browserRole: "Product Design / Design Engineering", shortDescription: "A tactile camera experiment exploring physical-feeling controls and playful capture.", categories: ["interface"], categoryLabel: "Experiment", year: "2026", role: "Product Design", client: "Independent",
    cover: "/home-design/thumb-phone-pink.png?v=2", thumbnailAlt: "Fodo tactile camera experiment", href: "/work/fodo", slug: "fodo", locked: false, protected: false, seoTitle: "Fodo — Tactile Camera Experiment", seoDescription: "A tactile camera concept exploring physical-feeling controls and playful capture.",
  }),
  project({
    number: "09", title: "Gldn Route", browserDescription: "World Cup simulation", browserRole: "Product Direction / Design Engineering", shortDescription: "A World Cup mobility simulation for testing routes, timing and operational scenarios.", categories: ["product-study", "interface"], categoryLabel: "Simulation", year: "2026", role: "Product Direction", client: "Independent",
    cover: "/home-design/thumb-dashboard.png?v=2", thumbnailAlt: "Gldn Route World Cup mobility simulation", href: "/work/gldn-route", slug: "gldn-route", locked: false, protected: false, theme: "dark", seoTitle: "Gldn Route — World Cup Mobility Simulation", seoDescription: "A mobility simulation for testing World Cup routes, timing and operational scenarios.",
  }),
  project({
    number: "10", title: "Lazy", browserDescription: "Nutrition tracking concept", browserRole: "Product Exploration", shortDescription: "A low-friction nutrition concept designed around effortless everyday tracking.", categories: ["interface"], categoryLabel: "Product Exploration", year: "2025", role: "Product Exploration", client: "Independent",
    cover: "/home-design/thumb-phone-green.png?v=2", thumbnailAlt: "Lazy nutrition tracking concept", href: "/work/lazy", slug: "lazy", locked: false, protected: false, seoTitle: "Lazy — Nutrition Tracking Concept", seoDescription: "A low-friction nutrition concept designed around effortless everyday tracking.",
  }),
  project({
    number: "11", title: "Voyage", browserDescription: "Travel itinerary concept", browserRole: "Product Exploration", shortDescription: "A calm travel itinerary concept for shaping days, places and shared plans.", categories: ["interface"], categoryLabel: "Product Exploration", year: "2026", role: "Product Exploration", client: "Independent",
    cover: "/home-design/human-sky.png?v=2", thumbnailAlt: "Voyage travel itinerary concept", href: "/work/voyage", slug: "voyage", locked: false, protected: false, seoTitle: "Voyage — Travel Itinerary Concept", seoDescription: "A calm travel itinerary concept for shaping days, places and shared plans.",
  }),
  project({
    number: "12", title: "RideCentric Design System", pillLabel: "RC Design System v2", browserDescription: "Mobility design system", browserRole: "Lead Product Designer", shortDescription: "A scalable mobility design system connecting product patterns, tokens and teams.", categories: ["design-system", "interface"], categoryLabel: "Design System", year: "2024", role: "Lead Product Designer", client: "RideCentric",
    cover: "/home-design/project-ridecentric.png?v=2", thumbnailAlt: "RideCentric mobility design system", href: "/work/ridecentric-design-system", slug: "ridecentric-design-system", locked: false, protected: false, theme: "dark", seoTitle: "RideCentric Design System — Mobility Product Systems", seoDescription: "A scalable mobility design system connecting product patterns, tokens and teams.",
  }),
  project({
    number: "13", title: "TygrLabs", browserDescription: "Brand identity system", browserRole: "Product Designer", shortDescription: "A flexible identity system for a product studio working across strategy and technology.", categories: ["brand", "design-system"], categoryLabel: "Brand", year: "2023", role: "Product Designer", client: "TygrLabs",
    cover: "/home-design/experience-banner.png?v=2", thumbnailAlt: "TygrLabs brand identity system", href: "/work/tygrlabs", slug: "tygrlabs", locked: false, protected: false, seoTitle: "TygrLabs — Brand Identity System", seoDescription: "A flexible identity system for a product studio working across strategy and technology.",
  }),
  project({
    number: "14", title: "Global Mission Summit", pillLabel: "GMS 2025", browserDescription: "Impact summit identity", browserRole: "Product Manager / Creative Direction", shortDescription: "A coherent summit identity and digital experience for a global impact gathering.", categories: ["brand", "interface", "product-management"], categoryLabel: "Brand", year: "2025", role: "Product Manager", client: "Global Mission Summit",
    cover: "/home-design/project-trewhub.png?v=2", thumbnailAlt: "Global Mission Summit identity and digital experience", href: "/work/global-mission-summit", slug: "global-mission-summit", locked: false, protected: false, seoTitle: "GMS 2025 — Impact Summit Identity", seoDescription: "A coherent summit identity and digital experience for a global impact gathering.",
  }),
];

export const getWorkProject = (slug: string) => workProjects.find((item) => item.slug === slug);
