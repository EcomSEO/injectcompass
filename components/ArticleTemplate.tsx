import { Link } from "@/i18n/navigation";
import type { Post } from "@/lib/content/posts";
import { posts } from "@/lib/content/posts";
import { getHub } from "@/lib/content/hubs";
import { postBodies } from "@/lib/content/post-bodies";
import { ArticleThumb } from "./ArticleThumb";
import { articleImage, reviewerImageByName, authorImageByName } from "@/lib/content/images";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { AuthorByline } from "./AuthorByline";
import { MedicallyReviewedBadge } from "./MedicallyReviewedBadge";
import { LastReviewedLine } from "./LastReviewedLine";
import { TableOfContents, type TocItem } from "./TableOfContents";
import {
  InjectionSiteMap,
  type InjectionRegion,
} from "./InjectionSiteMap";
import { NewsletterInline } from "./NewsletterInline";
import { TranslationPendingBanner } from "./TranslationPendingBanner";
import { EducationalBanner } from "./EducationalBanner";
import { WadaBanner } from "./WadaBanner";
import { SourcesAccordion, type Source } from "./SourcesAccordion";
import { RelatedArticles } from "./RelatedArticles";
import { ArticleCardData } from "./ArticleCard";
import { DrugImage } from "./DrugImage";
import { ArticleJsonLd } from "./schema/ArticleJsonLd";
import { MedicalWebPageJsonLd } from "./schema/MedicalWebPageJsonLd";
import { FaqJsonLd } from "./schema/FaqJsonLd";
import { BreadcrumbJsonLd } from "./schema/BreadcrumbJsonLd";
import { HowToJsonLd, type HowToStep } from "./schema/HowToJsonLd";
import { PostReviewStamp } from "./MedicalDisclaimer";
import { ClinicalCallout } from "./editorial/ClinicalCallout";

const REVIEWER = {
  name: "Dr. Maya Okafor",
  jobTitle: "MD, Internal Medicine",
  slug: "dr-okafor",
};

const AUTHOR = {
  name: "Sara Lin",
  jobTitle: "RN, BSN",
  slug: "sara-lin",
};

/**
 * Healthline-grade article shell.
 * - Top: BreadcrumbNav
 * - Hero: full-width 5:2 photo (gradient placeholder) with category eyebrow + H1 + dek
 * - Below hero: AuthorByline + MedicallyReviewedBadge + LastReviewedLine + reading time + share
 * - 12-col grid: prose (col 1-8) + right rail (col 9-12)
 * - Right rail: InjectionSiteMap (top) + sticky TOC (below)
 * - End: SourcesAccordion + RelatedArticles
 *
 * Heuristically infers which injection regions to highlight from post content.
 */
export async function ArticleTemplate({ post }: { post: Post }) {
  const hub = getHub(post.hub);
  const regions = inferRegions(post);

  const crumbs = [
    { label: "Home", href: "/" },
    hub
      ? { label: hub.name, href: `/guides/${hub.slug}` }
      : { label: "Library" },
    { label: post.title },
  ];

  // Build TOC programmatically from sections we render.
  const toc: TocItem[] = [
    { id: "introduction", label: "What this guide covers", level: 2 },
    ...(post.items && post.items.length > 0
      ? [{ id: "key-points", label: "Key points", level: 2 as const }]
      : []),
    ...(post.preChecklist && post.preChecklist.length > 0
      ? [{ id: "pre-checklist", label: "Pre-injection checklist", level: 2 as const }]
      : []),
    { id: "deep-dive", label: "Step-by-step", level: 2 },
    ...(post.aftercare && post.aftercare.length > 0
      ? [{ id: "aftercare", label: "After the injection", level: 2 as const }]
      : []),
    ...(post.commonMistakes && post.commonMistakes.length > 0
      ? [{ id: "common-mistakes", label: "Common mistakes", level: 2 as const }]
      : []),
    ...(post.faq && post.faq.length > 0
      ? [{ id: "faq", label: "Frequently asked questions", level: 2 as const }]
      : []),
    { id: "sources", label: "Sources", level: 2 },
  ];

  const sources: Source[] =
    post.sources && post.sources.length > 0
      ? post.sources
      : DEFAULT_SOURCES;

  const related: ArticleCardData[] = posts
    .filter((p) => p.slug !== post.slug && p.hub === post.hub)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: getHub(p.hub)?.name ?? "Library",
      readingTime: p.readingTime,
      reviewed: p.medicalDisclaimer === "required",
    }));

  const body = postBodies[post.slug];

  // HowTo emission for procedure posts. We treat a post as a procedure
  // when its slug begins with `how-to-`, its hub is injection-technique
  // (Hub-2 in the topical map), or the post explicitly opts in via
  // `postType: "cluster"` paired with an items[] step list. We never
  // emit HowTo without at least one ordered step, and step images are
  // omitted — the in-page <SyringeSvg> / <InjectionSiteMap> illustrations
  // already cover the schematic-image requirement and we never want to
  // imply needle-in-skin photography.
  const isProcedure =
    post.slug.startsWith("how-to-") ||
    post.hub === "injection-technique" ||
    post.hub === "reconstitution";
  // Prefer the granular `steps[]` (with `text` and optional schematic image)
  // when authors have wired one. Fall back to `items[]` for legacy entries.
  const howToSteps: HowToStep[] =
    post.steps && post.steps.length > 0
      ? post.steps.map((s) => ({ name: s.name, text: s.text, image: s.image }))
      : isProcedure && post.items && post.items.length > 0
        ? post.items.map((it) => ({ name: it.name, text: it.summary }))
        : [];
  const totalTimeIso = post.totalTimeMinutes
    ? `PT${post.totalTimeMinutes}M`
    : undefined;

  return (
    <main className="bg-midnight-card" data-toc-root>
      <ArticleJsonLd
        path={`/${post.slug}`}
        headline={post.h1}
        description={post.description}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
        authorName={AUTHOR.name}
        authorJobTitle={AUTHOR.jobTitle}
        authorSlug={AUTHOR.slug}
        reviewerName={REVIEWER.name}
        reviewerJobTitle={REVIEWER.jobTitle}
        reviewerSlug={REVIEWER.slug}
      />
      <MedicalWebPageJsonLd
        path={`/${post.slug}`}
        headline={post.h1}
        description={post.description}
        lastReviewed={post.updatedAt}
        reviewerName={REVIEWER.name}
        reviewerCredentials={REVIEWER.jobTitle}
        reviewerSlug={REVIEWER.slug}
        about={hub?.name}
      />
      <BreadcrumbJsonLd crumbs={crumbs} />
      {post.faq && post.faq.length > 0 && <FaqJsonLd faq={post.faq} />}
      {howToSteps.length > 0 && (
        <HowToJsonLd
          path={`/${post.slug}`}
          name={post.h1 || post.title}
          description={post.description}
          totalTimeIso={totalTimeIso}
          supplies={post.supplies}
          tools={post.tools}
          steps={howToSteps}
        />
      )}

      {/* Breadcrumb */}
      <div className="border-b border-rule">
        <div className="mx-auto max-w-container px-6 py-4">
          <BreadcrumbNav crumbs={crumbs} />
        </div>
      </div>

      {/* Hero band */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-container px-6 pt-8 md:pt-10 pb-8">
          <div className="max-w-[800px]">
            <div className="eyebrow mb-3">{hub?.name ?? "Library"}</div>
            <h1 className="editorial-h1">{post.h1 || post.title}</h1>
            <p className="mt-5 text-[18px] md:text-[20px] leading-[1.55] text-ink-muted max-w-[60ch]">
              {post.description}
            </p>
          </div>

          {/* Hero image */}
          <div className="mt-8 aspect-[5/2] w-full rounded-md overflow-hidden">
            <ArticleThumb
              seed={post.slug}
              variant="hero"
              imageUrl={articleImage(post.slug, post.hub)}
              alt={post.h1 || post.title}
              priority
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="w-full h-full"
            />
          </div>

          {/* Author + meta strip */}
          <div className="mt-6 grid md:grid-cols-12 gap-4 md:gap-6 items-center">
            <div className="md:col-span-6">
              <AuthorByline
                authorName={AUTHOR.name}
                authorCredentials={AUTHOR.jobTitle}
                reviewedBy={REVIEWER.name}
                reviewerCredentials={REVIEWER.jobTitle}
                date={post.updatedAt}
                avatarUrl={authorImageByName(AUTHOR.name)}
              />
            </div>
            <div className="md:col-span-6 flex flex-wrap items-center gap-3 md:justify-end">
              <MedicallyReviewedBadge
                reviewerName={REVIEWER.name}
                credentials={REVIEWER.jobTitle}
                imageUrl={reviewerImageByName(REVIEWER.name) ?? undefined}
              />
              <span className="text-[13px] text-ink-muted">
                {post.readingTime} min read
              </span>
              <ShareIcons title={post.title} />
            </div>
          </div>

          <div className="mt-3">
            <LastReviewedLine date={post.updatedAt} />
          </div>
        </div>
      </section>

      {/* Body grid */}
      <section className="mx-auto max-w-container px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Article column */}
          <article className="lg:col-span-8 article-prose">
            {/* Body content remains in English in phase one, show banner
                on non-English locales so readers know what they are seeing. */}
            <TranslationPendingBanner />
            <EducationalBanner />
            {(post.hub === "performance" || post.hub === "recovery") && <WadaBanner />}
            {/* Brand-book §6.2 patient-education stamp on drug-specific posts. */}
            {post.medicalDisclaimer === "required" && (
              <PostReviewStamp reviewedOn={post.updatedAt} />
            )}
            {/* Mobile-only drug figure (right rail is hidden on mobile, so render inline) */}
            {post.primaryDrug && (
              <div className="lg:hidden">
                <DrugImage
                  drugSlug={post.primaryDrug}
                  size="md"
                  showCaption={true}
                />
              </div>
            )}
            {/* Mobile in-article TOC accordion */}
            <details className="lg:hidden mb-8 rounded-md border border-rule bg-surface-alt p-4">
              <summary className="flex items-center justify-between cursor-pointer text-[14px] font-semibold text-ink list-none">
                <span>On this page</span>
                <span aria-hidden className="text-ink-muted">+</span>
              </summary>
              <div className="mt-3">
                <TableOfContents items={toc} />
              </div>
            </details>

            <h2 id="introduction">What this guide covers</h2>
            {body?.intro ? (
              <p>{body.intro}</p>
            ) : (
              <p>
                {post.description} This article walks through the technique
                that nursing-education literature, manufacturer Instructions
                for Use, and peer-reviewed injection-safety guidance agree on.
                It is patient-education only, it is not a substitute for the
                clinician who prescribed your medication or the IFU that came
                in the box.
              </p>
            )}

            <p>
              You will find a step-numbered procedure, the anatomical sites
              that are clinically supported for {hub?.shortName?.toLowerCase() ?? "this technique"},
              and the small list of things that are worth a phone call to your
              prescriber if they happen.
            </p>

            {post.items && post.items.length > 0 && (
              <>
                <h2 id="key-points">Key points</h2>
                <ul>
                  {post.items.slice(0, 5).map((it) => (
                    <li key={it.rank}>
                      <strong>{it.name}.</strong> {it.summary}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Pre-injection checklist — Phase 2 depth-pass block 1. */}
            {post.preChecklist && post.preChecklist.length > 0 && (
              <>
                <h2 id="pre-checklist">Before you start, the pre-injection checklist</h2>
                <ul>
                  {post.preChecklist.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </>
            )}

            <h2 id="deep-dive">Step-by-step</h2>
            {post.steps && post.steps.length > 0 ? (
              <>
                {(post.supplies && post.supplies.length > 0) ||
                (post.tools && post.tools.length > 0) ? (
                  <>
                    {post.supplies && post.supplies.length > 0 && (
                      <p>
                        <strong>Supplies.</strong> {post.supplies.join(" · ")}
                      </p>
                    )}
                    {post.tools && post.tools.length > 0 && (
                      <p>
                        <strong>Tools.</strong> {post.tools.join(" · ")}
                      </p>
                    )}
                  </>
                ) : null}
                <ol>
                  {post.steps.map((s, i) => (
                    <li key={i} id={`step${i + 1}`}>
                      <strong>{s.name}.</strong> {s.text}
                    </li>
                  ))}
                </ol>
              </>
            ) : body?.sections && body.sections.length > 0 ? (
              <BodySectionsRenderer sections={body.sections} />
            ) : (
              <>
                <p>
                  The procedure described here is the same one taught in
                  nursing fundamentals courses. If any step is unclear, the
                  manufacturer Instructions for Use that came with your
                  medication is the authoritative source.
                </p>
                <ol>
                  <li>
                    <strong>Wash your hands.</strong> Twenty seconds, soap and
                    water. Dry on a clean towel. The single highest-yield step
                    in injection safety.
                  </li>
                  <li>
                    <strong>Inspect the medication.</strong> Read the label.
                    Check expiry. Look at the solution, it should match what
                    the IFU describes (clear vs. cloudy is product-specific).
                  </li>
                  <li>
                    <strong>Choose a site and clean it.</strong> Pick a site
                    you have not used in the last week. Wipe with an alcohol
                    swab in a circular motion. Let the alcohol dry, this
                    matters for sting, not just sterility.
                  </li>
                  <li>
                    <strong>Pinch a fold of subcutaneous tissue.</strong> One
                    to two inches of tissue between your thumb and index
                    finger.
                  </li>
                  <li>
                    <strong>Insert at 90°</strong> for normal body composition,
                    or 45° if you have very little subcutaneous fat. The pinch
                    guarantees you stay in the subcutaneous layer.
                  </li>
                  <li>
                    <strong>Push the plunger steadily.</strong> Slow and even.
                    Count to three.
                  </li>
                  <li>
                    <strong>Withdraw and dispose.</strong> Pull the needle out
                    at the same angle you went in. Drop the syringe directly
                    into a sharps container, never recap.
                  </li>
                </ol>
              </>
            )}

            {/* After-injection care — Phase 2 depth-pass block 3. */}
            {post.aftercare && post.aftercare.length > 0 && (
              <>
                <h2 id="aftercare">After the injection</h2>
                <ul>
                  {post.aftercare.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Common mistakes — Phase 2 depth-pass block 4. */}
            {post.commonMistakes && post.commonMistakes.length > 0 && (
              <>
                <h2 id="common-mistakes">Common mistakes</h2>
                <ul>
                  {post.commonMistakes.map((m, i) => (
                    <li key={i}>
                      <strong>{m.mistake}</strong> — {m.correction}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* When to call a clinician — red callout. */}
            {post.redFlags && post.redFlags.length > 0 && (
              <ClinicalCallout variant="stop" title="Stop and call your prescriber if…">
                <ul className="list-disc pl-5 space-y-1">
                  {post.redFlags.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </ClinicalCallout>
            )}

            <NewsletterInline />

            {post.faq && post.faq.length > 0 && (
              <>
                <h2 id="faq">Frequently asked questions</h2>
                {post.faq.map((q, i) => (
                  <div key={i}>
                    <h3>{q.q}</h3>
                    <p>{q.a}</p>
                  </div>
                ))}
              </>
            )}

            <SourcesAccordion sources={sources} />
            <RelatedArticles articles={related} />
          </article>

          {/* Right rail */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {post.primaryDrug && (
                <DrugImage
                  drugSlug={post.primaryDrug}
                  size="md"
                  showCaption={true}
                />
              )}
              {regions.length > 0 && (
                <InjectionSiteMap regions={regions} />
              )}
              <TableOfContents items={toc} />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function ShareIcons({ title }: { title: string }) {
  const t = encodeURIComponent(title);
  return (
    <div className="flex items-center gap-1" aria-label="Share">
      <a
        href={`https://twitter.com/intent/tweet?text=${t}`}
        target="_blank"
        rel="noopener nofollow"
        className="w-9 h-9 inline-flex items-center justify-center rounded-pill border border-rule text-ink-muted hover:text-teal-700 hover:border-teal-500 transition-colors"
        aria-label="Share on X / Twitter"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M12.6 1.5h2.4l-5.2 6 6.1 8h-4.8L7.4 9.7 2.7 15.5H.3l5.6-6.4L0 1.5h4.9l3.4 4.5L12.6 1.5Zm-.9 12.1h1.3L4.4 2.8H3l8.7 10.8Z" /></svg>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=`}
        target="_blank"
        rel="noopener nofollow"
        className="w-9 h-9 inline-flex items-center justify-center rounded-pill border border-rule text-ink-muted hover:text-teal-700 hover:border-teal-500 transition-colors"
        aria-label="Share on Facebook"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M9 8h2l.4-2H9V4.7c0-.6.2-1 1-1h1.4V1.9C11.1 1.8 10.4 1.7 9.6 1.7c-1.7 0-2.8 1-2.8 2.8V6H4.6v2h2.2v6H9V8Z" /></svg>
      </a>
      <button
        type="button"
        className="w-9 h-9 inline-flex items-center justify-center rounded-pill border border-rule text-ink-muted hover:text-teal-700 hover:border-teal-500 transition-colors"
        aria-label="Copy link"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6.5 9.5 9.5 6.5" strokeLinecap="round" /><path d="M9 4l1-1a3 3 0 1 1 3 3l-1 1" strokeLinecap="round" /><path d="M7 12l-1 1a3 3 0 1 1-3-3l1-1" strokeLinecap="round" /></svg>
      </button>
    </div>
  );
}

/**
 * Server-rendered renderer for `postBodies[slug].sections`. Used as the
 * fallback step-by-step block when a post has structured `body.sections`
 * but no `post.steps[]` HowTo override.
 *
 * Mirrors the visual contract of the legacy client `<PostBodyRenderer>` but
 * stays inside article-prose typography so the existing IBM-Plex stack and
 * heading styles apply uniformly.
 */
function BodySectionsRenderer({
  sections,
}: {
  sections: NonNullable<ReturnType<typeof Object>>;
}) {
  // We type-erase here because the imported type is from post-bodies; the
  // renderer is intentionally tolerant of the lightweight section shape.
  const list = sections as Array<{
    heading?: string;
    kind?: "prose" | "steps" | "callout-red" | "callout-amber" | "sources";
    body?: string;
    items?: string[];
    sources?: Array<{ label: string; url?: string }>;
  }>;
  return (
    <>
      {list.map((s, i) => {
        if (s.kind === "callout-red" && s.items) {
          return (
            <ClinicalCallout
              key={i}
              variant="stop"
              title={s.heading ?? "Stop and call your prescriber if…"}
            >
              <ul className="list-disc pl-5 space-y-1">
                {s.items.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            </ClinicalCallout>
          );
        }
        if (s.kind === "callout-amber") {
          return (
            <ClinicalCallout
              key={i}
              variant="caution"
              title={s.heading ?? "Worth a pause"}
            >
              {s.items && (
                <ul className="list-disc pl-5 space-y-1">
                  {s.items.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              )}
              {s.body && <p>{s.body}</p>}
            </ClinicalCallout>
          );
        }
        if (s.kind === "steps" && s.items) {
          return (
            <div key={i}>
              {s.heading && <h3>{s.heading}</h3>}
              <ol>
                {s.items.map((it, j) => <li key={j}>{it}</li>)}
              </ol>
            </div>
          );
        }
        if (s.kind === "sources") {
          // Source lists in postBodies are duplicated by SourcesAccordion;
          // skip to avoid double rendering.
          return null;
        }
        return (
          <div key={i}>
            {s.heading && <h3>{s.heading}</h3>}
            {s.body && <p>{s.body}</p>}
            {s.items && (
              <ul>
                {s.items.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            )}
          </div>
        );
      })}
    </>
  );
}

/**
 * Heuristically pick which injection regions to highlight on the body map
 * based on slug + title text. Keeps the map relevant without per-post wiring.
 */
function inferRegions(post: Post): InjectionRegion[] {
  const hay = `${post.slug} ${post.title} ${post.description}`.toLowerCase();
  const regions: InjectionRegion[] = [];

  if (/(abdomen|belly|stomach|navel|tummy|sub-?q|subcutaneous)/.test(hay)) regions.push("abdomen");
  if (/(thigh|leg)/.test(hay)) regions.push("thigh");
  if (/(deltoid|shoulder|upper arm)/.test(hay)) regions.push("deltoid");
  if (/(glute|buttock|hip|im\b|intramuscular)/.test(hay)) regions.push("glute");
  if (/(tricep|back of arm|upper arm)/.test(hay) && !regions.includes("deltoid")) regions.push("tricep");

  // Fallback: every article gets the canonical SC sites highlighted so the map
  // is never empty.
  if (regions.length === 0) {
    return ["abdomen", "thigh", "deltoid"];
  }
  return regions;
}

const DEFAULT_SOURCES: Source[] = [
  {
    label:
      "Memorial Sloan Kettering Cancer Center. How to give yourself a subcutaneous injection using a prefilled syringe",
    url: "https://www.mskcc.org/cancer-care/patient-education/how-give-yourself-subcutaneous-injection-using-prefilled-syringe",
    publisher: "MSKCC patient education",
  },
  {
    label:
      "MedlinePlus. Subcutaneous (SQ) injections (.gov patient instructions)",
    url: "https://medlineplus.gov/ency/patientinstructions/000430.htm",
    publisher: "MedlinePlus / NIH",
  },
  {
    label: "Johns Hopkins Arthritis Center. How to give a subcutaneous injection",
    url: "https://www.hopkinsarthritis.org/patient-corner/how-to-give-a-subcutaneous-injection/",
    publisher: "Johns Hopkins",
  },
  {
    label:
      "Centers for Disease Control and Prevention. Subcutaneous injection sites and technique (video)",
    url: "https://www.youtube.com/watch?v=ylhdvNZBWN0",
    publisher: "CDC",
  },
];
