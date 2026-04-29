import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Injection Technique Masterclass",
  description:
    "$49 lifetime-access course covering subcutaneous-injection technique end to end. The procedural primer for first-time GLP-1 patients.",
  path: "/courses/injection-technique-masterclass",
});

export default function MasterclassPage() {
  return (
    <TrustPageTemplate
      title="Injection Technique Masterclass"
      eyebrow="Course · $49 · lifetime access"
    >
      <p>
        Eight modules covering subcutaneous-injection technique end to
        end — for the first-time GLP-1 patient who wants more than the
        five-minute clinic walkthrough and less than a nursing-school
        textbook. Approximately 90 minutes of structured material plus
        per-module FAQ.
      </p>

      <h2>Modules</h2>
      <ol>
        <li>
          <strong>Pre-injection setup.</strong> Hand hygiene, surface
          prep, supply checklist, medication inspection. The seven
          things that go wrong before the needle ever leaves the
          packaging.
        </li>
        <li>
          <strong>Site selection.</strong> The three documented
          subcutaneous zones (abdomen, anterolateral thigh, posterior
          upper arm) per Frid et al. 2016 — when each is appropriate,
          when each is contraindicated, the rotation log that prevents
          lipohypertrophy.
        </li>
        <li>
          <strong>Gauge and length.</strong> 32G × 4 mm vs 31G × 5 mm
          vs longer needles in lean individuals. The dose-completion
          data behind the 5–10-second-dwell rule.
        </li>
        <li>
          <strong>Pinch vs stretch.</strong> The two-finger pinch
          described in the Forum for Injection Technique
          recommendations, and when stretching is appropriate instead.
        </li>
        <li>
          <strong>Pen-platform walkthrough.</strong> Ozempic, Wegovy,
          Mounjaro, Zepbound — dose-dial confirmation, prime step,
          dose delivery, the 5–10-second dwell. What changes between
          platforms and what stays the same.
        </li>
        <li>
          <strong>Reconstitution flow (vial-and-syringe arm).</strong>{" "}
          For the patients on compounded protocols — BAC-water draw,
          target concentration, syringe-unit conversion. Cross-links
          to the Reconstitution Math course for the full math arc.
        </li>
        <li>
          <strong>After-injection care.</strong> What is normal in the
          first 24 hours, what to record in the site log, what
          patient-experience reports tell us about the
          first-eight-weeks course.
        </li>
        <li>
          <strong>Red-flag list.</strong> The CDC + IDSA-derived
          list of injection-site signals that warrant same-day
          prescriber contact, the anaphylaxis warning signs in the
          GLP-1 prescribing information, the lipohypertrophy
          progression patterns to escalate.
        </li>
      </ol>

      <h2>What this course is not</h2>
      <ul>
        <li>
          Not a prescription tool. We do not advise on whether a
          medication is right for you — that is your prescriber.
        </li>
        <li>
          Not a route to obtain medication. Course modules cite
          published prescribing information and trial protocols; they
          do not link to telehealth providers, compounded-pharmacy
          retailers, or peptide vendors.
        </li>
        <li>
          Not a replacement for the in-clinic walkthrough. The course
          complements the prescriber's instructions; it does not
          override them.
        </li>
      </ul>

      <h2>Enrollment</h2>
      <p>
        Course enrollment opens at public launch. Until then, the{" "}
        <Link href={"/newsletter" as never}>InjectCompass newsletter</Link>{" "}
        is the path to early-access pricing. No pre-orders, no
        subscriptions; you pay once when the course ships, and access
        is lifetime.
      </p>
    </TrustPageTemplate>
  );
}
