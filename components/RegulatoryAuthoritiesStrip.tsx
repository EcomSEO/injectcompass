import { getLocale, getTranslations } from "next-intl/server";
import { AUTHORITIES_BY_LOCALE } from "@/lib/compliance/authorities";
import type { Locale } from "@/i18n/routing";

/**
 * Small footer block listing the country's medicines + data
 * protection authorities, signalling regulatory awareness.
 */
export async function RegulatoryAuthoritiesStrip() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("regulatoryAuthorities");
  const items = AUTHORITIES_BY_LOCALE[locale] ?? AUTHORITIES_BY_LOCALE.en;
  return (
    <div className="py-6 border-t border-rule">
      <h3 className="eyebrow mb-2">{t("heading")}</h3>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-ink-muted">
        {items.map((a) => (
          <li key={a.url}>
            <a href={a.url} target="_blank" rel="noopener" className="hover:text-teal-700 underline-offset-2 hover:underline">
              {a.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
