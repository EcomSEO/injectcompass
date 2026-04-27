import { SITE } from "@/lib/content/site";

function currentMonth() {
  // SITE.issueMonth is the canonical published-issue month; using `new Date()`
  // here would give different output on SSR vs client (and across deploy
  // boundaries), causing React #418/#423 hydration warnings.
  return SITE.issueMonth ?? "April 2026";
}

/**
 * The dateline, clinical-reference masthead strip.
 * Reads like "COMPASS · REFERENCE NO. 01 · APRIL 2026 · INJECTCOMPASS.COM".
 */
export function Dateline({ className = "" }: { className?: string }) {
  const host = SITE.url.replace(/^https?:\/\//, "");
  return (
    <div className={`dateline flex items-center gap-3 flex-wrap ${className}`}>
      <span>Compass</span>
      <span aria-hidden className="text-clinical/40">·</span>
      <span>{SITE.issue}</span>
      <span aria-hidden className="text-clinical/40">·</span>
      <span>{currentMonth()}</span>
      <span aria-hidden className="text-clinical/40">·</span>
      <span>{host}</span>
    </div>
  );
}
