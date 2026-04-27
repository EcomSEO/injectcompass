/**
 * ArticleThumb — gradient placeholder used when we don't have a real photo.
 * Renders a deterministic teal gradient with a subtle anatomical-line motif
 * so cards don't look broken before art is added.
 */
export function ArticleThumb({
  seed = "",
  className = "",
  variant = "card",
}: {
  seed?: string;
  className?: string;
  variant?: "card" | "hero";
}) {
  // Deterministic hue rotation based on slug seed.
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
      {/* Faint anatomical sweep */}
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
