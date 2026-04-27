import type { Metadata } from "next";
import { LegalContentRenderer } from "@/components/templates/LegalContentRenderer";
import { termsContent } from "@/lib/content/terms";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = termsContent[locale] ?? termsContent.en;
  return pageMetadata({
    title: c.title,
    description: c.intro.slice(0, 160),
    path: "/terms",
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = termsContent[locale] ?? termsContent.en;
  return <LegalContentRenderer content={content} />;
}
