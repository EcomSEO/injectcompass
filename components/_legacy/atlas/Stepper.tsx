import Link from "next/link";

/**
 * Stepper, sticky left-rail Previous · Current · Next chapter component.
 * Lives in the atlas chapter shell.
 */

export type StepRef = {
  num: string;
  title: string;
  href: string;
};

export function Stepper({
  prev,
  current,
  next,
  prevLabel = "Previous",
  currentLabel = "You are here",
  nextLabel = "Next",
}: {
  prev?: StepRef;
  current: StepRef;
  next?: StepRef;
  prevLabel?: string;
  currentLabel?: string;
  nextLabel?: string;
}) {
  return (
    <nav className="atlas-stepper space-y-4 sticky top-32" aria-label="Chapter navigation">
      <div className="atlas-mini">Atlas · Chapter rail</div>

      <div className="space-y-3">
        {prev && (
          <Link href={prev.href} className="block atlas-stepper-prev hover:no-underline">
            <div className="atlas-mini text-slate-soft">{prevLabel} · Ch {prev.num}</div>
            <div className="text-ink-deep mt-0.5 leading-snug">{prev.title}</div>
          </Link>
        )}

        <div className="atlas-stepper-current">
          <div className="atlas-mini atlas-label-surgical">
            {currentLabel} · Ch {current.num}
          </div>
          <div className="text-ink-deep mt-0.5 leading-snug font-medium">
            {current.title}
          </div>
        </div>

        {next && (
          <Link href={next.href} className="block atlas-stepper-next hover:no-underline">
            <div className="atlas-mini text-slate-soft">{nextLabel} · Ch {next.num}</div>
            <div className="text-ink-deep mt-0.5 leading-snug">{next.title}</div>
          </Link>
        )}
      </div>
    </nav>
  );
}
