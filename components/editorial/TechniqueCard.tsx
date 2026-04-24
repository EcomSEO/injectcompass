"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * TechniqueCard — InjectCompass signature component.
 * A numbered-step card with an illustration slot, gauge/length/site
 * callouts, and a "common mistakes" section. Blue accent bar at the left
 * mimics a clinical reference slip.
 *
 * When the card enters the viewport, each step reveals sequentially with a
 * clinical-blue hairline drawing from left, and each step numeral
 * (01, 02, 03) fades in one at a time. Evokes a clinician reading a
 * protocol step by step. Respects prefers-reduced-motion via CSS.
 */

type TechniqueStep = {
  n: number;
  heading: string;
  detail: string;
};

type Spec = { label: string; value: string };

export function TechniqueCard({
  title,
  eyebrow = "Technique card",
  steps,
  specs,
  commonMistakes,
  illustration,
  footnote,
}: {
  title: string;
  eyebrow?: string;
  steps: TechniqueStep[];
  specs?: Spec[];
  commonMistakes?: string[];
  illustration?: ReactNode;
  footnote?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("tc-in-view");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("tc-in-view");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className="my-10 relative bg-paper border border-clinical/25 rounded-sm overflow-hidden"
    >
      {/* Solid blue accent bar at left — the "clinical" signature. */}
      <span aria-hidden className="absolute top-0 left-0 w-1.5 h-full bg-clinical" />

      {/* Reference-slip header strip */}
      <div className="ref-strip pl-6">
        <span>{eyebrow}</span>
        <span aria-hidden className="opacity-80">{steps.length} steps</span>
      </div>

      <div className="px-6 md:px-8 py-7 md:py-9">
        <h3 className="font-serif text-2xl md:text-[1.7rem] text-clinical-deep leading-tight">
          {title}
        </h3>

        {/* Spec strip — gauge / length / site / angle. Monospace, tabular. */}
        {specs && specs.length > 0 && (
          <dl className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 border-y border-clinical/15 py-4">
            {specs.map((s) => (
              <div key={s.label}>
                <dt className="caps-label text-stone mb-1">{s.label}</dt>
                <dd className="num text-[15px] text-clinical-deep">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-6 grid md:grid-cols-[1fr_auto] gap-8">
          {/* Numbered steps — each staggers in as the card scrolls into view. */}
          <ol className="space-y-6">
            {steps.map((step, i) => (
              <li
                key={step.n}
                className="tc-step grid grid-cols-[auto_1fr] gap-5"
                style={{ ["--i" as string]: i } as React.CSSProperties}
              >
                <span className="step-numeral pt-1 tnum tc-step-numeral">
                  {String(step.n).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-serif text-lg text-clinical-deep leading-snug">
                    {step.heading}
                  </h4>
                  <p className="mt-1.5 text-[15px] text-charcoal/85 leading-relaxed">
                    {step.detail}
                  </p>
                  {/* Clinical-blue hairline drawing in from the left. */}
                  <span aria-hidden className="tc-step-rule mt-4" />
                </div>
              </li>
            ))}
          </ol>

          {/* Illustration slot */}
          {illustration && (
            <aside className="md:w-48 lg:w-56 shrink-0 self-start">
              <div className="bg-paper-soft border border-clinical/15 rounded-sm p-4">
                {illustration}
              </div>
            </aside>
          )}
        </div>

        {/* Common mistakes */}
        {commonMistakes && commonMistakes.length > 0 && (
          <section className="mt-8 pt-6 border-t border-clinical/15">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              <span className="caps-label text-amber">Common mistakes</span>
            </div>
            <ul className="space-y-2 text-[15px] text-charcoal/85 leading-relaxed">
              {commonMistakes.map((m, i) => (
                <li key={i} className="flex gap-3">
                  <span aria-hidden className="text-amber shrink-0 pt-[2px]">—</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {footnote && (
          <p className="mt-6 text-xs text-stone leading-relaxed">{footnote}</p>
        )}
      </div>
    </article>
  );
}
