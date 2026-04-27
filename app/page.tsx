import { Hero } from "@/components/Hero";
import { CategoryTileGrid } from "@/components/CategoryTileGrid";
import { FeaturedArticleCarousel } from "@/components/FeaturedArticleCarousel";
import { posts } from "@/lib/content/posts";
import { hubs, getHub } from "@/lib/content/hubs";
import type { ArticleCardData } from "@/components/ArticleCard";
import Link from "next/link";

export default function HomePage() {
  // Featured pillar — preferred manual feature, otherwise first published post.
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

  // Top trending — first three non-featured posts
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
    }));

  // Carousel — duplicate / cycle the post pool so the row feels populated
  const carouselCards: ArticleCardData[] = (() => {
    const pool = posts.slice(0, 6).map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: getHub(p.hub)?.name ?? "Library",
      author: "Sara Lin",
      readingTime: p.readingTime,
      reviewed: true,
    }));
    return pool;
  })();

  return (
    <main>
      <Hero
        eyebrow="Evidence-based injection guidance"
        headline="Injections, done right — without the guesswork."
        dek="Step-numbered technique guides, reconstitution math, and site-rotation maps — written by an RN, reviewed by an MD, and cited to nursing-education literature you can verify yourself."
        featured={featured}
        trending={trending}
      />

      <CategoryTileGrid
        id="categories"
        eyebrow="Library"
        heading="Start with the basics."
        description="Eight foundational guides, from drawing up a dose to rotating sites without scarring."
        articles={tileCards}
      />

      <FeaturedArticleCarousel
        eyebrow="Most read"
        heading="What people are reading this week."
        articles={carouselCards}
      />

      {/* Hubs strip */}
      <section className="border-b border-rule bg-surface-alt">
        <div className="mx-auto max-w-container px-6 py-16">
          <div className="max-w-2xl mb-10">
            <div className="eyebrow mb-2">By topic</div>
            <h2 className="text-[28px] md:text-[32px] font-bold text-ink leading-tight">
              Browse by what you are doing.
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
                  Open <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
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
            <div className="eyebrow mb-3">How we work</div>
            <h2 className="text-[28px] font-bold text-ink leading-tight">
              Two independent sources before a sentence ships.
            </h2>
            <p className="mt-4 text-[16px] text-ink-muted leading-relaxed">
              Every guide on InjectCompass is written from manufacturer
              Instructions for Use, CDC and WHO injection-safety guidance,
              and the nursing-education literature. Two independent sources
              must agree before a claim ships, and a credentialed reviewer
              signs the article once editorial review is complete.
            </p>
            <Link
              href="/methodology"
              className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-teal-700 hover:text-teal-600"
            >
              Read methodology v1.2 <span aria-hidden>→</span>
            </Link>
          </div>
          <div>
            <div className="eyebrow eyebrow-danger mb-3">Stop &amp; call your prescriber</div>
            <h2 className="text-[24px] font-bold text-ink leading-tight">
              When this site is the wrong source.
            </h2>
            <p className="mt-4 text-[16px] text-ink-muted leading-relaxed">
              Nothing on InjectCompass is a substitute for the prescription
              your clinician wrote, the IFU that came with your medication,
              or the judgment of the healthcare professional who knows your
              case. If a symptom does not match what you read here, treat
              what you read as out of date and call your prescriber.
            </p>
            <Link
              href="/medical-disclaimer"
              className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-teal-700 hover:text-teal-600"
            >
              Read the full disclaimer <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
