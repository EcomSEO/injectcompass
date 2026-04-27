"use client";

import { useEffect, useState } from "react";

/**
 * Outline, sticky right-rail "On this page" outline that highlights the
 * section currently in view as the reader scrolls.
 */

export type OutlineItem = {
  id: string;
  label: string;
  level?: 1 | 2;
};

export function Outline({
  items,
  title = "On this page",
}: {
  items: OutlineItem[];
  title?: string;
}) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="atlas-outline sticky top-32 space-y-1" aria-label={title}>
      <div className="atlas-mini mb-3">{title}</div>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`atlas-outline-item ${active === item.id ? "atlas-outline-item-active" : ""} ${item.level === 2 ? "pl-5" : ""}`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
