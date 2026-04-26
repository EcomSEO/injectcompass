import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Methodology v1.2 — changelog",
  description:
    "What changed between v1.0 and v1.2 of the InjectCompass methodology.",
  path: "/methodology/v1-2",
});

const CHANGES = [
  {
    rev: "v1.2",
    date: "April 2026",
    summary: "Atlas wayfinding model.",
    bullets: [
      "Adopted the wayfinding-atlas chapter model (numbered chapters across four parts).",
      "Added per-chapter stepper rail and outline rail to the chapter shell.",
      "Required a 2-inch clear ring around the navel in any rotation diagram for the abdomen.",
    ],
  },
  {
    rev: "v1.1",
    date: "February 2026",
    summary: "Versioning + retirement policy.",
    bullets: [
      "Formalised version-bump triggers for dosage, needle-gauge, and reconstitution figures.",
      "Wrote the chapter retirement policy (410 + redirect to replacement).",
      "Added the change-log convention every chapter now carries at the foot.",
    ],
  },
  {
    rev: "v1.0",
    date: "December 2025",
    summary: "Initial methodology.",
    bullets: [
      "First draft of triangulation rule and source hierarchy.",
      "Editorial-team review process (pending credentialed reviewer).",
    ],
  },
];

export default function V12Page() {
  return (
    <main>
      <section className="border-b border-ink/15 atlas-grid">
        <div className="mx-auto max-w-4xl px-6 pt-14 pb-10 md:pt-18 md:pb-12">
          <div className="atlas-label atlas-label-slate">
            Methodology · changelog
          </div>
          <h1 className="atlas-display text-3xl md:text-5xl text-ink-deep mt-3 max-w-3xl leading-[1.05]">
            v1.2 · what changed.
          </h1>
          <p className="mt-5 max-w-2xl text-ink-deep/80">
            Methodology revisions are versioned. Every chapter carries the
            version of the methodology under which it was last reviewed. This
            page lists what each revision changed.
          </p>
          <Link
            href="/methodology"
            className="mt-6 inline-flex items-center gap-2 atlas-mini text-ink hover:text-surgical"
          >
            <span aria-hidden>←</span> Back to methodology
          </Link>
        </div>
      </section>

      <section className="border-b border-ink/15">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          <ol className="space-y-10">
            {CHANGES.map((c) => (
              <li key={c.rev} className="grid md:grid-cols-12 gap-6 border-t border-ink/15 pt-8 first:border-t-0 first:pt-0">
                <div className="md:col-span-3">
                  <div className="atlas-chapter-num text-3xl">{c.rev}</div>
                  <div className="atlas-mini mt-1">{c.date}</div>
                </div>
                <div className="md:col-span-9">
                  <div className="atlas-display text-xl text-ink-deep">
                    {c.summary}
                  </div>
                  <ul className="mt-3 space-y-2 text-ink-deep/85 text-[15px] leading-relaxed">
                    {c.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3">
                        <span aria-hidden className="atlas-marker num shrink-0 mt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
