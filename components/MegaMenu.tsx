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
            <h3 className="text-eyebrow uppercase text-on-dark-faint mb-4">{col.title}</h3>
            <ul className="space-y-3">
              {col.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[15px] text-on-dark-muted hover:text-aqua transition-colors duration-fast focus-visible:outline-none focus-visible:text-aqua"
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
            className="col-span-3 group block rounded-lg bg-midnight-card border border-midnight-rule p-5 hover:border-aqua/40 hover:shadow-dark-elevated transition-all duration-base focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-deep"
          >
            <div className="aspect-[16/10] rounded-md bg-gradient-to-br from-aqua-deep to-aqua-dim mb-4 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7) 0%, transparent 50%)",
                }}
              />
            </div>
            <div className="text-eyebrow uppercase text-aqua mb-2">{featured.eyebrow}</div>
            <h4 className="text-[16px] font-semibold leading-snug text-on-dark group-hover:text-aqua transition-colors duration-fast">
              {featured.title}
            </h4>
            <p className="mt-2 text-body-sm text-on-dark-muted leading-relaxed line-clamp-2">
              {featured.dek}
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
