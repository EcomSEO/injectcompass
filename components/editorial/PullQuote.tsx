import type { ReactNode } from "react";

export function PullQuote({
  children,
  attribution,
}: {
  children: ReactNode;
  attribution?: string;
}) {
  return (
    <figure className="my-10 md:my-14 border-l-[3px] border-clinical pl-6 md:pl-10 max-w-2xl">
      <blockquote className="font-serif text-xl md:text-[1.5rem] leading-[1.35] text-clinical-deep italic">
        <span
          aria-hidden
          className="mr-1 font-serif text-clinical/60 text-3xl leading-none align-[-0.2em]"
        >
          “
        </span>
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-3 caps-label">, {attribution}</figcaption>
      )}
    </figure>
  );
}
