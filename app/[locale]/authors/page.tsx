import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { ClinicalRule } from "@/components/editorial/DotRule";
import { pageMetadata } from "@/lib/seo";
import { authors } from "@/lib/content/authors";
import { type Locale } from "@/i18n/routing";

export const metadata: Metadata = pageMetadata({
  title: "Editorial Team",
  description:
    "The InjectCompass editorial team, staff editors who write, fact-check, and maintain the technique, reconstitution, and patient-safety content on this site.",
  path: "/authors",
});

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function AuthorsIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-container px-6 py-16 md:py-24">
      <Breadcrumbs
        crumbs={[{ label: "Home", href: "/" }, { label: "Editorial Team" }]}
      />
      <div className="mt-8">
        <Eyebrow tone="clinical">Authors</Eyebrow>
      </div>
      <h1 className="font-serif text-display-lg text-on-dark mt-4 leading-[1.08]">
        Editorial Team
      </h1>
      <ClinicalRule className="mt-8" />
      <p className="mt-8 max-w-[68ch] text-body text-on-dark-muted leading-relaxed">
        Every article on InjectCompass is written or edited by a named member
        of the editorial team. All drug-specific or technique posts are
        additionally reviewed by the{" "}
        <Link
          href="/reviewers"
          className="text-aqua underline decoration-aqua/40 underline-offset-4 hover:decoration-aqua transition-colors duration-fast"
        >
          medical advisory panel
        </Link>{" "}
        before publication. Our complete process is documented in the{" "}
        <Link
          href="/editorial-standards"
          className="text-aqua underline decoration-aqua/40 underline-offset-4 hover:decoration-aqua transition-colors duration-fast"
        >
          editorial standards
        </Link>
        .
      </p>

      <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none pl-0">
        {authors.map((a) => (
          <li
            key={a.slug}
            className="flex flex-col border border-midnight-rule rounded-lg p-6 bg-midnight-card hover:border-aqua/40 hover:shadow-dark-elevated transition-all duration-base min-h-[320px]"
          >
            <div className="flex items-center gap-4">
              <div
                aria-hidden
                className="w-16 h-16 rounded-pill shrink-0 border border-aqua/30 bg-midnight-elevated text-aqua font-semibold text-[18px] flex items-center justify-center"
              >
                {initials(a.name)}
              </div>
              <div className="min-w-0">
                <h2 className="text-h4 font-semibold text-on-dark leading-snug m-0">
                  <Link
                    href={`/authors/${a.slug}`}
                    className="hover:text-aqua transition-colors duration-fast focus-visible:outline-none focus-visible:text-aqua"
                  >
                    {a.name}
                  </Link>
                </h2>
                <div className="text-caption text-on-dark-faint mt-1">
                  {a.credentials}
                </div>
              </div>
            </div>
            <div className="text-caption text-on-dark-muted mt-4 font-medium">
              {a.jobTitle}
            </div>
            <p className="mt-3 text-body-sm text-on-dark-muted leading-relaxed line-clamp-4">
              {a.bio.split(". ").slice(0, 2).join(". ")}.
            </p>
            <div className="mt-auto pt-5">
              <Link
                href={`/authors/${a.slug}`}
                className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-aqua hover:text-aqua-soft transition-colors duration-fast focus-visible:outline-none focus-visible:text-aqua-soft"
              >
                Read articles by {a.name.split(" ")[0]}{" "}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
