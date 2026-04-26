"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Atlas Header — paper-white sticky bar, ink wordmark left, condensed
 * uppercase nav, tiny search icon right. Thin 1px ink rule under the bar.
 * No dark masthead, no big rounded search.
 */

const NAV = [
  { href: "/#atlas-index", label: "Atlas" },
  { href: "/guides/injection-technique", label: "Technique" },
  { href: "/guides/reconstitution", label: "Sites" },
  { href: "/guides/troubleshooting", label: "Troubleshooting" },
  { href: "/methodology", label: "Methodology" },
  { href: "/pipeline", label: "Pipeline" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-paper sticky top-0 z-40 border-b border-ink/20">
      <div className="mx-auto max-w-6xl px-6 h-14 md:h-16 flex items-center justify-between gap-6">
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="InjectCompass — atlas home">
          <CrosshairMark />
          <span className="atlas-wordmark text-[15px] md:text-base text-ink-deep tracking-[0.06em] group-hover:text-surgical transition-colors">
            INJECTCOMPASS
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="atlas-mini text-ink-deep hover:text-surgical transition-colors tracking-[0.18em]"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right rail — search icon + locale */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Search the atlas"
            className="hidden md:inline-flex items-center justify-center w-8 h-8 text-ink-deep hover:text-surgical transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="7" cy="7" r="5" />
              <line x1="11" y1="11" x2="14.5" y2="14.5" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 text-ink-deep -mr-1"
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 bg-paper md:hidden overflow-auto"
        >
          <div className="flex items-center justify-between px-6 h-14 border-b border-ink/20">
            <span className="atlas-wordmark text-[15px] text-ink-deep">INJECTCOMPASS</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="inline-flex items-center justify-center w-9 h-9 -mr-1 text-ink-deep"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="px-6 py-8 flex flex-col gap-4">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMobileOpen(false)}
                className="atlas-display text-xl text-ink-deep py-2 border-b border-ink/10"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function CrosshairMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#1B3A6E" strokeWidth="1.1" aria-hidden>
      <circle cx="10" cy="10" r="8" />
      <line x1="10" y1="2" x2="10" y2="18" />
      <line x1="2" y1="10" x2="18" y2="10" />
      <circle cx="10" cy="10" r="2" fill="#C8463C" stroke="none" />
    </svg>
  );
}
