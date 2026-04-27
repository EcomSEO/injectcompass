/**
 * Author roster, staff editorial bylines for InjectCompass.
 *
 * Surfaced on /authors + /authors/[slug] with `Person` JSON-LD.
 */

import { authorImage } from "./images";

export type Author = {
  slug: string;
  name: string;
  credentials: string;
  jobTitle: string;
  knowsAbout: string[];
  alumniOf: string[];
  bio: string;
  image: string | null;
  sameAs?: string[];
};

export const authors: Author[] = [
  {
    slug: "sara-lin",
    name: "Sara Lin",
    credentials: "RN, BSN",
    jobTitle: "Lead Editor. Injection Technique",
    knowsAbout: [
      "Subcutaneous and intramuscular injection technique",
      "Patient education and self-administration coaching",
      "GLP-1 pen device administration",
      "Sharps safety and disposal",
    ],
    alumniOf: ["University of Washington. School of Nursing"],
    bio:
      "Sara Lin is the lead editor for injection-technique content at InjectCompass. A registered nurse with a Bachelor of Science in Nursing from the University of Washington, she spent eight years on a hospital medical-surgical floor before moving into outpatient diabetes-education work, where she taught hundreds of newly diagnosed patients to self-administer insulin and, later, GLP-1 receptor agonists. Her writing on InjectCompass distills the same coaching she gave at the bedside: which sites to rotate through, how to actually pinch the skin, why the alcohol pad needs to dry before the needle goes in. She fact-checks every drug-label claim against the current FDA prescribing information and rewrites until a step is unambiguous to a first-time injector. Sara serves as the in-house editorial liaison to the medical advisory panel and routes any safety-relevant draft to the reviewer whose specialty matches before it ships.",
    image: authorImage("staff-1"),
  },
  {
    slug: "jordan-pratt",
    name: "Jordan Pratt",
    credentials: "PharmD",
    jobTitle: "Senior Editor. Drug Reference & Reconstitution",
    knowsAbout: [
      "Pharmaceutical compounding (USP <797>)",
      "Peptide reconstitution math",
      "Drug stability and storage",
      "FDA prescribing information interpretation",
    ],
    alumniOf: ["University of Michigan. College of Pharmacy"],
    bio:
      "Jordan Pratt edits the drug-reference and reconstitution content at InjectCompass. After completing a PharmD at the University of Michigan and a hospital pharmacy residency, Jordan worked in a 503A sterile-compounding pharmacy for six years before pivoting to medical writing. The reconstitution worked examples on this site, the concentration tables, and the bacteriostatic-versus-sterile-water reference all pass through Jordan's edits. The signature move is reading every published draft against the current USP monograph and the manufacturer label, and quietly correcting any rounding or unit mismatches. Outside of InjectCompass, Jordan contributes peer-reviewed continuing-education content on home-administration safety to nursing associations and writes a quarterly column on drug-stability literature.",
    image: authorImage("staff-2"),
  },
  {
    slug: "maya-koenig",
    name: "Maya Koenig",
    credentials: "MPH",
    jobTitle: "Editor. Patient Safety & Health Literacy",
    knowsAbout: [
      "Health-literacy-grade patient education",
      "Plain-language medical writing",
      "Adverse-event recognition",
      "Sharps-disposal regulation (FDA, EPA, USPS Pub. 52)",
    ],
    alumniOf: ["Johns Hopkins Bloomberg School of Public Health"],
    bio:
      "Maya Koenig is an editor on the patient-safety and health-literacy desk at InjectCompass. With a Master of Public Health from Johns Hopkins and a decade of work in patient-education program design at academic medical centers, Maya owns the plain-language reading-grade-level review for every post on the site. The troubleshooting content, what to do about bruising, how to tell an injection-site reaction from cellulitis, when to call a prescriber, is hers, and the rule on this desk is that a smart fourteen-year-old should be able to follow every step. She also coordinates the corrections process: when a reader emails about a factual error, Maya is the first reviewer, the one who pulls the source documents, and the editor who drafts the dated correction note before re-publication.",
    image: authorImage("staff-3"),
  },
];

export function getAuthor(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

export function getAuthorByName(name: string): Author | undefined {
  return authors.find((a) => a.name.toLowerCase() === name.toLowerCase());
}
