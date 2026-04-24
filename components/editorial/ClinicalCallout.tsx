"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * ClinicalCallout — InjectCompass safety-callout system.
 *
 *   variant="stop"  — red. Stop-and-call-your-prescriber. Specific symptoms.
 *   variant="tip"   — moss/sage. "A nurse-educator note." Helpful context.
 *   variant="check" — stone. "When in doubt, check." Measured caution.
 *   variant="caution" — amber. Pause-and-check. A documented edge case.
 *
 * The "stop" variant is additionally wired to flash its border once, at 0.6s,
 * the first time it enters the viewport. Subsequent scrolls do nothing — the
 * reader has already seen it. Respects prefers-reduced-motion (CSS neutralises
 * the animation).
 */

type Variant = "stop" | "tip" | "check" | "caution";

const config: Record<
  Variant,
  {
    label: string;
    border: string;
    bg: string;
    label_color: string;
    dot: string;
    icon: ReactNode;
  }
> = {
  stop: {
    label: "Stop and call your prescriber if…",
    border: "border-alert",
    bg: "bg-alert/[0.06]",
    label_color: "text-alert",
    dot: "bg-alert",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
        className="text-alert"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="13" />
        <circle cx="12" cy="16.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  caution: {
    label: "Pause and check",
    border: "border-amber",
    bg: "bg-amber/10",
    label_color: "text-amber",
    dot: "bg-amber",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
        className="text-amber"
      >
        <path d="M12 3L22 20H2L12 3Z" />
        <line x1="12" y1="10" x2="12" y2="14" />
        <circle cx="12" cy="17" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  tip: {
    label: "A note from the nurse-educator literature",
    border: "border-moss",
    bg: "bg-moss/[0.08]",
    label_color: "text-moss",
    dot: "bg-moss",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
        className="text-moss"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 7v1M12 11v5" />
      </svg>
    ),
  },
  check: {
    label: "When in doubt",
    border: "border-stone",
    bg: "bg-stone/[0.06]",
    label_color: "text-stone",
    dot: "bg-stone",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
        className="text-stone"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9 9a3 3 0 1 1 3 3v2" />
        <circle cx="12" cy="17" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
};

export function ClinicalCallout({
  variant = "tip",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}) {
  const c = config[variant];
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (variant !== "stop") return;
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view-once");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [variant]);

  const stopClass = variant === "stop" ? "callout-stop" : "";

  return (
    <aside
      ref={ref}
      role="note"
      className={`my-7 border-l-[3px] ${c.border} ${c.bg} pl-5 pr-5 py-5 rounded-r-sm ${stopClass}`}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <span className="shrink-0">{c.icon}</span>
        <span className={`caps-label ${c.label_color}`}>
          {title ?? c.label}
        </span>
      </div>
      <div className="text-[15.5px] text-charcoal/90 leading-relaxed">
        {children}
      </div>
    </aside>
  );
}
