import "server-only";

export type PhotographyItem = {
  src: string;
  filename: string;
  alt: string;
  date: string;
  camera: "Nikon D5300" | "iPhone 15 Pro";
  width: number;
  height: number;
  displayWidth: number;
  yOffset: number;
  baseRotateX: number;
  baseRotateY: number;
  baseRotateZ: number;
};

type PhotoOverride = Omit<PhotographyItem, "src" | "filename" | "camera"> & { capturedAt: string };

const overrides: Record<string, PhotoOverride> = {
  "IMG_9092.JPG": { capturedAt: "2018-06-20", date: "JUNE 2018", width: 2360, height: 1578, displayWidth: 382, yOffset: 36, baseRotateX: 1.2, baseRotateY: -3.8, baseRotateZ: -.35, alt: "A vulture looking directly into the camera" },
  "IMG_9095.JPG": { capturedAt: "2017-09-05", date: "SEP 2017", width: 2000, height: 2992, displayWidth: 258, yOffset: -5, baseRotateX: -1.4, baseRotateY: 3.7, baseRotateZ: .3, alt: "A yellow sunflower in soft focus" },
  "IMG_9093.JPG": { capturedAt: "2017-09-04", date: "SEP 2017", width: 2569, height: 1717, displayWidth: 476, yOffset: 20, baseRotateX: .8, baseRotateY: -3.2, baseRotateZ: -.2, alt: "A winding mountain road through pine trees" },
  "IMG_0357.jpeg": { capturedAt: "2024-01-23", date: "JAN 2024", width: 4032, height: 3024, displayWidth: 405, yOffset: -14, baseRotateX: -1, baseRotateY: 3.4, baseRotateZ: .4, alt: "Rickshaws crossing a sunlit city street" },
  "IMG_5450.jpg": { capturedAt: "2024-06-28", date: "JUNE 2024", width: 3024, height: 4032, displayWidth: 270, yOffset: 32, baseRotateX: 1.5, baseRotateY: -4, baseRotateZ: -.45, alt: "A river landscape viewed through a dark window" },
  "IMG_7560.JPG": { capturedAt: "2022-05-20", date: "MAY 2022", width: 3952, height: 2964, displayWidth: 430, yOffset: -10, baseRotateX: -.8, baseRotateY: 2.8, baseRotateZ: .25, alt: "People walking toward the sea beneath a flying bird" },
  "IMG_2862.JPG": { capturedAt: "2024-10-31", date: "OCT 2024", width: 2560, height: 3414, displayWidth: 274, yOffset: 18, baseRotateX: 1.3, baseRotateY: -3.1, baseRotateZ: -.3, alt: "A chef cooking behind a cloud of steam" },
  "IMG_0633_jpg.jpg": { capturedAt: "2024-04-19", date: "APR 2024", width: 4032, height: 3024, displayWidth: 420, yOffset: 42, baseRotateX: -.7, baseRotateY: 3.6, baseRotateZ: .35, alt: "A silver car parked against a patterned concrete wall" },
  "IMG_9094.JPG": { capturedAt: "2017-09-04", date: "SEP 2017", width: 2992, height: 2000, displayWidth: 460, yOffset: -12, baseRotateX: 1, baseRotateY: -2.7, baseRotateZ: -.25, alt: "Clouds gathering over a forested mountain" },
  "IMG_3095.jpeg": { capturedAt: "2024-02-07", date: "FEB 2024", width: 4032, height: 3024, displayWidth: 414, yOffset: 28, baseRotateX: -1.2, baseRotateY: 3.2, baseRotateZ: .3, alt: "People resting in bands of sunlight beside a tall metal facade" },
  "IDG_20260706_183815_196.jpg": { capturedAt: "2026-07-06", date: "JULY 2026", width: 3714, height: 2784, displayWidth: 425, yOffset: 0, baseRotateX: .9, baseRotateY: -3.5, baseRotateZ: -.35, alt: "A person standing beneath a vaulted bamboo structure" },
};

const curatedOrder = [
  "IMG_9092.JPG", "IMG_9095.JPG", "IMG_9093.JPG", "IMG_5450.jpg",
  "IMG_7560.JPG", "IMG_2862.JPG", "IMG_9094.JPG",
  "IDG_20260706_183815_196.jpg",
];

const nikonPhotos = new Set(["IMG_9093.JPG", "IMG_9094.JPG", "IMG_9095.JPG", "IMG_9092.JPG", "IMG_7560.JPG"]);

export function getPhotographyGallery(): PhotographyItem[] {
  return curatedOrder.map((filename) => {
      const configured = overrides[filename];
      return {
        src: `/Photography/${encodeURIComponent(filename)}`,
        filename,
        alt: configured.alt,
        date: configured.date,
        camera: nikonPhotos.has(filename) ? "Nikon D5300" : "iPhone 15 Pro",
        width: configured.width,
        height: configured.height,
        displayWidth: configured.displayWidth,
        yOffset: configured.yOffset,
        baseRotateX: configured.baseRotateX,
        baseRotateY: configured.baseRotateY,
        baseRotateZ: configured.baseRotateZ,
      };
    });
}
