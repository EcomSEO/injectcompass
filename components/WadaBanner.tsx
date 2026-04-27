import { getTranslations } from "next-intl/server";

/**
 * Banner shown on articles tagged `performance` or `recovery` that may
 * touch on WADA-prohibited compounds. Translated per locale.
 */
export async function WadaBanner() {
  const t = await getTranslations("wadaBanner");
  return (
    <div className="border border-amber-300 bg-amber-50 text-amber-950 rounded-sm px-4 py-3 text-sm leading-relaxed mb-6">
      <strong className="font-semibold">{t("eyebrow")}</strong> {t("body")}
    </div>
  );
}
