import Link from "next/link";

/**
 * InjectCompass wordmark — clinical-reference, monospace-adjacent.
 * "Inject" in clinical blue, "Compass" in charcoal, with a small crosshair mark.
 * Evokes a hospital chart stamp rather than a tech logo.
 */
export function Wordmark({
  size = "md",
  asLink = true,
  className = "",
}: {
  size?: "sm" | "md" | "lg" | "xl";
  asLink?: boolean;
  className?: string;
}) {
  const sizeClass =
    size === "xl"
      ? "text-4xl md:text-5xl"
      : size === "lg"
      ? "text-3xl md:text-4xl"
      : size === "sm"
      ? "text-lg"
      : "text-xl md:text-2xl";

  const inner = (
    <span className={`inline-flex items-baseline gap-0 ${className}`}>
      <span
        aria-hidden
        className="inline-flex items-center justify-center mr-2 shrink-0"
        style={{
          width: size === "sm" ? "18px" : size === "lg" || size === "xl" ? "26px" : "20px",
          height: size === "sm" ? "18px" : size === "lg" || size === "xl" ? "26px" : "20px",
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-clinical w-full h-full crosshair-calibrate">
          <circle cx="12" cy="12" r="10.5" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      </span>
      <span
        className={`font-serif ${sizeClass} text-clinical-deep font-semibold tracking-tight`}
      >
        Inject
      </span>
      <span
        className={`font-serif ${sizeClass} text-charcoal font-semibold tracking-tight`}
      >
        Compass
      </span>
    </span>
  );

  if (!asLink) return inner;
  return (
    <Link href="/" aria-label="InjectCompass — home" className="inline-block">
      {inner}
    </Link>
  );
}
