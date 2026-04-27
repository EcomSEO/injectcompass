import Image from "next/image";

/**
 * ArticleThumb — renders a real editorial photograph when `imageUrl` is
 * provided, otherwise falls back to a deterministic teal gradient with a
 * subtle anatomical-line motif so cards don't look broken.
 *
 * The image fill mode + 16:10 / 5:3 wrapper aspect-ratio is owned by the
 * parent so this component is pure layout-friendly.
 */
export function ArticleThumb({
  seed = "",
  className = "",
  variant = "card",
  imageUrl,
  alt = "",
  priority = false,
  sizes,
}: {
  seed?: string;
  className?: string;
  variant?: "card" | "hero";
  imageUrl?: string | null;
  alt?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (imageUrl) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes={
            sizes ??
            (variant === "hero"
              ? "(min-width: 768px) 600px, 100vw"
              : "(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw")
          }
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  // Fallback: deterministic teal gradient with anatomical motif.
  const hash = Array.from(seed).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const angle = (hash % 8) * 12;
  const blob = (hash % 4) + 1;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background:
          variant === "hero"
            ? `linear-gradient(135deg, #0A6F61 0%, #0E8A7A 60%, #1FA28E 100%)`
            : `linear-gradient(${135 + angle}deg, #08594E 0%, #0E8A7A 65%, #2BB8A0 100%)`,
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 mix-blend-overlay opacity-25"
        style={{
          backgroundImage: `radial-gradient(circle at ${20 + blob * 10}% ${30 + blob * 6}%, rgba(255,255,255,0.7) 0%, transparent 45%), radial-gradient(circle at ${80 - blob * 8}% ${70 - blob * 5}%, rgba(0,0,0,0.3) 0%, transparent 40%)`,
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 200 125"
        preserveAspectRatio="none"
        fill="none"
        stroke="white"
        strokeWidth="0.6"
      >
        <path d={`M0 ${60 + blob * 4} Q ${50 + blob * 6} ${30 - blob * 2}, 100 ${55 + blob * 3} T 200 ${50 + blob * 5}`} />
        <path d={`M0 ${80} Q ${50} ${50 + blob * 5}, 100 ${75 + blob * 2} T 200 ${70}`} opacity="0.6" />
      </svg>
    </div>
  );
}
