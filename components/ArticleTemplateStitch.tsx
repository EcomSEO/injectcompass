import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { Post } from "@/lib/content/posts";
import { posts } from "@/lib/content/posts";
import { getHub } from "@/lib/content/hubs";
import { articleImage } from "@/lib/content/images";
import { ArticleJsonLd } from "./schema/ArticleJsonLd";
import { MedicalWebPageJsonLd } from "./schema/MedicalWebPageJsonLd";
import { FaqJsonLd } from "./schema/FaqJsonLd";
import { BreadcrumbJsonLd } from "./schema/BreadcrumbJsonLd";
import { HowToJsonLd, type HowToStep } from "./schema/HowToJsonLd";

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
 * ArticleTemplateStitch — the 2026-04-29 Stitch-design article shell.
 *
 * Visual structure (Screenshot 1):
 *   - Dark teal hero band: Peptide / Luxury chips + serif H1 + dek +
 *     author chip + medically-reviewed chip + large pen photo right
 *   - Body grid: sticky TOC (left rail) + prose (centre) + right rail
 *     with Key Facts, Anatomical Map teaser, Related Tools, Editorial
 *     Review, Warning/Safety, Newsletter, FAQ, Sources
 *   - Step-by-step grid: 2-column numbered cards with photo + Pro Tip
 *
 * JSON-LD (Article + MedicalWebPage + Breadcrumb + FAQ + HowTo) is
 * emitted in identical shape to ArticleTemplate so search-engine
 * surfaces don't regress.
 */
export async function ArticleTemplateStitch({ post }: { post: Post }) {
  const hub = getHub(post.hub);
  const heroImg = articleImage(post.slug, post.hub);

  const crumbs = [
    { label: "Home", href: "/" },
    hub
      ? { label: hub.name, href: `/guides/${hub.slug}` }
      : { label: "Library" },
    { label: post.title },
  ];

  const tocItems: Array<{ id: string; label: string }> = [
    { id: "introduction", label: "Introduction" },
    ...(post.items && post.items.length > 0
      ? [{ id: "key-points", label: "Key points" }]
      : []),
    ...(post.preChecklist && post.preChecklist.length > 0
      ? [{ id: "pre-checklist", label: "Pre-injection checklist" }]
      : []),
    ...(post.steps && post.steps.length > 0
      ? [{ id: "step-guide", label: "Step-by-step guide" }]
      : []),
    ...(post.aftercare && post.aftercare.length > 0
      ? [{ id: "aftercare", label: "Aftercare" }]
      : []),
    ...(post.commonMistakes && post.commonMistakes.length > 0
      ? [{ id: "common-mistakes", label: "Common mistakes" }]
      : []),
    ...(post.faq && post.faq.length > 0
      ? [{ id: "faq", label: "FAQ" }]
      : []),
    { id: "sources", label: "Sources" },
  ];

  const isProcedure =
    post.slug.startsWith("how-to-") ||
    post.hub === "injection-technique" ||
    post.hub === "reconstitution";
  const howToSteps: HowToStep[] =
    post.steps && post.steps.length > 0
      ? post.steps.map((s) => ({ name: s.name, text: s.text, image: s.image }))
      : isProcedure && post.items && post.items.length > 0
        ? post.items.map((it) => ({ name: it.name, text: it.summary }))
        : [];
  const totalTimeIso = post.totalTimeMinutes
    ? `PT${post.totalTimeMinutes}M`
    : undefined;

  const related = posts
    .filter((p) => p.slug !== post.slug && p.hub === post.hub)
    .slice(0, 3);

  return (
    <main className="bg-surface">
      {/* JSON-LD parity with the legacy template */}
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
      {post.medicalDisclaimer === "required" && (
        <MedicalWebPageJsonLd
          path={`/${post.slug}`}
          headline={post.h1}
          description={post.description}
          lastReviewed={post.updatedAt}
          reviewerName={REVIEWER.name}
          reviewerCredentials={REVIEWER.jobTitle}
          reviewerSlug={REVIEWER.slug}
        />
      )}
      <BreadcrumbJsonLd crumbs={crumbs} />
      {post.faq && post.faq.length > 0 && <FaqJsonLd faq={post.faq} />}
      {howToSteps.length > 0 && (
        <HowToJsonLd
          path={`/${post.slug}`}
          name={post.h1}
          description={post.description}
          totalTimeIso={totalTimeIso}
          supplies={post.supplies}
          tools={post.tools}
          steps={howToSteps}
        />
      )}

      {/* Hero band — dark teal */}
      <header className="bg-midnight-deep text-white relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 30%, rgba(94, 234, 212, 0.18) 0%, transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-container px-6 pt-10 pb-14 md:pt-12 md:pb-20">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[12.5px] text-white/55 mb-7"
          >
            {crumbs.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                {c.href ? (
                  <Link
                    href={c.href as never}
                    className="hover:text-aqua transition-colors"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/85">{c.label}</span>
                )}
                {i < crumbs.length - 1 && (
                  <span className="text-white/30">/</span>
                )}
              </span>
            ))}
          </nav>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {hub && (
                  <span className="px-3 py-1 rounded-full bg-aqua/10 border border-aqua/30 text-aqua text-[11px] font-mono uppercase tracking-[0.16em]">
                    {hub.shortName ?? hub.name}
                  </span>
                )}
                {post.medicalDisclaimer === "required" && (
                  <span className="px-3 py-1 rounded-full bg-white/8 border border-white/15 text-white/85 text-[11px] font-mono uppercase tracking-[0.16em]">
                    Clinical
                  </span>
                )}
              </div>
              <h1 className="font-serif text-white text-[2.4rem] md:text-[3.4rem] leading-[1.04] tracking-[-0.01em] max-w-[20ch]">
                {post.h1}
              </h1>
              <p className="mt-5 text-[17px] md:text-[18.5px] leading-[1.55] text-white/75 max-w-2xl">
                {post.description}
              </p>

              {/* Author + reviewer chips */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-aqua/15 border border-aqua/30 flex items-center justify-center text-aqua text-[12px] font-mono uppercase tracking-[0.12em]">
                    SL
                  </div>
                  <div className="leading-tight">
                    <div className="text-[13.5px] text-white">
                      {AUTHOR.name}
                    </div>
                    <div className="text-[11.5px] text-white/55 font-mono uppercase tracking-[0.12em]">
                      {AUTHOR.jobTitle} · Author
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-aqua/15 border border-aqua/30 flex items-center justify-center text-aqua">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="leading-tight">
                    <div className="text-[13.5px] text-white">
                      Medically reviewed by {REVIEWER.name}
                    </div>
                    <div className="text-[11.5px] text-white/55 font-mono uppercase tracking-[0.12em]">
                      Last updated {formatDate(post.updatedAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="lg:col-span-5">
              {heroImg && (
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-aqua/15 bg-midnight-raised">
                  <Image
                    src={heroImg}
                    alt={post.h1}
                    fill
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Body grid */}
      <section className="mx-auto max-w-container px-6 py-12 md:py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sticky TOC — left rail */}
          <aside className="hidden lg:block lg:col-span-3">
            <nav
              className="sticky top-24"
              aria-label="On this page"
            >
              <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink-muted mb-3">
                Table of contents
              </div>
              <ul className="space-y-1.5 text-[13.5px]">
                {tocItems.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="block py-1.5 text-ink/80 hover:text-clinical hover:bg-clinical-tint/40 rounded px-2 -mx-2 transition border-l-2 border-transparent hover:border-clinical"
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Article column */}
          <article className="lg:col-span-6 article-prose">
            <section id="introduction">
              <p className="text-[17px] leading-[1.7] text-ink/85">
                {post.description}
              </p>
            </section>

            {post.items && post.items.length > 0 && (
              <section id="key-points" className="mt-10">
                <h2 className="font-serif text-[1.6rem] text-ink leading-tight">
                  Key points
                </h2>
                <ul className="mt-4 space-y-3 text-[15.5px]">
                  {post.items.map((it) => (
                    <li
                      key={it.rank}
                      className="flex gap-3 text-ink/85 leading-relaxed"
                    >
                      <span className="font-mono text-clinical text-[12px] tnum mt-1 shrink-0">
                        {String(it.rank).padStart(2, "0")}
                      </span>
                      <span>
                        <strong className="text-ink">{it.name}.</strong>{" "}
                        {it.summary}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {post.preChecklist && post.preChecklist.length > 0 && (
              <section id="pre-checklist" className="mt-10">
                <h2 className="font-serif text-[1.6rem] text-ink leading-tight">
                  Pre-injection checklist
                </h2>
                <ul className="mt-4 space-y-2.5 text-[15px]">
                  {post.preChecklist.map((c, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-ink/85 leading-relaxed"
                    >
                      <span className="text-clinical mt-0.5 shrink-0">✓</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Step-by-step grid */}
            {post.steps && post.steps.length > 0 && (
              <section id="step-guide" className="mt-12">
                <h2 className="font-serif text-[1.85rem] text-ink leading-tight mb-6">
                  Step-by-step guide
                </h2>
                <ol className="grid sm:grid-cols-2 gap-5 list-none !p-0">
                  {post.steps.map((s, i) => (
                    <li
                      key={i}
                      className="bg-white border border-paper-rule rounded-xl p-5 hover:shadow-card transition"
                    >
                      <div className="font-serif text-clinical text-[44px] leading-none mb-3">
                        {i + 1}
                      </div>
                      {s.image && (
                        <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-paper-warm mb-4">
                          <Image
                            src={s.image}
                            alt={s.name}
                            fill
                            sizes="(min-width: 768px) 280px, 100vw"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <h3 className="font-serif text-[1.15rem] text-ink leading-tight">
                        {s.name}
                      </h3>
                      <p className="mt-2 text-[14px] text-ink-muted leading-relaxed">
                        {s.text}
                      </p>
                      {/* Pro Tip block — clinical-tint background */}
                      <div className="mt-4 px-3 py-2.5 rounded-lg bg-clinical-tint border border-clinical/20">
                        <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-clinical mb-1">
                          Pro tip
                        </div>
                        <div className="text-[12.5px] text-ink leading-relaxed">
                          Always check the fluid is clear and colourless
                          before injection.
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {post.aftercare && post.aftercare.length > 0 && (
              <section id="aftercare" className="mt-12">
                <h2 className="font-serif text-[1.6rem] text-ink leading-tight">
                  After the injection
                </h2>
                <ul className="mt-4 space-y-2.5 text-[15px]">
                  {post.aftercare.map((c, i) => (
                    <li key={i} className="text-ink/85 leading-relaxed">
                      {c}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {post.commonMistakes && post.commonMistakes.length > 0 && (
              <section id="common-mistakes" className="mt-12">
                <h2 className="font-serif text-[1.6rem] text-ink leading-tight">
                  Common mistakes
                </h2>
                <div className="mt-4 space-y-4">
                  {post.commonMistakes.map((m, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-clinical pl-4"
                    >
                      <div className="font-serif text-[1.1rem] text-ink leading-snug">
                        {m.mistake}
                      </div>
                      <div className="mt-1.5 text-[14px] text-ink-muted leading-relaxed">
                        <span className="text-clinical font-mono text-[11px] uppercase tracking-[0.14em] mr-2">
                          Fix
                        </span>
                        {m.correction}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {post.redFlags && post.redFlags.length > 0 && (
              <section className="mt-10">
                <div className="rounded-xl border-2 border-amber/40 bg-amber/5 p-5">
                  <div className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.18em] uppercase text-amber mb-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    </svg>
                    When to call a clinician
                  </div>
                  <ul className="space-y-2 text-[14px] text-ink/85">
                    {post.redFlags.map((r, i) => (
                      <li key={i} className="leading-relaxed">{r}</li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {post.faq && post.faq.length > 0 && (
              <section id="faq" className="mt-12">
                <h2 className="font-serif text-[1.6rem] text-ink leading-tight">
                  Frequently asked questions
                </h2>
                <div className="mt-4 divide-y divide-paper-rule">
                  {post.faq.map((q, i) => (
                    <details
                      key={i}
                      className="group py-4"
                    >
                      <summary className="cursor-pointer flex items-start justify-between gap-3 text-[15px] font-medium text-ink leading-snug">
                        {q.q}
                        <span className="text-clinical text-[20px] leading-none transition-transform group-open:rotate-45 shrink-0">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-[14.5px] text-ink-muted leading-relaxed">
                        {q.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {post.sources && post.sources.length > 0 && (
              <section id="sources" className="mt-12">
                <h2 className="font-serif text-[1.6rem] text-ink leading-tight">
                  Sources
                </h2>
                <ol className="mt-4 list-decimal pl-5 space-y-2.5 text-[13.5px]">
                  {post.sources.map((s, i) => (
                    <li key={i} className="text-ink-muted leading-relaxed">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-clinical hover:underline"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </article>

          {/* Right rail */}
          <aside className="lg:col-span-3 space-y-5">
            {/* Key Facts */}
            {post.items && post.items.length > 0 && (
              <div className="bg-white border border-paper-rule rounded-xl p-5">
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-clinical mb-3">
                  Key facts
                </div>
                <ul className="space-y-2 text-[13px] text-ink/85">
                  {post.items.slice(0, 3).map((it) => (
                    <li key={it.rank} className="flex gap-2 leading-relaxed">
                      <span className="text-clinical shrink-0">•</span>
                      <span className="line-clamp-2">{it.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Anatomical Map teaser (when relevant) */}
            {(post.hub === "injection-technique" ||
              post.slug.includes("site")) && (
              <div className="bg-midnight-deep text-white rounded-xl p-5 relative overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(94, 234, 212, 0.22) 0%, transparent 60%)",
                  }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-aqua/85">
                      Anatomical map
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-aqua/15 border border-aqua/30 text-aqua text-[9.5px] font-mono uppercase tracking-[0.14em]">
                      Interactive
                    </span>
                  </div>
                  <div className="aspect-[3/4] flex items-center justify-center">
                    <BodySchematic />
                  </div>
                </div>
              </div>
            )}

            {/* Related Tools */}
            <div className="bg-white border border-paper-rule rounded-xl p-5">
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-clinical mb-3">
                Related tools
              </div>
              <Link
                href={"/peptide-calculator" as never}
                className="group flex items-center justify-between gap-3 -mx-2 px-2 py-2 rounded-lg hover:bg-paper-warm transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-clinical-tint border border-clinical/20 flex items-center justify-center text-clinical">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="4" y="3" width="16" height="18" rx="2" />
                      <line x1="8" y1="7" x2="16" y2="7" />
                      <line x1="8" y1="12" x2="10" y2="12" />
                      <line x1="13" y1="12" x2="16" y2="12" />
                      <line x1="8" y1="16" x2="10" y2="16" />
                      <line x1="13" y1="16" x2="16" y2="16" />
                    </svg>
                  </div>
                  <div className="leading-tight">
                    <div className="text-[13.5px] text-ink font-medium">
                      Peptide Calculator
                    </div>
                    <div className="text-[11.5px] text-ink-muted">
                      Vial → syringe units
                    </div>
                  </div>
                </div>
                <span className="text-clinical group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </Link>
            </div>

            {/* Editorial Review */}
            <div className="bg-clinical-tint border border-clinical/25 rounded-xl p-5">
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-clinical mb-3">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Editorial review
              </div>
              <p className="text-[13px] text-ink/85 leading-relaxed">
                {REVIEWER.name}, {REVIEWER.jobTitle}, reviewed this guide
                against the cited prescribing information and primary
                trial publications. No vendor sponsorship, no consulting
                relationship with the manufacturers covered.
              </p>
            </div>

            {/* Warning / Safety */}
            {post.medicalDisclaimer === "required" && (
              <div className="border-2 border-amber/40 bg-amber/5 rounded-xl p-5">
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-amber mb-3">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  </svg>
                  Warning
                </div>
                <p className="text-[13px] text-ink/85 leading-relaxed">
                  Educational reference only. Not medical advice. Confirm
                  every dose and protocol with your prescriber. Stop and
                  call a clinician if you experience the red-flag
                  symptoms listed in the guide.
                </p>
              </div>
            )}

            {/* Newsletter */}
            <div className="bg-midnight-deep text-white rounded-xl p-5 relative overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 50% 60% at 50% 30%, rgba(94, 234, 212, 0.2) 0%, transparent 70%)",
                }}
              />
              <div className="relative">
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-aqua/85 mb-2">
                  Newsletter
                </div>
                <h3 className="font-serif text-white text-[1.05rem] leading-snug">
                  Sign up for our newsletter
                </h3>
                <p className="mt-1.5 text-[12px] text-white/65 leading-relaxed">
                  Weekly editorial updates. Unsubscribe one click.
                </p>
                <form action="/newsletter" className="mt-4 flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-midnight-raised border border-midnight-rule rounded-lg text-[12.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-aqua/60"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-aqua hover:bg-aqua-soft text-midnight-deep rounded-lg"
                    aria-label="Subscribe"
                  >
                    →
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="bg-paper-warm border-t border-paper-rule">
          <div className="mx-auto max-w-container px-6 py-12 md:py-16">
            <h2 className="font-serif text-ink text-[1.6rem] leading-tight mb-6">
              Related guides
            </h2>
            <ul className="grid md:grid-cols-3 gap-5">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${p.slug}` as never}
                    className="group block bg-white border border-paper-rule rounded-xl overflow-hidden hover:shadow-card transition"
                  >
                    {articleImage(p.slug, p.hub) && (
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={articleImage(p.slug, p.hub)!}
                          alt={p.h1}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="font-serif text-[1.1rem] text-ink leading-snug group-hover:text-clinical transition">
                        {p.h1}
                      </h3>
                      <p className="mt-2 text-[13px] text-ink-muted leading-relaxed line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function BodySchematic() {
  // Schematic body silhouette with injection-zone glow dots — never
  // depicts needle-in-skin imagery (network compliance rule).
  return (
    <svg
      viewBox="0 0 200 280"
      className="w-full h-full"
      role="img"
      aria-label="Schematic body silhouette with injection-zone glow markers"
    >
      <defs>
        <radialGradient id="bodyGlow" cx="50%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0E2A35" stopOpacity="0.85" />
        </radialGradient>
        <radialGradient id="zoneGlow">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Body silhouette — head, torso, arms, legs */}
      <g fill="url(#bodyGlow)" stroke="rgba(94, 234, 212, 0.3)" strokeWidth="0.8">
        <ellipse cx="100" cy="32" rx="18" ry="20" />
        <path d="M100 52 Q70 60 65 90 L65 150 Q65 165 75 165 L75 250 Q75 265 85 265 L95 265 Q98 265 98 255 L100 200 L102 255 Q102 265 105 265 L115 265 Q125 265 125 250 L125 165 Q135 165 135 150 L135 90 Q130 60 100 52 Z" />
        <path d="M70 95 Q55 110 52 150 L48 200 Q47 215 55 215 L60 215 Q65 215 65 205 L65 100 Z" />
        <path d="M130 95 Q145 110 148 150 L152 200 Q153 215 145 215 L140 215 Q135 215 135 205 L135 100 Z" />
      </g>
      {/* Injection-zone glow markers */}
      <circle cx="100" cy="115" r="14" fill="url(#zoneGlow)" />
      <circle cx="100" cy="155" r="14" fill="url(#zoneGlow)" />
      <circle cx="62" cy="135" r="11" fill="url(#zoneGlow)" />
      <circle cx="138" cy="135" r="11" fill="url(#zoneGlow)" />
      <circle cx="90" cy="200" r="11" fill="url(#zoneGlow)" />
      <circle cx="110" cy="200" r="11" fill="url(#zoneGlow)" />
    </svg>
  );
}
