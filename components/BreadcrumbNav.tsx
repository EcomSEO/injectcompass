import { Link } from "@/i18n/navigation";
import { canonical } from "@/lib/seo";

export type Crumb = { label: string; href?: string };

/**
 * Healthline-grade breadcrumb. Inline BreadcrumbList JSON-LD as well,
 * lets a single component handle both rendering and SEO emission.
 */
export function BreadcrumbNav({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-[13px] text-ink-muted">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {crumbs.map((c, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {c.href ? (
                <Link href={c.href} className="hover:text-teal-700 transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className="text-ink font-medium" aria-current="page">
                  {c.label}
                </span>
              )}
              {i < crumbs.length - 1 && (
                <span aria-hidden className="text-ink-soft">›</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: crumbs.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.label,
              item: c.href ? canonical(c.href) : undefined,
            })),
          }),
        }}
      />
    </>
  );
}
