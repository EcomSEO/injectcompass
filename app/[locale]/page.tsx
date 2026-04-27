import { Hero } from "@/components/Hero";
import { CategoryTileGrid } from "@/components/CategoryTileGrid";
import { FeaturedArticleCarousel } from "@/components/FeaturedArticleCarousel";
import { posts } from "@/lib/content/posts";
import { hubs, getHub } from "@/lib/content/hubs";
import { articleImage, HERO_IMAGE } from "@/lib/content/images";
import type { ArticleCardData } from "@/components/ArticleCard";
import { Link } from "@/i18n/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");
  const tHome = await getTranslations("home");
  // Featured pillar, preferred manual feature, otherwise first published post.
  const featuredPost =
    posts.find((p) => p.featured) ?? posts.find((p) => p.status === "published") ?? posts[0];

  const featured: ArticleCardData & { authorCredentials?: string } = {
    slug: featuredPost.slug,
    title: featuredPost.title,
    description: featuredPost.description,
    category: getHub(featuredPost.hub)?.name ?? "Library",
    author: "Sara Lin",
    authorCredentials: "RN, BSN",
    readingTime: featuredPost.readingTime,
    reviewed: true,
    imageUrl: articleImage(featuredPost.slug, featuredPost.hub) ?? HERO_IMAGE,
  };

  const cardOf = (slug: string): ArticleCardData | null => {
    const p = posts.find((x) => x.slug === slug);
    if (!p) return null;
    return {
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: getHub(p.hub)?.name ?? "Library",
      author: "Sara Lin",
      readingTime: p.readingTime,
      reviewed: p.medicalDisclaimer === "required",
    };
  };

  // Top trending, first three non-featured posts
  const trending = posts
    .filter((p) => p.slug !== featuredPost.slug)
    .slice(0, 3)
    .map((p) => ({
      category: getHub(p.hub)?.name ?? "Library",
      title: p.title,
      href: `/${p.slug}`,
    }));

  // Build per-hub categories for tile grid (up to 8 cards)
  const tileCards: ArticleCardData[] = posts
    .filter((p) => p.slug !== featuredPost.slug)
    .slice(0, 8)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: getHub(p.hub)?.name ?? "Library",
      author: "Sara Lin",
      readingTime: p.readingTime,
      reviewed: p.medicalDisclaimer === "required",
      imageUrl: articleImage(p.slug, p.hub),
    }));

  // Carousel, duplicate / cycle the post pool so the row feels populated
  const carouselCards: ArticleCardData[] = (() => {
    const pool = posts.slice(0, 6).map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: getHub(p.hub)?.name ?? "Library",
      author: "Sara Lin",
      readingTime: p.readingTime,
      reviewed: true,
      imageUrl: articleImage(p.slug, p.hub),
    }));
    return pool;
  })();

  return (
    <main>
      <Hero
        eyebrow={t("eyebrow")}
        headline={t("h1")}
        dek={t("dek")}
        featured={featured}
        trending={trending}
        trendingLabel={t("trending_label")}
        ctaPrimary={tHome("cta_browse_library")}
        ctaSecondary={tHome("cta_open_calculator")}
        reviewedNote={tHome("reviewed_by_clinicians")}
        citedNote={tHome("cited_to_literature")}
        medicallyReviewedPill={tHome("medically_reviewed_pill")}
      />

      <CategoryTileGrid
        id="categories"
        eyebrow={tHome("library_eyebrow")}
        heading={tHome("library_heading")}
        description={tHome("library_dek")}
        articles={tileCards}
      />

      <FeaturedArticleCarousel
        eyebrow={tHome("most_read_eyebrow")}
        heading={tHome("most_read_heading")}
        articles={carouselCards}
      />

      {/* Hubs strip */}
      <section className="border-b border-rule bg-surface-alt">
        <div className="mx-auto max-w-container px-6 py-16">
          <div className="max-w-2xl mb-10">
            <div className="eyebrow mb-2">{tHome("by_topic_eyebrow")}</div>
            <h2 className="text-[28px] md:text-[32px] font-bold text-ink leading-tight">
              {tHome("by_topic_heading")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {hubs.map((hub) => (
              <Link
                key={hub.slug}
                href={`/guides/${hub.slug}`}
                className="group block bg-white rounded-md border border-rule p-5 hover:border-teal-500 hover:shadow-card transition-all"
              >
                <div className="eyebrow mb-3">{hub.shortName}</div>
                <h3 className="text-[18px] font-semibold text-ink group-hover:text-teal-700 transition-colors leading-snug">
                  {hub.name}
                </h3>
                <p className="mt-2 text-[13px] text-ink-muted leading-relaxed line-clamp-3">
                  {hub.oneLiner}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-teal-700">
                  {tHome("open_hub")} <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + methodology strip */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-container px-6 py-16 grid md:grid-cols-2 gap-10">
          <div>
            <div className="eyebrow mb-3">{tHome("how_we_work_eyebrow")}</div>
            <h2 className="text-[28px] font-bold text-ink leading-tight">
              {tHome("how_we_work_heading")}
            </h2>
            <p className="mt-4 text-[16px] text-ink-muted leading-relaxed">
              {tHome("how_we_work_body")}
            </p>
            <Link
              href="/methodology"
              className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-teal-700 hover:text-teal-600"
            >
              {tHome("how_we_work_cta")} <span aria-hidden>→</span>
            </Link>
          </div>
          <div>
            <div className="eyebrow eyebrow-danger mb-3">{tHome("stop_eyebrow")}</div>
            <h2 className="text-[24px] font-bold text-ink leading-tight">
              {tHome("stop_heading")}
            </h2>
            <p className="mt-4 text-[16px] text-ink-muted leading-relaxed">
              {tHome("stop_body")}
            </p>
            <Link
              href="/medical-disclaimer"
              className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-teal-700 hover:text-teal-600"
            >
              {tHome("stop_cta")} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
