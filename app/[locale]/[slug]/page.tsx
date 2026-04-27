import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPost, posts } from "@/lib/content/posts";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";
import { locales, type Locale } from "@/i18n/routing";
import { isSwedenBlocked } from "@/lib/compliance/sweden-restrictions";

const RESERVED = new Set([
  "about",
  "contact",
  "privacy",
  "terms",
  "affiliate-disclosure",
  "editorial-standards",
  "corrections-policy",
  "authors",
  "reviewers",
  "medical-disclaimer",
  "methodology",
  "pipeline",
  "newsletter",
  "guides",
  "peptide-calculator",
  "cookies",
  "impressum",
  "sitemap.xml",
  "robots.txt",
  "llms.txt",
]);

export function generateStaticParams() {
  const result: { locale: Locale; slug: string }[] = [];
  for (const locale of locales) {
    for (const p of posts) {
      result.push({ locale, slug: p.slug });
    }
  }
  return result;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (RESERVED.has(slug)) return {};
  const post = getPost(slug);
  if (!post) return {};

  // Sweden-blocked posts: noindex stub
  if (locale === "sv" && isSwedenBlocked(post)) {
    return {
      title: "Innehåll inte tillgängligt",
      robots: { index: false, follow: false },
    };
  }

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/${post.slug}`,
    ogType: "article",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (RESERVED.has(slug)) notFound();
  const post = getPost(slug);
  if (!post) notFound();

  // Sweden compliance gate (Tier 2 H): render a minimal stub.
  if (locale === "sv" && isSwedenBlocked(post)) {
    const t = await getTranslations("swedenRestricted");
    return (
      <TrustPageTemplate title={t("title")}>
        <p>{t("body")}</p>
        <p className="text-sm text-charcoal/60">
          <a href="https://www.lakemedelsverket.se" target="_blank" rel="noopener">
            lakemedelsverket.se
          </a>
        </p>
      </TrustPageTemplate>
    );
  }

  return <ArticleTemplate post={post} />;
}
