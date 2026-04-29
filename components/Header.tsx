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

// Per the 2026-04-29 audit + topic-boundary lock: every nav item must
// resolve to a real published post or hub page. The previous nav
// advertised 20+ phantom routes (BPC-157, TB-500, Liraglutide,
// Testosterone, etc.) that returned 404. Research peptides + GLP-1
// patient-ed live on pepvise + peptips per the topic-boundary lock —
// injectcompass nav links only to its own routes.
const NAV: NavItem[] = [
  {
    label: "Injection Technique",
    megaMenu: [
      {
        title: "Subcutaneous",
        items: [
          { label: "Subcutaneous injection — full guide", href: "/subcutaneous-injection" },
          { label: "Rotating injection sites", href: "/rotating-injection-sites" },
          { label: "Injection-site bruising", href: "/injection-site-bruising" },
        ],
      },
      {
        title: "Pen administration",
        items: [
          { label: "How to use the Ozempic pen", href: "/how-to-use-ozempic-pen" },
          { label: "Needle sizes for peptide injection", href: "/needle-sizes-for-peptide-injection" },
        ],
      },
      {
        title: "All technique guides",
        items: [
          { label: "Browse all Injection Technique →", href: "/guides/injection-technique" },
        ],
      },
    ],
    featured: {
      eyebrow: "Most read",
      title: "Subcutaneous injection — the complete guide",
      href: "/subcutaneous-injection",
      dek: "Step-numbered procedure with the published-literature citations every patient should see.",
    },
  },
  {
    label: "Reconstitution",
    megaMenu: [
      {
        title: "Procedures",
        items: [
          { label: "How to reconstitute peptides", href: "/how-to-reconstitute-peptides" },
          { label: "Bacteriostatic vs sterile water", href: "/bacteriostatic-water-vs-sterile-water" },
        ],
      },
      {
        title: "Reference",
        items: [
          { label: "Browse all Reconstitution →", href: "/guides/reconstitution" },
        ],
      },
    ],
  },
  {
    label: "Supplies & Storage",
    megaMenu: [
      {
        title: "Supplies",
        items: [
          { label: "Best sharps containers", href: "/best-sharps-containers" },
          { label: "Needle sizes for peptide injection", href: "/needle-sizes-for-peptide-injection" },
        ],
      },
      {
        title: "Storage",
        items: [
          { label: "Peptide storage temperature guide", href: "/peptide-storage-temperature-guide" },
          { label: "Browse all Supplies & Storage →", href: "/guides/supplies-and-storage" },
        ],
      },
    ],
  },
  { href: "/guides/troubleshooting", label: "Troubleshooting" },
  {
    label: "Tools",
    megaMenu: [
      {
        title: "Calculators",
        items: [
          { label: "Peptide Calculator", href: "/peptide-calculator" },
          { label: "Browse all Calculators & Tools →", href: "/guides/calculators-and-tools" },
        ],
      },
      {
        title: "Education",
        items: [
          { label: "Injection Technique Masterclass — $49", href: "/courses/injection-technique-masterclass" },
          { label: "Reconstitution Math course — $39", href: "/courses/reconstitution-math" },
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
    <header className="sticky top-0 z-40 bg-midnight-deep border-b border-midnight-rule">
      <div className="mx-auto max-w-container px-6 h-16 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label={tHeader("logo_aria")}>
          <CompassMark />
          <span className="font-semibold text-[18px] tracking-tight text-white group-hover:text-aqua transition-colors">
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
                      isOpen ? "text-aqua bg-aqua/10" : "text-white/85 hover:text-aqua"
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
                className="px-3 py-2 text-[15px] font-medium text-white/85 hover:text-aqua transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <form
          role="search"
          action="/"
          className="hidden md:flex items-center w-[320px] h-10 px-4 rounded-pill bg-midnight-raised border border-midnight-rule focus-within:border-aqua/60 transition-colors"
        >
          <SearchIcon className="w-4 h-4 text-white/55 shrink-0" />
          <input
            type="search"
            name="q"
            placeholder={tCommon("search_placeholder")}
            className="ml-2 bg-transparent w-full text-[14px] text-white placeholder:text-white/45 outline-none"
            aria-label={tHeader("search_aria")}
          />
        </form>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:inline-flex">
            <LocaleSwitcher />
          </div>
          <Link
            href="/newsletter"
            className="hidden md:inline-flex items-center h-9 px-4 rounded-pill bg-aqua text-midnight-deep text-[14px] font-semibold hover:bg-aqua-soft transition-colors"
          >
            {tHeader("newsletter_cta")}
          </Link>

          <button
            type="button"
            aria-label={tCommon("search")}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-white rounded-md"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={tHeader("open_menu")}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-white rounded-md"
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
          className="absolute left-0 right-0 bg-midnight-overlay border-b border-midnight-rule shadow-dark-overlay"
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
          className="fixed inset-0 z-nav bg-midnight-deep overflow-auto lg:hidden"
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-midnight-rule">
            <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
              <CompassMark />
              <span className="font-semibold text-[18px] text-on-dark">injectcompass</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label={tHeader("close_menu")}
              className="inline-flex items-center justify-center w-10 h-10 -mr-2 text-on-dark hover:text-aqua transition-colors duration-fast"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="p-6">
            <form role="search" action="/" className="flex items-center w-full h-12 px-4 rounded-pill bg-midnight-raised border border-midnight-rule focus-within:border-aqua/60 transition-colors duration-fast mb-6">
              <SearchIcon className="w-5 h-5 text-on-dark-faint shrink-0" />
              <input
                type="search"
                name="q"
                placeholder={tCommon("search_placeholder")}
                className="ml-3 bg-transparent w-full text-[15px] text-on-dark placeholder:text-on-dark-faint outline-none"
                aria-label={tHeader("search_aria")}
              />
            </form>
            <nav className="flex flex-col">
              {localizedNav.map((item) => {
                if (isMega(item)) {
                  return (
                    <details key={item.label} className="border-b border-midnight-rule">
                      <summary className="cursor-pointer flex items-center justify-between py-4 text-[18px] font-semibold text-on-dark list-none hover:text-aqua transition-colors duration-fast">
                        {item.label}
                        <ChevronDown />
                      </summary>
                      <div className="pb-4 pl-2">
                        {item.megaMenu.map((col) => (
                          <div key={col.title} className="mb-3">
                            <div className="text-eyebrow uppercase text-on-dark-faint mb-2">{col.title}</div>
                            <ul className="space-y-2">
                              {col.items.map((sub) => (
                                <li key={sub.href}>
                                  <Link
                                    href={sub.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-[15px] text-on-dark-muted hover:text-aqua transition-colors duration-fast"
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
                    className="py-4 text-[18px] font-semibold text-on-dark border-b border-midnight-rule hover:text-aqua transition-colors duration-fast"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <Link
              href="/newsletter"
              onClick={() => setMobileOpen(false)}
              className="mt-8 inline-flex w-full items-center justify-center h-12 px-4 rounded-pill bg-aqua text-midnight-deep text-[15px] font-semibold hover:bg-aqua-soft transition-colors duration-fast"
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
      <circle cx="14" cy="14" r="12" stroke="#5EEAD4" strokeWidth="1.6" />
      <path d="M14 5 L17 14 L14 23 L11 14 Z" fill="#5EEAD4" />
      <circle cx="14" cy="14" r="2.4" fill="#020D12" />
      <circle cx="14" cy="14" r="1.2" fill="#5EEAD4" />
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
