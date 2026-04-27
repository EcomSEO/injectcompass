/**
 * TechniqueChecklist — numbered procedural list with surgical-red numbered
 * chips per step and checkbox-style markers. Used inside chapter prose for
 * step-numbered procedures.
 */

export type ChecklistStep = {
  title: string;
  detail?: string;
  caution?: string;
};

export function TechniqueChecklist({
  steps,
  title = "Procedure",
  refLabel = "Proc. 04.A",
}: {
  steps: ChecklistStep[];
  title?: string;
  refLabel?: string;
}) {
  return (
    <section className="border border-ink/25 bg-paper rounded-sm overflow-hidden my-8">
      <div className="ref-strip">
        <span>{refLabel}</span>
        <span>{title}</span>
      </div>
      <ol className="divide-y divide-ink/10">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-4 px-4 md:px-6 py-4">
            <span
              className="atlas-marker mt-1 shrink-0 num"
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <div className="atlas-display text-ink-deep text-base md:text-lg">
                {step.title}
              </div>
              {step.detail && (
                <p className="text-slate text-sm leading-relaxed mt-1.5">
                  {step.detail}
                </p>
              )}
              {step.caution && (
                <p className="text-surgical text-xs mt-2 atlas-mini">
                  Caution · {step.caution}
                </p>
              )}
            </div>
            {/* Checkbox-style marker on the right */}
            <span
              aria-hidden
              className="mt-1 shrink-0 w-5 h-5 border border-ink/40 rounded-sm"
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
