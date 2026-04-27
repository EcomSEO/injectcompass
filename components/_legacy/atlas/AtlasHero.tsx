/**
 * AtlasHero, paper-white ground with faint blueprint grid, big condensed
 * INJECTCOMPASS wordmark, ink subhead. NO search bar. NO gradient. NO chips.
 * The page opens like the cover of a technical reference book.
 */

type Props = {
  edition?: string;
  wordmark?: string;
  subtitle?: string;
  meta?: string;
};

export function AtlasHero({
  edition = "Atlas · Edition 01 · Spring 2026",
  wordmark = "INJECTCOMPASS",
  subtitle = "A wayfinding atlas for peptide injection, sites, technique, rotation, and the troubleshooting of a hundred small things that go wrong.",
  meta = "Patient-education only · No vendor links · Reviewed against the package insert",
}: Props) {
  return (
    <section className="relative border-b border-ink/15 atlas-grid bg-paper overflow-hidden">
      {/* Corner registration marks, tiny crosshair fiducials at the four corners. */}
      <CornerMark className="absolute top-3 left-3" />
      <CornerMark className="absolute top-3 right-3" />
      <CornerMark className="absolute bottom-3 left-3" />
      <CornerMark className="absolute bottom-3 right-3" />

      <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-24 pb-16 md:pb-20 relative">
        <div className="reveal-masthead-0 atlas-label atlas-label-slate mb-6">
          {edition}
        </div>
        <h1
          className="reveal-masthead-1 atlas-wordmark text-ink-deep leading-[0.92] text-[clamp(2.4rem,8.5vw,6.5rem)] tracking-[0.02em]"
          style={{ wordBreak: "break-word" }}
        >
          {wordmark}
        </h1>

        <div className="reveal-masthead-2 mt-7 max-w-2xl">
          <div className="border-l-2 border-surgical pl-5">
            <p className="text-ink-deep text-lg md:text-xl leading-[1.5]">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="reveal-masthead-3 mt-8 atlas-mini">{meta}</div>

        {/* Index strip, quick anchors to the four parts. */}
        <div className="reveal-masthead-4 mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 max-w-3xl">
          {[
            { num: "I", label: "Fundamentals" },
            { num: "II", label: "Sites" },
            { num: "III", label: "Technique" },
            { num: "IV", label: "Troubleshooting" },
          ].map((p) => (
            <a
              key={p.num}
              href={`#part-${p.num}`}
              className="group flex items-baseline gap-3 border-t border-ink/20 pt-2 hover:border-surgical transition-colors"
            >
              <span className="atlas-chapter-num text-2xl">{p.num}</span>
              <span className="atlas-label text-ink-deep group-hover:text-surgical transition-colors">
                {p.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CornerMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      width="22"
      height="22"
      viewBox="0 0 22 22"
      className={`text-ink/40 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
    >
      <line x1="11" y1="2" x2="11" y2="20" />
      <line x1="2" y1="11" x2="20" y2="11" />
      <circle cx="11" cy="11" r="2.5" />
    </svg>
  );
}
