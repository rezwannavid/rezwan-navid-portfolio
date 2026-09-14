export type RideSyncMediaType = "placeholder" | "image" | "gif" | "video";

export type RideSyncMedia = {
  id: string;
  type: RideSyncMediaType;
  src?: string;
  poster?: string;
  alt: string;
  aspectRatio: `${number} / ${number}`;
};

export const rideSyncMedia = {
  hero: { id: "hero", type: "placeholder", alt: "RideSync product overview", aspectRatio: "1070 / 583" },
  relationship: { id: "relationship", type: "placeholder", alt: "Booker and passenger relationship", aspectRatio: "810 / 410" },
  manualHandoffs: { id: "manual-handoffs", type: "placeholder", alt: "Manual transportation coordination handoffs", aspectRatio: "662 / 410" },
  serviceResearch: { id: "service-research", type: "placeholder", alt: "RideSync service research artifact", aspectRatio: "445 / 472" },
  productDefinition: { id: "product-definition", type: "placeholder", alt: "RideSync shared event portal", aspectRatio: "445 / 384" },
  decisionAccount: { id: "decision-account", type: "placeholder", alt: "Ride access without a mandatory account", aspectRatio: "635 / 533" },
  decisionComplexity: { id: "decision-complexity", type: "placeholder", alt: "Simplified customer-facing ride states", aspectRatio: "764 / 606" },
  decisionPayment: { id: "decision-payment", type: "placeholder", alt: "Automated and assisted payment experience", aspectRatio: "615 / 536" },
  companyPaysFlow: { id: "company-pays-flow", type: "placeholder", alt: "Company-paid ride ownership flow", aspectRatio: "460 / 564" },
  passengerPaysFlow: { id: "passenger-pays-flow", type: "placeholder", alt: "Passenger-paid ride ownership flow", aspectRatio: "460 / 564" },
  betaTesting: { id: "beta-testing", type: "placeholder", alt: "RideSync beta-to-launch comparisons", aspectRatio: "1083 / 665" },
} satisfies Record<string, RideSyncMedia>;
