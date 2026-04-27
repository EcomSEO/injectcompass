/**
 * Substances illegal or restricted in Sweden as of the April 2026
 * compliance audit. Content discussing these compounds must not be
 * served to Swedish (sv) locale visitors.
 *
 * Source: Compliance audit, April 2026 — Sweden chapter
 * (Läkemedelsverket reclassifications + July 2025 narcotics schedule).
 */

export const SWEDEN_BLOCKED_COMPOUNDS = [
  "semaglutide-compounded",
  "melanotan-1",
  "melanotan-2",
  "bpc-157",
  "tb-500",
] as const;

export type SwedenBlockedCompound = (typeof SWEDEN_BLOCKED_COMPOUNDS)[number];

/**
 * Compound search-terms (lowercase) that, if present in a post slug
 * or title, indicate the article should be blocked in Sweden.
 */
export const SWEDEN_BLOCKED_TERMS: string[] = [
  "compounded-semaglutide",
  "compounded semaglutide",
  "melanotan",
  "bpc-157",
  "bpc 157",
  "tb-500",
  "tb 500",
];

/**
 * Returns true if a Swedish visitor must not see substantive content
 * for the given post. Matches against slug + title.
 */
export function isSwedenBlocked(post: { slug: string; title: string; restrictedInLocales?: string[] }): boolean {
  if (post.restrictedInLocales?.includes("sv")) return true;
  const haystack = `${post.slug} ${post.title}`.toLowerCase();
  return SWEDEN_BLOCKED_TERMS.some((term) => haystack.includes(term));
}

export const SWEDEN_BLOCKED_NOTICE_SV =
  "Innehåll om denna substans är inte tillgängligt på svenska enligt svensk lagstiftning. För mer information, kontakta Läkemedelsverket.";
