"use client";

import Link from "next/link";
import { useState } from "react";
import { hubs } from "@/lib/content/hubs";
import { Wordmark } from "./editorial/Wordmark";
import { Dateline } from "./editorial/Dateline";
import { MedicalDisclaimerStrip } from "./editorial/MedicalDisclaimerStrip";
import { ReadingProgressBar } from "./editorial/ReadingProgressBar";

/**
 * Clinical-reference Header.
 * Order (top → bottom):
 *   1. <MedicalDisclaimerStrip> — lead with the disclaimer
 *   2. Dateline row — "COMPASS · REFERENCE NO. 01 · APRIL 2026"
 *   3. Main bar — Wordmark + Tools + Guides dropdown + About + Newsletter CTA
 */

const tools = [
  { slug: "peptide-calculator", name: "Peptide Calculator", note: "mg + bac water → units" },
  { slug: "reconstitution-calculator", name: "Reconstitution Calculator", note: "bac water volume" },
  { slug: "syringe-converter", name: "Syringe Converter", note: "units ↔ mg" },
  { slug: "dose-schedule-builder", name: "Dose Schedule Builder", note: "printable calendar" },
];

export function Header() {
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative bg-paper-soft/95 backdrop-blur sticky top-0 z-40 border-b border-clinical/15">
      {/* Reading progress — thin clinical-blue fill across the top of the masthead. */}
      <ReadingProgressBar />

      {/* 1. Medical disclaimer — always above the masthead. */}
      <MedicalDisclaimerStrip />

      {/* 2. Dateline strip */}
      <div className="border-b border-clinical/10 hidden md:block">
        <div className="mx-auto max-w-6xl px-6 py-2 flex items-center justify-between">
          <Dateline />
          <div className="flex items-center gap-5 text-[11px] tracking-[0.14em] uppercase text-stone">
            <Link href="/editorial-standards" className="nav-link">
              Editorial standards
            </Link>
            <span aria-hidden className="text-clinical/35">·</span>
            <Link href="/methodology" className="nav-link">
              Methodology
            </Link>
            <span aria-hidden className="text-clinical/35">·</span>
            <Link href="/about" className="nav-link">
              About
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Main bar */}
      <div className="mx-auto max-w-6xl px-6 py-4 md:py-5 flex items-center justify-between gap-6">
        <Wordmark size="md" />

        <nav className="hidden md:flex items-center gap-7 text-sm">
          {/* Tools — first, because this site IS its tools. */}
          <div
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setToolsOpen((v) => !v)}
              className="nav-link flex items-center gap-1 cursor-pointer"
              aria-expanded={toolsOpen}
              aria-haspopup="menu"
            >
              Tools
              <span aria-hidden className="text-clinical">▾</span>
            </button>
            {toolsOpen && (
              <div
                role="menu"
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-paper-soft border border-clinical/20 rounded-sm shadow-card p-3"
              >
                <div className="eyebrow text-stone px-3 pb-2 border-b border-clinical/10 mb-2">
                  Calculators
                </div>
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/${tool.slug}`}
                    role="menuitem"
                    className="flex items-start gap-3 px-3 py-2.5 hover:bg-clinical-tint/60 rounded-sm group"
                  >
                    <span aria-hidden className="num text-clinical/60 group-hover:text-clinical mt-0.5 shrink-0">
                      {"//"}
                    </span>
                    <div>
                      <div className="text-clinical-deep font-medium leading-tight">
                        {tool.name}
                      </div>
                      <div className="text-xs text-stone mt-0.5">{tool.note}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Guides */}
          <div
            className="relative"
            onMouseEnter={() => setGuidesOpen(true)}
            onMouseLeave={() => setGuidesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setGuidesOpen((v) => !v)}
              className="nav-link flex items-center gap-1 cursor-pointer"
              aria-expanded={guidesOpen}
              aria-haspopup="menu"
            >
              Guides
              <span aria-hidden className="text-clinical">▾</span>
            </button>
            {guidesOpen && (
              <div
                role="menu"
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-paper-soft border border-clinical/20 rounded-sm shadow-card p-3"
              >
                <div className="eyebrow text-stone px-3 pb-2 border-b border-clinical/10 mb-2">
                  The five hubs
                </div>
                {hubs.map((hub, i) => (
                  <Link
                    key={hub.slug}
                    href={`/guides/${hub.slug}`}
                    role="menuitem"
                    className="flex items-start gap-3 px-3 py-2.5 hover:bg-clinical-tint/60 rounded-sm group"
                  >
                    <span className="num text-clinical/60 group-hover:text-clinical shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="text-clinical-deep font-medium leading-tight">
                        {hub.name}
                      </div>
                      <div className="text-xs text-stone mt-0.5">
                        {hub.shortName}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" className="nav-link">
            About
          </Link>

          <Link href="/newsletter" className="btn-cheatsheet">
            <span aria-hidden className="num text-[0.7rem] text-clinical/60">{"//"}</span>
            Cheat sheet
            <span aria-hidden>→</span>
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="md:hidden inline-flex items-center justify-center h-11 w-11 -mr-2 text-clinical-deep cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical focus-visible:ring-offset-2"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <line x1="3" y1="7" x2="21" y2="7" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="17" x2="21" y2="17" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 bg-paper-soft md:hidden overflow-auto"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-clinical/15">
            <Wordmark size="sm" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="inline-flex items-center justify-center h-11 w-11 -mr-2 text-clinical-deep cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical focus-visible:ring-offset-2"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col px-6 py-8 gap-1">
            <div className="eyebrow text-stone mb-2">Calculators</div>
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-lg text-clinical-deep font-serif"
              >
                {tool.name}
              </Link>
            ))}
            <div className="eyebrow text-stone mt-6 mb-2">The five hubs</div>
            {hubs.map((hub, i) => (
              <Link
                key={hub.slug}
                href={`/guides/${hub.slug}`}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-lg text-clinical-deep font-serif flex items-center gap-3"
              >
                <span className="num text-clinical/60 text-base w-7">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {hub.name}
              </Link>
            ))}
            <div className="eyebrow text-stone mt-6 mb-2">The masthead</div>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="py-2 text-lg text-clinical-deep">
              About
            </Link>
            <Link href="/editorial-standards" onClick={() => setMobileOpen(false)} className="py-2 text-lg text-clinical-deep">
              Editorial standards
            </Link>
            <Link href="/methodology" onClick={() => setMobileOpen(false)} className="py-2 text-lg text-clinical-deep">
              Methodology
            </Link>
            <Link href="/medical-disclaimer" onClick={() => setMobileOpen(false)} className="py-2 text-lg text-clinical-deep">
              Medical disclaimer
            </Link>
            <Link href="/newsletter" onClick={() => setMobileOpen(false)} className="py-2 text-lg text-clinical-deep">
              Newsletter
            </Link>
            <div className="mt-6">
              <Link
                href="/newsletter"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center"
              >
                Get the cheat sheet →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
