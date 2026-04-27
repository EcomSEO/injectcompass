import Image from "next/image";
import {
  DRUGS,
  licenseLabel,
  licenseUrl,
  type DrugImage as DrugImageData,
} from "@/lib/content/drug-images";

type Size = "sm" | "md" | "lg";

const DIMENSIONS: Record<Size, { width: number; height: number; sizes: string }> = {
  sm: {
    width: 200,
    height: 150,
    sizes: "(min-width: 768px) 200px, 50vw",
  },
  md: {
    width: 400,
    height: 300,
    sizes: "(min-width: 768px) 400px, 100vw",
  },
  lg: {
    width: 800,
    height: 600,
    sizes: "(min-width: 1024px) 800px, 100vw",
  },
};

export type DrugImageProps = {
  /** Slug from the DRUGS manifest, e.g. "ozempic", "mounjaro", "bpc-157" */
  drugSlug: string;
  /** Render size (default "md") */
  size?: Size;
  /** Whether to render the figcaption (default true; legally meaningful) */
  showCaption?: boolean;
  /** If true, eager-load (use only for above-the-fold hero placement) */
  priority?: boolean;
  /** Optional className for the outer figure */
  className?: string;
};

/**
 * DrugImage — renders a license-compliant drug product photo or chemical-
 * structure SVG sourced from Wikimedia Commons. Returns null if the slug is
 * not in the manifest (so the call site never errors at runtime).
 *
 * Caption is legally meaningful: it carries the attribution + license link +
 * "Editorial use for educational purposes only" notice that protects our
 * editorial / fair-use posture for trademarked product imagery. Do not strip
 * the caption.
 *
 * Usage:
 *   import { DrugImage } from "@/components/DrugImage";
 *   <DrugImage drugSlug="ozempic" size="md" />
 */
export function DrugImage({
  drugSlug,
  size = "md",
  showCaption = true,
  priority = false,
  className = "",
}: DrugImageProps) {
  const drug: DrugImageData | undefined = DRUGS[drugSlug];
  if (!drug) return null;

  const dim = DIMENSIONS[size];
  const isStructure = drug.source === "structure-svg";

  // For structure SVGs we render contained on a paper background so the
  // skeletal lines stay legible; for product photos we use object-cover.
  const fitClass = isStructure
    ? "object-contain bg-[#F5F1E8] p-3"
    : "object-cover bg-[#F5F1E8]";

  const lUrl = licenseUrl(drug.license);
  const lLabel = licenseLabel(drug.license);
  const sourceLabel =
    drug.source === "structure-svg" || drug.source === "wikipedia"
      ? "Wikimedia Commons / Wikipedia"
      : "Wikimedia Commons";

  return (
    <figure
      className={`drug-figure my-6 overflow-hidden rounded-lg border border-stone-200 bg-white ${className}`}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: `${dim.width} / ${dim.height}` }}
      >
        <Image
          src={drug.imagePath}
          alt={drug.altText}
          fill
          sizes={dim.sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={fitClass}
          unoptimized={isStructure && drug.imagePath.endsWith(".svg")}
        />
      </div>

      {showCaption ? (
        <figcaption className="px-4 py-3 text-xs leading-relaxed text-stone-700">
          <div className="mb-1">
            <strong className="font-semibold text-stone-900">
              {drug.brandName}
            </strong>
            {drug.genericName ? (
              <span className="text-stone-600">
                {" "}
                — {drug.genericName}
              </span>
            ) : null}
            {drug.manufacturer ? (
              <span className="text-stone-500"> · {drug.manufacturer}</span>
            ) : null}
          </div>

          {drug.caption ? (
            <div className="mb-1 text-stone-700">{drug.caption}</div>
          ) : null}

          <div className="text-stone-500">
            Image:{" "}
            <a
              href={drug.sourceUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="underline decoration-stone-300 underline-offset-2 hover:text-stone-700"
            >
              {drug.attribution || "Unknown"}
            </a>{" "}
            via {sourceLabel}
            {" ("}
            {lUrl ? (
              <a
                href={lUrl}
                target="_blank"
                rel="noopener noreferrer license nofollow"
                className="underline decoration-stone-300 underline-offset-2 hover:text-stone-700"
              >
                {lLabel}
              </a>
            ) : (
              <span>{lLabel}</span>
            )}
            {"). "}
            <span className="italic">
              Editorial use for educational purposes only.
            </span>
          </div>
        </figcaption>
      ) : null}
    </figure>
  );
}

export default DrugImage;
