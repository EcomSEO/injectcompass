"use client";

import { useEffect, useRef } from "react";

/**
 * ReadingProgressBar — a thin clinical-blue line at the top of the masthead
 * that fills as the reader scrolls the document. Mirrors a clinical-chart
 * completion bar. Respects prefers-reduced-motion (the CSS layer neutralises
 * the transition; the fill still updates, just without easing).
 */
export function ReadingProgressBar() {
  const fillRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const fill = fillRef.current;
      if (!fill) return;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      fill.style.setProperty("--progress", String(p));
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="reading-progress">
      <span ref={fillRef} className="reading-progress-fill" />
    </div>
  );
}
