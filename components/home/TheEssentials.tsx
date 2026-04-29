import { AffiliateLabel } from "@/components/AffiliateLabel";
import { affiliatesByCategory } from "@/lib/affiliate/registry";

/**
 * TheEssentials — three featured supply categories from the affiliate
 * registry. Each card carries an <AffiliateLabel> in the corner +
 * rel="sponsored nofollow" on the underlying link per
 * MONETIZATION-MODEL.md (network-wide affiliate compliance rule).
 *
 * The categories shown are sharps containers, pen needles, and travel
 * cool-bags — all on the allowed-list per 03-injectcompass.md
 * Phase 7.5. ZERO peptide-vendor cross-sell. ZERO telehealth.
 */
export function TheEssentials() {
  const categories: Array<{
    title: string;
    blurb: string;
    productKey: string;
    icon: "syringe" | "vial" | "pad";
  }> = [
    {
      title: "Sharps containers",
      blurb:
        "FDA-cleared puncture-resistant containers for needle disposal. Single-handed deposit slot, leak-proof.",
      productKey: "bd-home-sharps-1qt",
      icon: "syringe",
    },
    {
      title: "Pen needles",
      blurb:
        "32G × 4 mm — the gauge / length the GLP-1 trials standardised on. The standard-of-care for subcutaneous injection.",
      productKey: "bd-pen-needles-32g-4mm",
      icon: "vial",
    },
    {
      title: "Travel cool-bag",
      blurb:
        "Evaporative-cooling wallet. Wet for 2 minutes, holds insulin temperature for ~45 hours at typical room temperatures.",
      productKey: "frio-wallet-individual",
      icon: "pad",
    },
  ];

  const lookup = (key: string) => {
    const cat =
      affiliatesByCategory("sharps-container").find((a) => a.productKey === key) ??
      affiliatesByCategory("syringe-box").find((a) => a.productKey === key) ??
      affiliatesByCategory("travel-cool-bag").find((a) => a.productKey === key);
    return cat;
  };

  return (
    <section className="bg-midnight">
      <div className="mx-auto max-w-container px-6 pb-16 md:pb-20">
        <div className="mb-10 md:mb-12">
          <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-aqua/85">
            The Essentials
          </span>
          <h2 className="mt-3 font-serif text-white text-[1.85rem] md:text-[2.3rem] leading-tight">
            Adjacent products only — never peptide vendors.
          </h2>
          <p className="mt-3 text-[15px] text-white/65 max-w-2xl leading-relaxed">
            Sharps containers, pen needles, travel cool-bags. The
            allowed-list categories per the network monetisation rule —
            zero compounded-pharmacy cross-sell, zero telehealth, every
            link labelled and{" "}
            <code className="font-mono text-aqua/85">
              rel=&quot;sponsored nofollow&quot;
            </code>
            .
          </p>
        </div>

        <ul className="grid md:grid-cols-3 gap-5">
          {categories.map((c) => {
            const sku = lookup(c.productKey);
            return (
              <li
                key={c.productKey}
                className="bg-midnight-raised border border-midnight-rule rounded-xl p-6 hover:border-aqua/30 transition relative"
              >
                <div className="absolute top-4 right-4 [&>span]:!bg-aqua/10 [&>span]:!text-aqua [&>span]:!border [&>span]:!border-aqua/30">
                  <AffiliateLabel />
                </div>
                <SchematicIcon kind={c.icon} />
                <h3 className="mt-4 font-serif text-white text-[1.2rem]">
                  {c.title}
                </h3>
                <p className="mt-2 text-[13.5px] text-white/65 leading-relaxed line-clamp-3">
                  {c.blurb}
                </p>
                {sku && (
                  <a
                    href={sku.thirdPartyUrl}
                    rel="sponsored nofollow noopener"
                    target="_blank"
                    className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 bg-aqua/15 hover:bg-aqua/25 border border-aqua/30 text-aqua text-[12.5px] font-mono uppercase tracking-[0.14em] rounded-full transition"
                  >
                    Shop {sku.thirdPartyLabel} →
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function SchematicIcon({ kind }: { kind: "syringe" | "vial" | "pad" }) {
  const stroke = "#5EEAD4";
  if (kind === "syringe")
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={stroke} strokeWidth="1.6">
        <rect x="6" y="20" width="28" height="8" rx="1" />
        <line x1="34" y1="24" x2="44" y2="24" />
        <line x1="6" y1="24" x2="2" y2="24" />
        <line x1="14" y1="20" x2="14" y2="28" strokeOpacity="0.6" />
        <line x1="22" y1="20" x2="22" y2="28" strokeOpacity="0.6" />
        <line x1="30" y1="20" x2="30" y2="28" strokeOpacity="0.6" />
      </svg>
    );
  if (kind === "vial")
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={stroke} strokeWidth="1.6">
        <rect x="16" y="6" width="16" height="6" rx="1" />
        <path d="M14 12h20l-2 4v22a2 2 0 01-2 2H18a2 2 0 01-2-2V16l-2-4z" />
        <line x1="18" y1="22" x2="30" y2="22" strokeOpacity="0.5" />
      </svg>
    );
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={stroke} strokeWidth="1.6">
      <rect x="8" y="8" width="32" height="32" rx="4" />
      <line x1="16" y1="20" x2="32" y2="20" strokeOpacity="0.5" />
      <line x1="16" y1="28" x2="28" y2="28" strokeOpacity="0.5" />
    </svg>
  );
}
