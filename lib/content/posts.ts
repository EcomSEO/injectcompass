export type PostType = "pillar" | "comparison" | "cluster" | "listicle";

export type Post = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  hub: string;
  postType: PostType;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  status: "draft" | "stub" | "published";
  ourPick?: { name: string; tier: string; reason: string };
  products?: Array<{ rank: number; name: string; tier: string; summary: string }>;
  items?: Array<{ rank: number; name: string; summary: string }>;
  faq?: Array<{ q: string; a: string }>;
  sources?: Array<{ label: string; url: string }>;
  featured?: boolean;
  medicalDisclaimer?: "required" | "light";
};

export const posts: Post[] = [
  {
    slug: "peptide-calculator",
    title: "The Peptide Calculator — with Visual Syringe",
    h1: "The Peptide Calculator",
    description:
      "Calculate peptide dose in insulin-syringe units, with a visual U-100 syringe highlighting the exact tick mark. Research-context educational tool.",
    hub: "calculators-and-tools",
    postType: "pillar",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 8,
    status: "stub",
    featured: true,
    medicalDisclaimer: "required",
  },
  {
    slug: "subcutaneous-injection",
    title: "Subcutaneous Injection — The Complete Guide",
    h1: "Subcutaneous injection",
    description:
      "A step-numbered procedure for self-administered subcutaneous injection — with a printable cheat sheet and HowTo schema.",
    hub: "injection-technique",
    postType: "pillar",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 12,
    status: "stub",
    medicalDisclaimer: "required",
  },
  {
    slug: "how-to-use-ozempic-pen",
    title: "How to Use an Ozempic Pen — 8 Steps with Visuals",
    h1: "How to use an Ozempic pen",
    description:
      "Step-numbered Ozempic pen injection procedure — with a pen-click explainer, injection-site guide, and printable cheat sheet.",
    hub: "injection-technique",
    postType: "cluster",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 10,
    status: "stub",
    medicalDisclaimer: "required",
  },
  {
    slug: "how-to-reconstitute-peptides",
    title: "How to Reconstitute Peptides — the Complete Guide",
    h1: "How to reconstitute peptides",
    description:
      "Step-numbered reconstitution procedure with the Reconstitution Calculator embedded. Research-context framing.",
    hub: "reconstitution",
    postType: "pillar",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 10,
    status: "stub",
    medicalDisclaimer: "required",
  },
  {
    slug: "bacteriostatic-water-vs-sterile-water",
    title: "Bacteriostatic Water vs Sterile Water",
    h1: "Bacteriostatic water vs sterile water",
    description:
      "What each is, when each is used in published research protocols, and how to identify the right product for multi-use vials.",
    hub: "reconstitution",
    postType: "cluster",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 7,
    status: "stub",
  },
  {
    slug: "needle-sizes-for-peptide-injection",
    title: "Needle Sizes for Peptide Injection — 29G vs 30G vs 31G",
    h1: "Needle sizes for peptide injection",
    description:
      "The decision tree for needle gauge and length by injection site, body composition, and drug type. With specific brand picks.",
    hub: "supplies-and-storage",
    postType: "comparison",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 12,
    status: "stub",
    ourPick: { name: "BD Ultra-Fine Nano 31G × 5/16\"", tier: "Best overall", reason: "TODO: reason from brief." },
  },
  {
    slug: "best-sharps-containers",
    title: "Best Sharps Containers for Home Use",
    h1: "Best sharps containers for home use",
    description:
      "Home-use sharps containers compared on capacity, lockability, and disposal method — from budget to mail-back services.",
    hub: "supplies-and-storage",
    postType: "comparison",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 9,
    status: "stub",
  },
  {
    slug: "peptide-storage-temperature-guide",
    title: "Peptide Storage Temperature Guide",
    h1: "Peptide storage temperature guide",
    description:
      "Fridge, freezer, room temperature, travel — what the manufacturer package inserts and stability literature say about storing injectable compounds.",
    hub: "supplies-and-storage",
    postType: "pillar",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 14,
    status: "stub",
    medicalDisclaimer: "light",
  },
  {
    slug: "injection-site-bruising",
    title: "Injection Site Bruising — Prevention and Care",
    h1: "Injection site bruising",
    description:
      "Why bruising happens after injection, what's normal, what's not, and a 10-point prevention checklist — with a decision tree for when to call your prescriber.",
    hub: "troubleshooting",
    postType: "cluster",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 8,
    status: "stub",
    medicalDisclaimer: "required",
  },
  {
    slug: "rotating-injection-sites",
    title: "Rotating Injection Sites — The 3-Zone Protocol",
    h1: "Rotating injection sites",
    description:
      "The 3-zone site rotation protocol to prevent lipohypertrophy and improve drug absorption.",
    hub: "injection-technique",
    postType: "cluster",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 7,
    status: "stub",
    medicalDisclaimer: "required",
  },
];

export function getPost(slug: string): Post | undefined { return posts.find((p) => p.slug === slug); }
export function postsByHub(hubSlug: string): Post[] { return posts.filter((p) => p.hub === hubSlug); }
export function latestPosts(limit = 6): Post[] { return [...posts].sort((a,b) => (a.publishedAt < b.publishedAt ? 1 : -1)).slice(0, limit); }
export function featuredPost(): Post | undefined { return posts.find((p) => p.featured); }
export function relatedPosts(post: Post, limit = 3): Post[] { return posts.filter((p) => p.hub === post.hub && p.slug !== post.slug).slice(0, limit); }
