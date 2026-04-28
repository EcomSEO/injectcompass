import { SITE } from "@/lib/content/site";
import { canonical } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export function ArticleJsonLd({
  path,
  headline,
  description,
  datePublished,
  dateModified,
  authorName = SITE.author,
  authorJobTitle,
  authorSlug,
  reviewerName,
  reviewerJobTitle,
  reviewerSlug,
  imageUrl,
}: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
  authorJobTitle?: string;
  /** Slug of the author bio page (`/authors/{slug}`). When provided,
   *  emits `author` as an `@id` reference to the canonical Person node. */
  authorSlug?: string;
  reviewerName?: string;
  reviewerJobTitle?: string;
  /** Slug of the reviewer bio page (`/reviewers/{slug}`). When provided,
   *  emits `reviewedBy` as an `@id` reference to the canonical Person node. */
  reviewerSlug?: string;
  imageUrl?: string;
}) {
  const author = authorSlug
    ? { "@id": `${SITE.url}/authors/${authorSlug}#person` }
    : authorJobTitle
      ? {
          "@type": "Person",
          name: authorName,
          jobTitle: authorJobTitle,
        }
      : {
          "@type": "Organization",
          name: authorName,
          url: SITE.url,
        };

  const reviewedBy = reviewerSlug
    ? { "@id": `${SITE.url}/reviewers/${reviewerSlug}#person` }
    : reviewerName
      ? {
          "@type": "Person",
          name: reviewerName,
          jobTitle: reviewerJobTitle,
        }
      : undefined;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline,
        description,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical(path) },
        datePublished,
        dateModified,
        image: imageUrl,
        author,
        reviewedBy,
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
          logo: {
            "@type": "ImageObject",
            url: `${SITE.url}/icon`,
          },
        },
      }}
    />
  );
}
