/**
 * WarningCallout — bordered red callout for safety warnings. Single accent
 * (surgical red) + thin warning icon. Used inline in chapter prose.
 */

import type { ReactNode } from "react";

type Variant = "stop" | "caution" | "note";

const VARIANTS: Record<Variant, { color: string; label: string; icon: ReactNode }> = {
  stop: {
    color: "surgical",
    label: "Stop · seek prescriber",
    icon: <StopIcon />,
  },
  caution: {
    color: "amber",
    label: "Caution",
    icon: <CautionIcon />,
  },
  note: {
    color: "ink",
    label: "Note",
    icon: <NoteIcon />,
  },
};

export function WarningCallout({
  variant = "stop",
  title,
  children,
  refId,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
  refId?: string;
}) {
  const v = VARIANTS[variant];
  const borderColor =
    variant === "stop"
      ? "border-surgical"
      : variant === "caution"
        ? "border-amber"
        : "border-ink";
  const bg =
    variant === "stop"
      ? "bg-surgical/5"
      : variant === "caution"
        ? "bg-amber/5"
        : "bg-ink/5";
  const titleColor =
    variant === "stop"
      ? "text-surgical"
      : variant === "caution"
        ? "text-amber"
        : "text-ink";

  return (
    <aside
      className={`my-6 border ${borderColor} ${bg} border-l-[4px] rounded-sm`}
      role={variant === "stop" ? "alert" : "note"}
    >
      <div className="px-4 md:px-5 py-4">
        <div className={`flex items-center gap-2 ${titleColor} atlas-label`}>
          <span aria-hidden>{v.icon}</span>
          <span>{title ?? v.label}</span>
          {refId && (
            <span className="ml-auto text-xs num text-slate">{refId}</span>
          )}
        </div>
        <div className="mt-2 text-ink-deep text-[15px] leading-relaxed">
          {children}
        </div>
      </div>
    </aside>
  );
}

function StopIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <polygon points="2.5,4 4,2.5 10,2.5 11.5,4 11.5,10 10,11.5 4,11.5 2.5,10" />
      <line x1="7" y1="4.5" x2="7" y2="8" />
      <circle cx="7" cy="9.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
function CautionIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <polygon points="7,1.5 12.5,11.5 1.5,11.5" />
      <line x1="7" y1="5.5" x2="7" y2="8.5" />
      <circle cx="7" cy="10" r="0.5" fill="currentColor" />
    </svg>
  );
}
function NoteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="7" cy="7" r="5.5" />
      <line x1="7" y1="6" x2="7" y2="10" />
      <circle cx="7" cy="4.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
