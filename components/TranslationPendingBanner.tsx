import { getTranslations, getLocale } from "next-intl/server";

/**
 * TranslationPendingBanner — shown above article body content on
 * non-English locales when only the chrome has been translated.
 * Body copy renders in English below.
 *
 * Caller can pass `force` to skip the locale check (used in pages where
 * we know the body has not been translated yet for any non-English).
 */
export async function TranslationPendingBanner({
  force = false,
}: { force?: boolean } = {}) {
  const locale = await getLocale();
  if (!force && locale === "en") return null;

  const t = await getTranslations("article");
  const title = t("translation_pending_title");
  const body = t("translation_pending_body");

  return (
    <aside
      role="note"
      className="mt-8 mb-4 px-5 py-4 border-l-2 border-amber-500/70 bg-amber-50 rounded-r-sm"
    >
      <p className="text-[13px] font-semibold text-ink mb-1">{title}</p>
      <p className="text-[13.5px] text-ink-muted leading-relaxed">{body}</p>
    </aside>
  );
}
