import Link from "next/link";
import type { Post } from "@/lib/content/posts";
import { posts } from "@/lib/content/posts";
import { getHub } from "@/lib/content/hubs";
import { Stepper } from "./Stepper";
import { Outline } from "./Outline";
import { TechniqueChecklist } from "./TechniqueChecklist";
import { WarningCallout } from "./WarningCallout";
import { ReferenceLeaflet } from "./ReferenceLeaflet";
import { RotationDiagram } from "./RotationDiagram";
import { ArticleJsonLd } from "../schema/ArticleJsonLd";
import { BreadcrumbJsonLd } from "../schema/BreadcrumbJsonLd";
import { FaqJsonLd } from "../schema/FaqJsonLd";

/**
 * ChapterTemplate — Atlas chapter shell.
 * Top: small-caps part label + huge chapter number
 * Sticky left rail: Stepper (prev/current/next)
 * Sticky right rail: Outline of in-page sections
 * Body: max-w-2xl prose with rotation diagram, technique checklist,
 *       warning callouts inline, reference leaflet at the end.
 */

const PART_OF_HUB: Record<string, { roman: string; label: string }> = {
  "calculators-and-tools": { roman: "I", label: "Fundamentals" },
  "supplies-and-storage": { roman: "I", label: "Fundamentals" },
  reconstitution: { roman: "II", label: "Sites" },
  "injection-technique": { roman: "III", label: "Technique" },
  troubleshooting: { roman: "IV", label: "Troubleshooting" },
};

export function ChapterTemplate({ post }: { post: Post }) {
  const hub = getHub(post.hub);
  const partInfo = PART_OF_HUB[post.hub] ?? { roman: "—", label: hub?.name ?? "Atlas" };

  // Find prev/next in the same hub for the stepper
  const hubPosts = posts
    .filter((p) => p.hub === post.hub)
    .sort((a, b) => a.title.localeCompare(b.title));
  const myIdx = hubPosts.findIndex((p) => p.slug === post.slug);
  const prev = myIdx > 0 ? hubPosts[myIdx - 1] : undefined;
  const next = myIdx < hubPosts.length - 1 ? hubPosts[myIdx + 1] : undefined;

  const chapterNum = `${partInfo.roman === "I" ? 1 : partInfo.roman === "II" ? 2 : partInfo.roman === "III" ? 3 : 4}.${String(myIdx + 1).padStart(2, "0")}`;

  // Build the outline from items + faq
  const outlineItems = [
    { id: "lede", label: "The short answer" },
    ...(post.items && post.items.length > 0
      ? [{ id: "procedure", label: "Procedure" }]
      : []),
    ...(post.faq && post.faq.length > 0
      ? [{ id: "faq", label: "Frequently asked questions" }]
      : []),
    ...(post.sources && post.sources.length > 0
      ? [{ id: "references", label: "References" }]
      : []),
  ];

  // Decide whether to show a rotation diagram (rotation/site posts)
  const showRotation =
    post.slug.includes("rotat") ||
    post.slug.includes("injection-site") ||
    post.hub === "reconstitution";

  const crumbs = [
    { label: "Atlas", href: "/" },
    hub ? { label: hub.name, href: `/guides/${hub.slug}` } : { label: "" },
    { label: post.title },
  ];

  return (
    <main className="bg-paper">
      <ArticleJsonLd
        path={`/${post.slug}`}
        headline={post.h1}
        description={post.description}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
      />
      <BreadcrumbJsonLd crumbs={crumbs} />
      {post.faq && <FaqJsonLd faq={post.faq} />}

      {/* Chapter masthead — atlas-grid with huge numeral */}
      <section className="border-b border-ink/15 atlas-grid relative">
        <div className="mx-auto max-w-6xl px-6 pt-12 md:pt-16 pb-10 md:pb-14">
          <nav className="atlas-mini text-slate flex flex-wrap gap-x-2 gap-y-1 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink">Atlas</Link>
            <span aria-hidden>·</span>
            {hub && (
              <>
                <Link href={`/guides/${hub.slug}`} className="hover:text-ink">
                  Part {partInfo.roman} · {partInfo.label}
                </Link>
                <span aria-hidden>·</span>
              </>
            )}
            <span className="text-ink-deep">Ch {chapterNum}</span>
          </nav>

          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-3">
              <div className="atlas-chapter-numeral leading-none">
                {chapterNum.split(".")[1]}
              </div>
              <div className="atlas-label atlas-label-surgical mt-3">
                Ch {chapterNum} · §1
              </div>
            </div>

            <div className="md:col-span-9">
              <div className="atlas-label atlas-label-slate mb-3">
                Part {partInfo.roman} · {partInfo.label}
              </div>
              <h1 className="atlas-display text-3xl md:text-[2.6rem] leading-[1.07] text-ink-deep">
                {post.h1}
              </h1>
              {post.description && (
                <p className="mt-5 text-ink-deep/80 text-lg leading-[1.55] max-w-2xl">
                  {post.description}
                </p>
              )}

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 atlas-mini">
                <span>Reviewed · {fmtDate(post.updatedAt)}</span>
                <span>Reading · {post.readingTime} min</span>
                {post.sources && post.sources.length > 0 && (
                  <span>{post.sources.length} sources cited</span>
                )}
                {post.medicalDisclaimer === "required" && (
                  <span className="atlas-label-surgical">
                    Patient-education only
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three-column body */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-14 grid lg:grid-cols-12 gap-8">
          {/* Left rail — stepper */}
          <aside className="hidden lg:block lg:col-span-3">
            <Stepper
              prev={prev ? { num: `${chapterNum.split(".")[0]}.${String(myIdx).padStart(2, "0")}`, title: prev.title, href: `/${prev.slug}` } : undefined}
              current={{ num: chapterNum, title: post.title, href: `/${post.slug}` }}
              next={next ? { num: `${chapterNum.split(".")[0]}.${String(myIdx + 2).padStart(2, "0")}`, title: next.title, href: `/${next.slug}` } : undefined}
            />
          </aside>

          {/* Body */}
          <article className="lg:col-span-6">
            <div className="prose">
              <h2 id="lede">The short answer</h2>
              <p>{post.description}</p>

              {showRotation && (
                <div className="my-8 -ml-4 md:-ml-12">
                  <RotationDiagram
                    variant="abdomen"
                    figure={`Fig. ${chapterNum}.A`}
                    caption="Quadrant rotation logic for subcutaneous injection in the abdomen, with a clear ring around the navel."
                  />
                </div>
              )}

              {post.medicalDisclaimer === "required" && (
                <WarningCallout variant="stop" title="Stop · prescriber-led care">
                  This is patient-education material for individuals who have
                  been prescribed injectable medications. It is not a
                  substitute for the manufacturer Instructions for Use or for
                  guidance from the clinician who prescribed your medication.
                </WarningCallout>
              )}

              {post.items && post.items.length > 0 && (
                <>
                  <h2 id="procedure">Procedure</h2>
                  <TechniqueChecklist
                    refLabel={`Proc. ${chapterNum}`}
                    title="Step-numbered"
                    steps={post.items.map((it) => ({
                      title: it.name,
                      detail: it.summary,
                    }))}
                  />
                </>
              )}

              {post.faq && post.faq.length > 0 && (
                <>
                  <h2 id="faq">Frequently asked questions</h2>
                  <dl className="space-y-5">
                    {post.faq.map((q, i) => (
                      <div key={i}>
                        <dt className="atlas-display text-ink-deep text-base md:text-lg leading-snug flex gap-2">
                          <span className="atlas-fn">{i + 1}</span>
                          <span>{q.q}</span>
                        </dt>
                        <dd className="text-ink-deep/85 mt-2 leading-relaxed">
                          {q.a}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}

              {post.sources && post.sources.length > 0 && (
                <div id="references">
                  <ReferenceLeaflet
                    title={`References · Ch ${chapterNum}`}
                    caption="Sources cited in this chapter."
                    refs={post.sources.map((s) => ({ label: s.label, url: s.url }))}
                  />
                </div>
              )}
            </div>

            {next && (
              <div className="mt-14 border-t border-ink/20 pt-8">
                <div className="atlas-mini text-slate">Continue reading</div>
                <Link
                  href={`/${next.slug}`}
                  className="group flex items-baseline gap-4 mt-2"
                >
                  <span className="atlas-chapter-num text-2xl">→</span>
                  <span className="atlas-display text-ink-deep text-xl md:text-2xl group-hover:text-surgical transition-colors">
                    {next.title}
                  </span>
                </Link>
              </div>
            )}
          </article>

          {/* Right rail — outline */}
          <aside className="hidden lg:block lg:col-span-3">
            <Outline items={outlineItems} title="On this page" />
          </aside>
        </div>
      </section>
    </main>
  );
}

function fmtDate(d: string) {
  return new Date(d).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
