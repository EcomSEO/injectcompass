import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPost, posts } from "@/lib/content/posts";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { pageMetadata } from "@/lib/seo";
import { locales, type Locale } from "@/i18n/routing";

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
  const { slug } = await params;
  if (RESERVED.has(slug)) return {};
  const post = getPost(slug);
  if (!post) return {};
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

  return <ArticleTemplate post={post} />;
}
