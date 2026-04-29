/**
 * ClinicalRule — signature divider. Solid aqua bar at the left,
 * thin midnight-rule trailing off. Replaces the previous clinical-green
 * with the locked aqua accent for the dark Stitch theme.
 */

export function DotRule({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex items-center gap-3 text-aqua/40 ${className}`}
    >
      <span className="h-px flex-1 bg-aqua/25" />
      <span className="h-1 w-1 rounded-full bg-aqua/70" />
      <span className="h-1 w-1 rounded-full bg-aqua/50" />
      <span className="h-1 w-1 rounded-full bg-aqua/70" />
      <span className="h-px flex-1 bg-aqua/25" />
    </div>
  );
}

export function ThinRule({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`h-px w-full bg-midnight-rule ${className}`} />;
}

export function ClinicalRule({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-3 ${className}`}>
      <span className="h-[3px] w-10 bg-aqua rounded-full" />
      <span className="h-px flex-1 bg-midnight-rule" />
    </div>
  );
}
