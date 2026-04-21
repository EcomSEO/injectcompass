/**
 * U-100 insulin syringe SVG with a highlighted tick mark.
 * Colorblind-safe (color + outline weight reinforce each other).
 * Prints cleanly to PDF in black and white.
 */
type Props = {
  units: number; // 0-100
  maxUnits?: number; // default 100 for U-100
  widthPx?: number;
};

export function SyringeSvg({ units, maxUnits = 100, widthPx = 720 }: Props) {
  const clampedUnits = Math.max(0, Math.min(units, maxUnits));
  const tickMarks = Array.from({ length: maxUnits + 1 }, (_, i) => i);

  // Layout
  const viewBoxWidth = 1000;
  const viewBoxHeight = 200;
  const barrelX = 80;
  const barrelY = 70;
  const barrelWidth = 760;
  const barrelHeight = 60;
  const needleX = barrelX + barrelWidth;

  const unitPosition = (u: number) =>
    barrelX + (u / maxUnits) * barrelWidth;

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      style={{ width: widthPx, maxWidth: "100%", height: "auto" }}
      role="img"
      aria-label={`U-100 insulin syringe showing ${clampedUnits} units`}
    >
      {/* Plunger */}
      <rect x={10} y={60} width={70} height={80} rx={6} fill="#5A6374" />
      <rect x={0} y={90} width={10} height={20} fill="#5A6374" />

      {/* Barrel body */}
      <rect
        x={barrelX}
        y={barrelY}
        width={barrelWidth}
        height={barrelHeight}
        fill="#F5F1E8"
        stroke="#242424"
        strokeWidth={2}
      />

      {/* Filled volume indicator (liquid) */}
      {clampedUnits > 0 && (
        <rect
          x={barrelX}
          y={barrelY + 4}
          width={(clampedUnits / maxUnits) * barrelWidth}
          height={barrelHeight - 8}
          fill="#2E5A88"
          opacity={0.22}
        />
      )}

      {/* Tick marks */}
      {tickMarks.map((u) => {
        const x = unitPosition(u);
        const isMajor = u % 10 === 0;
        const isHalf = u % 5 === 0;
        const tickHeight = isMajor ? 18 : isHalf ? 12 : 7;
        return (
          <line
            key={u}
            x1={x}
            y1={barrelY - tickHeight - 2}
            x2={x}
            y2={barrelY - 2}
            stroke="#242424"
            strokeWidth={isMajor ? 1.75 : 1}
          />
        );
      })}

      {/* Major number labels */}
      {tickMarks
        .filter((u) => u % 10 === 0)
        .map((u) => (
          <text
            key={`label-${u}`}
            x={unitPosition(u)}
            y={barrelY - 26}
            fontSize={15}
            fontFamily="IBM Plex Mono, monospace"
            fill="#242424"
            textAnchor="middle"
          >
            {u}
          </text>
        ))}

      {/* Highlighted tick at the calculated unit */}
      {clampedUnits > 0 && clampedUnits <= maxUnits && (
        <>
          <line
            x1={unitPosition(clampedUnits)}
            y1={barrelY - 32}
            x2={unitPosition(clampedUnits)}
            y2={barrelY + barrelHeight + 10}
            stroke="#B74A4A"
            strokeWidth={3.5}
          />
          <circle
            cx={unitPosition(clampedUnits)}
            cy={barrelY - 40}
            r={14}
            fill="#B74A4A"
          />
          <text
            x={unitPosition(clampedUnits)}
            y={barrelY - 35}
            fontSize={14}
            fontFamily="IBM Plex Mono, monospace"
            fontWeight="bold"
            fill="#FFFFFF"
            textAnchor="middle"
          >
            {clampedUnits}
          </text>
        </>
      )}

      {/* Needle */}
      <rect
        x={needleX}
        y={barrelY + barrelHeight / 2 - 2}
        width={100}
        height={4}
        fill="#5A6374"
      />
      <polygon
        points={`${needleX + 100},${barrelY + barrelHeight / 2 - 2} ${needleX + 120},${barrelY + barrelHeight / 2} ${needleX + 100},${barrelY + barrelHeight / 2 + 2}`}
        fill="#242424"
      />

      {/* Label */}
      <text
        x={barrelX + barrelWidth / 2}
        y={barrelY + barrelHeight + 40}
        fontSize={13}
        fontFamily="IBM Plex Mono, monospace"
        fill="#5A6374"
        textAnchor="middle"
      >
        U-100 insulin syringe · 100 units = 1 mL
      </text>
    </svg>
  );
}
