import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pipeline, chapters in research",
  description:
    "What we are working on next. The chapters currently in research, in draft, and queued for review.",
  path: "/pipeline",
});

const PIPELINE = [
  {
    status: "in-research",
    title: "Lipohypertrophy, recognition, prevention, and what it actually feels like under the skin",
    questions: [
      "What is the published prevalence in patients on long-term subcutaneous therapy?",
      "Which rotation patterns measurably reduce incidence?",
      "How do you distinguish lipohypertrophy from a benign lump on palpation?",
    ],
    sourcesRead: 4,
  },
  {
    status: "in-research",
    title: "Reconstitution of multi-vial compounds, math, sterility, and storage windows",
    questions: [
      "How does benzyl alcohol concentration affect the storage window once a vial is breached?",
      "What does the published literature say about pooling vials of the same compound?",
    ],
    sourcesRead: 3,
  },
  {
    status: "in-research",
    title: "Travel. TSA rules, refrigeration logistics, and the practical edge cases",
    questions: [
      "What is the current TSA guidance on injectable medications and ice packs?",
      "How long can a refrigerated pen sit at room temperature before potency is in question?",
    ],
    sourcesRead: 6,
  },
  {
    status: "in-draft",
    title: "Sharps disposal, what counts as compliant in each US state",
    questions: [
      "Which states accept curbside disposal in approved containers?",
      "Where do mail-back programs make sense for at-home injectors?",
    ],
    sourcesRead: 2,
  },
  {
    status: "queued",
    title: "Pen-injector failures, when the pen clicks but no medication delivers",
  },
  {
    status: "queued",
    title: "Subcutaneous vs intramuscular, when each is indicated, and the consequence of getting it wrong",
  },
  {
    status: "queued",
    title: "Cold-chain failure, what to do when a refrigerator fails overnight with a pen inside",
  },
  {
    status: "queued",
    title: "Pediatric administration, the gauge, length, and angle differences for under-18 injectors",
  },
];

export default function PipelinePage() {
  const inResearch = PIPELINE.filter((p) => p.status === "in-research");
  const inDraft = PIPELINE.filter((p) => p.status === "in-draft");
  const queued = PIPELINE.filter((p) => p.status === "queued");

  return (
    <main>
      <section className="border-b border-ink/15 atlas-grid">
        <div className="mx-auto max-w-5xl px-6 pt-14 pb-12 md:pt-20 md:pb-14">
          <div className="atlas-label atlas-label-slate">
            Pipeline · public log
          </div>
          <h1 className="atlas-display text-3xl md:text-5xl text-ink-deep mt-3 max-w-3xl leading-[1.05]">
            What we are researching next.
          </h1>
          <p className="mt-6 max-w-2xl text-ink-deep/80 leading-relaxed">
            The pipeline is public. Each item lists the questions the chapter
            tries to answer and how many sources we have read so far. Items
            move from queued → in research → in draft → published as the
            literature comes together.
          </p>
          <div className="mt-8 grid grid-cols-3 max-w-md border-t border-ink/15">
            <Counter label="In research" n={inResearch.length} />
            <Counter label="In draft" n={inDraft.length} />
            <Counter label="Queued" n={queued.length} />
          </div>
        </div>
      </section>

      <section className="border-b border-ink/15">
        <div className="mx-auto max-w-5xl px-6 py-14 md:py-16">
          <Group title="In research" items={inResearch} part="P" />
          <Group title="In draft" items={inDraft} part="D" />
          <Group title="Queued" items={queued} part="Q" />
        </div>
      </section>
    </main>
  );
}

function Counter({ label, n }: { label: string; n: number }) {
  return (
    <div className="border-r border-ink/15 last:border-r-0 px-4 pt-4">
      <div className="atlas-chapter-num text-3xl">{String(n).padStart(2, "0")}</div>
      <div className="atlas-mini mt-1">{label}</div>
    </div>
  );
}

function Group({
  title,
  items,
  part,
}: {
  title: string;
  items: typeof PIPELINE;
  part: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className="mb-12 last:mb-0">
      <div className="flex items-baseline gap-3 border-t-2 border-ink pt-3 mb-5">
        <span className="atlas-chapter-num text-2xl">{part}</span>
        <h2 className="atlas-display text-xl md:text-2xl text-ink-deep">
          {title}
        </h2>
      </div>
      <ol className="divide-y divide-ink/10">
        {items.map((p, i) => (
          <li key={i} className="grid md:grid-cols-12 gap-4 py-5">
            <div className="md:col-span-1 atlas-chapter-num text-base">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="md:col-span-8">
              <div className="atlas-display text-ink-deep text-base md:text-lg leading-snug">
                {p.title}
              </div>
              {p.questions && (
                <ul className="mt-3 space-y-1.5 text-slate text-sm leading-relaxed">
                  {p.questions.map((q, qi) => (
                    <li key={qi} className="flex gap-2">
                      <span aria-hidden className="atlas-fn">{qi + 1}</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="md:col-span-3 md:text-right text-sm text-slate">
              {p.sourcesRead != null && (
                <span className="atlas-mini">
                  {p.sourcesRead} sources read
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
