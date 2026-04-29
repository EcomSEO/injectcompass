"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

/**
 * LocaleSwitcher, language picker.
 *
 * Twelve locales is too many for an inline toggle, so this is a styled
 * native <select>: compact, ships zero JS for the menu itself, and gets
 * native-OS picker UX on mobile (sheet on iOS, dropdown on Android).
 *
 * Switching keeps the current pathname intact and only swaps the locale
 * prefix, so a reader on /subcutaneous-injection-sites who picks DE
 * lands on /de/subcutaneous-injection-sites.
 */
export function LocaleSwitcher({
  onNavigate,
  variant = "header",
}: {
  onNavigate?: () => void;
  variant?: "header" | "footer";
} = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const active = useLocale() as Locale;
  const t = useTranslations("localeSwitcher");
  const [isPending, startTransition] = useTransition();

  const handleChange = (next: Locale) => {
    if (next === active) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
      onNavigate?.();
    });
  };

  type ShortKey = (typeof locales)[number];
  const shortKey = (l: Locale) => l as ShortKey;
  const fullKey = (l: Locale) => `${l}Full` as `${ShortKey}Full`;

  const wrapperClass =
    variant === "footer"
      ? "relative inline-flex items-center text-[12px]"
      : "relative inline-flex items-center text-[13px]";

  const selectClass =
    variant === "footer"
      ? "appearance-none bg-transparent border border-rule rounded-pill pl-3 pr-7 py-1.5 text-ink-muted hover:text-ink hover:border-rule-strong cursor-pointer focus:outline-none focus:ring-1 focus:ring-teal-500 transition"
      : "appearance-none bg-transparent border border-rule rounded-md pl-2.5 pr-6 h-9 text-ink-muted hover:text-ink hover:border-rule-strong cursor-pointer focus:outline-none focus:ring-1 focus:ring-teal-500 transition";

  return (
    <label
      aria-label={t("label")}
      className={wrapperClass}
      data-pending={isPending ? "true" : undefined}
    >
      <span className="sr-only">{t("label")}</span>
      <select
        value={active}
        onChange={(e) => handleChange(e.target.value as Locale)}
        className={selectClass}
        aria-label={t("label")}
      >
        {locales.map((l) => (
          <option key={l} value={l} lang={l} className="text-ink bg-midnight-card">
            {t(shortKey(l))}, {t(fullKey(l))}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-ink-soft text-[10px]"
      >
        ▾
      </span>
    </label>
  );
}
