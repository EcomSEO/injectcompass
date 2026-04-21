export type Hub = {
  slug: string;
  name: string;
  shortName: string;
  oneLiner: string;
  thesis: string;
};

export const hubs: Hub[] = [
  {
    slug: "calculators-and-tools",
    name: "Calculators & Tools",
    shortName: "Calculators",
    oneLiner: "The Peptide Calculator, Reconstitution Calculator, Syringe Converter, and Dose Schedule Builder.",
    thesis: "The calculator layer is the site's primary SEO moat. Every calculator has a visual syringe, a worked example, a printable cheat sheet, and a tested math library.",
  },
  {
    slug: "injection-technique",
    name: "Injection Technique",
    shortName: "Technique",
    oneLiner: "Step-numbered procedures with printable cheat sheets — for every pen and every technique.",
    thesis: "Every technique post has a step-numbered procedure, a printable PDF, and HowTo schema. This hub ranks for the entire 'how to inject' universe.",
  },
  {
    slug: "reconstitution",
    name: "Reconstitution",
    shortName: "Reconstitution",
    oneLiner: "Bacteriostatic water, mixing math, cloudy-solution troubleshooting — with the calculator embedded.",
    thesis: "Reconstitution math + troubleshooting for specific compounds, within the research-context framing for non-FDA-approved peptides.",
  },
  {
    slug: "supplies-and-storage",
    name: "Supplies & Storage",
    shortName: "Supplies",
    oneLiner: "Needle sizes, syringes, alcohol swabs, sharps containers, travel cooling.",
    thesis: "The commercial-intent hub. Needle sizes, sharps containers, travel coolers, storage science. Amazon + medical-supply affiliate backbone.",
  },
  {
    slug: "troubleshooting",
    name: "Troubleshooting",
    shortName: "Troubleshooting",
    oneLiner: "Bruising, bleeding, lipohypertrophy, missed doses, pen malfunctions — with decision trees.",
    thesis: "The 'why is this happening' hub. Every post has a decision tree and a red-box safety callout with specific red-flag symptoms.",
  },
];

export function getHub(slug: string): Hub | undefined {
  return hubs.find((h) => h.slug === slug);
}
