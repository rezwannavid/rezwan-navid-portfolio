export type ProjectId =
  | "ridecentric"
  | "ridesync"
  | "10ms-for-parents"
  | "eventflow"
  | "drivers-app"
  | "ruckus-games"
  | "fodo"
  | "gmi-companion"
  | "gldn-route"
  | "lazy"
  | "voyage"
  | "ridecentric-design-system"
  | "tygrlabs"
  | "global-mission-summit";

export type ProjectCategory = "product-study" | "interface" | "design-system" | "product-management" | "brand" | "ai";

export type ProjectDefinition = {
  id: ProjectId;
  slug: string;
  title: string;
  pillLabel?: string;
  shortDescription: string;
  role: string;
  year: string;
  timeline?: string;
  platform?: string;
  focus?: string[];
  projectType?: "client" | "personal" | "experimental" | "ai";
  productType?: string;
  waitlist?: string;
  madeWith?: string[];
  href: string;
  protected: boolean;
  hero: string;
  thumbnail?: string;
  featuredThumbnail?: string;
  workCover?: string;
  nextProjectId?: ProjectId;
  placeholder: boolean;
  thumbnailAlt: string;
  categories: ProjectCategory[];
  categoryLabel: string;
  client: string;
  locked: boolean;
  theme?: "checker" | "dark";
  indexable: boolean;
  seoTitle: string;
  seoDescription: string;
};

export type ResolvedProject = ProjectDefinition & {
  transitionId: string;
  resolvedThumbnail: string;
  resolvedFeaturedThumbnail: string;
  resolvedWorkCover: string;
};

const definitions: Record<ProjectId, ProjectDefinition> = {
  ridecentric: {
    id: "ridecentric", slug: "ridecentric", title: "RideCentric+", shortDescription: "An enterprise mobility platform for corporate travel, events and transportation operations.", role: "Product Manager / Product Direction", year: "2026", href: "/work/ridecentric", protected: true,
    hero: "/home-design/project-ridecentric.png?v=2", featuredThumbnail: "/home-design/mobile-project-ridecentric.png", placeholder: false, thumbnailAlt: "RideCentric+ enterprise transportation operating system", categories: ["product-study", "interface", "design-system"], categoryLabel: "Product Study", client: "RideCentric", locked: true, theme: "dark", indexable: false,
    seoTitle: "RideCentric+ — Enterprise Mobility Product Design", seoDescription: "Designing an enterprise mobility platform for managing complex ride operations, events, teams and workflows at scale.",
  },
  ridesync: {
    id: "ridesync", slug: "ridesync", title: "RideSync", shortDescription: "A connected transportation operations platform for dispatch, teams and ride coordination.", role: "Product Manager", year: "2025", href: "/work/ridesync", protected: false,
    hero: "/home-design/thumb-dashboard.png?v=2", placeholder: true, thumbnailAlt: "RideSync transportation operations dashboard", categories: ["product-study", "product-management"], categoryLabel: "Product Study", client: "RideCentric", locked: true, theme: "dark", indexable: false,
    seoTitle: "RideSync — Transportation Operations Platform", seoDescription: "A transportation operations platform designed for dispatch, teams and coordinated ride delivery.",
  },
  "10ms-for-parents": {
    id: "10ms-for-parents", slug: "10ms-for-parents", title: "10MS for Parents", shortDescription: "A parent-facing trust experience designed around visibility, confidence and learning outcomes.", role: "Product Executive / Product Strategy", year: "2023", href: "/work/10ms-for-parents", protected: false,
    hero: "/home-design/thumb-phone-green.png?v=2", placeholder: true, thumbnailAlt: "10 Minute School parent experience", categories: ["product-study", "interface"], categoryLabel: "Product Study", client: "10 Minute School", locked: true, indexable: false,
    seoTitle: "10MS for Parents — Parent Trust Experience", seoDescription: "A parent-facing product experience centered on trust, visibility and learning outcomes.",
  },
  eventflow: {
    id: "eventflow", slug: "eventflow", title: "EventFlow", shortDescription: "An event-aware transportation planning extension for the FIFA World Cup.", role: "Product Manager - Experience", year: "2026", href: "/work/eventflow", protected: false,
    hero: "/Eventflow Pictures/EventFlow 01.png", featuredThumbnail: "/home-design/mobile-project-eventflow.png", nextProjectId: "ridecentric", placeholder: false, thumbnailAlt: "EventFlow World Cup match planning experience", categories: ["product-study", "interface"], categoryLabel: "Product Study", client: "RideCentric", locked: false, indexable: true,
    seoTitle: "EventFlow — World Cup Ride Planning", seoDescription: "An event-aware transportation planning extension helping World Cup fans coordinate venues, pickup timing and post-match journeys.",
  },
  "drivers-app": {
    id: "drivers-app", slug: "drivers-app", title: "Drivers App", pillLabel: "Drivers App", shortDescription: "A focused mobile companion for professional drivers coordinating trips and updates.", role: "Product Manager - Experience", year: "2026", href: "/work/drivers-app", protected: false,
    hero: "/Drivers App Pictures/Drivers Hero.png", nextProjectId: "ridecentric", placeholder: false, thumbnailAlt: "RC Drivers app displayed on a phone beside architectural panels", categories: ["product-study", "interface", "product-management"], categoryLabel: "Product Study", client: "RideCentric", locked: false, indexable: true,
    seoTitle: "RC Drivers App — Driver Operations Companion", seoDescription: "A mobile workflow helping professional drivers coordinate trips, communicate updates and stay on schedule.",
  },
  "ruckus-games": {
    id: "ruckus-games", slug: "ruckus-games", title: "Ruckus Games", shortDescription: "A free multiplayer party-game platform that makes game nights effortless.", role: "Product Direction / Design Engineering", year: "2026", timeline: "3 weeks", projectType: "ai", productType: "Product Exploration with AI", madeWith: ["Claude", "Cursor", "Vercel", "Figma", "Railway", "v0"], href: "/work/ruckus-games", protected: false,
    hero: "/Ruckus Games Pictures/EventFlow 01.png", nextProjectId: "ridecentric", placeholder: false, thumbnailAlt: "Ruckus multiplayer party game experience on a phone", categories: ["ai"], categoryLabel: "AI", client: "Ruckus Games", locked: false, theme: "dark", indexable: true,
    seoTitle: "Ruckus Games — Multiplayer Party Games", seoDescription: "Product direction and design engineering for expressive multiplayer party games.",
  },
  fodo: {
    id: "fodo", slug: "fodo", title: "Fodo", shortDescription: "A tactile camera experiment exploring physical-feeling controls and playful capture.", role: "Independent", year: "2026", timeline: "3 weeks", platform: "iOS", focus: ["Interaction Design", "Prototyping", "Skeuomorphism"], projectType: "personal", productType: "Product Exploration with AI", waitlist: "100+ in Waitlist", madeWith: ["Claude", "Cursor", "SwiftUI", "Figma", "Adobe After Effects"], href: "/work/fodo", protected: false,
    hero: "/Fodo Pictures/Header.png", nextProjectId: "ridecentric", placeholder: false, thumbnailAlt: "Fodo tactile camera interface held against a sunset landscape", categories: ["interface"], categoryLabel: "Personal Project", client: "Independent", locked: false, indexable: true,
    seoTitle: "Fodo — Tactile Camera Experiment", seoDescription: "A tactile camera concept exploring physical-feeling controls and playful capture.",
  },
  "gmi-companion": {
    id: "gmi-companion", slug: "gmi-companion", title: "GMI Companion", shortDescription: "A connected product experience bringing guidance, resources, organizational context, and AI-powered support together.", role: "Design Direction / Interface Design", year: "2026", platform: "Web, Mobile", href: "/work/gmi-companion", protected: false,
    hero: "/GMI Companion Pictures/Hero.png", nextProjectId: "ridecentric", placeholder: false, thumbnailAlt: "GMI Companion identity across a red and blue motion gradient", categories: ["product-study", "interface", "brand", "ai"], categoryLabel: "Product Study", client: "GMI", locked: false, theme: "dark", indexable: true,
    seoTitle: "GMI Companion — Connected Mission-Driven Product Experience", seoDescription: "Design direction, interface design, brand, and motion for GMI Companion, a connected support experience for mission-driven organizations.",
  },
  "gldn-route": {
    id: "gldn-route", slug: "gldn-route", title: "Gldn Route", shortDescription: "A World Cup mobility simulation for testing routes, timing and operational scenarios.", role: "Product Direction / Design Engineering", year: "2026", href: "/work/gldn-route", protected: false,
    hero: "/home-design/thumb-dashboard.png?v=2", placeholder: true, thumbnailAlt: "Gldn Route World Cup mobility simulation", categories: ["product-study", "interface"], categoryLabel: "Simulation", client: "Independent", locked: false, theme: "dark", indexable: false,
    seoTitle: "Gldn Route — World Cup Mobility Simulation", seoDescription: "A mobility simulation for testing World Cup routes, timing and operational scenarios.",
  },
  lazy: {
    id: "lazy", slug: "lazy", title: "Lazy", shortDescription: "A low-friction nutrition concept designed around effortless everyday tracking.", role: "Product Exploration", year: "2025", href: "/work/lazy", protected: false,
    hero: "/home-design/thumb-phone-green.png?v=2", placeholder: true, thumbnailAlt: "Lazy nutrition tracking concept", categories: ["interface"], categoryLabel: "Product Exploration", client: "Independent", locked: false, indexable: false,
    seoTitle: "Lazy — Nutrition Tracking Concept", seoDescription: "A low-friction nutrition concept designed around effortless everyday tracking.",
  },
  voyage: {
    id: "voyage", slug: "voyage", title: "Voyage", shortDescription: "A calm travel itinerary concept for shaping days, places and shared plans.", role: "Product Exploration", year: "2026", href: "/work/voyage", protected: false,
    hero: "/home-design/human-sky.png?v=2", placeholder: true, thumbnailAlt: "Voyage travel itinerary concept", categories: ["interface"], categoryLabel: "Product Exploration", client: "Independent", locked: false, indexable: false,
    seoTitle: "Voyage — Travel Itinerary Concept", seoDescription: "A calm travel itinerary concept for shaping days, places and shared plans.",
  },
  "ridecentric-design-system": {
    id: "ridecentric-design-system", slug: "ridecentric-design-system", title: "RideCentric Design System", pillLabel: "RC Design System v2", shortDescription: "A scalable mobility design system connecting product patterns, tokens and teams.", role: "Lead Product Designer", year: "2024", href: "/work/ridecentric-design-system", protected: false,
    hero: "/home-design/project-ridecentric.png?v=2", placeholder: true, thumbnailAlt: "RideCentric mobility design system", categories: ["design-system", "interface"], categoryLabel: "Design System", client: "RideCentric", locked: false, theme: "dark", indexable: false,
    seoTitle: "RideCentric Design System — Mobility Product Systems", seoDescription: "A scalable mobility design system connecting product patterns, tokens and teams.",
  },
  tygrlabs: {
    id: "tygrlabs", slug: "tygrlabs", title: "TygrLabs", shortDescription: "A flexible identity system for a product studio working across strategy and technology.", role: "Product Designer", year: "2023", href: "/work/tygrlabs", protected: false,
    hero: "/home-design/experience-banner.png?v=2", placeholder: true, thumbnailAlt: "TygrLabs brand identity system", categories: ["brand", "design-system"], categoryLabel: "Brand", client: "TygrLabs", locked: false, indexable: false,
    seoTitle: "TygrLabs — Brand Identity System", seoDescription: "A flexible identity system for a product studio working across strategy and technology.",
  },
  "global-mission-summit": {
    id: "global-mission-summit", slug: "global-mission-summit", title: "Global Mission Summit", pillLabel: "GMS 2025", shortDescription: "A coherent summit identity and digital experience for a global impact gathering.", role: "Product Manager / Creative Direction", year: "2025", href: "/work/global-mission-summit", protected: false,
    hero: "/home-design/project-trewhub.png?v=2", placeholder: true, thumbnailAlt: "Global Mission Summit identity and digital experience", categories: ["brand", "interface", "product-management"], categoryLabel: "Brand", client: "Global Mission Summit", locked: false, indexable: false,
    seoTitle: "GMS 2025 — Impact Summit Identity", seoDescription: "A coherent summit identity and digital experience for a global impact gathering.",
  },
};

const resolveProject = (project: ProjectDefinition): ResolvedProject => {
  const resolvedThumbnail = project.thumbnail ?? project.hero;
  return {
    ...project,
    transitionId: `project-transition-${project.slug}`,
    resolvedThumbnail,
    resolvedFeaturedThumbnail: project.featuredThumbnail ?? resolvedThumbnail,
    resolvedWorkCover: project.workCover ?? resolvedThumbnail,
  };
};

export const projectIds = Object.keys(definitions) as ProjectId[];
export const projectRegistry = Object.fromEntries(projectIds.map((id) => [id, resolveProject(definitions[id])])) as Record<ProjectId, ResolvedProject>;
export const allProjects = projectIds.map((id) => projectRegistry[id]);

export function getProject(idOrSlug: string) {
  return projectRegistry[idOrSlug as ProjectId] ?? allProjects.find((project) => project.slug === idOrSlug);
}

export function getProjectThumbnail(id: ProjectId) {
  return projectRegistry[id].resolvedThumbnail;
}

export function getProjectFeaturedThumbnail(id: ProjectId) {
  return projectRegistry[id].resolvedFeaturedThumbnail;
}

export function getProjectWorkCover(id: ProjectId) {
  return projectRegistry[id].resolvedWorkCover;
}

export const featuredProjectIds: ProjectId[] = ["ridecentric", "eventflow", "gmi-companion"];
export const seeAllWorkProjectIds: ProjectId[] = ["ridecentric", "eventflow", "gmi-companion", "drivers-app", "ruckus-games", "fodo", "tygrlabs", "global-mission-summit"];
