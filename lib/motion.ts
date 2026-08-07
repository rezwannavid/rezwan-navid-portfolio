export const motionEase = {
  snappy: [0.22, 1, 0.36, 1] as const,
  editorial: [0.16, 1, 0.3, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
};

export const motionDuration = {
  micro: 0.16,
  normal: 0.28,
  editorial: 0.58,
  cinematic: 0.82,
};

export const physicalSpring = {
  stiffness: 260,
  damping: 30,
  mass: 0.72,
};
