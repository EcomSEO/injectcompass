import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";
import { type Locale } from "@/i18n/routing";

export const metadata: Metadata = pageMetadata({
  title: "Corrections Policy",
  description:
    "How InjectCompass handles factual errors — reporting, investigation, dated correction notes, and the public corrections log.",
  path: "/corrections-policy",
});

export default async function CorrectionsPolicyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <TrustPageTemplate title="Corrections Policy" eyebrow="Editorial">
      <p>
        InjectCompass publishes practical, cited educational content about
        injection technique, reconstitution math, and home self-administration
        of prescribed injectable medications. The factual claims on this site
        are checked twice — once by the staff editor who writes the post, and
        once by a member of our medical advisory panel before publication.
        Neither of those passes is infallible. When we are wrong, we correct
        the record in public.
      </p>

      <h2>How to report an error</h2>
      <p>
        Email{" "}
        <a href="mailto:corrections@injectcompass.com">corrections@injectcompass.com</a>{" "}
        with the URL of the page, the specific sentence or table you believe is
        incorrect, and — when possible — a citation we can check (an FDA label,
        a peer-reviewed paper, a USP monograph, a manufacturer document). We
        read every corrections email and we acknowledge receipt within five
        business days.
      </p>

      <h2>How we investigate</h2>
      <ol>
        <li>
          The corrections editor (Maya Koenig, MPH) opens a ticket and pulls
          the source documents the post is based on.
        </li>
        <li>
          If the disputed claim depends on a clinical or pharmaceutical
          interpretation, the relevant member of the medical advisory panel
          reviews — Dr. Rivera for endocrine and prescribing-information
          questions, Dr. Chen for technique and administration questions, Dr.
          Okafor for reconstitution math and pharmacy-compounding questions.
        </li>
        <li>
          We compare the disputed claim against the primary source (FDA label,
          peer-reviewed paper, USP monograph, manufacturer Instructions for
          Use) and form a conclusion.
        </li>
      </ol>

      <h2>How we publish a correction</h2>
      <p>
        If we find an error, we do four things. We correct the text in place,
        we add a dated correction note at the bottom of the post that
        describes what was wrong and what we changed, we update the post&apos;s
        machine-readable <code>updatedAt</code> timestamp, and we add a line
        to the public corrections log at the bottom of this page. We do not
        silently edit content that has been wrong in public.
      </p>

      <h2>Severity tiers</h2>
      <ul>
        <li>
          <strong>Tier 1 — safety-relevant.</strong> An error that could
          influence a reader&apos;s self-administration in a way that could harm
          them: a wrong dose, a wrong angle, a missed contraindication. We
          publish a correction within twenty-four hours of confirmation, and
          we add a banner to the top of the affected page until the correction
          has been live for thirty days.
        </li>
        <li>
          <strong>Tier 2 — factual but not safety-relevant.</strong> A wrong
          date, a misstated trial detail, an incorrectly attributed quotation.
          We publish a correction within five business days of confirmation.
        </li>
        <li>
          <strong>Tier 3 — typo, formatting, broken link.</strong> Fixed in
          the regular maintenance pass. No correction note is required for
          this tier; the change shows in the post&apos;s revision history but not
          in the public log.
        </li>
      </ul>

      <h2>What is not a correction</h2>
      <p>
        Updating a post to reflect newly published evidence is not a
        correction; it is a regular content update. New trial data,
        revisions to FDA labels, new USP monograph editions, and new
        manufacturer Instructions for Use are integrated through our regular
        update cadence and are noted with a fresh <code>updatedAt</code>
        timestamp. Corrections are reserved for content that was incorrect at
        the time of publication.
      </p>

      <h2>Public corrections log</h2>
      <p>
        We publish every Tier 1 and Tier 2 correction here in reverse
        chronological order, with the date, the URL, and a one-sentence
        summary of what changed.
      </p>
      <p className="text-[14px] text-charcoal/60">
        No corrections to date. The log will populate as corrections are
        issued and will remain public for the lifetime of the site.
      </p>

      <p className="text-sm text-charcoal/60">Last updated: April 2026.</p>
    </TrustPageTemplate>
  );
}
