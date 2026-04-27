import { Link } from "@/i18n/navigation";
import { ArticleThumb } from "./ArticleThumb";

export type ArticleCardData = {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryHref?: string;
  author?: string;
  readingTime?: number;
  reviewed?: boolean;
  imageUrl?: string | null;
};

/**
 * Healthline-grade ArticleCard.
 * Landscape 16:10 thumb + category eyebrow + H3 + dek + author + reading time.
 * Hover: image scales 1.03, shadow lifts.
 */
export function ArticleCard({
  data,
  size = "md",
  className = "",
}: {
  data: ArticleCardData;
  size?: "md" | "sm";
  className?: string;
}) {
  return (
    <Link
      href={`/${data.slug}`}
      className={`group block rounded-md overflow-hidden bg-white border border-rule hover:shadow-cardHover hover:border-rule-strong transition-all duration-200 ease-out ${className}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-alt">
        <ArticleThumb
          seed={data.slug}
          imageUrl={data.imageUrl}
          alt={data.title}
          className="w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
        {data.reviewed && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-pill bg-white/95 text-reviewed-text text-[11px] font-semibold">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="m4 8 3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Reviewed
          </div>
        )}
      </div>
      <div className={size === "sm" ? "p-4" : "p-5"}>
        <div className="eyebrow mb-2">{data.category}</div>
        <h3
          className={`font-semibold text-ink leading-snug line-clamp-2 group-hover:text-teal-700 transition-colors ${
            size === "sm" ? "text-[16px]" : "text-[18px]"
          }`}
        >
          {data.title}
        </h3>
        <p className="mt-2 text-[14px] text-ink-muted leading-relaxed line-clamp-2">
          {data.description}
        </p>
        <div className="mt-4 flex items-center gap-3 text-[12px] text-ink-muted">
          {data.author && <span>By {data.author}</span>}
          {data.author && data.readingTime && <span aria-hidden>·</span>}
          {data.readingTime && <span>{data.readingTime} min read</span>}
        </div>
      </div>
    </Link>
  );
}
