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
      ? "text-stone"
      : tone === "moss"
      ? "text-moss"
      : tone === "amber"
      ? "text-amber"
      : tone === "alert"
      ? "text-alert"
      : "text-clinical";
  return <span className={`eyebrow ${toneClass} ${className}`}>{children}</span>;
}
