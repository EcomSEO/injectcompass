import type { Metadata } from "next";
import { LegalContentRenderer } from "@/components/templates/LegalContentRenderer";
import { affiliateDisclosureContent } from "@/lib/content/affiliate-disclosure";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = affiliateDisclosureContent[locale] ?? affiliateDisclosureContent.en;
  return pageMetadata({
    title: c.title,
    description: c.intro.slice(0, 160),
    path: "/affiliate-disclosure",
  });
}

export default async function AffiliateDisclosurePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = affiliateDisclosureContent[locale] ?? affiliateDisclosureContent.en;
  return <LegalContentRenderer content={content} />;
}
