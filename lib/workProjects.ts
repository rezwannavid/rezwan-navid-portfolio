import { getProject, publishedProjects, type ProjectCategory, type ResolvedProject } from "@/lib/projectRegistry";

export const workCategories = [
  { id: "all", label: "All" },
  { id: "product-study", label: "Product Study" },
  { id: "interface", label: "Interface" },
  { id: "design-system", label: "Design System" },
  { id: "product-management", label: "Product Management" },
  { id: "brand", label: "Brand" },
  { id: "ai", label: "AI" },
] as const;

export type WorkCategory = "all" | ProjectCategory;
export type WorkProject = ResolvedProject & { number: string };

export const workProjects: WorkProject[] = publishedProjects.map((project, index) => ({
  ...project,
  number: String(index + 1).padStart(2, "0"),
}));

export const getWorkProject = (idOrSlug: string) => getProject(idOrSlug);
