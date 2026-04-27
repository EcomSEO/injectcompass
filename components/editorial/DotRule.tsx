/**
 * Clinical-reference rules. ClinicalRule is the signature divider, a solid
 * blue bar at the left, thin line trailing off. Evokes the header stroke of a
 * patient-information leaflet.
 */

export function DotRule({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex items-center gap-3 text-clinical/40 ${className}`}
    >
      <span className="h-px flex-1 bg-clinical/25" />
      <span className="h-1 w-1 rounded-full bg-clinical/70" />
      <span className="h-1 w-1 rounded-full bg-clinical/50" />
      <span className="h-1 w-1 rounded-full bg-clinical/70" />
      <span className="h-px flex-1 bg-clinical/25" />
    </div>
  );
}

export function ThinRule({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`h-px w-full bg-clinical/15 ${className}`} />;
}

export function ClinicalRule({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-3 ${className}`}>
      <span className="h-[3px] w-10 bg-clinical" />
      <span className="h-px flex-1 bg-clinical/25" />
    </div>
  );
}
