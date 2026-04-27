import type { Metadata } from "next";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Editorial Standards",
  description:
    "Our public-facing editorial policies, sourcing, corrections, medical framing, AI tooling, conflicts of interest.",
  path: "/editorial-standards",
});

export default function EditorialStandardsPage() {
  return (
    <TrustPageTemplate title="Editorial standards">
      <p>
        InjectCompass publishes educational content about GLP-1 medications. The
        reader trust we need to earn is different from other health-adjacent
        sites, so our rules are stricter. Here&apos;s how we work.
      </p>

      <h2>We are not a clinic</h2>
      <p>
        <strong>
          Nothing on this site is medical advice.
        </strong>{" "}
        We describe what studies, FDA labels, manufacturer documents, and
        peer-reviewed papers have published. We do not diagnose, treat, cure,
        or prevent any disease or condition. Always consult your healthcare
        provider before starting, stopping, or changing any medication.
      </p>

      <h2>Sourcing</h2>
      <p>
        Every factual claim about a specific drug, dose, or side effect on this
        site is cited to one of:
      </p>
      <ul>
        <li>An FDA-approved prescribing information document (the label)</li>
        <li>A peer-reviewed trial published in an indexed medical journal</li>
        <li>A manufacturer&apos;s public technical document</li>
        <li>A regulatory or government document (FDA, EMA, CDC, NIH)</li>
      </ul>
      <p>
        For any significant health claim, we prefer two independent sources,
        one primary study plus one regulatory or manufacturer reference. When
        evidence is genuinely mixed, we say so in the text. We don&apos;t pretend to
        have certainty we don&apos;t have.
      </p>

      <h2>Use of generic and brand names</h2>
      <p>
        We always use the generic name alongside the brand name, especially in
        the first mention of a post. &quot;Semaglutide (Ozempic, Wegovy)&quot; and
        &quot;tirzepatide (Mounjaro, Zepbound)&quot;, always both. This is for accuracy
        and for accessibility when readers are comparing what their doctor
        prescribed against what we&apos;ve written.
      </p>

      <h2>No telehealth recommendations</h2>
      <p>
        We describe telehealth options neutrally when relevant. We do not
        recommend specific telehealth providers. We will never link a reader
        to a telehealth clinic for commercial purposes.
      </p>

      <h2>Corrections</h2>
      <p>
        When we&apos;re wrong, we want to know. When we fix a factual error, we:
      </p>
      <ol>
        <li>Correct the text</li>
        <li>Add a dated correction note at the bottom of the post</li>
        <li>Don&apos;t silently edit, the history stays visible</li>
      </ol>
      <p>
        Email corrections to hello@injectcompass.com. We respond within 5 business
        days.
      </p>

      <h2>Conflicts of interest</h2>
      <p>
        InjectCompass does not accept payment from drug manufacturers. InjectCompass does
        not accept payment from telehealth clinics in exchange for editorial
        coverage. When we link to a supplement brand (protein powder,
        electrolytes, fiber) we may earn an affiliate commission, and we
        disclose it on every page where it applies, above the product list, in
        plain English.
      </p>

      <h2>AI and our editorial process</h2>
      <p>
        We use AI tools in parts of our workflow, literature synthesis, draft
        generation, grammar checks, formatting. Every post on this site is
        reviewed, fact-checked, and edited by a human before publication. No
        post is published that hasn&apos;t been through that review.
      </p>
      <p>
        When AI tooling is used in a way that materially shapes a post&apos;s
        conclusions, we say so explicitly.
      </p>

      <h2>Images and privacy</h2>
      <p>
        We do not publish before/after photos, weight-loss numbers, or
        body-focused imagery. These are platform compliance landmines, and
        they invite the wrong reader.
      </p>

      <h2>What we don&apos;t do</h2>
      <ul>
        <li>We don&apos;t accept payment for editorial placement</li>
        <li>We don&apos;t publish content written by drug manufacturers</li>
        <li>We don&apos;t use words like &quot;miracle,&quot; &quot;secret,&quot; or &quot;shocking&quot;</li>
        <li>We don&apos;t write fake urgency, fake scarcity, or fake reviews</li>
        <li>We don&apos;t tell readers to start or stop any medication</li>
      </ul>

      <h2>Country-specific compliance</h2>
      <p>
        InjectCompass operates across 11 EU/EEA markets plus an English
        edition. Each market has its own privacy, cookie, advertising, and
        labelling rules. We maintain dedicated, locale-native pages for each
        of these obligations:
      </p>
      <ul>
        <li><a href="/cookies">Cookie policy</a> &mdash; native-language cookie inventory and consent terms</li>
        <li><a href="/privacy">Privacy policy</a> &mdash; localised per market with the country&apos;s data-protection authority</li>
        <li><a href="/affiliate-disclosure">Affiliate disclosure</a> &mdash; country-mandated label (Werbung, Publicité, Pubblicità, Reklama, Annons, etc.)</li>
        <li>German market only: <a href="/impressum">Impressum</a> per &sect; 5 TMG</li>
      </ul>
      {/* audit-claims:allow — this paragraph documents the audit script. */}
      <p>
        Health claims are filtered against the EFSA register. Forbidden claim
        patterns (treats / cures / prevents disease, plus native equivalents
        in each of our 11 EU/EEA locales) are blocked at pre-commit via{" "}
        <code>scripts/audit-claims.mjs</code>. Sweden-restricted compounds
        (compounded semaglutide, Melanotan I/II, BPC-157, TB-500) are not
        served on the Swedish edition.
      </p>

      <p className="text-sm text-charcoal/60">Last updated: April 2026.</p>
    </TrustPageTemplate>
  );
}
