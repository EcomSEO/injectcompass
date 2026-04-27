"use client";

import { useTranslations } from "next-intl";
import { openCookiePrefs } from "./CookieConsent";

export function CookiePreferencesLink({ className = "" }: { className?: string }) {
  const t = useTranslations("footer");
  return (
    <button
      type="button"
      onClick={openCookiePrefs}
      className={`hover:text-teal-700 ${className}`}
      aria-label={t("cookie_preferences")}
    >
      {t("cookie_preferences")}
    </button>
  );
}
