import { getTranslations } from "next-intl/server";

/**
 * Thin teal strip placed above article bodies. Translated per locale.
 * Sits ABOVE the medical disclaimer footer — it does not replace it.
 */
export async function EducationalBanner() {
  const t = await getTranslations("educationalBanner");
  return (
    <div
      role="note"
      aria-label={t("aria_label")}
      className="border-l-4 border-teal-700 bg-teal-50 text-teal-950 px-4 py-3 text-sm leading-relaxed mb-6"
    >
      <strong className="font-semibold">{t("eyebrow")}</strong> {t("body")}
    </div>
  );
}
