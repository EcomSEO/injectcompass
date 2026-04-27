import { SITE } from "@/lib/content/site";
import { canonical } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

/**
 * MedicalWebPage JSON-LD with lastReviewed + medicalAudience.
 * Emit once per medical article alongside Article JSON-LD.
 */
export function MedicalWebPageJsonLd({
  path,
  headline,
  description,
  lastReviewed,
  reviewerName,
  reviewerCredentials,
  about,
}: {
  path: string;
  headline: string;
  description: string;
  lastReviewed: string;
  reviewerName?: string;
  reviewerCredentials?: string;
  about?: string;
}) {
  const url = canonical(path);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        url,
        name: headline,
        description,
        lastReviewed,
        about: about ? { "@type": "MedicalCondition", name: about } : undefined,
        medicalAudience: [
          { "@type": "MedicalAudience", audienceType: "Patient" },
          { "@type": "MedicalAudience", audienceType: "Caregiver" },
        ],
        reviewedBy: reviewerName
          ? {
              "@type": "Person",
              name: reviewerName,
              jobTitle: reviewerCredentials,
            }
          : undefined,
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
        },
      }}
    />
  );
}
