export type ProjectMediaAsset = {
  type: "asset";
  src: string;
  objectFit?: "cover" | "contain" | "fill";
};

export type ProjectMediaVideo = {
  type: "video";
  src: string;
  poster: string;
  objectFit?: "cover" | "contain" | "fill";
  objectPosition?: string;
  mobileObjectPosition?: string;
};

export type ProjectMediaLayerMedia = {
  x: number;
  y: number;
  width: number;
  height: number;
  objectFit?: "cover" | "contain" | "fill";
  borderRadius?: number;
};

export type ProjectMediaLayer = {
  src?: string;
  background?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  objectFit?: "cover" | "contain" | "fill";
  borderRadius?: number;
  rotate?: number;
  clip?: boolean;
  media?: ProjectMediaLayerMedia;
};

export type ProjectMediaComposition = {
  type: "composition";
  width: number;
  height: number;
  background?: string;
  layers: ProjectMediaLayer[];
};

export type ProjectMedia = ProjectMediaAsset | ProjectMediaVideo | ProjectMediaComposition;

export type ProjectMediaSet = {
  primary?: ProjectMedia;
  desktop?: ProjectMedia;
  desktopFeatured?: ProjectMedia;
  mobile?: ProjectMedia;
  mobileFeatured?: ProjectMedia;
  small?: ProjectMedia;
  fallback: ProjectMediaAsset;
};

export type ProjectMediaContext = "homepage" | "work" | "small";
export type ProjectMediaViewport = "desktop" | "mobile";

export function resolveProjectMedia(
  project: { media: ProjectMediaSet },
  options: { context: ProjectMediaContext; viewport: ProjectMediaViewport },
): ProjectMedia {
  const { context, viewport } = options;
  if (context === "small") return project.media.small ?? project.media.primary ?? project.media.fallback;
  if (context === "homepage") {
    return viewport === "mobile"
      ? project.media.mobileFeatured ?? project.media.primary ?? project.media.mobile ?? project.media.fallback
      : project.media.desktopFeatured ?? project.media.primary ?? project.media.desktop ?? project.media.fallback;
  }
  return viewport === "mobile"
    ? project.media.primary ?? project.media.mobile ?? project.media.fallback
    : project.media.primary ?? project.media.desktop ?? project.media.fallback;
}
