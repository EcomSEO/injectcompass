import type { ReactNode } from "react";

type Tone = "clinical" | "stone" | "moss" | "amber" | "alert";

export function Eyebrow({
  children,
  tone = "clinical",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const toneClass =
    tone === "stone"
      ? "text-on-dark-faint"
      : tone === "moss"
      ? "text-aqua-deep"
      : tone === "amber"
      ? "text-amber"
      : tone === "alert"
      ? "text-alert"
      : "text-aqua";
  return (
    <span
      className={`inline-block text-eyebrow uppercase font-semibold tracking-wider ${toneClass} ${className}`}
    >
      {children}
    </span>
  );
}
