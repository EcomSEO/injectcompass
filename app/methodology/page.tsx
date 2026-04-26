import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ReferenceLeaflet } from "@/components/atlas/ReferenceLeaflet";

export const metadata: Metadata = pageMetadata({
  title: "Methodology — how an atlas chapter gets written",
  description:
    "How InjectCompass chapters are sourced, reviewed, versioned, and retired. The current edition is v1.2.",
  path: "/methodology",
});

export default function MethodologyPage() {
  return (
    <main>
      <section className="border-b border-ink/15 atlas-grid">
        <div className="mx-auto max-w-5xl px-6 pt-16 pb-12 md:pt-20 md:pb-14">
          <div className="atlas-label atlas-label-slate">Editorial · v1.2</div>
          <h1 className="atlas-chapter-numeral mt-2">M</h1>
          <h2 className="atlas-display text-3xl md:text-5xl text-ink-deep mt-4 max-w-3xl">
            How a chapter gets written, reviewed, and retired.
          </h2>
          <p className="mt-6 max-w-2xl text-ink-deep/80 leading-relaxed">
            The atlas is only as good as the process behind it. This page
            describes that process in the same level of detail we would expect
            from a journal we relied on for clinical reference. Edition v1.2,
            current as of {new Date().getFullYear()}.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/methodology/v1-2" className="atlas-btn-ghost">
              Read v1.2 changelog
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/15">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <div className="prose">
            <h2>1 · Sourcing</h2>
            <p>
              Every chapter starts with three sources: the manufacturer
              Instructions for Use for the relevant pen or vial, the most
              recent CDC or WHO injection-safety statement that touches the
              technique, and at least one piece of nursing-education
              literature drawn from peer-reviewed journals. Where a chapter
              concerns a non-FDA-approved compound, we add a peer-reviewed
              reconstitution-math primer and frame the chapter as
              research-context only.
            </p>

            <h2>2 · Triangulation</h2>
            <p>
              No chapter publishes on the basis of a single source. We require
              two independent sources to agree on each load-bearing claim. If
              the manufacturer instructions and the nursing-education
              consensus disagree, we follow the manufacturer and flag the
              divergence in the chapter. If the literature is genuinely split,
              we say so, and we describe both readings.
            </p>

            <h2>3 · Drafting</h2>
            <p>
              A chapter is drafted in the atlas voice — patient-handout
              precision, numbered procedures, no first-person experience
              framing, no claims about subjective effects. Numbers are typeset
              in the technical mono and treated as code: any change to a
              dosage figure or a needle-gauge specification triggers a
              version bump.
            </p>

            <h2>4 · Review</h2>
            <p>
              Until a credentialed reviewer (RN, NP, or PharmD) is on the
              masthead, every chapter is reviewed by the editorial team
              against the cited sources and a peer outside the team. Once the
              named reviewer is in place, their review note appears at the
              top of every technique chapter and on every page that touches a
              specific drug or compound.
            </p>

            <h2>5 · Versioning</h2>
            <p>
              Manufacturer instructions are reissued. Labels are updated.
              When that happens, we version the chapter — the previous
              version is archived rather than deleted, and the new version
              carries a small note describing what changed and why.
            </p>

            <h2>6 · Retirement</h2>
            <p>
              A chapter is retired when its compound is withdrawn from the
              market, when a manufacturer reissues guidance that supersedes
              the page wholesale, or when the editorial team decides the
              chapter no longer earns its place in the atlas. Retired
              chapters return a 410 status and link to the most relevant
              replacement.
            </p>
          </div>

          <ReferenceLeaflet
            title="References · Methodology v1.2"
            caption="The literature behind our process."
            refs={[
              {
                label: "Frid AH et al. (2016). New insulin delivery recommendations. Mayo Clinic Proceedings.",
                detail: "Source for needle-length and rotation guidance.",
              },
              {
                label: "WHO (2010). Best practices for injections and related procedures toolkit.",
              },
              {
                label: "CDC injection-safety guidance (current edition).",
              },
              {
                label: "USP <797> Pharmaceutical Compounding — Sterile Preparations.",
                detail: "Reconstitution-math grounding for compounded preparations.",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
