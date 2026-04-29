import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { Inter, Merriweather, IBM_Plex_Mono } from "next/font/google";
import "../globals.css";

/**
 * Per the 2026-04-29 audit-fix sweep: fonts self-hosted via
 * next/font/google so the runtime no longer issues requests to
 * fonts.googleapis.com / fonts.gstatic.com. GDPR posture (no reader IPs
 * to Google) + LCP improvement.
 */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  variable: "--font-merriweather",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-ibm-mono",
});
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { MedicalDisclaimerFooter } from "@/components/MedicalDisclaimer";
import { OrganizationJsonLd } from "@/components/schema/OrganizationJsonLd";
import { SITE } from "@/lib/content/site";
import { robotsMeta, localeUrl } from "@/lib/seo";
import { routing, locales, type Locale } from "@/i18n/routing";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  de: "de_DE",
  fr: "fr_FR",
  it: "it_IT",
  es: "es_ES",
  nl: "nl_NL",
  pl: "pl_PL",
  sv: "sv_SE",
  pt: "pt_PT",
  ro: "ro_RO",
  cs: "cs_CZ",
  no: "no_NO",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) return {};
  const locale = raw as Locale;
  const t = await getTranslations({ locale, namespace: "siteMeta" });
  const tagline = t("tagline");
  const description = t("description");

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = localeUrl(l, "/");
  }
  languages["x-default"] = localeUrl("en", "/");

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${SITE.name}, ${tagline}`,
      template: `%s, ${SITE.name}`,
    },
    description,
    alternates: {
      canonical: localeUrl(locale, "/"),
      languages,
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: OG_LOCALE[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
      images: [
        {
          url: "/images/og-default.jpg",
          width: 1600,
          height: 900,
          alt: SITE.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/images/og-default.jpg"],
    },
    robots: robotsMeta(),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) {
    notFound();
  }
  const locale = raw as Locale;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${merriweather.variable} ${ibmMono.variable}`}
    >
      <body className="bg-surface text-ink antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-teal-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
          >
            Skip to content
          </a>
          <OrganizationJsonLd />
          <Header />
          <div id="main">{children}</div>
          <MedicalDisclaimerFooter />
          <Footer />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
