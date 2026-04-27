/**
 * Last-reviewed line — small text-secondary under article meta.
 * Healthline's "Last medically reviewed on April 26, 2026" pattern.
 */
export function LastReviewedLine({ date }: { date: string }) {
  const d = new Date(date);
  const formatted = d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className="text-[13px] text-ink-muted">
      Last medically reviewed on <time dateTime={date}>{formatted}</time>
    </div>
  );
}
