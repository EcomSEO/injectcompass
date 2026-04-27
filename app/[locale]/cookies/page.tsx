import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { COOKIE_INVENTORY, cookiePolicyContent } from "@/lib/content/cookie-policy";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = cookiePolicyContent[locale] ?? cookiePolicyContent.en;
  return pageMetadata({
    title: c.title,
    description: c.intro.slice(0, 160),
    path: "/cookies",
  });
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = cookiePolicyContent[locale] ?? cookiePolicyContent.en;

  return (
    <TrustPageTemplate title={c.title}>
      <p className="text-sm text-charcoal/60">{c.lastUpdated}</p>
      <p>{c.intro}</p>

      <h2>{c.tableHeading}</h2>
      <div className="overflow-x-auto not-prose">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-rule">
              <th className="px-2 py-2 font-semibold text-clinical-deep">{c.columns.name}</th>
              <th className="px-2 py-2 font-semibold text-clinical-deep">{c.columns.category}</th>
              <th className="px-2 py-2 font-semibold text-clinical-deep">{c.columns.purpose}</th>
              <th className="px-2 py-2 font-semibold text-clinical-deep">{c.columns.duration}</th>
              <th className="px-2 py-2 font-semibold text-clinical-deep">{c.columns.provider}</th>
            </tr>
          </thead>
          <tbody>
            {COOKIE_INVENTORY.map((row) => (
              <tr key={row.name} className="border-b border-rule/60 align-top">
                <td className="px-2 py-2 font-mono text-[12px]">{row.name}</td>
                <td className="px-2 py-2">{c.categoryLabels[row.category]}</td>
                <td className="px-2 py-2">{row.purpose}</td>
                <td className="px-2 py-2">{row.duration}</td>
                <td className="px-2 py-2">{row.provider}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>{c.withdrawHeading}</h2>
      <p>{c.withdrawBody}</p>

      <h2>{c.contactHeading}</h2>
      <p>{c.contactBody}</p>
    </TrustPageTemplate>
  );
}
