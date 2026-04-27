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
    "The InjectCompass editorial team — staff editors who write, fact-check, and maintain the technique, reconstitution, and patient-safety content on this site.",
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
    <main className="mx-auto max-w-container px-6 py-10 md:py-14">
      <Breadcrumbs
        crumbs={[{ label: "Home", href: "/" }, { label: "Editorial Team" }]}
      />
      <div className="mt-6">
        <Eyebrow tone="clinical">Authors</Eyebrow>
      </div>
      <h1 className="font-serif text-3xl md:text-5xl text-clinical-deep mt-3 leading-[1.08]">
        Editorial Team
      </h1>
      <ClinicalRule className="mt-7" />
      <p className="mt-7 max-w-[68ch] text-[17px] leading-relaxed text-charcoal/90">
        Every article on InjectCompass is written or edited by a named member
        of the editorial team. All drug-specific or technique posts are
        additionally reviewed by the{" "}
        <Link href="/reviewers" className="text-clinical underline">
          medical advisory panel
        </Link>{" "}
        before publication. Our complete process is documented in the{" "}
        <Link href="/editorial-standards" className="text-clinical underline">
          editorial standards
        </Link>
        .
      </p>

      <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none pl-0">
        {authors.map((a) => (
          <li
            key={a.slug}
            className="flex flex-col border border-rule rounded-md p-6 bg-white min-h-[320px]"
          >
            <div className="flex items-center gap-4">
              <div
                aria-hidden
                className="w-16 h-16 rounded-pill shrink-0 border border-rule bg-teal-50 text-teal-700 font-semibold text-[18px] flex items-center justify-center"
              >
                {initials(a.name)}
              </div>
              <div className="min-w-0">
                <h2 className="text-[18px] font-semibold text-ink leading-snug m-0">
                  <Link
                    href={`/authors/${a.slug}`}
                    className="hover:text-teal-700"
                  >
                    {a.name}
                  </Link>
                </h2>
                <div className="text-[13px] text-ink-muted mt-1">
                  {a.credentials}
                </div>
              </div>
            </div>
            <div className="text-[13px] text-ink-muted mt-3 font-medium">
              {a.jobTitle}
            </div>
            <p className="mt-3 text-[14px] text-ink-muted leading-relaxed line-clamp-4">
              {a.bio.split(". ").slice(0, 2).join(". ")}.
            </p>
            <div className="mt-auto pt-4">
              <Link
                href={`/authors/${a.slug}`}
                className="inline-flex items-center gap-1 text-[13px] font-semibold text-teal-700 hover:text-teal-600"
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
