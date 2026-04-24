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

  const markSize =
    size === "xl"
      ? "h-10 w-10 md:h-12 md:w-12"
      : size === "lg"
      ? "h-9 w-9 md:h-10 md:w-10"
      : size === "sm"
      ? "h-5 w-5"
      : "h-7 w-7 md:h-8 md:w-8";

  const inner = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/mark.svg"
        alt=""
        aria-hidden
        className={`${markSize} shrink-0 crosshair-calibrate`}
      />
      <span className="inline-flex items-baseline gap-0">
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
    </span>
  );

  if (!asLink) return inner;
  return (
    <Link href="/" aria-label="InjectCompass — home" className="inline-block">
      {inner}
    </Link>
  );
}
