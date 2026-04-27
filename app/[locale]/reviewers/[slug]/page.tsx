import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";
import { reviewers, getReviewer } from "@/lib/content/reviewers";
import { posts } from "@/lib/content/posts";
import { SITE } from "@/lib/content/site";
import { locales, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  const result: { locale: Locale; slug: string }[] = [];
  for (const locale of locales) {
    for (const r of reviewers) result.push({ locale, slug: r.slug });
  }
  return result;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = getReviewer(slug);
  if (!r) return {};
  return pageMetadata({
    title: `${r.name}, ${r.credentials}. Medical Reviewer`,
    description: `${r.name}, ${r.jobTitle}, ${r.medicalSpecialty}. Licensed in ${r.licenseStates.join(", ")}.`,
    path: `/reviewers/${r.slug}`,
  });
}

export default async function ReviewerBioPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const r = getReviewer(slug);
  if (!r) notFound();

  // Stub: per-post reviewer tagging is rolling out incrementally.
  const reviewedArticles = posts.filter(() => false);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/reviewers/${r.slug}#person`,
    name: r.name,
    jobTitle: r.jobTitle,
    medicalSpecialty: r.medicalSpecialty,
    worksFor: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    affiliation: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    alumniOf: r.alumniOf.map((a) => ({
      "@type": "EducationalOrganization",
      name: a,
    })),
    knowsAbout: r.knowsAbout,
    hasCredential: r.licenseStates.map((state) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      recognizedBy: { "@type": "Place", name: `State of ${state}, USA` },
    })),
    url: `${SITE.url}/reviewers/${r.slug}`,
    image: r.image ? `${SITE.url}${r.image}` : undefined,
    sameAs: r.sameAs ?? [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <TrustPageTemplate
        title={`${r.name}, ${r.credentials}`}
        eyebrow={`${r.medicalSpecialty} · Licensed in ${r.licenseStates.join(", ")}`}
      >
        {r.image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={r.image}
            alt={r.name}
            width={120}
            height={120}
            className="not-prose w-[120px] h-[120px] rounded-pill object-cover border border-rule float-right ml-6 mb-4"
          />
        )}
        <p>{r.bio}</p>

        <h2>Education and training</h2>
        <ul>
          {r.alumniOf.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>

        <h2>Areas of clinical focus</h2>
        <ul>
          {r.knowsAbout.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>

        <h2>Licenses</h2>
        <p>
          {r.name} holds an active medical license in:{" "}
          {r.licenseStates.join(", ")}.
        </p>

        <h2>Articles reviewed by {r.name.split(" ").pop()}</h2>
        {reviewedArticles.length === 0 ? (
          <p className="text-[14px] text-charcoal/60">
            Per-article reviewer attributions are being backfilled, they
            will appear here once the full editorial pipeline has tagged each
            <code> medicalDisclaimer: required</code> post with its assigned
            reviewer. In the interim, the reviewer assigned to a given post
            is named in the article header.
          </p>
        ) : (
          <ul>
            {reviewedArticles.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`}>{p.title}</Link>
              </li>
            ))}
          </ul>
        )}

        <h2>Disclosures</h2>
        <p>
          {r.name} reports no financial relationships with pharmaceutical
          manufacturers, telehealth clinics, peptide vendors, or compounding
          pharmacies. The full editorial-review process and disclosure policy
          is documented at{" "}
          <Link href="/editorial-standards">/editorial-standards</Link>.
        </p>
      </TrustPageTemplate>
    </>
  );
}
