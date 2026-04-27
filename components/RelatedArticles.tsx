import { ArticleCard, type ArticleCardData } from "./ArticleCard";

/**
 * 3-column grid of ArticleCards at end of an article.
 */
export function RelatedArticles({
  articles,
  heading = "Related reading",
}: {
  articles: ArticleCardData[];
  heading?: string;
}) {
  if (articles.length === 0) return null;
  return (
    <section className="mt-16 pt-10 border-t border-rule" aria-label={heading}>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-[22px] md:text-[24px] font-bold text-ink">{heading}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((a) => (
          <ArticleCard key={a.slug} data={a} size="sm" />
        ))}
      </div>
    </section>
  );
}
