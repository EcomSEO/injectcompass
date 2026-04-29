import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";

export const metadata: Metadata = pageMetadata({
  title: "Methodology, how an InjectCompass article gets written",
  description:
    "How InjectCompass articles are sourced, reviewed, versioned, and retired. The current edition is v1.2.",
  path: "/methodology",
});

export default function MethodologyPage() {
  return (
    <main>
      <div className="border-b border-rule">
        <div className="mx-auto max-w-container px-6 py-4">
          <BreadcrumbNav crumbs={[{ label: "Home", href: "/" }, { label: "Methodology" }]} />
        </div>
      </div>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-container px-6 pt-12 pb-10">
          <div className="max-w-3xl">
            <div className="eyebrow mb-3">Editorial · v1.2</div>
            <h1 className="editorial-h1">
              How an article gets written, reviewed, and retired.
            </h1>
            <p className="mt-5 text-[18px] text-on-dark-muted leading-relaxed">
              The library is only as good as the process behind it. This page
              describes that process in the same level of detail we would
              expect from a journal we relied on for clinical reference.
              Edition v1.2, current as of {new Date().getFullYear()}.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/methodology/v1-2"
                className="inline-flex items-center h-11 px-5 rounded-pill border border-midnight-rule text-ink text-[14px] font-semibold hover:border-aqua hover:text-aqua transition-colors"
              >
                Read v1.2 changelog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-container px-6 py-12">
          <article className="article-prose mx-auto">
            <h2>1. Sourcing</h2>
            <p>
              Every article starts with three sources: the manufacturer
              Instructions for Use for the relevant pen or vial, the most
              recent CDC or WHO injection-safety statement that touches the
              technique, and at least one piece of nursing-education
              literature drawn from peer-reviewed journals. Where an article
              concerns a non-FDA-approved compound, we add a peer-reviewed
              reconstitution-math primer and frame the article as
              research-context only.
            </p>

            <h2>2. Triangulation</h2>
            <p>
              No article publishes on the basis of a single source. We require
              two independent sources to agree on each load-bearing claim. If
              the manufacturer instructions and the nursing-education
              consensus disagree, we follow the manufacturer and flag the
              divergence in the article. If the literature is genuinely
              split, we say so, and we describe both readings.
            </p>

            <h2>3. Drafting</h2>
            <p>
              An article is drafted in the InjectCompass voice, patient-handout
              precision, numbered procedures, no first-person experience
              framing, no claims about subjective effects. Numbers are
              treated as code: any change to a dosage figure or a needle-gauge
              specification triggers a version bump.
            </p>

            <h2>4. Review</h2>
            <p>
              Every article that touches a specific drug or compound is
              reviewed by a credentialed reviewer (MD, RN, NP, or PharmD)
              before it ships. The reviewer&apos;s name, credentials, and the
              date of review appear at the top of the article.
            </p>

            <h2>5. Versioning</h2>
            <p>
              Manufacturer instructions are reissued. Labels are updated.
              When that happens, we version the article, the previous
              version is archived rather than deleted, and the new version
              carries a small note describing what changed and why.
            </p>

            <h2>6. Retirement</h2>
            <p>
              An article is retired when its compound is withdrawn from the
              market, when a manufacturer reissues guidance that supersedes
              the page wholesale, or when the editorial team decides the
              article no longer earns its place in the library. Retired
              articles return a 410 status and link to the most relevant
              replacement.
            </p>

            <h2>References behind this methodology</h2>
            <ol>
              <li>
                Frid AH et al. (2016).{" "}
                <em>
                  New insulin delivery recommendations. Mayo Clinic
                  Proceedings.
                </em>{" "}
               , needle-length and rotation guidance.
              </li>
              <li>
                WHO (2010).{" "}
                <em>
                  Best practices for injections and related procedures toolkit.
                </em>
              </li>
              <li>CDC injection-safety guidance (current edition).</li>
              <li>
                USP &lt;797&gt; Pharmaceutical Compounding. Sterile
                Preparations.
              </li>
            </ol>
          </article>
        </div>
      </section>
    </main>
  );
}
