import type { Metadata } from "next";
import { LegalContentRenderer } from "@/components/templates/LegalContentRenderer";
import { privacyPolicyContent } from "@/lib/content/privacy-policy";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = privacyPolicyContent[locale] ?? privacyPolicyContent.en;
  return pageMetadata({
    title: c.title,
    description: c.intro.slice(0, 160),
    path: "/privacy",
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = privacyPolicyContent[locale] ?? privacyPolicyContent.en;
  return <LegalContentRenderer content={content} />;
}
