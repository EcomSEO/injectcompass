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
      ? "appearance-none bg-transparent border border-midnight-rule rounded-pill pl-3 pr-7 py-1.5 text-on-dark-muted hover:text-on-dark hover:border-aqua/40 cursor-pointer focus:outline-none focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-deep transition-colors duration-fast"
      : "appearance-none bg-transparent border border-midnight-rule rounded-pill pl-7 pr-6 h-9 text-on-dark-muted hover:text-aqua hover:border-aqua/40 cursor-pointer focus:outline-none focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-deep transition-colors duration-fast text-[13px] font-medium uppercase tracking-wider";

  // Header variant shows only the locale code ("EN") for a compact pill;
  // the option list still surfaces full names for clarity.
  const showFullInSelected = variant !== "header";

  return (
    <label
      aria-label={t("label")}
      className={wrapperClass}
      data-pending={isPending ? "true" : undefined}
    >
      <span className="sr-only">{t("label")}</span>
      {variant === "header" && (
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-dark-muted"
        >
          <circle cx="10" cy="10" r="7.5" />
          <path d="M2.5 10h15" />
          <path d="M10 2.5c2.5 2.7 2.5 12.3 0 15" />
          <path d="M10 2.5c-2.5 2.7-2.5 12.3 0 15" />
        </svg>
      )}
      <select
        value={active}
        onChange={(e) => handleChange(e.target.value as Locale)}
        className={selectClass}
        aria-label={t("label")}
      >
        {locales.map((l) => (
          <option key={l} value={l} lang={l} className="text-on-dark bg-midnight-card">
            {showFullInSelected
              ? `${t(shortKey(l))}, ${t(fullKey(l))}`
              : t(shortKey(l))}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-on-dark-faint text-[10px]"
      >
        ▾
      </span>
    </label>
  );
}
