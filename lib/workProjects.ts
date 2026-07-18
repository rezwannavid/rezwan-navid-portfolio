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
  shortDescription: string;
  categories: Exclude<WorkCategory, "all">[];
  categoryLabel: string;
  year: string;
  role: string;
  client: string;
  thumbnail?: string;
  thumbnailAlt: string;
  href: string;
  slug: string;
  protected: boolean;
  passwordIdentifier?: string;
  theme?: "checker" | "dark";
};

export const workProjects: WorkProject[] = [
  {
    number: "01",
    title: "RideCentric+",
    shortDescription: "RideSync modernized luxury transportation operations by replacing fragmented tools with one connected platform.",
    categories: ["product-study", "interface", "design-system"],
    categoryLabel: "Product Study",
    year: "2025",
    role: "Operating System for Enterprise Transportation",
    client: "RideCentric",
    thumbnailAlt: "RideCentric+ enterprise transportation operating system case study preview",
    href: "/work/ridecentric",
    slug: "ridecentric",
    protected: true,
    passwordIdentifier: "RIDECENTRIC",
    theme: "checker",
  },
  {
    number: "02",
    title: "Global Mission Institute",
    shortDescription: "A learning experience and brand system designed to make mission training easier to discover, navigate, and complete.",
    categories: ["interface", "design-system", "brand"],
    categoryLabel: "Interface",
    year: "2026",
    role: "Digital Learning Platform",
    client: "Global Mission Institute",
    thumbnailAlt: "Global Mission Institute learning platform case study preview",
    href: "/work/global-mission-institute",
    slug: "global-mission-institute",
    protected: false,
    theme: "checker",
  },
  {
    number: "03",
    title: "Drivers App",
    shortDescription: "A focused mobile workflow that helps professional drivers coordinate trips, communicate updates, and stay on schedule.",
    categories: ["product-study", "interface", "product-management"],
    categoryLabel: "Product Study",
    year: "2025",
    role: "Driver Operations Experience",
    client: "RideCentric",
    thumbnailAlt: "Professional driver operations mobile app case study preview",
    href: "/work/drivers-app",
    slug: "drivers-app",
    protected: false,
    theme: "checker",
  },
];

export const getWorkProject = (slug: string) => workProjects.find((project) => project.slug === slug);
