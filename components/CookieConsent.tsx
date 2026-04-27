"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const STORAGE_KEY = "cookieConsent";
export const CONSENT_VERSION = 1;
const TWELVE_MONTHS_MS = 13 * 30 * 24 * 60 * 60 * 1000;
const OPEN_PREFS_EVENT = "open-cookie-prefs";

export type CookieConsent = {
  ts: number;
  version: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

function readConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    if (typeof parsed.ts !== "number") return null;
    if (Date.now() - parsed.ts > TWELVE_MONTHS_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(c: CookieConsent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  } catch {
    // ignore quota / disabled storage
  }
}

/**
 * Public hook returning the current consent state (or null if not yet given).
 * Reactive to consent changes via storage events and the open-prefs event.
 */
export function useCookieConsent(): CookieConsent | null {
  const [state, setState] = useState<CookieConsent | null>(null);

  useEffect(() => {
    setState(readConsent());
    const onChange = () => setState(readConsent());
    window.addEventListener("storage", onChange);
    window.addEventListener(OPEN_PREFS_EVENT, onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener(OPEN_PREFS_EVENT, onChange);
    };
  }, []);

  return state;
}

export function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === null);
    const onOpen = () => {
      setShowCustomize(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_PREFS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PREFS_EVENT, onOpen);
  }, []);

  const persist = useCallback((next: CookieConsent) => {
    writeConsent(next);
    // Notify listeners (analytics loaders, useCookieConsent consumers)
    window.dispatchEvent(new Event("storage"));
    setVisible(false);
    setShowCustomize(false);
  }, []);

  const acceptAll = () =>
    persist({ ts: Date.now(), version: CONSENT_VERSION, necessary: true, analytics: true, marketing: true });
  const rejectAll = () =>
    persist({ ts: Date.now(), version: CONSENT_VERSION, necessary: true, analytics: false, marketing: false });
  const saveCustom = () =>
    persist({ ts: Date.now(), version: CONSENT_VERSION, necessary: true, analytics, marketing });

  if (!visible) return null;

  const buttonBase =
    "min-h-[44px] px-4 py-2 rounded-sm text-sm font-semibold cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical focus-visible:ring-offset-2";
  const primary = `${buttonBase} bg-clinical text-paper hover:bg-clinical-deep`;
  // Same size + same weight as primary; visually equivalent (audit
  // requirement: "reject all" must have equal prominence to "accept all").
  const secondary = `${buttonBase} bg-paper text-clinical-deep border border-clinical-deep hover:bg-clinical/10`;
  const tertiary = `${buttonBase} bg-paper text-charcoal/80 border border-charcoal/30 hover:bg-charcoal/5`;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-live="polite"
      aria-label={t("aria_label")}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-rule bg-paper-soft shadow-2xl"
    >
      <div className="mx-auto max-w-container px-6 py-5">
        {!showCustomize ? (
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="md:max-w-[60%]">
              <h2 className="font-serif text-lg text-clinical-deep">
                {t("heading")}
              </h2>
              <p className="mt-2 text-sm text-charcoal/85 leading-relaxed">
                {t("body")}{" "}
                <Link href="/cookies" className="underline text-clinical-deep">
                  {t("read_more")}
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              <button type="button" onClick={rejectAll} className={secondary}>
                {t("reject_all")}
              </button>
              <button type="button" onClick={() => setShowCustomize(true)} className={tertiary}>
                {t("customize")}
              </button>
              <button type="button" onClick={acceptAll} className={primary}>
                {t("accept_all")}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="font-serif text-lg text-clinical-deep">
              {t("customize_heading")}
            </h2>
            <p className="mt-2 text-sm text-charcoal/85">{t("customize_body")}</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <input type="checkbox" checked readOnly aria-label={t("necessary_label")} className="mt-1 accent-clinical-deep" />
                <span>
                  <strong className="text-clinical-deep">{t("necessary_label")}</strong>
                  <span className="block text-charcoal/75">{t("necessary_desc")}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <input
                  id="cc-analytics"
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1 accent-clinical-deep"
                />
                <label htmlFor="cc-analytics">
                  <strong className="text-clinical-deep">{t("analytics_label")}</strong>
                  <span className="block text-charcoal/75">{t("analytics_desc")}</span>
                </label>
              </li>
              <li className="flex items-start gap-3">
                <input
                  id="cc-marketing"
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-1 accent-clinical-deep"
                />
                <label htmlFor="cc-marketing">
                  <strong className="text-clinical-deep">{t("marketing_label")}</strong>
                  <span className="block text-charcoal/75">{t("marketing_desc")}</span>
                </label>
              </li>
            </ul>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              <button type="button" onClick={rejectAll} className={secondary}>
                {t("reject_all")}
              </button>
              <button type="button" onClick={saveCustom} className={tertiary}>
                {t("save_choices")}
              </button>
              <button type="button" onClick={acceptAll} className={primary}>
                {t("accept_all")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Convenience helper for callers that want to open the prefs panel. */
export function openCookiePrefs() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_PREFS_EVENT));
  }
}
