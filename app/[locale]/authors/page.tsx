import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";
import { authors } from "@/lib/content/authors";
import { type Locale } from "@/i18n/routing";

export const metadata: Metadata = pageMetadata({
  title: "Editorial Team",
  description:
    "The InjectCompass editorial team — staff editors who write, fact-check, and maintain the technique, reconstitution, and patient-safety content on this site.",
  path: "/authors",
});

export default async function AuthorsIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <TrustPageTemplate title="Editorial Team" eyebrow="Authors">
      <p>
        Every article on InjectCompass is written or edited by a named member
        of the editorial team. Each author is listed below with credentials,
        specialty, and a link to a full bio that documents training,
        editorial focus, and disclosures.
      </p>
      <p>
        All drug-specific or technique posts are additionally reviewed by the{" "}
        <Link href="/reviewers">medical advisory panel</Link> before
        publication. Our complete process is documented in the{" "}
        <Link href="/editorial-standards">editorial standards</Link>.
      </p>

      <ul className="not-prose mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 list-none pl-0 [&_li]:m-0">
        {authors.map((a) => (
          <li
            key={a.slug}
            className="border border-rule rounded-md p-5 bg-white"
          >
            <div className="flex items-start gap-4">
              {a.image && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={a.image}
                  alt=""
                  aria-hidden
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-pill object-cover shrink-0 border border-rule"
                />
              )}
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
                  {a.credentials} · {a.jobTitle}
                </div>
                <p className="mt-3 text-[14px] text-ink-muted leading-relaxed line-clamp-3">
                  {a.bio.split(". ").slice(0, 2).join(". ")}.
                </p>
                <Link
                  href={`/authors/${a.slug}`}
                  className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-teal-700 hover:text-teal-600"
                >
                  Full bio <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </TrustPageTemplate>
  );
}
