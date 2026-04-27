"use client";

import { Link } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { MegaMenu, type MegaMenuColumn } from "./MegaMenu";
import { LocaleSwitcher } from "./LocaleSwitcher";

/**
 * Healthline-grade publisher header.
 * Sticky white bar, h-16, logo left, primary nav center (with mega-menu on hover),
 * search 320px right, locale switcher, "Newsletter" pill button.
 *
 * Mobile: hamburger drawer + collapsed search icon.
 */

type SimpleNav = { href: string; label: string };
type MegaNav = {
  label: string;
  megaMenu: MegaMenuColumn[];
  featured?: { eyebrow: string; title: string; href: string; dek: string };
};
type NavItem = SimpleNav | MegaNav;

function isMega(item: NavItem): item is MegaNav {
  return (item as MegaNav).megaMenu !== undefined;
}

const NAV: NavItem[] = [
  {
    label: "Conditions",
    megaMenu: [
      {
        title: "Diabetes & GLP-1",
        items: [
          { label: "Subcutaneous injection sites", href: "/subcutaneous-injection-sites" },
          { label: "Site rotation", href: "/injection-site-rotation" },
          { label: "Reading insulin syringes", href: "/reading-insulin-syringes" },
        ],
      },
      {
        title: "Hormone therapy",
        items: [
          { label: "Intramuscular technique", href: "/intramuscular-injection-technique" },
          { label: "Glute vs. thigh sites", href: "/im-injection-sites" },
          { label: "Needle gauge guide", href: "/needle-gauge-guide" },
        ],
      },
      {
        title: "Peptide therapy",
        items: [
          { label: "Reconstitution math", href: "/reconstitution-calculator" },
          { label: "Bacteriostatic water", href: "/bacteriostatic-water" },
          { label: "Cloudy solutions", href: "/cloudy-peptide-solutions" },
        ],
      },
    ],
    featured: {
      eyebrow: "Trending",
      title: "How to read an insulin syringe — with a visual",
      href: "/peptide-calculator",
      dek: "U-100 syringe ticks decoded, with a worked example you can print.",
    },
  },
  {
    label: "Procedures",
    megaMenu: [
      {
        title: "Technique",
        items: [
          { label: "Subcutaneous injection", href: "/subcutaneous-injection-technique" },
          { label: "Intramuscular injection", href: "/intramuscular-injection-technique" },
          { label: "Pinching skin correctly", href: "/skin-pinching-technique" },
        ],
      },
      {
        title: "Preparation",
        items: [
          { label: "Reconstitution step-by-step", href: "/reconstitution-step-by-step" },
          { label: "Drawing up a dose", href: "/drawing-up-injection-dose" },
          { label: "Sterile field basics", href: "/sterile-injection-prep" },
        ],
      },
      {
        title: "After the injection",
        items: [
          { label: "Bruising & bleeding", href: "/injection-bruising" },
          { label: "Lipohypertrophy", href: "/lipohypertrophy" },
          { label: "Sharps disposal", href: "/sharps-disposal" },
        ],
      },
    ],
  },
  {
    label: "Drugs",
    megaMenu: [
      {
        title: "GLP-1 family",
        items: [
          { label: "Semaglutide", href: "/semaglutide-injection-guide" },
          { label: "Tirzepatide", href: "/tirzepatide-injection-guide" },
          { label: "Liraglutide", href: "/liraglutide-injection-guide" },
        ],
      },
      {
        title: "Peptides",
        items: [
          { label: "BPC-157", href: "/bpc-157" },
          { label: "TB-500", href: "/tb-500" },
          { label: "Ipamorelin", href: "/ipamorelin" },
        ],
      },
      {
        title: "Hormones",
        items: [
          { label: "Testosterone", href: "/testosterone-injection-guide" },
          { label: "HCG", href: "/hcg-injection-guide" },
          { label: "Estradiol", href: "/estradiol-injection-guide" },
        ],
      },
    ],
  },
  { href: "/guides/troubleshooting", label: "Health News" },
  {
    label: "Tools",
    megaMenu: [
      {
        title: "Calculators",
        items: [
          { label: "Peptide Calculator", href: "/peptide-calculator" },
          { label: "Reconstitution Calculator", href: "/reconstitution-calculator" },
          { label: "Syringe Converter", href: "/syringe-converter" },
          { label: "Dose Schedule Builder", href: "/dose-schedule-builder" },
        ],
      },
      {
        title: "Reference",
        items: [
          { label: "Methodology v1.2", href: "/methodology" },
          { label: "Editorial standards", href: "/editorial-standards" },
          { label: "Pipeline", href: "/pipeline" },
        ],
      },
    ],
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tCommon = useTranslations("common");
  const tNav = useTranslations("header.nav");
  const tHeader = useTranslations("header");

  // Compose the rendered nav by overlaying translated top-level labels onto
  // the base NAV array. Sub-item labels stay English (slugs are English in
  // phase one). The TranslationPendingBanner pattern handles body content.
  const localizedNav: NavItem[] = NAV.map((item) => {
    const labelKey = item.label.toLowerCase().replace(/\s+/g, "_") as
      | "conditions"
      | "procedures"
      | "drugs"
      | "health_news"
      | "tools";
    const translated = (() => {
      try {
        return tNav(labelKey);
      } catch {
        return item.label;
      }
    })();
    if (isMega(item)) {
      return { ...item, label: translated };
    }
    return { ...item, label: translated };
  });

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openMega = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMega(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMega(null), 120);
  };

  const activeItem = activeMega
    ? localizedNav.find((n) => isMega(n) && n.label === activeMega)
    : null;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-rule">
      <div className="mx-auto max-w-container px-6 h-16 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label={tHeader("logo_aria")}>
          <CompassMark />
          <span className="font-semibold text-[18px] tracking-tight text-ink group-hover:text-teal-600 transition-colors">
            injectcompass
          </span>
        </Link>

        <nav
          className="hidden lg:flex items-center gap-1 ml-4 flex-1"
          aria-label="Primary"
          onMouseLeave={scheduleClose}
        >
          {localizedNav.map((item) => {
            if (isMega(item)) {
              const isOpen = activeMega === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => openMega(item.label)}
                  onFocus={() => openMega(item.label)}
                >
                  <button
                    type="button"
                    className={`px-3 py-2 text-[15px] font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
                      isOpen ? "text-teal-700 bg-teal-50" : "text-ink hover:text-teal-700"
                    }`}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                  >
                    {item.label}
                  </button>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-[15px] font-medium text-ink hover:text-teal-700 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <form
          role="search"
          action="/"
          className="hidden md:flex items-center w-[320px] h-10 px-4 rounded-pill bg-surface-alt border border-rule focus-within:border-teal-500 focus-within:bg-white transition-colors"
        >
          <SearchIcon className="w-4 h-4 text-ink-muted shrink-0" />
          <input
            type="search"
            name="q"
            placeholder={tCommon("search_placeholder")}
            className="ml-2 bg-transparent w-full text-[14px] text-ink placeholder:text-ink-soft outline-none"
            aria-label={tHeader("search_aria")}
          />
        </form>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:inline-flex">
            <LocaleSwitcher />
          </div>
          <Link
            href="/newsletter"
            className="hidden md:inline-flex items-center h-9 px-4 rounded-pill bg-teal-500 text-white text-[14px] font-semibold hover:bg-teal-600 transition-colors"
          >
            {tHeader("newsletter_cta")}
          </Link>

          <button
            type="button"
            aria-label={tCommon("search")}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-ink rounded-md"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={tHeader("open_menu")}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-ink rounded-md"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
      </div>

      {activeItem && isMega(activeItem) && (
        <div
          className="absolute left-0 right-0 bg-white border-b border-rule shadow-card"
          onMouseEnter={() => openMega(activeItem.label)}
          onMouseLeave={scheduleClose}
        >
          <MegaMenu columns={activeItem.megaMenu} featured={activeItem.featured} />
        </div>
      )}

      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 bg-white overflow-auto lg:hidden"
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-rule">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <CompassMark />
              <span className="font-semibold text-[18px] text-ink">injectcompass</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label={tHeader("close_menu")}
              className="inline-flex items-center justify-center w-10 h-10 -mr-2 text-ink"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="p-6">
            <form role="search" action="/" className="flex items-center w-full h-12 px-4 rounded-pill bg-surface-alt border border-rule mb-6">
              <SearchIcon className="w-5 h-5 text-ink-muted shrink-0" />
              <input
                type="search"
                name="q"
                placeholder={tCommon("search_placeholder")}
                className="ml-3 bg-transparent w-full text-[15px] outline-none"
                aria-label={tHeader("search_aria")}
              />
            </form>
            <nav className="flex flex-col">
              {localizedNav.map((item) => {
                if (isMega(item)) {
                  return (
                    <details key={item.label} className="border-b border-rule">
                      <summary className="cursor-pointer flex items-center justify-between py-4 text-[18px] font-semibold text-ink list-none">
                        {item.label}
                        <ChevronDown />
                      </summary>
                      <div className="pb-4 pl-2">
                        {item.megaMenu.map((col) => (
                          <div key={col.title} className="mb-3">
                            <div className="eyebrow eyebrow-muted mb-2">{col.title}</div>
                            <ul className="space-y-2">
                              {col.items.map((sub) => (
                                <li key={sub.href}>
                                  <Link
                                    href={sub.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-[15px] text-ink hover:text-teal-700"
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </details>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-4 text-[18px] font-semibold text-ink border-b border-rule"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <Link
              href="/newsletter"
              onClick={() => setMobileOpen(false)}
              className="mt-8 inline-flex w-full items-center justify-center h-12 px-4 rounded-pill bg-teal-500 text-white text-[15px] font-semibold"
            >
              {tHeader("newsletter_cta")}
            </Link>
            <div className="mt-6 flex justify-center">
              <LocaleSwitcher onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
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

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <circle cx="9" cy="9" r="6" />
      <line x1="13.5" y1="13.5" x2="17.5" y2="17.5" strokeLinecap="round" />
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

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <polyline points="3,6 8,11 13,6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
