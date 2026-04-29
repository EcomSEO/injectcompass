import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content/site";
import { hubs } from "@/lib/content/hubs";
import { posts } from "@/lib/content/posts";
import { locales, defaultLocale } from "@/i18n/routing";

/**
 * Hreflang sitemap × 12 locales. The default locale serves at the root path;
 * other locales are prefixed (`/de`, `/fr`, …). x-default points to the
 * English / root URL.
 */
function localePath(locale: string, path: string) {
  const base = locale === defaultLocale ? "" : `/${locale}`;
  if (path === "/") return `${SITE.url}${base || "/"}`;
  return `${SITE.url}${base}${path}`;
}

function alternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = localePath(l, path);
  languages["x-default"] = localePath(defaultLocale, path);
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const paths: Array<{ path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/methodology", priority: 0.6, changeFrequency: "monthly" },
    { path: "/methodology/v1-2", priority: 0.4, changeFrequency: "yearly" },
    { path: "/pipeline", priority: 0.6, changeFrequency: "weekly" },
    { path: "/about", priority: 0.3, changeFrequency: "yearly" },
    { path: "/editorial-standards", priority: 0.3, changeFrequency: "yearly" },
    { path: "/medical-disclaimer", priority: 0.3, changeFrequency: "yearly" },
    { path: "/affiliate-disclosure", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.3, changeFrequency: "yearly" },
    { path: "/newsletter", priority: 0.3, changeFrequency: "yearly" },
    { path: "/courses", priority: 0.5, changeFrequency: "monthly" },
    { path: "/courses/injection-technique-masterclass", priority: 0.6, changeFrequency: "monthly" },
    { path: "/courses/reconstitution-math", priority: 0.6, changeFrequency: "monthly" },
    ...hubs.map((h) => ({
      path: `/guides/${h.slug}`,
      priority: 0.8,
      changeFrequency: "weekly" as const,
    })),
    ...posts.map((p) => ({
      path: `/${p.slug}`,
      priority: p.postType === "pillar" || p.postType === "comparison" ? 0.9 : 0.7,
      changeFrequency: "monthly" as const,
    })),
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const { path, priority, changeFrequency } of paths) {
    for (const locale of locales) {
      entries.push({
        url: localePath(locale, path),
        lastModified: now,
        changeFrequency,
        priority,
        alternates: alternates(path),
      });
    }
  }
  return entries;
}
