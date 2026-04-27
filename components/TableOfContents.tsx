"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string; level?: 2 | 3 };

/**
 * Sticky right-rail TOC with IntersectionObserver-based scroll-spy.
 * Active section highlights teal.
 *
 * Pass a list of {id, label, level} or call without args to auto-extract from
 * any h2/h3 inside the article element matching `selector`.
 */
export function TableOfContents({
  items,
  selector = "[data-toc-root]",
  title = "On this page",
}: {
  items?: TocItem[];
  selector?: string;
  title?: string;
}) {
  const [extracted, setExtracted] = useState<TocItem[]>(items ?? []);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items && items.length > 0) return;
    const root = document.querySelector(selector);
    if (!root) return;
    const headings = Array.from(
      root.querySelectorAll<HTMLElement>("h2, h3"),
    ).filter((h) => h.id);
    const next: TocItem[] = headings.map((h) => ({
      id: h.id,
      label: h.textContent ?? "",
      level: h.tagName === "H3" ? 3 : 2,
    }));
    setExtracted(next);
  }, [items, selector]);

  const list = items ?? extracted;

  useEffect(() => {
    if (list.length === 0) return;
    const els = list
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Find the entry closest to top that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: [0, 1] },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [list]);

  if (list.length === 0) return null;

  return (
    <nav aria-label={title} className="text-[14px]">
      <div className="eyebrow mb-3">{title}</div>
      <ul className="space-y-1">
        {list.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block py-1.5 transition-colors border-l-2 ${
                  isActive
                    ? "border-teal-500 text-teal-700 font-semibold"
                    : "border-rule text-ink-muted hover:text-ink hover:border-rule-strong"
                } ${item.level === 3 ? "pl-6 text-[13px]" : "pl-3"}`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
