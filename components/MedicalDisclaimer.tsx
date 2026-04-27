/**
 * Legacy module re-exports.
 *
 * The canonical components live in components/editorial/MedicalDisclaimerStrip.tsx.
 * This file keeps the historical import paths working (layout.tsx + templates).
 */

import { Link } from "@/i18n/navigation";

export { MedicalDisclaimerStrip } from "./editorial/MedicalDisclaimerStrip";
export { MedicalDisclaimerFooterStrip as MedicalDisclaimerFooter } from "./editorial/MedicalDisclaimerStrip";

/**
 * PostReviewStamp — used on drug-specific posts (medicalDisclaimer: "required").
 * The clinical-blue review-note format that opens technique and reconstitution posts.
 */
export function PostReviewStamp({ reviewedOn }: { reviewedOn: string }) {
  const formatted = new Date(reviewedOn).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <aside
      role="note"
      className="my-7 relative bg-clinical-tint/70 border border-clinical/25 rounded-sm overflow-hidden"
    >
      <span
        aria-hidden
        className="absolute top-0 left-0 w-1.5 h-full bg-clinical"
      />
      <div className="pl-6 pr-5 py-4">
        <div className="caps-label text-clinical mb-1">
          Editorial review · {formatted}
        </div>
        <p className="text-[14.5px] text-charcoal/90 leading-relaxed">
          <strong className="text-clinical-deep">
            This is patient-education material.
          </strong>{" "}
          It is not a substitute for your prescriber's instructions or the
          manufacturer package insert. Reviewed by The InjectCompass Editorial
          Team against published nursing-education literature.{" "}
          <Link href="/medical-disclaimer" className="underline text-clinical-deep">
            Full medical disclaimer
          </Link>
          .
        </p>
      </div>
    </aside>
  );
}
