import { ArticleCard, type ArticleCardData } from "./ArticleCard";

export function CategoryTileGrid({
  heading,
  eyebrow,
  description,
  articles,
  id,
}: {
  heading: string;
  eyebrow?: string;
  description?: string;
  articles: ArticleCardData[];
  id?: string;
}) {
  return (
    <section id={id} className="border-b border-rule">
      <div className="mx-auto max-w-container px-6 py-16 md:py-20">
        <div className="max-w-2xl mb-10">
          {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
          <h2 className="text-[28px] md:text-[36px] font-bold leading-tight text-ink tracking-tight">
            {heading}
          </h2>
          {description && (
            <p className="mt-3 text-[16px] text-ink-muted leading-relaxed">{description}</p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((a) => (
            <ArticleCard key={a.slug} data={a} size="sm" />
          ))}
        </div>
      </div>
    </section>
  );
}
