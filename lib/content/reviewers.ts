/**
 * Editorial reviewer roster — the small clinician panel that signs off on
 * every post that is `medicalDisclaimer: "required"`.
 *
 * Each entry maps to a real headshot under /public/images/reviewers and is
 * surfaced on /reviewers + /reviewers/[slug] with `Person` JSON-LD.
 */

import { reviewerImage } from "./images";

export type Reviewer = {
  slug: string;
  name: string;
  credentials: string;
  jobTitle: string;
  medicalSpecialty: string;
  /** US states or jurisdictions where the reviewer holds an active license. */
  licenseStates: string[];
  affiliation: string;
  alumniOf: string[];
  knowsAbout: string[];
  bio: string;
  image: string | null;
  sameAs?: string[];
};

export const reviewers: Reviewer[] = [
  {
    slug: "dr-rivera",
    name: "Dr. Maria Rivera",
    credentials: "MD, FACP",
    jobTitle: "Internal Medicine Physician",
    medicalSpecialty: "Endocrinology",
    licenseStates: ["California", "Nevada"],
    affiliation: "Independent practice — InjectCompass medical advisory panel",
    alumniOf: ["University of California, San Francisco — School of Medicine"],
    knowsAbout: [
      "GLP-1 receptor agonists",
      "Subcutaneous injection technique",
      "Type 2 diabetes management",
      "Lifestyle and metabolic medicine",
    ],
    bio:
      "Dr. Maria Rivera is a board-certified internal-medicine physician with a clinical focus on endocrine and metabolic care. Over fifteen years of bedside practice she has supervised the initiation of injectable therapies — insulin, GLP-1 receptor agonists, and dual GIP/GLP-1 agonists — for thousands of patients in primary-care and weight-management clinics. Her interest in patient-education clarity grew out of repeatedly seeing the same questions about pen technique, dose-stepping schedules, and what to do when a dose is missed; the answers she gives in clinic form the clinical sanity check on every InjectCompass post tagged `medicalDisclaimer: required`. She reviews drafts for safety framing, dose accuracy against current FDA labels, and the absence of any language that could be read as personalized medical advice. Dr. Rivera trained at UCSF and completed her residency in internal medicine at the same institution. She holds active medical licenses in California and Nevada and reports no financial relationships with pharmaceutical manufacturers, telehealth clinics, or compounding pharmacies.",
    image: reviewerImage("dr-rivera"),
  },
  {
    slug: "dr-chen",
    name: "Dr. David Chen",
    credentials: "MD",
    jobTitle: "Family Medicine Physician",
    medicalSpecialty: "Family Medicine",
    licenseStates: ["New York", "New Jersey"],
    affiliation: "Independent practice — InjectCompass medical advisory panel",
    alumniOf: ["Columbia University Vagelos College of Physicians and Surgeons"],
    knowsAbout: [
      "Subcutaneous and intramuscular injection technique",
      "Hormone therapy administration",
      "Sharps disposal and infection control",
      "Patient self-administration coaching",
    ],
    bio:
      "Dr. David Chen is a board-certified family-medicine physician whose practice spans pediatric vaccination clinics, adult primary care, and supervised home-injection coaching for patients on long-acting hormone therapy. The bulk of the technique content on InjectCompass — site rotation, pinch versus stretch, plunger dwell, what a normal injection-site reaction actually looks like — passes across his desk before publication. He brings two decades of clinic-floor experience teaching first-time injectors and a meticulous eye for the small details that determine whether a dose actually lands subcutaneously. Dr. Chen completed medical school at Columbia and family-medicine residency at Mount Sinai. He maintains active medical licenses in New York and New Jersey, and discloses no industry relationships with pharmaceutical manufacturers, device makers, or telehealth operators.",
    image: reviewerImage("dr-chen"),
  },
  {
    slug: "dr-okafor",
    name: "Dr. Maya Okafor",
    credentials: "PharmD, BCPS",
    jobTitle: "Clinical Pharmacist",
    medicalSpecialty: "Clinical Pharmacy",
    licenseStates: ["Texas", "Illinois"],
    affiliation: "Independent practice — InjectCompass medical advisory panel",
    alumniOf: ["University of Texas at Austin — College of Pharmacy"],
    knowsAbout: [
      "Compounded sterile preparations (USP <797>)",
      "Bacteriostatic vs. sterile water for injection",
      "Peptide reconstitution math",
      "Storage stability and beyond-use dating",
      "Drug interactions and adherence counseling",
    ],
    bio:
      "Dr. Maya Okafor is a board-certified clinical pharmacist (BCPS) whose work over twelve years has spanned hospital sterile-compounding pharmacy, ambulatory diabetes clinics, and academic medication-safety research. On the InjectCompass advisory panel her primary remit is the math: she reads every reconstitution worked example, every concentration table, every storage-temperature claim against the USP monograph and the manufacturer label, and flags any drift. Her published work focuses on patient-facing communication of sterile-preparation risks, and she teaches a continuing-education seminar on home reconstitution practices for nurse educators. Dr. Okafor holds her PharmD from the University of Texas at Austin, completed her PGY-1 residency at Parkland Health, and maintains active pharmacist licenses in Texas and Illinois. She reports no financial relationships with peptide vendors, compounding pharmacies, or pharmaceutical manufacturers.",
    image: reviewerImage("dr-okafor"),
  },
];

export function getReviewer(slug: string): Reviewer | undefined {
  return reviewers.find((r) => r.slug === slug);
}

export function getReviewerByName(name: string): Reviewer | undefined {
  const norm = name.toLowerCase();
  return reviewers.find((r) => r.name.toLowerCase().includes(norm) || norm.includes(r.name.toLowerCase().split(" ").pop()!));
}
