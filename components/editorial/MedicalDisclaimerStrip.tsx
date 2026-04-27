import Link from "next/link";

/**
 * MedicalDisclaimerStrip, full-width strip, always rendered above the
 * masthead. Clinical sites lead with the disclaimer, not bury it. This is
 * deliberate and non-negotiable per CLAUDE.md.
 */
export function MedicalDisclaimerStrip() {
  return (
    <div className="bg-clinical text-paper">
      <div className="mx-auto max-w-6xl px-6 py-2.5 flex flex-col md:flex-row md:items-center md:justify-between gap-1.5 text-[12.5px] leading-snug">
        <p>
          <span className="font-semibold uppercase tracking-[0.12em] text-[11px] mr-2">
            Notice
          </span>
          InjectCompass is educational. We are not a clinic and do not provide
          medical advice. If you are having an emergency, call 911.
        </p>
        <Link
          href="/medical-disclaimer"
          className="underline underline-offset-4 whitespace-nowrap text-[12px] uppercase tracking-[0.12em] opacity-90 hover:opacity-100"
        >
          Full disclaimer →
        </Link>
      </div>
    </div>
  );
}

/**
 * Compact footer variant, still visible, less dominant. Rendered site-wide
 * below the <main>, above the <Footer>.
 */
export function MedicalDisclaimerFooterStrip() {
  return (
    <aside
      aria-label="Medical disclaimer"
      className="bg-clinical-tint border-y border-clinical/25"
    >
      <div className="mx-auto max-w-6xl px-6 py-4 text-[13px] text-charcoal/85 leading-relaxed">
        <strong className="text-clinical-deep">Not medical advice.</strong>{" "}
        Information on InjectCompass is for educational and patient-education
        purposes only. It is not a substitute for your prescriber's
        instructions or the manufacturer package insert that came with your
        medication. If you are having an emergency, call 911.{" "}
        <Link
          href="/medical-disclaimer"
          className="underline text-clinical-deep"
        >
          Read the full medical disclaimer
        </Link>
        .
      </div>
    </aside>
  );
}
