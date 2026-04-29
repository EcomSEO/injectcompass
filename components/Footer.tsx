import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { hubs } from "@/lib/content/hubs";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { CookiePreferencesLink } from "./CookiePreferencesLink";
import { RegulatoryAuthoritiesStrip } from "./RegulatoryAuthoritiesStrip";
import type { Locale } from "@/i18n/routing";

const tools = [
  { slug: "peptide-calculator", name: "Peptide Calculator" },
  { slug: "reconstitution-calculator", name: "Reconstitution Calculator" },
  { slug: "syringe-converter", name: "Syringe Converter" },
  { slug: "dose-schedule-builder", name: "Dose Schedule Builder" },
];

export async function Footer() {
  const t = await getTranslations("footer");
  const tMeta = await getTranslations("siteMeta");
  const locale = (await getLocale()) as Locale;

  const linkClass =
    "text-on-dark-muted hover:text-aqua transition-colors duration-fast focus-visible:outline-none focus-visible:text-aqua";

  return (
    <footer className="mt-32 bg-midnight border-t border-midnight-rule">
      <div className="mx-auto max-w-container px-6 pt-16 pb-10">
        {/* Brand row */}
        <div className="grid md:grid-cols-12 gap-10 pb-12 border-b border-midnight-rule">
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="InjectCompass, home">
              <CompassMark />
              <span className="font-semibold text-[20px] tracking-tight text-on-dark">injectcompass</span>
            </Link>
            <p className="mt-5 text-body-sm text-on-dark-muted leading-relaxed max-w-md">
              {tMeta("description")}
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-eyebrow uppercase text-on-dark-faint mb-4">{t("conditions_heading")}</h3>
            <ul className="space-y-2.5 text-body-sm">
              {hubs.map((hub) => (
                <li key={hub.slug}>
                  <Link href={`/guides/${hub.slug}`} className={linkClass}>
                    {hub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-eyebrow uppercase text-on-dark-faint mb-4">{t("tools_heading")}</h3>
            <ul className="space-y-2.5 text-body-sm">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/${tool.slug}`} className={linkClass}>
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-eyebrow uppercase text-on-dark-faint mb-4">{t("company_heading")}</h3>
            <ul className="space-y-2.5 text-body-sm">
              <li><Link href="/about" className={linkClass}>{t("about")}</Link></li>
              <li><Link href="/editorial-standards" className={linkClass}>{t("editorial_standards")}</Link></li>
              <li><Link href="/methodology" className={linkClass}>{t("methodology")}</Link></li>
              <li><Link href="/authors" className={linkClass}>Editorial team</Link></li>
              <li><Link href="/reviewers" className={linkClass}>Medical reviewers</Link></li>
              <li><Link href="/corrections-policy" className={linkClass}>Corrections</Link></li>
              <li><Link href="/contact" className={linkClass}>{t("contact")}</Link></li>
              <li><Link href="/newsletter" className={linkClass}>{t("newsletter")}</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer + newsletter block */}
        <div className="py-10 border-b border-midnight-rule">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <h3 className="text-eyebrow uppercase text-aqua mb-3">{t("disclaimer_heading")}</h3>
              <p className="text-body-sm text-on-dark-muted leading-relaxed">
                {t("disclaimer_body")}
              </p>
            </div>
            <div className="md:col-span-5">
              <h3 className="text-eyebrow uppercase text-on-dark-faint mb-3">{t("newsletter")}</h3>
              <p className="text-body-sm text-on-dark-muted leading-relaxed">
                {t("newsletter_footer_blurb")}{" "}
                <Link
                  href="/newsletter"
                  className="text-aqua hover:text-aqua-soft underline decoration-aqua/40 hover:decoration-aqua underline-offset-4 transition-colors duration-fast"
                >
                  {t("newsletter_footer_cta")}
                </Link>
              </p>
              <div className="mt-5">
                <LocaleSwitcher variant="footer" />
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory authorities strip */}
        <div className="[&_*]:!text-on-dark-muted [&_h3]:!text-on-dark-faint [&_a]:!text-on-dark hover:[&_a]:!text-aqua [&_div]:!border-midnight-rule">
          <RegulatoryAuthoritiesStrip />
        </div>

        {/* Imprint strip */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-caption text-on-dark-faint">
          <div>{t("copyright", { year: new Date().getFullYear() })}</div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link href="/editorial-standards" className="hover:text-aqua transition-colors duration-fast">{t("editorial_standards")}</Link></li>
            <li><Link href="/privacy" className="hover:text-aqua transition-colors duration-fast">{t("privacy")}</Link></li>
            <li><Link href="/terms" className="hover:text-aqua transition-colors duration-fast">{t("terms")}</Link></li>
            <li><Link href="/cookies" className="hover:text-aqua transition-colors duration-fast">{t("cookies_link")}</Link></li>
            <li><Link href="/affiliate-disclosure" className="hover:text-aqua transition-colors duration-fast">{t("affiliate_disclosure")}</Link></li>
            <li><Link href="/medical-disclaimer" className="hover:text-aqua transition-colors duration-fast">{t("medical_disclaimer")}</Link></li>
            {locale === "de" && (
              <li><Link href="/impressum" className="hover:text-aqua transition-colors duration-fast">{t("impressum_link")}</Link></li>
            )}
            <li><CookiePreferencesLink /></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function CompassMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="12" stroke="#5EEAD4" strokeWidth="1.6" />
      <path d="M14 5 L17 14 L14 23 L11 14 Z" fill="#5EEAD4" />
      <circle cx="14" cy="14" r="2.4" fill="#020D12" />
      <circle cx="14" cy="14" r="1.2" fill="#5EEAD4" />
    </svg>
  );
}
