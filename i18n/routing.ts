import { defineRouting } from "next-intl/routing";

/**
 * Locale routing for injectcompass.com, twelve locales.
 *
 * English is the default and renders at the root path; other locales are
 * served from a /<code>/ prefix. Slugs stay in English in phase one.
 *
 * The atlas voice is a clinical-handout register; native translations of
 * the chrome (header, hero, methodology callouts) live in
 * i18n/dictionaries/<code>.json.
 */
export const locales = [
  "en",
  "de",
  "fr",
  "it",
  "es",
  "nl",
  "pl",
  "sv",
  "pt",
  "ro",
  "cs",
  "no",
] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});
