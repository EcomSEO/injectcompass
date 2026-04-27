import { Link } from "@/i18n/navigation";

export type MegaMenuColumn = {
  title: string;
  items: { label: string; href: string }[];
};

type Featured = {
  eyebrow: string;
  title: string;
  href: string;
  dek: string;
};

/**
 * MegaMenu — Healthline-style three-column category list with an
 * optional 4th column featuring a single hero article tile.
 */
export function MegaMenu({
  columns,
  featured,
}: {
  columns: MegaMenuColumn[];
  featured?: Featured;
}) {
  return (
    <div className="mx-auto max-w-container px-6 py-10">
      <div className="grid grid-cols-12 gap-8">
        {columns.map((col) => (
          <div key={col.title} className={featured ? "col-span-3" : "col-span-4"}>
            <h3 className="eyebrow mb-4">{col.title}</h3>
            <ul className="space-y-3">
              {col.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[15px] text-ink hover:text-teal-700 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {featured && (
          <Link
            href={featured.href}
            className="col-span-3 group block rounded-md bg-surface-alt border border-rule p-5 hover:shadow-card transition-shadow"
          >
            <div className="aspect-[16/10] rounded-sm bg-gradient-to-br from-teal-500 to-teal-700 mb-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7) 0%, transparent 50%)",
                }}
              />
            </div>
            <div className="eyebrow mb-2">{featured.eyebrow}</div>
            <h4 className="text-[16px] font-semibold leading-snug text-ink group-hover:text-teal-700 transition-colors">
              {featured.title}
            </h4>
            <p className="mt-2 text-[13px] text-ink-muted leading-relaxed line-clamp-2">
              {featured.dek}
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
