import type { ReactNode } from "react";

type Variant = "key-takeaway" | "watch-out" | "method" | "our-take";

const config: Record<
  Variant,
  { label: string; border: string; bg: string; dot: string; label_color: string }
> = {
  "key-takeaway": {
    label: "Key takeaway",
    border: "border-clinical",
    bg: "bg-clinical-tint/70",
    dot: "bg-clinical",
    label_color: "text-clinical-deep",
  },
  "watch-out": {
    label: "Watch out",
    border: "border-amber",
    bg: "bg-amber/10",
    dot: "bg-amber",
    label_color: "text-amber",
  },
  method: {
    label: "Method note",
    border: "border-stone",
    bg: "bg-stone/[0.06]",
    dot: "bg-stone",
    label_color: "text-stone",
  },
  "our-take": {
    label: "How we read this",
    border: "border-clinical",
    bg: "bg-paper",
    dot: "bg-clinical",
    label_color: "text-clinical-deep",
  },
};

export function KeyTakeaway({
  variant = "key-takeaway",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}) {
  const c = config[variant];
  return (
    <aside
      className={`my-8 border-l-[3px] ${c.border} ${c.bg} pl-5 pr-5 py-5 rounded-r-sm`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
        <span className={`caps-label ${c.label_color}`}>{title ?? c.label}</span>
      </div>
      <div className="text-[15.5px] text-charcoal/90 leading-relaxed">
        {children}
      </div>
    </aside>
  );
}
