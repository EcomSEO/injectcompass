/**
 * RotationDiagram — small isometric SVG showing injection-site rotation.
 * Domain-unique to InjectCompass. Used both inline in chapter prose and as
 * a "section marker" on the atlas home.
 *
 * Two variants:
 *  - "abdomen" — abdomen quadrants with rotation arrows
 *  - "thigh" — thigh zones, lateral and anterior
 */

type Props = {
  variant?: "abdomen" | "thigh";
  caption?: string;
  figure?: string;
  className?: string;
};

export function RotationDiagram({
  variant = "abdomen",
  caption,
  figure = "Fig. 04.1",
  className = "",
}: Props) {
  return (
    <figure
      className={`border border-ink/20 bg-paper rounded-sm overflow-hidden ${className}`}
    >
      <div className="ref-strip">
        <span>{figure}</span>
        <span>
          {variant === "abdomen"
            ? "Abdomen — quadrant rotation"
            : "Thigh — lateral / anterior zones"}
        </span>
      </div>
      <div className="atlas-grid-fine p-4 md:p-6 flex justify-center">
        {variant === "abdomen" ? <AbdomenSvg /> : <ThighSvg />}
      </div>
      {caption && (
        <figcaption className="px-4 py-3 border-t border-ink/15 text-slate text-sm leading-snug">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function AbdomenSvg() {
  return (
    <svg
      viewBox="0 0 360 280"
      className="w-full max-w-md text-ink"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-label="Abdomen rotation diagram showing four quadrants and a recommended weekly rotation order"
    >
      {/* Torso outline — stylised abdomen frontal view */}
      <path
        d="M180,30 C 110,30 80,80 80,150 C 80,220 110,250 180,250 C 250,250 280,220 280,150 C 280,80 250,30 180,30 Z"
        opacity="0.55"
      />
      {/* Navel */}
      <circle cx="180" cy="140" r="4" fill="currentColor" opacity="0.7" />
      {/* Cross — splits abdomen into quadrants */}
      <line x1="180" y1="50" x2="180" y2="240" strokeDasharray="3,3" opacity="0.45" />
      <line x1="90" y1="140" x2="270" y2="140" strokeDasharray="3,3" opacity="0.45" />

      {/* 5cm safety ring around navel */}
      <circle cx="180" cy="140" r="32" strokeDasharray="2,3" opacity="0.55" />
      <text x="184" y="180" fontSize="9" fill="currentColor" fontFamily="Inter Tight, sans-serif" letterSpacing="0.1em" opacity="0.7">
        2 IN. CLEAR
      </text>

      {/* Quadrant labels */}
      <QuadLabel x={125} y={95} n="1" label="UPR · LEFT" />
      <QuadLabel x={235} y={95} n="2" label="UPR · RIGHT" />
      <QuadLabel x={125} y={205} n="3" label="LWR · LEFT" />
      <QuadLabel x={235} y={205} n="4" label="LWR · RIGHT" />

      {/* Rotation arrows — clockwise */}
      <Arrow from={[155, 95]} to={[205, 95]} />
      <Arrow from={[235, 115]} to={[235, 185]} />
      <Arrow from={[205, 205]} to={[155, 205]} />
      <Arrow from={[125, 185]} to={[125, 115]} />
    </svg>
  );
}

function ThighSvg() {
  return (
    <svg
      viewBox="0 0 360 280"
      className="w-full max-w-md text-ink"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-label="Thigh zone diagram showing safe lateral and anterior subcutaneous zones"
    >
      {/* Two thigh outlines side by side */}
      <path d="M70,30 C 50,90 50,200 70,260 L 130,260 C 150,200 150,90 130,30 Z" opacity="0.55" />
      <path d="M230,30 C 210,90 210,200 230,260 L 290,260 C 310,200 310,90 290,30 Z" opacity="0.55" />

      {/* Safe zones — middle third only */}
      <rect x="80" y="100" width="40" height="100" strokeDasharray="2,3" />
      <rect x="240" y="100" width="40" height="100" strokeDasharray="2,3" />

      <text x="100" y="80" fontSize="9" fill="currentColor" fontFamily="Inter Tight, sans-serif" textAnchor="middle" letterSpacing="0.1em" opacity="0.85">
        LATERAL
      </text>
      <text x="260" y="80" fontSize="9" fill="currentColor" fontFamily="Inter Tight, sans-serif" textAnchor="middle" letterSpacing="0.1em" opacity="0.85">
        ANTERIOR
      </text>

      {/* Markers — typical injection sites */}
      {[120, 145, 170].map((y, i) => (
        <g key={`l-${y}`}>
          <circle cx="100" cy={y} r="3" fill="currentColor" opacity="0.85" />
          <text x="108" y={y + 3} fontSize="8" fill="currentColor" fontFamily="Inter Tight, sans-serif">
            {i + 1}
          </text>
        </g>
      ))}
      {[120, 145, 170].map((y, i) => (
        <g key={`r-${y}`}>
          <circle cx="260" cy={y} r="3" fill="currentColor" opacity="0.85" />
          <text x="268" y={y + 3} fontSize="8" fill="currentColor" fontFamily="Inter Tight, sans-serif">
            {i + 4}
          </text>
        </g>
      ))}

      {/* Avoid the knee + groin labels */}
      <text x="100" y="245" fontSize="8" fill="currentColor" fontFamily="Inter Tight, sans-serif" textAnchor="middle" opacity="0.55">
        avoid lower third
      </text>
      <text x="260" y="245" fontSize="8" fill="currentColor" fontFamily="Inter Tight, sans-serif" textAnchor="middle" opacity="0.55">
        avoid lower third
      </text>
    </svg>
  );
}

function QuadLabel({ x, y, n, label }: { x: number; y: number; n: string; label: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" fill="#C8463C" />
      <text x={x} y={y + 4} fontSize="11" fill="#FAFAF7" fontFamily="Inter Tight, sans-serif" fontWeight="600" textAnchor="middle">
        {n}
      </text>
      <text x={x} y={y + 28} fontSize="8" fill="currentColor" fontFamily="Inter Tight, sans-serif" textAnchor="middle" letterSpacing="0.12em">
        {label}
      </text>
    </g>
  );
}

function Arrow({ from, to }: { from: [number, number]; to: [number, number] }) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  return (
    <g stroke="#C8463C" strokeWidth="1.2" fill="none">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <ArrowHead x={x2} y={y2} dx={x2 - x1} dy={y2 - y1} />
    </g>
  );
}

function ArrowHead({ x, y, dx, dy }: { x: number; y: number; dx: number; dy: number }) {
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const sz = 5;
  const px = -uy;
  const py = ux;
  const ax = x - ux * sz + px * sz * 0.6;
  const ay = y - uy * sz + py * sz * 0.6;
  const bx = x - ux * sz - px * sz * 0.6;
  const by = y - uy * sz - py * sz * 0.6;
  return (
    <polygon
      points={`${x},${y} ${ax},${ay} ${bx},${by}`}
      fill="#C8463C"
      stroke="none"
    />
  );
}
