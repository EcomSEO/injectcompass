"use client";

import { useRef } from "react";
import { ArticleCard, type ArticleCardData } from "./ArticleCard";

/**
 * Horizontal scroll-snap row of ArticleCards with optional prev/next buttons.
 */
export function FeaturedArticleCarousel({
  heading,
  eyebrow,
  articles,
}: {
  heading: string;
  eyebrow?: string;
  articles: ArticleCardData[];
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(720, el.clientWidth - 80), behavior: "smooth" });
  };

  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-container px-6 py-16">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            {eyebrow && <div className="eyebrow mb-2">{eyebrow}</div>}
            <h2 className="text-[28px] md:text-[32px] font-bold leading-tight text-ink tracking-tight">
              {heading}
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="w-10 h-10 inline-flex items-center justify-center rounded-pill border border-rule-strong text-ink hover:border-teal-500 hover:text-teal-700 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <polyline points="10,3 5,8 10,13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="w-10 h-10 inline-flex items-center justify-center rounded-pill border border-rule-strong text-ink hover:border-teal-500 hover:text-teal-700 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <polyline points="6,3 11,8 6,13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        <div
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-thin"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {articles.map((a) => (
            <div
              key={a.slug}
              className="snap-start shrink-0 w-[300px] md:w-[340px]"
            >
              <ArticleCard data={a} size="sm" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
