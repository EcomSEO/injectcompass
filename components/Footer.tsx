import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { hubs } from "@/lib/content/hubs";
import { SITE } from "@/lib/content/site";
import { LocaleSwitcher } from "./LocaleSwitcher";

const tools = [
  { slug: "peptide-calculator", name: "Peptide Calculator" },
  { slug: "reconstitution-calculator", name: "Reconstitution Calculator" },
  { slug: "syringe-converter", name: "Syringe Converter" },
  { slug: "dose-schedule-builder", name: "Dose Schedule Builder" },
];

const sisterSites = [
  { name: "PepTips", href: "https://peptips.com" },
  { name: "PepVise", href: "https://pepvise.com" },
  { name: "LarderLab", href: "https://larderlab.com" },
  { name: "ThatCleanChef", href: "https://thatcleanchef.com" },
  { name: "CircadianStack", href: "https://circadianstack.com" },
  { name: "PlasticFreeLab", href: "https://plasticfreelab.com" },
];

/**
 * Healthline-grade publisher footer.
 * 4 column link grid, medical disclaimer block, sister-site links,
 * locale switcher, copyright + editorial standards / privacy / terms.
 */
export async function Footer() {
  const t = await getTranslations("footer");
  const tMeta = await getTranslations("siteMeta");
  return (
    <footer className="mt-24 bg-surface-alt border-t border-rule">
      <div className="mx-auto max-w-container px-6 pt-14 pb-8">
        {/* Brand row */}
        <div className="grid md:grid-cols-12 gap-8 pb-10 border-b border-rule">
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2" aria-label="InjectCompass — home">
              <CompassMark />
              <span className="font-semibold text-[20px] tracking-tight text-ink">injectcompass</span>
            </Link>
            <p className="mt-4 text-[14px] text-ink-muted leading-relaxed max-w-md">
              {tMeta("description")}
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="eyebrow mb-3">{t("conditions_heading")}</h3>
            <ul className="space-y-2 text-[14px]">
              {hubs.map((hub) => (
                <li key={hub.slug}>
                  <Link href={`/guides/${hub.slug}`} className="text-ink hover:text-teal-700 transition-colors">
                    {hub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="eyebrow mb-3">{t("tools_heading")}</h3>
            <ul className="space-y-2 text-[14px]">
              {tools.map((t) => (
                <li key={t.slug}>
                  <Link href={`/${t.slug}`} className="text-ink hover:text-teal-700 transition-colors">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="eyebrow mb-3">{t("company_heading")}</h3>
            <ul className="space-y-2 text-[14px]">
              <li><Link href="/about" className="text-ink hover:text-teal-700">{t("about")}</Link></li>
              <li><Link href="/editorial-standards" className="text-ink hover:text-teal-700">{t("editorial_standards")}</Link></li>
              <li><Link href="/methodology" className="text-ink hover:text-teal-700">{t("methodology")}</Link></li>
              <li><Link href="/authors" className="text-ink hover:text-teal-700">Editorial team</Link></li>
              <li><Link href="/reviewers" className="text-ink hover:text-teal-700">Medical reviewers</Link></li>
              <li><Link href="/corrections-policy" className="text-ink hover:text-teal-700">Corrections</Link></li>
              <li><Link href="/contact" className="text-ink hover:text-teal-700">{t("contact")}</Link></li>
              <li><Link href="/newsletter" className="text-ink hover:text-teal-700">{t("newsletter")}</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer block */}
        <div className="py-8 border-b border-rule">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-7">
              <h3 className="eyebrow eyebrow-danger mb-2">{t("disclaimer_heading")}</h3>
              <p className="text-[13px] text-ink-muted leading-relaxed">
                {t("disclaimer_body")}
              </p>
            </div>
            <div className="md:col-span-5">
              <h3 className="eyebrow mb-2">{t("from_the_network")}</h3>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
                {sisterSites.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      rel="noopener"
                      className="text-ink-muted hover:text-teal-700 transition-colors"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <LocaleSwitcher variant="footer" />
              </div>
            </div>
          </div>
        </div>

        {/* Imprint strip */}
        <div className="pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[12px] text-ink-muted">
          <div>{t("copyright", { year: new Date().getFullYear() })}</div>
          <ul className="flex flex-wrap gap-x-4">
            <li><Link href="/editorial-standards" className="hover:text-teal-700">{t("editorial_standards")}</Link></li>
            <li><Link href="/privacy" className="hover:text-teal-700">{t("privacy")}</Link></li>
            <li><Link href="/terms" className="hover:text-teal-700">{t("terms")}</Link></li>
            <li><Link href="/affiliate-disclosure" className="hover:text-teal-700">{t("affiliate_disclosure")}</Link></li>
            <li><Link href="/medical-disclaimer" className="hover:text-teal-700">{t("medical_disclaimer")}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function CompassMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="12" stroke="#0E8A7A" strokeWidth="1.6" />
      <path d="M14 5 L17 14 L14 23 L11 14 Z" fill="#0E8A7A" />
      <circle cx="14" cy="14" r="2.4" fill="#fff" />
      <circle cx="14" cy="14" r="1.2" fill="#0A6F61" />
    </svg>
  );
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M2.5 10h15" />
      <path d="M10 2.5c2.5 2.7 2.5 12.3 0 15" />
      <path d="M10 2.5c-2.5 2.7-2.5 12.3 0 15" />
    </svg>
  );
}
