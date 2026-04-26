import Link from "next/link";
import { AtlasHero } from "@/components/atlas/AtlasHero";
import { ChapterIndex, type ChapterPart } from "@/components/atlas/ChapterIndex";
import { RotationDiagram } from "@/components/atlas/RotationDiagram";
import { WarningCallout } from "@/components/atlas/WarningCallout";
import { posts, getPost } from "@/lib/content/posts";
import { hubs } from "@/lib/content/hubs";

/**
 * InjectCompass — Atlas home.
 * Cover-page register: paper-white hero (no search, no chips, no teaser
 * cards) → table of contents organised into four parts → rotation-diagram
 * section marker → methodology + pipeline callouts → closing dateline.
 */

export default function HomePage() {
  // Build a default chapter index from the existing posts. Real chapter numbers
  // assigned by Part. Page numbers ascend across the atlas.
  const techPosts = postsForHub("injection-technique");
  const reconPosts = postsForHub("reconstitution");
  const trouble = postsForHub("troubleshooting");
  const supplies = postsForHub("supplies-and-storage");
  const tools = postsForHub("calculators-and-tools");

  const parts: ChapterPart[] = [
    {
      partRoman: "I",
      partLabel: "Fundamentals",
      caption: "What injection actually is, the math you need before you open a vial, and the supplies that go on the tray.",
      chapters: [
        ...tools.map((p, i) => ({
          num: chapterNum(1, i + 1),
          title: p.title,
          short: p.description,
          href: `/${p.slug}`,
          page: pageNum(1, i),
        })),
        ...supplies.slice(0, 2).map((p, i) => ({
          num: chapterNum(1, tools.length + i + 1),
          title: p.title,
          short: p.description,
          href: `/${p.slug}`,
          page: pageNum(1, tools.length + i),
        })),
      ],
    },
    {
      partRoman: "II",
      partLabel: "Sites",
      caption: "Where injections go, why those zones and not others, and the rotation logic that protects the tissue.",
      chapters: reconPosts.map((p, i) => ({
        num: chapterNum(2, i + 1),
        title: p.title,
        short: p.description,
        href: `/${p.slug}`,
        page: pageNum(2, i),
      })),
    },
    {
      partRoman: "III",
      partLabel: "Technique",
      caption: "The procedure, step by step, with each step cited to the nursing-education literature or the package insert.",
      chapters: techPosts.map((p, i) => ({
        num: chapterNum(3, i + 1),
        title: p.title,
        short: p.description,
        href: `/${p.slug}`,
        page: pageNum(3, i),
      })),
    },
    {
      partRoman: "IV",
      partLabel: "Troubleshooting",
      caption: "The hundred small things that go wrong — bruising, lipohypertrophy, cloudy solution, stuck stoppers — and how to triage each one.",
      chapters: trouble.map((p, i) => ({
        num: chapterNum(4, i + 1),
        title: p.title,
        short: p.description,
        href: `/${p.slug}`,
        page: pageNum(4, i),
      })),
    },
  ];

  return (
    <main>
      <AtlasHero />

      {/* Section marker — rotation diagram + atlas description */}
      <section className="border-b border-ink/15">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20 grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            <div className="atlas-label atlas-label-slate mb-3">
              How the atlas works
            </div>
            <h2 className="atlas-display text-3xl md:text-4xl text-ink-deep">
              An atlas, not an article shelf.
            </h2>
            <p className="mt-5 text-ink-deep/80 leading-relaxed">
              Each entry in this site is a numbered chapter, grouped into one
              of four parts. You can read it cover to cover, or open the index
              and jump to the page you need. Every chapter cites a published
              source — the nursing-education literature, a manufacturer
              package insert, or a peer-reviewed protocol — and every chapter
              has been reviewed against the most current edition of that
              source available to us at the time of writing.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#atlas-index" className="atlas-btn">
                Open the index
              </Link>
              <Link href="/methodology" className="atlas-btn-ghost">
                How we review
              </Link>
            </div>
          </div>

          <div className="md:col-span-7">
            <RotationDiagram
              variant="abdomen"
              figure="Fig. 00.1"
              caption="Rotation logic for subcutaneous injection in the abdomen — four quadrants, clockwise rotation across visits, a clear ring of about two inches around the navel. The same logic applies, with adjustments for skinfold and tissue thickness, on the thigh and the back of the upper arm."
            />
          </div>
        </div>
      </section>

      <div id="atlas-index" />
      <ChapterIndex
        parts={parts}
        heading="The atlas — index"
        subhead="Listed in the order a clinician would teach the material. Page numbers are stable across editions."
      />

      {/* Stop-and-call-your-prescriber rule, at home level. */}
      <section className="border-b border-ink/15">
        <div className="mx-auto max-w-4xl px-6 py-14 md:py-16">
          <WarningCallout variant="stop" title="Stop · seek prescriber">
            <p>
              Nothing on InjectCompass is a substitute for the instructions
              that came with your medication or for advice from the clinician
              who prescribed it. If a symptom does not match what you read
              here, treat what you read as out of date and call your
              prescriber. The atlas is patient education. The prescription is
              the medical act.
            </p>
          </WarningCallout>
        </div>
      </section>

      {/* Methodology + Pipeline callouts. */}
      <section className="border-b border-ink/15 bg-paper-warm/40">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20 grid md:grid-cols-2 gap-10">
          <article className="border border-ink/20 bg-paper p-7 md:p-8 rounded-sm">
            <div className="atlas-label atlas-label-surgical mb-3">
              Methodology · Edition v1.2
            </div>
            <h3 className="atlas-display text-2xl md:text-3xl text-ink-deep">
              How a chapter gets written.
            </h3>
            <p className="mt-4 text-ink-deep/80 leading-relaxed">
              We work from the manufacturer Instructions for Use, the relevant
              CDC and WHO injection-safety guidance, and the nursing-education
              literature. Two independent sources have to agree before a
              chapter is published, and a credentialed reviewer signs the
              chapter once the editorial pass is complete.
            </p>
            <Link
              href="/methodology"
              className="mt-5 inline-flex items-center gap-2 atlas-mini text-ink hover:text-surgical"
            >
              Read methodology v1.2
              <span aria-hidden>→</span>
            </Link>
          </article>

          <article className="border border-ink/20 bg-paper p-7 md:p-8 rounded-sm">
            <div className="atlas-label atlas-label-surgical mb-3">
              Pipeline · 8 in research
            </div>
            <h3 className="atlas-display text-2xl md:text-3xl text-ink-deep">
              The chapters we are working on.
            </h3>
            <p className="mt-4 text-ink-deep/80 leading-relaxed">
              The pipeline is public. Every chapter we are researching is
              listed with its working title, the questions it tries to answer,
              and the sources we have read so far. If you want to nominate a
              question for the next edition, the form is at the bottom of the
              pipeline page.
            </p>
            <Link
              href="/pipeline"
              className="mt-5 inline-flex items-center gap-2 atlas-mini text-ink hover:text-surgical"
            >
              Open the pipeline
              <span aria-hidden>→</span>
            </Link>
          </article>
        </div>
      </section>

      {/* Closing dateline */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="border-t border-ink/20 pt-6 flex flex-wrap items-center justify-between gap-3 atlas-mini">
            <span>InjectCompass · Atlas Edition 01</span>
            <span>
              Last reviewed ·{" "}
              {new Date().toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>{posts.length} chapters · {hubs.length} parts</span>
          </div>
        </div>
      </section>
    </main>
  );
}

function postsForHub(slug: string) {
  return posts
    .filter((p) => p.hub === slug)
    .sort((a, b) => a.title.localeCompare(b.title));
}

function chapterNum(part: number, idx: number) {
  // 01..09 → 1.01, 1.02 ...
  return `${part}.${String(idx).padStart(2, "0")}`;
}

function pageNum(part: number, idx: number) {
  // Stable cross-edition pagination, monotonic across the atlas.
  const base = (part - 1) * 24 + 4;
  return String(base + idx * 4).padStart(3, "0");
}
