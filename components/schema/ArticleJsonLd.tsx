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
  reviewerName,
  reviewerJobTitle,
  imageUrl,
}: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
  authorJobTitle?: string;
  reviewerName?: string;
  reviewerJobTitle?: string;
  imageUrl?: string;
}) {
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
        author: authorJobTitle
          ? {
              "@type": "Person",
              name: authorName,
              jobTitle: authorJobTitle,
            }
          : {
              "@type": "Organization",
              name: authorName,
              url: SITE.url,
            },
        reviewedBy: reviewerName
          ? {
              "@type": "Person",
              name: reviewerName,
              jobTitle: reviewerJobTitle,
            }
          : undefined,
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
