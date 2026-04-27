import { Link } from "@/i18n/navigation";
import type { Hub } from "@/lib/content/hubs";

export function HubCard({ hub, index }: { hub: Hub; index?: number }) {
  return (
    <Link
      href={`/guides/${hub.slug}`}
      className="group block p-6 bg-paper border border-clinical/20 rounded-sm hover:border-clinical/45 transition h-full"
    >
      {typeof index === "number" && (
        <span className="rank-numeral">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <h3 className="font-serif text-xl text-clinical-deep mt-3 mb-2 leading-tight">
        {hub.name}
      </h3>
      <p className="text-sm text-charcoal/75 leading-relaxed">{hub.oneLiner}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-clinical text-xs font-medium uppercase tracking-[0.14em]">
        Open hub <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
