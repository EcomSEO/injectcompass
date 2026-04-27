import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";
import { reviewers } from "@/lib/content/reviewers";
import { type Locale } from "@/i18n/routing";

export const metadata: Metadata = pageMetadata({
  title: "Medical Advisory Panel",
  description:
    "The licensed clinicians who medically review InjectCompass content — endocrinology, family medicine, and clinical pharmacy.",
  path: "/reviewers",
});

export default async function ReviewersIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <TrustPageTemplate
      title="Medical Advisory Panel"
      eyebrow="Reviewers"
    >
      <p>
        Every drug-specific or technique post on InjectCompass — anything
        marked <code>medicalDisclaimer: required</code> — is reviewed by a
        licensed clinician on our medical advisory panel before publication.
        The reviewer&apos;s name, credentials, and review date appear at the top
        of the article, and a JSON-LD <code>reviewedBy</code> assertion is
        emitted in the page schema.
      </p>
      <p>
        Each reviewer below holds an active license in at least one US state,
        is board-certified in their stated specialty, and discloses no
        financial relationships with pharmaceutical manufacturers, telehealth
        clinics, peptide vendors, or compounding pharmacies. Our complete
        review process is documented in the{" "}
        <Link href="/editorial-standards">editorial standards</Link>.
      </p>

      <ul className="not-prose mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 list-none pl-0 [&_li]:m-0">
        {reviewers.map((r) => (
          <li
            key={r.slug}
            className="border border-rule rounded-md p-5 bg-white"
          >
            <div className="flex items-start gap-4">
              {r.image && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={r.image}
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
                    href={`/reviewers/${r.slug}`}
                    className="hover:text-teal-700"
                  >
                    {r.name}, {r.credentials}
                  </Link>
                </h2>
                <div className="text-[13px] text-ink-muted mt-1">
                  {r.medicalSpecialty} · Licensed in {r.licenseStates.join(", ")}
                </div>
                <p className="mt-3 text-[14px] text-ink-muted leading-relaxed line-clamp-3">
                  {r.bio.split(". ").slice(0, 2).join(". ")}.
                </p>
                <Link
                  href={`/reviewers/${r.slug}`}
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
