/**
 * InjectCompass affiliate registry.
 *
 * Per the 2026-04-29 monetization lock and the brand-DNA hard rules in
 * `CLAUDE.md` + `MONETIZATION-MODEL.md`, this registry contains:
 *
 *   - Sharps containers (Sharps Compliance, BD)
 *   - Insulin-syringe boxes (BD, Easy Touch)
 *   - Travel cool-bags (Frio, MedAngel, FRIO Wallet)
 *   - Needle-disposal mail-back services (Stericycle, Sharps Compliance)
 *   - CGM (Levels, Abbott Lingo, NutriSense)
 *
 * It MUST NOT contain (site-ending boundary):
 *
 *   - Peptide vendors (research-channel grey-market suppliers)
 *   - Telehealth GLP-1 prescribers (Hims, Ro, Sequence, etc.)
 *   - Compounding pharmacies
 *   - Display ads (would conflict with the clinical aesthetic + low YMYL CPMs)
 *
 * Schema follows the network-wide bridge-monetization pattern: every
 * link starts as a third-party affiliate (`thirdPartyUrl`); when the
 * owned shop launches the same `productKey` swaps to the first-party
 * URL automatically (no body rewrites needed).
 */

export type AffiliateLink = {
  productKey: string;
  brand: string;
  name: string;
  thirdPartyUrl: string;
  thirdPartyLabel:
    | "Amazon"
    | "Direct"
    | "BD"
    | "Frio"
    | "Stericycle"
    | "Levels"
    | "Abbott"
    | "NutriSense";
  ownedShopUrl?: string;
  ownedShopAvailableFromDate?: string;
  category:
    | "sharps-container"
    | "syringe-box"
    | "travel-cool-bag"
    | "needle-disposal"
    | "cgm";
  blurb: string;
};

const AMAZON_TAG = "injectcompass-20";
const amazonUrl = (asin: string) =>
  `https://www.amazon.com/dp/${asin}/?tag=${AMAZON_TAG}`;

export const AFFILIATES: Record<string, AffiliateLink> = {
  // ── Sharps containers ──────────────────────────────────────────────
  "bd-home-sharps-1qt": {
    productKey: "bd-home-sharps-1qt",
    brand: "BD",
    name: "BD Home Sharps Container, 1 Quart",
    thirdPartyUrl: amazonUrl("B003ZNUC4G"),
    thirdPartyLabel: "BD",
    category: "sharps-container",
    blurb:
      "FDA-cleared 1-quart sharps container. Puncture-resistant, leak-proof, single-handed deposit slot. The standard-of-care home option.",
  },
  "sharps-compliance-1qt-mail-back": {
    productKey: "sharps-compliance-1qt-mail-back",
    brand: "Sharps Compliance",
    name: "Sharps Container with Mail-Back Service, 1 Quart",
    thirdPartyUrl: amazonUrl("B0019LBJSC"),
    thirdPartyLabel: "Amazon",
    category: "sharps-container",
    blurb:
      "Container + pre-paid postage envelope. The cleanest disposal path when local pharmacy take-back isn't an option in your state.",
  },
  "covidien-monoject-sharps-2gal": {
    productKey: "covidien-monoject-sharps-2gal",
    brand: "Cardinal Health (Monoject)",
    name: "Monoject Sharps Container, 2 Gallon",
    thirdPartyUrl: amazonUrl("B07L4KBPDR"),
    thirdPartyLabel: "Amazon",
    category: "sharps-container",
    blurb:
      "Larger 2-gallon footprint for households with multiple injectors or higher injection frequency. Wall-mountable.",
  },

  // ── Syringe / pen-needle boxes ─────────────────────────────────────
  "bd-pen-needles-32g-4mm": {
    productKey: "bd-pen-needles-32g-4mm",
    brand: "BD",
    name: "BD Ultra-Fine Pen Needles, 32G × 4 mm",
    thirdPartyUrl: amazonUrl("B0017OGKR4"),
    thirdPartyLabel: "BD",
    category: "syringe-box",
    blurb:
      "32G × 4 mm — the gauge / length the GLP-1 trials standardised on for subcutaneous injection in adults across the BMI range.",
  },
  "easy-touch-pen-needles-31g-5mm": {
    productKey: "easy-touch-pen-needles-31g-5mm",
    brand: "Easy Touch",
    name: "Easy Touch Pen Needles, 31G × 5 mm",
    thirdPartyUrl: amazonUrl("B009VANUWG"),
    thirdPartyLabel: "Amazon",
    category: "syringe-box",
    blurb:
      "31G × 5 mm — the value alternative when 32G × 4 mm is back-ordered. Slightly thicker bore, slightly longer; clinical equivalence in published comparison studies.",
  },
  "bd-insulin-syringes-1ml-31g": {
    productKey: "bd-insulin-syringes-1ml-31g",
    brand: "BD",
    name: "BD Ultra-Fine Insulin Syringes, 1 mL × 31G × 8 mm",
    thirdPartyUrl: amazonUrl("B003ZNUC50"),
    thirdPartyLabel: "BD",
    category: "syringe-box",
    blurb:
      "Insulin-style syringes used for compounded peptide reconstitution and dose draw. U-100 markings. Educational reference only — sourcing depends on prescription status in your jurisdiction.",
  },

  // ── Travel cool-bags ───────────────────────────────────────────────
  "frio-wallet-individual": {
    productKey: "frio-wallet-individual",
    brand: "Frio",
    name: "Frio Insulin Cooling Wallet, Individual",
    thirdPartyUrl: "https://frioinsulincoolingcase.com/",
    thirdPartyLabel: "Frio",
    category: "travel-cool-bag",
    blurb:
      "Evaporative cooling — wet for two minutes, lasts ~45 hours at typical room temperatures. The travel option airlines don't flag as a refrigeration accessory.",
  },
  "medangel-thermometer": {
    productKey: "medangel-thermometer",
    brand: "MedAngel",
    name: "MedAngel ONE Bluetooth Thermometer",
    thirdPartyUrl: amazonUrl("B07P5R3NC1"),
    thirdPartyLabel: "Amazon",
    category: "travel-cool-bag",
    blurb:
      "Bluetooth thermometer for medication storage; logs the actual temperature curve of your fridge / cool-bag and alerts on excursion. The right tool when you're auditing whether your travel storage actually held.",
  },
  "frio-duo-wallet": {
    productKey: "frio-duo-wallet",
    brand: "Frio",
    name: "Frio Insulin Cooling Wallet, Duo",
    thirdPartyUrl: "https://frioinsulincoolingcase.com/",
    thirdPartyLabel: "Frio",
    category: "travel-cool-bag",
    blurb:
      "Two-pen capacity. The pick when you're carrying a primary + backup pen on multi-day travel.",
  },

  // ── Needle disposal services ───────────────────────────────────────
  "sharps-mail-back-service": {
    productKey: "sharps-mail-back-service",
    brand: "Sharps Compliance",
    name: "Sharps Mail-Back Disposal Service",
    thirdPartyUrl: "https://www.sharpsinc.com/",
    thirdPartyLabel: "Stericycle",
    category: "needle-disposal",
    blurb:
      "Pre-paid mail-back service when local pharmacy take-back is unavailable. Operator-grade chain of custody.",
  },

  // ── CGM ────────────────────────────────────────────────────────────
  "abbott-lingo": {
    productKey: "abbott-lingo",
    brand: "Abbott",
    name: "Lingo CGM (Stelo in US)",
    thirdPartyUrl: "https://www.hellolingo.com/",
    thirdPartyLabel: "Abbott",
    category: "cgm",
    blurb:
      "Over-the-counter CGM. Abbott Libre sensor in a consumer wrapper. Useful for self-monitoring how a GLP-1 dose is moving glucose without a prescription.",
  },
  "levels-cgm": {
    productKey: "levels-cgm",
    brand: "Levels",
    name: "Levels CGM Program",
    thirdPartyUrl: "https://www.levelshealth.com/",
    thirdPartyLabel: "Levels",
    category: "cgm",
    blurb:
      "CGM + nutrition app wrapper. Pricier than Stelo / Lingo; the value-add depends on whether you'll use the analytics layer.",
  },
  "nutrisense-cgm": {
    productKey: "nutrisense-cgm",
    brand: "NutriSense",
    name: "NutriSense CGM Program",
    thirdPartyUrl: "https://www.nutrisense.io/",
    thirdPartyLabel: "NutriSense",
    category: "cgm",
    blurb:
      "CGM + dietitian coaching. The path when you want a human reviewing your glucose curves, not just the app.",
  },
};

export function getAffiliate(
  productKey: string,
): { url: string; label: string; isOwned: boolean } | null {
  const a = AFFILIATES[productKey];
  if (!a) return null;
  if (a.ownedShopUrl) {
    return { url: a.ownedShopUrl, label: "InjectCompass Shop", isOwned: true };
  }
  return { url: a.thirdPartyUrl, label: a.thirdPartyLabel, isOwned: false };
}

export function affiliatesByCategory(
  category: AffiliateLink["category"],
): AffiliateLink[] {
  return Object.values(AFFILIATES).filter((a) => a.category === category);
}
