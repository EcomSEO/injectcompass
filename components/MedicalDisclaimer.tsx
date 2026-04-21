import Link from "next/link";

export function MedicalDisclaimerFooter() {
  return (
    <div className="bg-sage/10 border-t border-sage/20">
      <div className="mx-auto max-w-6xl px-6 py-4 text-xs text-charcoal/80 leading-relaxed">
        <strong className="text-pine">Not medical advice.</strong>{" "}
        Information on InjectCompass is for educational purposes only. Always consult
        your healthcare provider before starting, stopping, or changing any
        medication. See our{" "}
        <Link href="/medical-disclaimer" className="underline">
          full medical disclaimer
        </Link>
        .
      </div>
    </div>
  );
}

export function PostReviewStamp({ reviewedOn }: { reviewedOn: string }) {
  const formatted = new Date(reviewedOn).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <aside
      role="note"
      className="my-6 px-4 py-3 border-l-4 border-coral bg-coral/5 text-sm text-charcoal/90"
    >
      <strong className="text-pine">
        Reviewed by The InjectCompass Editorial Team · {formatted}
      </strong>
      <p className="mt-1 text-charcoal/80">
        This post is for informational purposes only and is not medical advice.
        Always discuss any changes to your treatment with your healthcare
        provider.
      </p>
    </aside>
  );
}
