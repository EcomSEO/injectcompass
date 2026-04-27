import { getTranslations, getLocale } from "next-intl/server";

const LOCALE_BCP47: Record<string, string> = {
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
  it: "it-IT",
  es: "es-ES",
  nl: "nl-NL",
  pl: "pl-PL",
  sv: "sv-SE",
  pt: "pt-PT",
  ro: "ro-RO",
  cs: "cs-CZ",
  no: "nb-NO",
};

/**
 * Last-reviewed line — small text-secondary under article meta.
 * Healthline's "Last medically reviewed on April 26, 2026" pattern,
 * localized so each locale gets its native date format.
 */
export async function LastReviewedLine({ date }: { date: string }) {
  const locale = await getLocale();
  const t = await getTranslations("trust");
  const d = new Date(date);
  const bcp47 = LOCALE_BCP47[locale] ?? "en-US";
  const formatted = d.toLocaleDateString(bcp47, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className="text-[13px] text-ink-muted">
      {t("last_reviewed_on")} <time dateTime={date}>{formatted}</time>
    </div>
  );
}
