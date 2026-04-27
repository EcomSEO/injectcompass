"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";

/**
 * ScrollReveal, wraps children in an element that gains `.in-view` when it
 * intersects the viewport. Uses IntersectionObserver; fails safe (children
 * stay visible) when the API isn't available or when prefers-reduced-motion
 * is set, the CSS layer already neutralises the reveal transforms in that
 * case, so we simply leave `.in-view` off.
 *
 * Usage:
 *   <ScrollReveal as="section" className="reveal">…</ScrollReveal>
 *   <ScrollReveal className="clinical-rule" />       // animated hairline
 */
export function ScrollReveal({
  as = "div",
  className = "",
  children,
  once = true,
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
  delay,
}: {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("in-view");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (typeof delay === "number" && delay > 0) {
              window.setTimeout(() => {
                entry.target.classList.add("in-view");
              }, delay);
            } else {
              entry.target.classList.add("in-view");
            }
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("in-view");
          }
        }
      },
      { threshold, rootMargin },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [once, threshold, rootMargin, delay]);

  const Tag = as as ElementType;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

/**
 * AnimatedHairline, convenience wrapper for the animated clinical-blue
 * thin rule used throughout the site. Draws from left to right on enter.
 */
export function AnimatedHairline({ className = "" }: { className?: string }) {
  return <ScrollReveal as="span" className={`hairline block ${className}`} />;
}
