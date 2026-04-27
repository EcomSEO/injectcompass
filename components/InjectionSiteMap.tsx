/**
 * InjectionSiteMap — InjectCompass differentiator.
 *
 * Clean SVG line-illustration of a human body (front + back), with injection
 * sites highlighted as teal dots that pulse 1.5s. Pass which regions to
 * highlight; only those will be drawn as solid teal.
 *
 * Positioned in the article right rail above the TOC. 240-280px wide.
 */

export type InjectionRegion =
  | "abdomen"
  | "thigh"
  | "deltoid"
  | "glute"
  | "tricep"
  | "outer-thigh-back";

const REGION_LABEL: Record<InjectionRegion, string> = {
  abdomen: "Abdomen",
  thigh: "Outer thigh (front)",
  deltoid: "Deltoid",
  glute: "Upper outer glute",
  tricep: "Back of upper arm",
  "outer-thigh-back": "Outer thigh (back)",
};

// Region marker positions on each figure (front / back).
// Coordinates are tuned to the SVG body geometry below.
const FRONT_DOTS: Partial<Record<InjectionRegion, [number, number]>> = {
  abdomen: [55, 88],
  thigh: [42, 130],
  deltoid: [28, 50],
};

const BACK_DOTS: Partial<Record<InjectionRegion, [number, number]>> = {
  glute: [62, 110],
  tricep: [34, 56],
  "outer-thigh-back": [70, 134],
};

export function InjectionSiteMap({
  regions,
  caption = "Injection sites discussed in this article",
  showLegend = true,
}: {
  regions: InjectionRegion[];
  caption?: string;
  showLegend?: boolean;
}) {
  const set = new Set<InjectionRegion>(regions);
  const id = "isp-" + regions.join("-");

  return (
    <figure
      className="rounded-md border border-rule bg-white p-4"
      aria-label={`Anatomical map of ${regions.length} injection site${regions.length === 1 ? "" : "s"} discussed in this article`}
    >
      <div className="eyebrow mb-3">Anatomical map</div>
      <div className="grid grid-cols-2 gap-2">
        {/* FRONT */}
        <div className="flex flex-col items-center">
          <BodyFigure
            view="front"
            highlighted={set}
            dots={FRONT_DOTS}
            uid={id + "-f"}
          />
          <div className="mt-2 text-[11px] font-semibold uppercase tracking-eyebrow text-ink-muted">
            Front
          </div>
        </div>
        {/* BACK */}
        <div className="flex flex-col items-center">
          <BodyFigure
            view="back"
            highlighted={set}
            dots={BACK_DOTS}
            uid={id + "-b"}
          />
          <div className="mt-2 text-[11px] font-semibold uppercase tracking-eyebrow text-ink-muted">
            Back
          </div>
        </div>
      </div>

      {showLegend && (
        <ul className="mt-4 space-y-1.5 text-[12.5px]">
          {regions.map((r) => (
            <li key={r} className="flex items-center gap-2 text-ink">
              <span className="w-2.5 h-2.5 rounded-pill bg-teal-500 inline-block ring-2 ring-teal-100" />
              {REGION_LABEL[r]}
            </li>
          ))}
        </ul>
      )}

      {caption && (
        <figcaption className="mt-3 pt-3 border-t border-rule text-[12px] text-ink-muted leading-snug">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function BodyFigure({
  view,
  highlighted,
  dots,
  uid,
}: {
  view: "front" | "back";
  highlighted: Set<InjectionRegion>;
  dots: Partial<Record<InjectionRegion, [number, number]>>;
  uid: string;
}) {
  const stroke = "#5A6573";
  const subtle = "#CDD3DA";

  return (
    <svg
      viewBox="0 0 110 200"
      className="w-full max-w-[120px] h-auto"
      role="img"
      aria-label={view === "front" ? "Human body, front view" : "Human body, back view"}
    >
      {/* Body silhouette — clean stylised line */}
      <g fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <circle cx="55" cy="20" r="11" />
        {/* Neck */}
        <line x1="50" y1="30" x2="50" y2="36" />
        <line x1="60" y1="30" x2="60" y2="36" />
        {/* Shoulders + torso */}
        <path d="M30 42 Q 45 36, 55 36 T 80 42 L 82 80 Q 78 92, 78 110 L 70 158 L 64 198" />
        <path d="M30 42 L 28 80 Q 32 92, 32 110 L 40 158 L 46 198" />
        {/* Inner waist */}
        <path d={view === "front" ? "M40 100 Q 55 104, 70 100" : "M40 102 Q 55 100, 70 102"} opacity="0.5" stroke={subtle} />
        {/* Arms */}
        <path d="M30 42 L 18 70 L 14 110 L 18 130" />
        <path d="M80 42 L 92 70 L 96 110 L 92 130" />
        {/* Hands */}
        <circle cx="18" cy="135" r="3" />
        <circle cx="92" cy="135" r="3" />
        {/* Feet */}
        <ellipse cx="46" cy="200" rx="4" ry="2" fill={stroke} />
        <ellipse cx="64" cy="200" rx="4" ry="2" fill={stroke} />
        {/* Centerline (subtle) */}
        <line x1="55" y1="40" x2="55" y2="100" stroke={subtle} strokeDasharray="1 3" />
      </g>

      {/* Front-only: subtle ribs / belly button hint, Back-only: spine hint */}
      {view === "front" ? (
        <g stroke={subtle} strokeWidth="1" fill="none" opacity="0.6">
          <path d="M40 60 Q 55 64, 70 60" />
          <path d="M40 70 Q 55 74, 70 70" />
          <circle cx="55" cy="92" r="1.2" fill={subtle} stroke="none" />
        </g>
      ) : (
        <g stroke={subtle} strokeWidth="1" fill="none" opacity="0.6">
          <line x1="55" y1="40" x2="55" y2="100" />
          <path d="M42 110 Q 55 116, 68 110" />
        </g>
      )}

      {/* Render every dot we know about; faint if not highlighted, solid+pulse if highlighted */}
      {(Object.keys(dots) as InjectionRegion[]).map((region) => {
        const point = dots[region];
        if (!point) return null;
        const [x, y] = point;
        const isOn = highlighted.has(region);
        return (
          <g key={region}>
            {isOn && (
              <circle
                cx={x}
                cy={y}
                r="6"
                fill="#0E8A7A"
                opacity="0.18"
                className="pulse-dot"
              />
            )}
            <circle
              cx={x}
              cy={y}
              r="3"
              fill={isOn ? "#0E8A7A" : "transparent"}
              stroke={isOn ? "#08594E" : subtle}
              strokeWidth={isOn ? 1.3 : 1}
            />
          </g>
        );
      })}

      <title>
        {view === "front" ? "Front view" : "Back view"} — {uid}
      </title>
    </svg>
  );
}
