import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";
import { authors, getAuthor } from "@/lib/content/authors";
import { posts } from "@/lib/content/posts";
import { SITE } from "@/lib/content/site";
import { locales, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  const result: { locale: Locale; slug: string }[] = [];
  for (const locale of locales) {
    for (const a of authors) result.push({ locale, slug: a.slug });
  }
  return result;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return pageMetadata({
    title: `${author.name}, ${author.credentials}`,
    description: `${author.name}, ${author.jobTitle} at InjectCompass. ${author.bio.split(". ")[0]}.`,
    path: `/authors/${author.slug}`,
  });
}

export default async function AuthorBioPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const author = getAuthor(slug);
  if (!author) notFound();

  // Stub: no per-author tagging yet, so we list none rather than guessing.
  // The list will populate once `Post` gains an `authorSlug` field.
  const articles = posts.filter(() => false);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/authors/${author.slug}#person`,
    name: author.name,
    jobTitle: author.jobTitle,
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
    alumniOf: author.alumniOf.map((a) => ({
      "@type": "EducationalOrganization",
      name: a,
    })),
    knowsAbout: author.knowsAbout,
    url: `${SITE.url}/authors/${author.slug}`,
    image: author.image ? `${SITE.url}${author.image}` : undefined,
    sameAs: author.sameAs ?? [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <TrustPageTemplate
        title={author.name}
        eyebrow={`${author.credentials} · ${author.jobTitle}`}
      >
        {author.image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={author.image}
            alt={author.name}
            width={120}
            height={120}
            className="not-prose w-[120px] h-[120px] rounded-pill object-cover border border-rule float-right ml-6 mb-4"
          />
        )}
        <p>{author.bio}</p>

        <h2>Education</h2>
        <ul>
          {author.alumniOf.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>

        <h2>Areas of focus</h2>
        <ul>
          {author.knowsAbout.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>

        <h2>Articles by {author.name.split(" ")[0]}</h2>
        {articles.length === 0 ? (
          <p className="text-[14px] text-charcoal/60">
            Post-level author tagging is rolling out in stages, individual
            article attributions will appear here as the editorial pipeline
            backfills the metadata. In the interim, see the full library
            grouped by topic on the <Link href="/">home page</Link>.
          </p>
        ) : (
          <ul>
            {articles.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`}>{p.title}</Link>
              </li>
            ))}
          </ul>
        )}

        <h2>Disclosures</h2>
        <p>
          {author.name} reports no financial relationships with pharmaceutical
          manufacturers, telehealth clinics, peptide vendors, or compounding
          pharmacies. Editorial standards governing all InjectCompass authors
          are documented at{" "}
          <Link href="/editorial-standards">/editorial-standards</Link>.
        </p>
      </TrustPageTemplate>
    </>
  );
}
