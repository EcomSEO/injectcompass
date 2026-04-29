import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { ClinicalRule } from "@/components/editorial/DotRule";
import { pageMetadata } from "@/lib/seo";
import { reviewers } from "@/lib/content/reviewers";
import { type Locale } from "@/i18n/routing";

export const metadata: Metadata = pageMetadata({
  title: "Medical Advisory Panel",
  description:
    "The licensed clinicians who medically review InjectCompass content, endocrinology, family medicine, and clinical pharmacy.",
  path: "/reviewers",
});

function initials(name: string) {
  return name
    .replace(/^(Dr\.?|Mr\.?|Ms\.?|Mrs\.?)\s+/i, "")
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function ReviewersIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-container px-6 py-16 md:py-24">
      <Breadcrumbs
        crumbs={[{ label: "Home", href: "/" }, { label: "Medical Advisory Panel" }]}
      />
      <div className="mt-8">
        <Eyebrow tone="clinical">Reviewers</Eyebrow>
      </div>
      <h1 className="font-serif text-display-lg text-on-dark mt-4 leading-[1.08]">
        Medical Advisory Panel
      </h1>
      <ClinicalRule className="mt-8" />
      <p className="mt-8 max-w-[68ch] text-body text-on-dark-muted leading-relaxed">
        Every drug-specific or technique post on InjectCompass is reviewed by a
        licensed clinician before publication. Each reviewer holds an active
        US license, is board-certified, and discloses no financial
        relationships with pharmaceutical manufacturers, telehealth clinics,
        peptide vendors, or compounding pharmacies. Our review process is
        documented in the{" "}
        <Link
          href="/editorial-standards"
          className="text-aqua underline decoration-aqua/40 underline-offset-4 hover:decoration-aqua transition-colors duration-fast"
        >
          editorial standards
        </Link>
        .
      </p>

      <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none pl-0">
        {reviewers.map((r) => (
          <li
            key={r.slug}
            className="flex flex-col border border-midnight-rule rounded-lg p-6 bg-midnight-card hover:border-aqua/40 hover:shadow-dark-elevated transition-all duration-base min-h-[320px]"
          >
            <div className="flex items-center gap-4">
              <div
                aria-hidden
                className="w-16 h-16 rounded-pill shrink-0 border border-aqua/30 bg-midnight-elevated text-aqua font-semibold text-[18px] flex items-center justify-center"
              >
                {initials(r.name)}
              </div>
              <div className="min-w-0">
                <h2 className="text-h4 font-semibold text-on-dark leading-snug m-0">
                  <Link
                    href={`/reviewers/${r.slug}`}
                    className="hover:text-aqua transition-colors duration-fast focus-visible:outline-none focus-visible:text-aqua"
                  >
                    {r.name}, {r.credentials}
                  </Link>
                </h2>
                <div className="text-caption text-on-dark-faint mt-1">
                  {r.medicalSpecialty}
                </div>
              </div>
            </div>
            <div className="text-caption text-on-dark-muted mt-4 font-medium">
              Licensed in {r.licenseStates.join(", ")}
            </div>
            <p className="mt-3 text-body-sm text-on-dark-muted leading-relaxed line-clamp-4">
              {r.bio.split(". ").slice(0, 2).join(". ")}.
            </p>
            <div className="mt-auto pt-5">
              <Link
                href={`/reviewers/${r.slug}`}
                className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-aqua hover:text-aqua-soft transition-colors duration-fast focus-visible:outline-none focus-visible:text-aqua-soft"
              >
                Full bio <span aria-hidden>→</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
