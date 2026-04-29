import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Courses",
  description:
    "Paid mini-courses from InjectCompass. Lifetime access, no subscription, no peptide-vendor cross-sell.",
  path: "/courses",
});

/**
 * Courses index — Phase 7.5 monetization scaffold per
 * 03-injectcompass.md. Two paid mini-courses scaffolded with
 * placeholder enrollment copy; course content ships in Phase 8
 * alongside content production.
 *
 * Hard rule (per MONETIZATION-MODEL.md § "Peptide trio — pre-shop"):
 * the only revenue surfaces on injectcompass are courses, premium
 * newsletter tier, the allowed-list affiliate registry, and the
 * owned-shop pre-launch waitlist. NO peptide vendors. NO telehealth.
 */
const COURSES: Array<{
  slug: string;
  title: string;
  price: string;
  oneLine: string;
  body: string;
}> = [
  {
    slug: "injection-technique-masterclass",
    title: "Injection Technique Masterclass",
    price: "$49 · lifetime access",
    oneLine:
      "The procedural primer that takes a first-time injector from anxiety to competence in one sitting.",
    body: "Eight modules covering the three documented subcutaneous zones, gauge / length selection, the pinch-versus-stretch decision, the 90-degree-versus-45-degree call, dose-dial confirmation on each major pen platform (Ozempic, Wegovy, Mounjaro, Zepbound), the after-injection care that prevents lipohypertrophy, and the red-flag list every patient should screen for in the first 24 hours.",
  },
  {
    slug: "reconstitution-math",
    title: "Reconstitution Math: Vial → Syringe Without Errors",
    price: "$39 · lifetime access",
    oneLine:
      "The unit-conversion course that prevents the most common reconstitution mistakes.",
    body: "Covers BAC water vs sterile water selection, target concentration calculations, syringe-unit conversion across U-100 and 1 mL syringes, dose-draw verification, single- vs multi-dose vial timing, post-reconstitution storage windows. Worked examples with the most-cited compound concentrations and the failure modes the math is designed to prevent.",
  },
];

export default function CoursesIndexPage() {
  return (
    <TrustPageTemplate title="Courses" eyebrow="Education">
      <p>
        Two paid mini-courses sit alongside the free InjectCompass
        editorial library. They are the deeper pass on the procedures
        the free posts introduce — for readers who want a structured
        hour rather than a search-and-skim.
      </p>
      <p>
        Lifetime access. One-time payment, no subscription. The
        content is the same evidence-cited material as the editorial
        library; the courses are paid because they aggregate the
        per-procedure content into a single sequential walkthrough
        with worked examples.
      </p>

      <h2>Available courses</h2>
      <ul>
        {COURSES.map((c) => (
          <li key={c.slug}>
            <Link href={("/courses/" + c.slug) as never}>{c.title}</Link>
            {" — "}
            <span>{c.price}</span>. {c.oneLine}
          </li>
        ))}
      </ul>

      <h2>What we will not do</h2>
      <ul>
        <li>
          Sell prescriptions, telehealth referrals, or pharmacy partner
          codes alongside any course.
        </li>
        <li>
          Recommend a specific peptide vendor or compounding pharmacy
          inside any course module.
        </li>
        <li>
          Use the course email list for retargeted advertising. The
          list is editorial-only; subscribers can unsubscribe one click.
        </li>
      </ul>

      <h2>Why we charge</h2>
      <p>
        The free editorial library covers the procedural ground at a
        level any patient can search and skim. The paid courses fund
        the editorial team, the reviewer panel, the credentialing
        verification, and the methodology updates we publish on the
        free side. They are also the bridge revenue that lets us avoid
        peptide-vendor and telehealth affiliate revenue on the rest of
        the site — see{" "}
        <Link href={"/affiliate-disclosure" as never}>
          Affiliate disclosure
        </Link>{" "}
        for the full categories list.
      </p>
    </TrustPageTemplate>
  );
}
