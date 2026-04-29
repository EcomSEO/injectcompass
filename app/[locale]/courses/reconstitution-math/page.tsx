import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Reconstitution Math — Vial → Syringe Without Errors",
  description:
    "$39 lifetime-access course on reconstitution math for compounded GLP-1 and research-peptide protocols. Worked examples, unit conversions, failure modes.",
  path: "/courses/reconstitution-math",
});

export default function ReconstitutionMathPage() {
  return (
    <TrustPageTemplate
      title="Reconstitution Math — Vial → Syringe Without Errors"
      eyebrow="Course · $39 · lifetime access"
    >
      <p>
        Six modules covering reconstitution math for the patient on a
        compounded protocol. The unit-conversion course that prevents
        the most common dose-draw errors — sized to be finishable in
        an evening, with worked examples and a failure-mode section
        per module.
      </p>

      <h2>Modules</h2>
      <ol>
        <li>
          <strong>Why reconstitution math is the highest-risk
          step.</strong> Where dose errors come from, what the
          published case-report literature shows about adverse events
          tied to wrong-volume draws, the 90-second pre-flight check
          that prevents the most common mistakes.
        </li>
        <li>
          <strong>BAC water vs sterile water.</strong> The
          benzyl-alcohol preservation chemistry, the multi-dose-vial
          stability windows, when each diluent is appropriate, why the
          choice matters for storage timing.
        </li>
        <li>
          <strong>Target-concentration math.</strong> mg per mL,
          μg per unit, the unit-conversion ladder that links the
          peptide's milligram label to the U-100 syringe's tick mark.
          Worked examples with the most-cited compound concentrations.
        </li>
        <li>
          <strong>Syringe-unit conversion.</strong> U-100 insulin
          syringes vs 1 mL tuberculin syringes vs 0.3 mL low-dose
          syringes — what the ticks mean, the conversion factor at
          each step, the verification cross-check.
        </li>
        <li>
          <strong>Single-use vs multi-dose vial timing.</strong>{" "}
          When the BAC-water-preserved multi-dose window starts, when
          it expires, the temperature-excursion math, how to log the
          vial-open date so the eighth dose is not the first dose to
          fail.
        </li>
        <li>
          <strong>Failure modes catalogue.</strong> The six most-cited
          dose-draw errors, what each one feels like at the syringe,
          the pre-flight check that catches each, the
          patient-side-effect signal that suggests an error already
          shipped.
        </li>
      </ol>

      <h2>What this course is not</h2>
      <ul>
        <li>
          Not a route to obtain compounded peptides. Course modules
          cite published pharmaceutical-compounding standards (USP
          {"<797>"}, FDA 503A guidance) but do not link to compounding
          pharmacies or peptide vendors.
        </li>
        <li>
          Not a substitute for prescriber + pharmacist guidance. The
          math is auditable; the protocol you are following is the
          prescriber's. Confirm dose-draws with your pharmacist on the
          first reconstitution.
        </li>
      </ul>

      <h2>Enrollment</h2>
      <p>
        Course enrollment opens at public launch. Until then, the{" "}
        <Link href={"/newsletter" as never}>InjectCompass newsletter</Link>{" "}
        is the path to early-access pricing. Cross-enrollment with the{" "}
        <Link
          href={"/courses/injection-technique-masterclass" as never}
        >
          Injection Technique Masterclass
        </Link>{" "}
        is available at a combined price that ships at launch.
      </p>
    </TrustPageTemplate>
  );
}
