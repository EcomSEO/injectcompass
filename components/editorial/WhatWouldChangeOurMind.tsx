import type { ReactNode } from "react";

export function WhatWouldChangeOurMind({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="my-12 relative">
      <div className="flex items-center gap-3 mb-3">
        <span className="h-2 w-2 rounded-full bg-amber" />
        <span className="caps-label text-amber">
          What would revise this page
        </span>
      </div>
      <div className="pl-5 border-l-2 border-amber/50 max-w-prose text-[15.5px] text-charcoal/90 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
