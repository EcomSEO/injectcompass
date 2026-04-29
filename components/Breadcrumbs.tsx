import { Link } from "@/i18n/navigation";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-caption num text-on-dark-faint">
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {c.href ? (
              <Link
                href={c.href}
                className="hover:text-aqua transition-colors duration-fast focus-visible:outline-none focus-visible:text-aqua"
              >
                {c.label}
              </Link>
            ) : (
              <span className="text-on-dark">{c.label}</span>
            )}
            {i < crumbs.length - 1 && (
              <span aria-hidden className="text-on-dark-faint/50">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
