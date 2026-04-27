import { TrustPageTemplate } from "./TrustPageTemplate";
import type { PrivacyContent } from "@/lib/content/privacy-policy";

/**
 * Renders a localised legal content document (privacy policy, terms,
 * affiliate disclosure, etc.) inside the existing TrustPageTemplate.
 */
export function LegalContentRenderer({ content }: { content: PrivacyContent }) {
  return (
    <TrustPageTemplate title={content.title}>
      <p className="text-sm text-charcoal/60">{content.lastUpdated}</p>
      <p>{content.intro}</p>
      {content.sections.map((s) => (
        <section key={s.heading}>
          <h2>{s.heading}</h2>
          <p>{s.body}</p>
        </section>
      ))}
    </TrustPageTemplate>
  );
}
