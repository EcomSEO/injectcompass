import Link from "next/link";
import { hubs, getHub } from "@/lib/content/hubs";
import { featuredPost, latestPosts, posts } from "@/lib/content/posts";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { DotRule, ClinicalRule } from "@/components/editorial/DotRule";
import { RankNumeral } from "@/components/editorial/RankNumeral";
import { EmailCapture } from "@/components/EmailCapture";
import { ScrollReveal, AnimatedHairline } from "@/components/editorial/ScrollReveal";

const typeLabel: Record<string, string> = {
  pillar: "Guide",
  comparison: "Comparison",
  cluster: "Explainer",
  listicle: "Reference list",
};

const tools = [
  {
    slug: "peptide-calculator",
    name: "Peptide Calculator",
    note: "mg + bac water + dose → units on a visual syringe",
  },
  {
    slug: "reconstitution-calculator",
    name: "Reconstitution Calculator",
    note: "peptide mg + desired concentration → bac water volume",
  },
  {
    slug: "syringe-converter",
    name: "Syringe Converter",
    note: "units ↔ mg with the visual tick mark",
  },
  {
    slug: "dose-schedule-builder",
    name: "Dose Schedule Builder",
    note: "start + frequency + escalation → printable calendar PDF",
  },
];

export default function HomePage() {
  const featured = featuredPost();
  const recent = latestPosts(6);
  const explainers = posts.filter((p) => p.postType === "cluster").slice(0, 3);

  return (
    <main>
      {/* === HERO: clinical-reference front page === */}
      {/* Crosshair cursor over the hero — echoes the wordmark mark.
          Staggered page-load reveal: eyebrow → headline → body → CTAs → aside. */}
      <section className="cursor-crosshair border-b border-clinical/15">
        <div className="mx-auto max-w-6xl px-6 pt-14 md:pt-20 pb-14 md:pb-20">
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-8">
              <div className="reveal-masthead-0">
                <Eyebrow tone="clinical">
                  Reference No. 01 · The Launch Edition
                </Eyebrow>
              </div>
              <h1 className="reveal-masthead-1 display-headline text-clinical-deep mt-5 text-[2.6rem] sm:text-5xl md:text-[4rem] leading-[1.04]">
                Injections, <em className="not-italic text-clinical">done right.</em>
              </h1>
              <p className="reveal-masthead-2 mt-7 text-lg md:text-xl text-charcoal/85 max-w-2xl leading-[1.55]">
                Step-numbered technique, reconstitution math, calculators, and
                printable cheat sheets for people prescribed injectable
                medications. Every procedure is cited to the nursing-education
                literature or the manufacturer package insert.
              </p>
              <div className="reveal-masthead-3 mt-9 flex flex-wrap gap-3">
                <Link href="/peptide-calculator" className="btn-primary">
                  Open the Peptide Calculator <span aria-hidden>→</span>
                </Link>
                <Link href="#start-here" className="btn-secondary">
                  Start here
                </Link>
              </div>
            </div>

            {/* "In this reference" sidebar */}
            <aside className="reveal-masthead-4 md:col-span-4 md:pl-8 md:border-l md:border-clinical/15">
              <div className="eyebrow text-stone mb-4">In this reference</div>
              <ul className="space-y-4">
                {[featured, ...latestPosts(4).filter((p) => p.slug !== featured?.slug)]
                  .slice(0, 4)
                  .filter((p): p is NonNullable<typeof p> => Boolean(p))
                  .map((p, i) => {
                    const hub = getHub(p.hub);
                    return (
                      <li key={p.slug} className="flex gap-3">
                        <span className="num text-clinical/60 text-sm w-7 shrink-0 pt-1">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <Link
                            href={`/${p.slug}`}
                            className="font-serif text-[16px] leading-snug text-clinical-deep hover:text-clinical transition block"
                          >
                            {p.title}
                          </Link>
                          <div className="text-[11px] uppercase tracking-[0.14em] text-stone mt-1 num">
                            {hub?.shortName} · {p.readingTime} min
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* === CALCULATOR GRID — the signature assets, above the fold === */}
      {/* Calculator zone also gets the crosshair cursor — this is the heart of the site. */}
      <section id="tools" className="cursor-crosshair border-b border-clinical/15 bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <ScrollReveal as="div" className="reveal flex items-end justify-between flex-wrap gap-3 mb-10">
            <div>
              <Eyebrow tone="clinical">The Calculators</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-clinical-deep mt-3 leading-tight">
                Safety-critical math, unit-tested.
              </h2>
              <p className="mt-3 text-charcoal/80 max-w-2xl text-[15.5px] leading-relaxed">
                Every calculator on this site runs on a tested pure-function
                math library. The output is paired with a visual U-100 insulin
                syringe that highlights the calculated tick mark, and a "verify
                with your prescriber" note sits beside every number.
              </p>
              <AnimatedHairline className="mt-6 max-w-sm" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-0 border-t border-clinical/20">
            {tools.map((tool, i) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="group relative flex items-start gap-5 p-7 border-b md:border-b border-clinical/15 md:[&:nth-child(odd)]:border-r md:[&:nth-child(n+3)]:border-b-0 hover:bg-clinical-tint/40 transition"
              >
                <span className="rank-numeral shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-clinical-deep leading-tight group-hover:text-clinical transition">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-[14.5px] text-charcoal/75 leading-relaxed">
                    {tool.note}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-clinical text-xs font-medium uppercase tracking-[0.14em]">
                    Open tool <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === START HERE — for Rachel, the scared first-timer === */}
      <section id="start-here" className="border-b border-clinical/15">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <ScrollReveal as="div" className="reveal grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5">
              <Eyebrow tone="moss">Start here</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-clinical-deep mt-3 leading-[1.1]">
                If you're new to injecting.
              </h2>
              <p className="mt-5 text-charcoal/80 text-[15.5px] leading-relaxed">
                The first subcutaneous injection takes about 90 seconds of
                actual injecting, plus a lot of overthinking beforehand. Our
                pillar guide walks you through the seven steps, with a visual
                syringe and a printable one-pager you can tape to the fridge.
              </p>
            </div>

            <article className="md:col-span-7">
              <Link
                href="/subcutaneous-injection"
                className="group relative block bg-paper border border-clinical/25 rounded-sm p-8 md:p-10 hover:border-clinical/45 transition overflow-hidden"
              >
                <span
                  aria-hidden
                  className="absolute top-0 left-0 w-1.5 h-full bg-clinical"
                />
                <div className="caps-label text-clinical mb-4">
                  The pillar guide
                </div>
                <h3 className="font-serif text-[1.9rem] md:text-[2.2rem] leading-[1.08] text-clinical-deep">
                  Subcutaneous injection — the complete guide.
                </h3>
                <p className="mt-5 text-charcoal/85 text-[15.5px] leading-relaxed">
                  Seven steps, cited to Frid et al. 2016 and CDC injection-safety
                  guidance. Printable one-page version. Red-box callouts for the
                  symptoms that warrant prescriber contact.
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-clinical group-hover:text-clinical-deep transition text-sm font-medium">
                  Read the pillar <span aria-hidden>→</span>
                </span>
              </Link>
            </article>
          </ScrollReveal>
        </div>
      </section>

      {/* === THE FIVE HUBS — clinical index === */}
      <section id="hubs" className="border-b border-clinical/15">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <ScrollReveal as="div" className="reveal flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <Eyebrow tone="clinical">The table of contents</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-clinical-deep mt-3 leading-tight">
                Five hubs. Cited, step-numbered, printable.
              </h2>
              <AnimatedHairline className="mt-4 max-w-xs" />
            </div>
            <Link
              href="/about"
              className="text-clinical hover:text-clinical-deep text-sm font-medium"
            >
              Why we write it this way →
            </Link>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-0 border-t border-clinical/20">
            {hubs.map((hub, i) => (
              <Link
                key={hub.slug}
                href={`/guides/${hub.slug}`}
                className="group relative flex flex-col p-6 border-b lg:border-b-0 lg:border-r border-clinical/15 last:border-r-0 hover:bg-clinical-tint/50 transition"
              >
                <span className="rank-numeral text-[2.5rem] mb-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-lg text-clinical-deep leading-tight mb-2">
                  {hub.name}
                </h3>
                <p className="text-[13.5px] text-charcoal/70 leading-relaxed flex-1">
                  {hub.oneLiner}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-clinical group-hover:text-clinical-deep text-xs font-medium uppercase tracking-[0.14em]">
                  Open hub <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === LATEST — editorial index === */}
      <section className="border-b border-clinical/15">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <ScrollReveal as="div" className="reveal flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <Eyebrow tone="clinical">The Latest</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-clinical-deep mt-3 leading-tight">
                New references, freshly cited.
              </h2>
              <AnimatedHairline className="mt-4 max-w-xs" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-12 gap-10">
            {recent[0] && (
              <article className="md:col-span-7">
                <Link href={`/${recent[0].slug}`} className="group block">
                  <div className="aspect-[16/9] bg-clinical-tint rounded-sm mb-5 relative overflow-hidden border border-clinical/20">
                    {/* Abstract anatomical-style SVG illustration */}
                    <svg
                      aria-hidden
                      viewBox="0 0 240 140"
                      className="absolute inset-0 w-full h-full text-clinical/30"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.8"
                    >
                      <path d="M10 120 Q60 40 120 70 T230 50" />
                      <path d="M10 128 Q60 50 120 80 T230 58" opacity="0.5" />
                      <path d="M10 136 Q60 60 120 90 T230 66" opacity="0.3" />
                      <circle cx="120" cy="70" r="6" fill="currentColor" opacity="0.6" />
                      <circle cx="120" cy="70" r="14" />
                      <circle cx="120" cy="70" r="22" opacity="0.4" />
                    </svg>
                    <div className="absolute bottom-5 left-5">
                      <span className="caps-label text-clinical-deep bg-paper/90 backdrop-blur px-2 py-1 rounded-sm">
                        {typeLabel[recent[0].postType]}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-clinical-deep leading-[1.12] group-hover:text-clinical transition">
                    {recent[0].title}
                  </h3>
                  <p className="mt-3 text-charcoal/80 text-[15.5px] leading-relaxed line-clamp-3">
                    {recent[0].description}
                  </p>
                  <div className="mt-4 caps-label text-stone">
                    {getHub(recent[0].hub)?.shortName} ·{" "}
                    <span className="num">{recent[0].readingTime} min read</span>
                  </div>
                </Link>
              </article>
            )}

            <div className="md:col-span-5 space-y-0">
              {recent.slice(1, 5).map((p) => (
                <article
                  key={p.slug}
                  className="py-5 border-b border-clinical/15 first:border-t first:pt-0 first:mt-0 last:border-b-0"
                >
                  <Link href={`/${p.slug}`} className="group block">
                    <div className="caps-label text-stone mb-1.5">
                      {typeLabel[p.postType]} · {getHub(p.hub)?.shortName}
                    </div>
                    <h3 className="font-serif text-lg text-clinical-deep leading-snug group-hover:text-clinical transition">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] text-charcoal/70 leading-snug line-clamp-2">
                      {p.description}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === THE CREDO — how we write === */}
      <section className="border-b border-clinical/15 bg-clinical text-paper relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-24 relative">
          <div className="absolute top-8 left-6 right-6">
            <ClinicalRule className="text-paper" />
          </div>
          <div className="eyebrow !text-paper/70">How we write</div>
          <h2 className="font-serif text-3xl md:text-4xl mt-4 leading-[1.15] text-paper">
            <span className="text-paper/70">We triangulate.</span> We cite. We
            hand you a printable cheat sheet at the top of every technique post.
          </h2>
          <div className="grid md:grid-cols-3 gap-10 mt-12">
            <div>
              <div className="rank-numeral !text-paper/90 mb-2">01</div>
              <h3 className="font-serif text-xl text-paper mb-2">
                Triangulated sources.
              </h3>
              <p className="text-paper/85 text-[14.5px] leading-relaxed">
                We work from published nursing-education literature,
                manufacturer package inserts, and peer-reviewed injection-
                technique research. At least two independent sources have to
                agree before a post goes live.
              </p>
            </div>
            <div>
              <div className="rank-numeral !text-paper/90 mb-2">02</div>
              <h3 className="font-serif text-xl text-paper mb-2">
                Credentialed review.
              </h3>
              <p className="text-paper/85 text-[14.5px] leading-relaxed">
                The Editorial Team reviews launch content against published
                best practice. A named RN, NP, or PharmD joins the masthead by
                month 6, and their review note appears on every technique post
                after that.
              </p>
            </div>
            <div>
              <div className="rank-numeral !text-paper/90 mb-2">03</div>
              <h3 className="font-serif text-xl text-paper mb-2">
                IFU-led, always.
              </h3>
              <p className="text-paper/85 text-[14.5px] leading-relaxed">
                When a manufacturer Instructions for Use exists for a specific
                pen, we follow it. When the IFU updates, we version the post.
                Our judgment never replaces what came in the box.
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-paper/25">
            <Link
              href="/methodology"
              className="inline-flex items-center gap-1.5 text-paper hover:text-paper/80 text-sm font-medium underline underline-offset-4"
            >
              Read our full methodology <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* === EXPLAINERS === */}
      {explainers.length > 0 && (
        <section className="border-b border-clinical/15">
          <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
              <div>
                <Eyebrow tone="clinical">The Explainers</Eyebrow>
                <h2 className="font-serif text-3xl text-clinical-deep mt-3 leading-tight">
                  The terms that keep coming up, in plain English.
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-0 border-t border-clinical/20">
              {explainers.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="group p-6 border-b md:border-b-0 md:border-r border-clinical/15 last:border-r-0 hover:bg-clinical-tint/40 transition"
                >
                  <RankNumeral n={i + 1} />
                  <h3 className="font-serif text-xl text-clinical-deep leading-tight mt-3 group-hover:text-clinical transition">
                    {p.title}
                  </h3>
                  <p className="text-sm text-charcoal/75 mt-2 leading-relaxed line-clamp-3">
                    {p.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === DISPATCH / NEWSLETTER === */}
      <section className="bg-paper border-b border-clinical/15">
        <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
          <EmailCapture />
        </div>
      </section>

      {/* === CLOSING DATELINE === */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-10">
          <DotRule />
          <p className="text-center caps-label text-stone mt-6">
            Last updated ·{" "}
            <span className="num normal-case tracking-normal">
              {new Date().toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </p>
        </div>
      </section>
    </main>
  );
}
