import { Link } from "@/i18n/navigation";
import { ArticleThumb } from "./ArticleThumb";
import type { ArticleCardData } from "./ArticleCard";

type Trending = {
  category: string;
  title: string;
  href: string;
};

/**
 * Healthline-grade home Hero.
 * 12-col grid: H1 + dek + CTAs (cols 1-7), featured-article card (cols 8-12).
 * Below: 3 inline trending links with category eyebrows.
 */
export function Hero({
  eyebrow = "Evidence-based injection guidance",
  headline,
  dek,
  featured,
  trending,
  trendingLabel = "Trending now",
  ctaPrimary = "Browse the library",
  ctaSecondary = "Open the dose calculator",
  reviewedNote = "Reviewed by clinicians",
  citedNote = "Cited to nursing-education literature & package inserts",
  medicallyReviewedPill = "Medically reviewed",
}: {
  eyebrow?: string;
  headline: string;
  dek: string;
  featured: ArticleCardData & { authorCredentials?: string };
  trending: Trending[];
  trendingLabel?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  reviewedNote?: string;
  citedNote?: string;
  medicallyReviewedPill?: string;
}) {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-container px-6 pt-12 pb-14 md:pt-16 md:pb-20">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-start">
          {/* Left — headline */}
          <div className="md:col-span-7">
            <div className="eyebrow mb-4">{eyebrow}</div>
            <h1 className="text-[40px] md:text-[56px] leading-[1.05] font-bold tracking-tight text-ink max-w-[16ch]">
              {headline}
            </h1>
            <p className="mt-6 text-[18px] md:text-[20px] leading-[1.55] text-ink-muted max-w-[58ch]">
              {dek}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#categories"
                className="inline-flex items-center h-12 px-6 rounded-pill bg-teal-500 text-white text-[15px] font-semibold hover:bg-teal-600 transition-colors"
              >
                {ctaPrimary}
              </Link>
              <Link
                href="/peptide-calculator"
                className="inline-flex items-center h-12 px-6 rounded-pill border border-rule-strong text-ink text-[15px] font-semibold hover:border-teal-500 hover:text-teal-700 transition-colors"
              >
                {ctaSecondary}
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-[13px] text-ink-muted">
              <span className="inline-flex items-center gap-1.5 text-reviewed-text">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M8 1.5 2.5 3.5v4c0 3 2.3 5.7 5.5 7 3.2-1.3 5.5-4 5.5-7v-4L8 1.5Z" />
                  <path d="m5.5 8 2 2 3.5-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {reviewedNote}
              </span>
              <span aria-hidden>·</span>
              <span>{citedNote}</span>
            </div>
          </div>

          {/* Right — featured */}
          <div className="md:col-span-5">
            <Link
              href={`/${featured.slug}`}
              className="group block rounded-md overflow-hidden bg-white border border-rule hover:shadow-cardHover hover:border-rule-strong transition-all"
            >
              <div className="relative aspect-[5/3] overflow-hidden">
                <ArticleThumb
                  seed={featured.slug}
                  variant="hero"
                  className="w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-white/95 text-reviewed-text text-[12px] font-semibold">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="m4 8 3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {medicallyReviewedPill}
                </div>
              </div>
              <div className="p-6">
                <div className="eyebrow mb-2">{featured.category}</div>
                <h2 className="text-[22px] md:text-[24px] leading-snug font-semibold text-ink group-hover:text-teal-700 transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-muted line-clamp-3">
                  {featured.description}
                </p>
                <div className="mt-4 flex items-center gap-3 text-[13px] text-ink-muted">
                  {featured.author && (
                    <span>
                      By {featured.author}
                      {featured.authorCredentials && (
                        <span className="text-ink-soft">, {featured.authorCredentials}</span>
                      )}
                    </span>
                  )}
                  {featured.readingTime && <span>· {featured.readingTime} min read</span>}
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Trending strip */}
        {trending.length > 0 && (
          <div className="mt-12 pt-6 border-t border-rule">
            <div className="flex items-center gap-3 mb-4">
              <span className="eyebrow">{trendingLabel}</span>
              <span className="h-px flex-1 bg-rule" />
            </div>
            <ul className="grid md:grid-cols-3 gap-x-8 gap-y-4">
              {trending.slice(0, 3).map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="group block">
                    <div className="eyebrow mb-1.5">{t.category}</div>
                    <span className="text-[16px] font-semibold text-ink group-hover:text-teal-700 transition-colors leading-snug">
                      {t.title} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
