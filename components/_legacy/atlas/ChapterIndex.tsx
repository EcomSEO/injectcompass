import Link from "next/link";

/**
 * ChapterIndex, table of contents styled as a transit/atlas index.
 * Numbered chapters with title-left, dot-leader, page-number-right.
 * Grouped into PARTS.
 */

export type ChapterEntry = {
  num: string;
  title: string;
  href: string;
  page: string;
  short?: string;
};

export type ChapterPart = {
  partRoman: string;
  partLabel: string;
  caption?: string;
  chapters: ChapterEntry[];
};

export function ChapterIndex({
  parts,
  heading = "The Atlas. Index",
  subhead = "Four parts, listed by chapter.",
  partLabel = "PART",
}: {
  parts: ChapterPart[];
  heading?: string;
  subhead?: string;
  partLabel?: string;
}) {
  return (
    <section className="border-b border-ink/15 bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="atlas-label atlas-label-slate mb-3">
          Table of contents
        </div>
        <h2 className="atlas-display text-3xl md:text-4xl text-ink-deep">
          {heading}
        </h2>
        <p className="mt-3 max-w-2xl text-ink-deep/75">{subhead}</p>

        <div className="mt-12 space-y-12">
          {parts.map((part) => (
            <div key={part.partRoman} id={`part-${part.partRoman}`}>
              <div className="flex items-baseline gap-4 border-t-2 border-ink pt-3 mb-5">
                <span className="atlas-chapter-num text-3xl md:text-4xl">
                  {part.partRoman}
                </span>
                <div>
                  <div className="atlas-mini">
                    {partLabel} {part.partRoman}
                  </div>
                  <div className="atlas-display text-lg md:text-xl text-ink-deep mt-0.5">
                    {part.partLabel}
                  </div>
                  {part.caption && (
                    <div className="text-slate text-sm mt-1.5">
                      {part.caption}
                    </div>
                  )}
                </div>
              </div>

              <ol className="divide-y divide-ink/10">
                {part.chapters.map((c) => (
                  <li key={c.num}>
                    <Link
                      href={c.href}
                      className="group flex items-baseline gap-4 py-3.5 hover:bg-paper-warm/50 transition-colors -mx-2 px-2"
                    >
                      <span className="atlas-chapter-num text-base md:text-lg w-12 shrink-0">
                        {c.num}
                      </span>
                      <span className="atlas-display text-ink-deep text-base md:text-lg group-hover:text-surgical transition-colors">
                        {c.title}
                      </span>
                      <span className="flex-1 border-b border-dotted border-ink/30 mx-1 mb-1" />
                      <span className="text-slate text-sm whitespace-nowrap num">
                        p. {c.page}
                      </span>
                    </Link>
                    {c.short && (
                      <p className="text-slate text-sm pb-3 pl-16 -mt-1.5 max-w-2xl">
                        {c.short}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
