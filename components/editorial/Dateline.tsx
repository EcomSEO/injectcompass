import { SITE } from "@/lib/content/site";

function currentMonth() {
  const d = new Date();
  return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}

/**
 * The dateline — clinical-reference masthead strip.
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
