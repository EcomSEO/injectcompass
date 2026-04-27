/**
 * Centralised image manifest for the site.
 *
 * Real photographs (kie.ai Nano Banana when credits permit, otherwise rich
 * editorial gradient placeholders) live under /public/images.
 *
 * Helpers below resolve image URLs by slug, hub, or reviewer/author key, with
 * graceful fallbacks so components never render a broken `<img>`.
 */

export const HERO_IMAGE = "/images/hero/featured-article.jpg";
export const OG_IMAGE = "/images/og-default.jpg";
export const NEWSLETTER_BG = "/images/newsletter-bg.jpg";

/** Hub / category → category-tile image. */
const HUB_TO_IMAGE: Record<string, string> = {
  "injection-technique": "/images/categories/technique.jpg",
  "reconstitution": "/images/categories/drugs-compounds.jpg",
  "supplies-and-storage": "/images/categories/tools.jpg",
  "troubleshooting": "/images/categories/troubleshooting.jpg",
  "calculators-and-tools": "/images/categories/procedures.jpg",
  "injection-sites": "/images/categories/injection-sites.jpg",
  "site-rotation": "/images/categories/rotation.jpg",
  "conditions": "/images/categories/conditions.jpg",
};

/** Article slug → article thumbnail. */
const SLUG_TO_IMAGE: Record<string, string> = {
  "peptide-calculator": "/images/articles/peptide-calculator.jpg",
  "subcutaneous-injection": "/images/articles/subcutaneous-injection.jpg",
  "how-to-use-ozempic-pen": "/images/articles/how-to-use-ozempic-pen.jpg",
  "how-to-reconstitute-peptides": "/images/articles/how-to-reconstitute-peptides.jpg",
  "bacteriostatic-water-vs-sterile-water":
    "/images/articles/bacteriostatic-water-vs-sterile-water.jpg",
  "needle-sizes-for-peptide-injection":
    "/images/articles/needle-sizes-for-peptide-injection.jpg",
  "best-sharps-containers": "/images/articles/best-sharps-containers.jpg",
  "peptide-storage-temperature-guide":
    "/images/articles/peptide-storage-temperature-guide.jpg",
  "injection-site-bruising": "/images/articles/injection-site-bruising.jpg",
  "rotating-injection-sites": "/images/articles/rotating-injection-sites.jpg",
};

export function articleImage(slug: string, hub?: string): string | null {
  if (SLUG_TO_IMAGE[slug]) return SLUG_TO_IMAGE[slug];
  if (hub && HUB_TO_IMAGE[hub]) return HUB_TO_IMAGE[hub];
  return null;
}

export function hubImage(hub: string): string | null {
  return HUB_TO_IMAGE[hub] ?? null;
}

/** Reviewer key → headshot. */
const REVIEWER_IMAGES: Record<string, string> = {
  "dr-rivera": "/images/reviewers/dr-rivera.jpg",
  "dr-chen": "/images/reviewers/dr-chen.jpg",
  "dr-okafor": "/images/reviewers/dr-okafor.jpg",
};

export function reviewerImage(key: string): string | null {
  return REVIEWER_IMAGES[key] ?? null;
}

export function reviewerImageByName(name: string): string | null {
  const norm = name.toLowerCase();
  if (norm.includes("rivera")) return REVIEWER_IMAGES["dr-rivera"];
  if (norm.includes("chen")) return REVIEWER_IMAGES["dr-chen"];
  if (norm.includes("okafor")) return REVIEWER_IMAGES["dr-okafor"];
  return null;
}

const AUTHOR_IMAGES: Record<string, string> = {
  "staff-1": "/images/authors/staff-1.jpg",
  "staff-2": "/images/authors/staff-2.jpg",
  "staff-3": "/images/authors/staff-3.jpg",
};

export function authorImage(key: string): string | null {
  return AUTHOR_IMAGES[key] ?? null;
}

export function authorImageByName(name: string): string | null {
  // Stable, deterministic mapping by hash of the name.
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash + name.charCodeAt(i)) | 0;
  const keys = Object.keys(AUTHOR_IMAGES);
  return AUTHOR_IMAGES[keys[Math.abs(hash) % keys.length]];
}
