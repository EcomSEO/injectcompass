/**
 * Methodology block — InjectCompass wedge:
 *   "The technique we verified / The sources we triangulated /
 *    The failure modes we tested / What we're still verifying"
 *
 * Clinical-reference framing. The site's editorial trust lives here.
 */

type Item = { label: string; detail: string };

const defaultItems: Item[] = [
  {
    label: "The technique we verified",
    detail:
      "We verified each step against the relevant manufacturer Instructions for Use, Frid et al. 2016 (Mayo Clinic Proceedings), and the CDC injection-safety guidance. Where sources disagreed, we defaulted to the most conservative and noted the discrepancy.",
  },
  {
    label: "The sources we triangulated",
    detail:
      "Peer-reviewed injection-technique literature, manufacturer package inserts, USP monographs, CDC and WHO published standards, and FDA labelling. Links and DOIs in the Sources section below. Unsourced claims are not published.",
  },
  {
    label: "The failure modes we tested",
    detail:
      "We document known-wrong outcomes for the common mistakes — partial dose delivery, injection-site bruising, pen misuse, reconstitution error — and describe what the published literature says to do when they happen. The red-box call-outs are drawn from these failure modes.",
  },
  {
    label: "What we're still verifying",
    detail:
      "Pen manufacturer Instructions for Use change. FDA labelling gets updated. A named credentialed reviewer (RN, NP, or PharmD) is joining the masthead by month 6. Until then, verify every technique decision with your own prescriber and the package insert that came with your medication.",
  },
];

export function MethodologyBlock({
  items = defaultItems,
  title = "How this reference was written",
}: {
  items?: Item[];
  title?: string;
}) {
  return (
    <section className="my-12 bg-paper border border-clinical/25 rounded-sm p-7 md:p-9">
      <div className="flex items-center gap-3 mb-5">
        <span className="h-2 w-2 rounded-full bg-clinical" />
        <span className="caps-label text-clinical">Methodology</span>
      </div>
      <h2 className="font-serif text-2xl text-clinical-deep mb-6 leading-tight">
        {title}
      </h2>
      <dl className="grid md:grid-cols-2 gap-x-10 gap-y-5">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="eyebrow text-stone mb-1">{item.label}</dt>
            <dd className="text-[15px] text-charcoal/85 leading-relaxed">
              {item.detail}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
