export type ProjectMediaAsset = {
  type: "asset";
  src: string;
  objectFit?: "cover" | "contain" | "fill";
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

export type ProjectMedia = ProjectMediaAsset | ProjectMediaComposition;

export type ProjectMediaSet = {
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
  if (context === "small") return project.media.small ?? project.media.fallback;
  if (context === "homepage") {
    return viewport === "mobile"
      ? project.media.mobileFeatured ?? project.media.mobile ?? project.media.fallback
      : project.media.desktopFeatured ?? project.media.desktop ?? project.media.fallback;
  }
  return viewport === "mobile"
    ? project.media.mobile ?? project.media.fallback
    : project.media.desktop ?? project.media.fallback;
}

const ruckusDesktop: ProjectMediaComposition = {
  type: "composition",
  width: 947,
  height: 623,
  background: "#e7e2d3",
  layers: [
    { src: "/Ruckus Games Pictures/interaction-animation-2.gif", x: -94, y: -36, width: 399, height: 399, objectFit: "cover" },
    { src: "/Ruckus Games Pictures/interaction-animation-3.gif", x: -45, y: 228, width: 417, height: 417, objectFit: "cover" },
    {
      src: "/Ruckus Games Pictures/interaction-animation-1.gif",
      x: 553,
      y: 109,
      width: 458,
      height: 286,
      clip: true,
      media: { x: 0, y: 0, width: 458, height: 458, objectFit: "cover" },
    },
  ],
};

const ruckusMobile: ProjectMediaComposition = {
  type: "composition",
  width: 393,
  height: 523,
  background: "#e7e2d3",
  layers: [
    { src: "/project-media/ruckus/mobile-right.png", x: 302, y: 70, width: 188, height: 387, objectFit: "fill" },
    { src: "/project-media/ruckus/mobile-left.png", x: -96, y: 66, width: 188, height: 390, objectFit: "fill" },
    { src: "/Ruckus Games Pictures/phone-frame-group-2.png", x: 103, y: 66.25, width: 188, height: 390.258, objectFit: "fill" },
    { src: "/Ruckus Games Pictures/phone-animation-group-2.gif", x: 110.04, y: 73.28, width: 175.176, height: 377.028, objectFit: "fill", borderRadius: 27.775 },
  ],
};

const gmiDesktop: ProjectMediaComposition = {
  type: "composition",
  width: 947,
  height: 623,
  background: "#efe0e0",
  layers: [
    { src: "/project-media/gmi-companion/device-frame.png", x: 42, y: 32.41, width: 271.764, height: 561.783, objectFit: "fill" },
    { src: "/GMI Companion Pictures/Motion 02.gif", x: 52.45, y: 41.54, width: 250.785, height: 543.687, objectFit: "fill", borderRadius: 38.674 },
    { src: "/project-media/gmi-companion/device-frame.png", x: 335.97, y: 32.478, width: 271.512, height: 561.264, objectFit: "fill" },
    { src: "/GMI Companion Pictures/New.gif", x: 346.41, y: 41.598, width: 250.553, height: 543.184, objectFit: "fill", borderRadius: 38.638 },
    { src: "/project-media/gmi-companion/device-frame.png", x: 630, y: 29, width: 271.747, height: 561.75, objectFit: "fill" },
    { src: "/GMI Companion Pictures/Motion 03.gif", x: 640.45, y: 38.13, width: 250.77, height: 543.654, objectFit: "fill", borderRadius: 38.672 },
  ],
};

const gmiMobile: ProjectMediaComposition = {
  type: "composition",
  width: 393,
  height: 523,
  background: "#de383e",
  layers: [
    { src: "/project-media/gmi-companion/device-frame.png", x: 36.23, y: 20, width: 320.766, height: 663.08, objectFit: "fill" },
    { src: "/GMI Companion Pictures/New.gif", x: 48.57, y: 30.77, width: 296.005, height: 641.721, objectFit: "fill", borderRadius: 45.647 },
  ],
};

const gmiDesktopFeatured: ProjectMediaComposition = {
  type: "composition",
  width: 691,
  height: 464,
  background: "#fff",
  layers: [
    { x: -202.975, y: 18.589, width: 800.88, height: 122.193, rotate: -32.47, borderRadius: 93.485, background: "linear-gradient(180deg,#df383e 0%,rgba(121,30,34,0) 100%)" },
    { x: -186.057, y: 149.143, width: 811.921, height: 122.193, rotate: -32.47, borderRadius: 93.485, background: "linear-gradient(180deg,#e06245 0%,rgba(122,53,38,0) 100%)" },
    { x: -60.614, y: 202.442, width: 848.727, height: 122.193, rotate: -32.47, borderRadius: 93.485, background: "linear-gradient(180deg,#1d92c4 0%,rgba(14,70,94,0) 100%)" },
    { x: -57.744, y: 345.452, width: 848.727, height: 122.193, rotate: -32.47, borderRadius: 93.485, background: "linear-gradient(180deg,#73b9d6 0%,rgba(60,97,112,0) 100%)" },
    { x: 18.707, y: 445.38, width: 836.949, height: 122.193, rotate: -32.47, borderRadius: 93.485, background: "linear-gradient(180deg,#b3d2e0 0%,rgba(97,114,122,0) 100%)" },
  ],
};

const driversDesktop: ProjectMediaComposition = {
  type: "composition",
  width: 947,
  height: 623,
  background: "linear-gradient(135deg,#c1deff 0%,#83bdfe 30%,#2084f4 62%,#0072f2 78%,#156ece 100%)",
  layers: [
    { src: "/project-media/drivers-app/right-phone.png", x: 665.95, y: -279, width: 323.053, height: 667.209, objectFit: "fill" },
    { src: "/project-media/drivers-app/left-phone.png", x: -41, y: 151, width: 322.783, height: 667.249, objectFit: "fill" },
    { src: "/Drivers App Pictures/Driver Device Frame.png", x: 312, y: -21.62, width: 323.033, height: 667.249, objectFit: "fill" },
    { src: "/Drivers App Pictures/Blue Onboarding.gif", x: 325.24, y: -10.99, width: 295.399, height: 640.407, objectFit: "fill", borderRadius: 50.259 },
  ],
};

const driversMobile: ProjectMediaComposition = {
  type: "composition",
  width: 393,
  height: 523,
  background: "linear-gradient(180deg,#fefefe 0%,#1768f6 62.5%,#053da4 100%)",
  layers: [
    { src: "/project-media/drivers-app/right-phone.png", x: 332, y: -92, width: 221.757, height: 458, objectFit: "fill" },
    { src: "/project-media/drivers-app/left-phone.png", x: -153, y: 168, width: 215.268, height: 444.996, objectFit: "fill" },
    { src: "/Drivers App Pictures/Driver Device Frame.png", x: 86, y: 32, width: 221.81, height: 458.165, objectFit: "fill" },
    { src: "/Drivers App Pictures/Blue Onboarding.gif", x: 95.09, y: 39.27, width: 202.835, height: 439.734, objectFit: "fill", borderRadius: 29.999 },
  ],
};

const driversDesktopFeatured: ProjectMediaComposition = {
  type: "composition",
  width: 691,
  height: 464,
  background: "radial-gradient(95% 135% at 12% 4%,#156ece 0%,#307ed3 14%,#7fafe1 50%,#e9f0f4 100%)",
  layers: [
    { src: "/Drivers App Pictures/Driver Device Frame.png", x: 208, y: -145, width: 275.999, height: 570.097, objectFit: "fill" },
    { src: "/Drivers App Pictures/Blue Onboarding.gif", x: 219.31, y: -135.95, width: 252.389, height: 547.163, objectFit: "fill", borderRadius: 57.976 },
  ],
};

export const projectMediaPresets = {
  ruckusDesktop,
  ruckusMobile,
  gmiDesktop,
  gmiMobile,
  gmiDesktopFeatured,
  driversDesktop,
  driversMobile,
  driversDesktopFeatured,
};
