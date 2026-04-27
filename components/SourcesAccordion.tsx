"use client";

import { useState } from "react";

export type Source = {
  label: string;
  url?: string;
  publisher?: string;
};

/**
 * Healthline-pattern Sources accordion. Numbered list, click to expand each item.
 * Default-collapsed; "Expand all" toggle.
 */
export function SourcesAccordion({
  sources,
  heading = "Sources",
}: {
  sources: Source[];
  heading?: string;
}) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());
  const allOpen = openSet.size === sources.length && sources.length > 0;

  const toggle = (i: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };
  const toggleAll = () => {
    if (allOpen) setOpenSet(new Set());
    else setOpenSet(new Set(sources.map((_, i) => i)));
  };

  if (sources.length === 0) return null;

  return (
    <section
      id="sources"
      className="mt-12 pt-8 border-t border-rule scroll-mt-24"
      aria-label={heading}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[22px] md:text-[24px] font-bold text-ink">{heading}</h2>
        <button
          type="button"
          onClick={toggleAll}
          className="text-[13px] font-semibold text-teal-700 hover:text-teal-600"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <ol className="border-t border-rule">
        {sources.map((s, i) => {
          const isOpen = openSet.has(i);
          return (
            <li key={i} className="border-b border-rule">
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="w-full grid grid-cols-[36px_1fr_auto] gap-3 py-4 text-left hover:bg-surface-alt transition-colors"
              >
                <span className="num text-[13px] font-semibold text-teal-700 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[14px] text-ink leading-snug">
                  {s.label}
                  {s.publisher && (
                    <span className="text-ink-muted"> — {s.publisher}</span>
                  )}
                </span>
                <span aria-hidden className="text-ink-muted text-[18px] mt-0.5">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <div className="pl-12 pr-4 pb-4 text-[14px] text-ink-muted">
                  {s.url ? (
                    <a
                      href={s.url}
                      rel="noopener nofollow"
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-teal-700 hover:text-teal-600 underline underline-offset-2"
                    >
                      {s.url}
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                        <path d="M6 3h7v7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13 3 6 10" strokeLinecap="round" />
                        <path d="M11 8v5H3V5h5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ) : (
                    <span>{s.label}</span>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
