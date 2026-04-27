export const SITE = {
  name: "InjectCompass",
  url: "https://injectcompass.com",
  tagline: "Injections, done right.",
  // Editorial framing, clinical reference, like a patient-information leaflet
  volume: "Vol. 01",
  issue: "Reference No. 01",
  /** Canonical published-issue month label (used in datelines).
   *  Hardcoded so SSR and client output match, never derive from `new Date()`. */
  issueMonth: "April 2026",
  editionLabel: "The Launch Edition",
  taglineLong:
    "The patient-education handout you always wished was this clear. Step-numbered. Cited. No drama.",
  description:
    "Practical injection technique, reconstitution math, calculators, and supply guides for people prescribed injectable medications. Patient-education only.",
  author: "The InjectCompass Editorial Team",
  email: "hello@injectcompass.com",
  launched: true,
  requiresMedicalDisclaimer: true,
} as const;
