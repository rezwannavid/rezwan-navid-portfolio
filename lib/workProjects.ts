import { getProject, projectRegistry, type ProjectCategory, type ProjectId, type ResolvedProject } from "@/lib/projectRegistry";

export const workCategories = [
  { id: "all", label: "All" },
  { id: "product-study", label: "Product Study" },
  { id: "interface", label: "Interface" },
  { id: "design-system", label: "Design System" },
  { id: "product-management", label: "Product Management" },
  { id: "brand", label: "Brand" },
] as const;

export type WorkCategory = "all" | ProjectCategory;
export type WorkProject = ResolvedProject & { number: string };

export const workProjectIds: ProjectId[] = [
  "ridecentric", "ridesync", "10ms-for-parents", "nav-ai", "eventflow", "drivers-app", "ruckus-games", "fodo", "gldn-route", "lazy", "voyage", "ridecentric-design-system", "tygrlabs", "global-mission-summit",
];

export const workProjects: WorkProject[] = workProjectIds.map((id, index) => ({
  ...projectRegistry[id],
  number: String(index + 1).padStart(2, "0"),
}));

export const getWorkProject = (idOrSlug: string) => getProject(idOrSlug);
