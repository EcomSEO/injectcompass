/**
 * Drug image manifest — real, license-compliant product imagery sourced from
 * Wikimedia Commons (and Wikipedia chemical-structure SVGs for compounds that
 * lack free-licensed product photos).
 *
 * Editorial / educational use only. Each rendered image MUST display the
 * attribution + license + "Editorial use for educational purposes only" caption
 * via <DrugImage>. Do NOT strip captions or use these images on commerce,
 * marketing, or endorsement-implying surfaces.
 *
 * To refresh sources / re-download files, run:
 *   node scripts/fetch-drug-images.mjs
 *
 * Last fetched: 2026-04-27 (see lib/content/drug-images.fetched.json for the
 * full machine-readable provenance dump.)
 */

export type DrugImageSource =
  | "wikimedia"
  | "wikipedia"
  | "structure-svg"
  | "placeholder";

export type DrugImageLicense =
  | "CC0"
  | "CC-BY-2.0"
  | "CC-BY-3.0"
  | "CC-BY-4.0"
  | "CC-BY-SA-2.0"
  | "CC-BY-SA-3.0"
  | "CC-BY-SA-4.0"
  | "PUBLIC-DOMAIN"
  | "GFDL"
  | "UNKNOWN"
  // permissive: keep as `string` so the fetch script can write back
  // any LicenseShortName value Commons returns.
  | (string & {});

export type DrugImage = {
  /** kebab-case slug used as object key and on disk */
  slug: string;
  /** Brand or display name as shown in UI */
  brandName: string;
  /** INN / generic compound name */
  genericName: string;
  /** Manufacturer (or "Research peptide" / "Cosmetic peptide" if not commercial) */
  manufacturer: string;
  /** Public path of the saved file under /public */
  imagePath: string;
  /** Origin of the image */
  source: DrugImageSource;
  /** Canonical Wikimedia / Wikipedia file page URL (attribution target) */
  sourceUrl: string;
  /** SPDX-ish license string from Commons extmetadata.LicenseShortName */
  license: DrugImageLicense;
  /** Human attribution string (Artist field, HTML stripped) */
  attribution: string;
  /** Alt text shown to screen readers */
  altText: string;
  /** Optional human caption used above the legal line */
  caption?: string;
  /** Pixel width of saved file */
  width?: number;
  /** Pixel height of saved file */
  height?: number;
};

export const DRUGS: Record<string, DrugImage> = {
  ozempic: {
    slug: "ozempic",
    brandName: "Ozempic",
    genericName: "semaglutide",
    manufacturer: "Novo Nordisk",
    imagePath: "/images/drugs/ozempic.jpg",
    source: "wikimedia",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ozempic%C2%AE_3ml.jpg",
    license: "CC-BY-SA-4.0",
    attribution: "HualinXMN",
    altText:
      "Ozempic 3 mL prefilled subcutaneous-injection pen (semaglutide, Novo Nordisk), photographed for editorial reference.",
    caption: "Ozempic prefilled pen (semaglutide), Novo Nordisk.",
    width: 4624,
    height: 3008,
  },
  wegovy: {
    slug: "wegovy",
    brandName: "Wegovy",
    genericName: "semaglutide",
    manufacturer: "Novo Nordisk",
    imagePath: "/images/drugs/wegovy.jpg",
    source: "wikimedia",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Wegovy_-_Semaglutide.jpg",
    license: "CC-BY-4.0",
    attribution: "Nelson R. de Lima Filho",
    altText:
      "Four dose strengths of Wegovy (semaglutide, Novo Nordisk) prefilled pens, photographed for editorial reference.",
    caption: "Wegovy prefilled pens (semaglutide), Novo Nordisk.",
    width: 3024,
    height: 4032,
  },
  rybelsus: {
    slug: "rybelsus",
    brandName: "Rybelsus",
    genericName: "semaglutide (oral)",
    manufacturer: "Novo Nordisk",
    imagePath: "/images/drugs/rybelsus.jpg",
    source: "wikimedia",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Rybelsus_3mg_box_angle_view.jpg",
    license: "CC-BY-SA-4.0",
    attribution: "Grendelkhan",
    altText:
      "Rybelsus 3 mg box (oral semaglutide, Novo Nordisk), front angle view, photographed for editorial reference.",
    caption: "Rybelsus 3 mg oral tablet box (semaglutide), Novo Nordisk.",
    width: 3024,
    height: 4032,
  },
  saxenda: {
    slug: "saxenda",
    brandName: "Saxenda",
    genericName: "liraglutide",
    manufacturer: "Novo Nordisk",
    imagePath: "/images/drugs/saxenda.jpg",
    source: "wikimedia",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Saxenda_Injection_(Liraglutide)_on_arm.jpg",
    license: "CC-BY-3.0",
    attribution: "무난러",
    altText:
      "Saxenda (liraglutide, Novo Nordisk) prefilled pen during arm injection, photographed for editorial reference.",
    caption: "Saxenda prefilled pen (liraglutide), Novo Nordisk.",
    width: 1683,
    height: 947,
  },
  victoza: {
    slug: "victoza",
    brandName: "Victoza",
    genericName: "liraglutide",
    manufacturer: "Novo Nordisk",
    // Editorial deferral: no free-licensed Victoza product photo on Commons.
    // Liraglutide chemical structure (public domain) used as compound reference.
    imagePath: "/images/drugs/structures/victoza.svg",
    source: "structure-svg",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Liraglutide_structure.svg",
    license: "PUBLIC-DOMAIN",
    attribution: "Anypodetos",
    altText:
      "Chemical skeletal formula of liraglutide, the active ingredient in Victoza (Novo Nordisk).",
    caption: "Liraglutide chemical structure (active ingredient in Victoza).",
    width: 382,
    height: 193,
  },
  mounjaro: {
    slug: "mounjaro",
    brandName: "Mounjaro",
    genericName: "tirzepatide",
    manufacturer: "Eli Lilly",
    imagePath: "/images/drugs/mounjaro.jpg",
    source: "wikimedia",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Lilly_mounjaro_KwikPen_Tirzepatid_5_mg_per_dose_rate-9441.jpg",
    license: "CC-BY-SA-4.0",
    attribution: "Raimond Spekking",
    altText:
      "Mounjaro KwikPen 5 mg (tirzepatide, Eli Lilly), photographed for editorial reference.",
    caption: "Mounjaro KwikPen 5 mg (tirzepatide), Eli Lilly.",
    width: 5036,
    height: 1970,
  },
  zepbound: {
    slug: "zepbound",
    brandName: "Zepbound",
    genericName: "tirzepatide",
    manufacturer: "Eli Lilly",
    // Editorial deferral: no free-licensed Zepbound product photo on Commons.
    // Tirzepatide chemical structure (public domain) used as compound reference.
    imagePath: "/images/drugs/structures/zepbound.svg",
    source: "structure-svg",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Tirzepatide_structure.svg",
    license: "PUBLIC-DOMAIN",
    attribution: "Vaccinationist",
    altText:
      "Chemical skeletal formula of tirzepatide, the active ingredient in Zepbound and Mounjaro (Eli Lilly).",
    caption: "Tirzepatide chemical structure (active ingredient in Zepbound).",
    width: 512,
    height: 260,
  },
  trulicity: {
    slug: "trulicity",
    brandName: "Trulicity",
    genericName: "dulaglutide",
    manufacturer: "Eli Lilly",
    imagePath: "/images/drugs/trulicity.jpg",
    source: "wikimedia",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Autoinjector_with_Trulicity_by_Lilly_(Dulaglutid)-3129.jpg",
    license: "CC-BY-SA-4.0",
    attribution: "Raimond Spekking",
    altText:
      "Trulicity 0.75 mg single-dose autoinjector (dulaglutide, Eli Lilly), photographed for editorial reference.",
    caption: "Trulicity autoinjector 0.75 mg (dulaglutide), Eli Lilly.",
    width: 4980,
    height: 2801,
  },

  // Research peptides / cosmetic peptide — no free product photo on Commons,
  // chemical-structure SVG used as compound reference.
  "bpc-157": {
    slug: "bpc-157",
    brandName: "BPC-157",
    genericName: "Body Protection Compound 157 (pentadecapeptide)",
    manufacturer: "Research peptide (not FDA-approved for human use)",
    imagePath: "/images/drugs/structures/bpc-157.svg",
    source: "structure-svg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:BPC-157.svg",
    license: "PUBLIC-DOMAIN",
    attribution: "User:Innerstream",
    altText:
      "Chemical structure diagram of BPC-157, a synthetic pentadecapeptide; research compound, not FDA-approved.",
    caption: "BPC-157 chemical structure (research peptide).",
    width: 2035,
    height: 1045,
  },
  "tb-500": {
    slug: "tb-500",
    brandName: "TB-500",
    genericName: "thymosin beta-4 fragment",
    manufacturer: "Research peptide (not FDA-approved for human use)",
    imagePath: "/images/drugs/structures/tb-500.png",
    source: "structure-svg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:TB-500_structure.png",
    license: "PUBLIC-DOMAIN",
    attribution: "Meodipt",
    altText:
      "Chemical structure diagram of TB-500 (thymosin beta-4 fragment); research compound, not FDA-approved.",
    caption: "TB-500 chemical structure (research peptide).",
    width: 567,
    height: 799,
  },
  ipamorelin: {
    slug: "ipamorelin",
    brandName: "Ipamorelin",
    genericName: "ipamorelin (pentapeptide GHRP)",
    manufacturer: "Research peptide (not FDA-approved for human use)",
    imagePath: "/images/drugs/structures/ipamorelin.svg",
    source: "structure-svg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ipamorelin.svg",
    license: "PUBLIC-DOMAIN",
    attribution: "Edgar181",
    altText:
      "Chemical structure diagram of ipamorelin, a synthetic pentapeptide growth-hormone secretagogue; research compound, not FDA-approved.",
    caption: "Ipamorelin chemical structure (research peptide).",
    width: 2110,
    height: 1450,
  },
  "cjc-1295": {
    slug: "cjc-1295",
    brandName: "CJC-1295",
    genericName: "tetrasubstituted GHRH(1-29) analogue",
    manufacturer: "Research peptide (not FDA-approved for human use)",
    imagePath: "/images/drugs/structures/cjc-1295.svg",
    source: "structure-svg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:CJC-1295.svg",
    license: "CC-BY-SA-4.0",
    attribution: "CMollerup",
    altText:
      "Peptide sequence diagram of CJC-1295, a tetrasubstituted GHRH analogue; research compound, not FDA-approved.",
    caption: "CJC-1295 peptide sequence (research peptide).",
    width: 512,
    height: 94,
  },
  "melanotan-ii": {
    slug: "melanotan-ii",
    brandName: "Melanotan II",
    genericName: "melanotan II (cyclic α-MSH analogue)",
    manufacturer: "Research peptide (not FDA-approved for human use)",
    imagePath: "/images/drugs/structures/melanotan-ii.svg",
    source: "structure-svg",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Chemical_structure_of_Melanotan_II_Updated.svg",
    license: "CC-BY-SA-3.0",
    attribution: "TheCook",
    altText:
      "Chemical structure diagram of Melanotan II, a cyclic α-MSH analogue; research compound, not FDA-approved.",
    caption: "Melanotan II chemical structure (research peptide).",
    width: 512,
    height: 316,
  },
  "ghk-cu": {
    slug: "ghk-cu",
    brandName: "GHK-Cu",
    genericName: "copper tripeptide-1 (glycyl-L-histidyl-L-lysine:copper(II))",
    manufacturer:
      "Cosmetic peptide (not a drug; not FDA-approved for therapeutic use)",
    imagePath: "/images/drugs/structures/ghk-cu.svg",
    source: "structure-svg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:GHK_Copper.svg",
    license: "PUBLIC-DOMAIN",
    attribution: "Edgar181",
    altText:
      "Chemical structure diagram of GHK-Cu (copper tripeptide-1); cosmetic peptide, not FDA-approved as a drug.",
    caption: "GHK-Cu chemical structure (cosmetic peptide).",
    width: 512,
    height: 448,
  },
};

/** Lookup helper — returns null if slug not in manifest */
export function getDrugImage(slug: string): DrugImage | null {
  return DRUGS[slug] ?? null;
}

/** All drug slugs in manifest */
export function listDrugSlugs(): string[] {
  return Object.keys(DRUGS);
}

/**
 * Map a license code to its canonical URL for caption linking.
 * Returns null for licenses without a clean canonical URL.
 */
export function licenseUrl(license: DrugImageLicense): string | null {
  const map: Record<string, string> = {
    CC0: "https://creativecommons.org/publicdomain/zero/1.0/",
    "PUBLIC-DOMAIN": "https://creativecommons.org/publicdomain/mark/1.0/",
    "CC-BY-2.0": "https://creativecommons.org/licenses/by/2.0/",
    "CC-BY-3.0": "https://creativecommons.org/licenses/by/3.0/",
    "CC-BY-4.0": "https://creativecommons.org/licenses/by/4.0/",
    "CC-BY-SA-2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
    "CC-BY-SA-3.0": "https://creativecommons.org/licenses/by-sa/3.0/",
    "CC-BY-SA-4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
    GFDL: "https://www.gnu.org/licenses/fdl-1.3.html",
  };
  return map[String(license)] ?? null;
}

/** Human-readable license label (matches creativecommons.org wording). */
export function licenseLabel(license: DrugImageLicense): string {
  const map: Record<string, string> = {
    CC0: "CC0 1.0",
    "PUBLIC-DOMAIN": "Public domain",
    "CC-BY-2.0": "CC BY 2.0",
    "CC-BY-3.0": "CC BY 3.0",
    "CC-BY-4.0": "CC BY 4.0",
    "CC-BY-SA-2.0": "CC BY-SA 2.0",
    "CC-BY-SA-3.0": "CC BY-SA 3.0",
    "CC-BY-SA-4.0": "CC BY-SA 4.0",
    GFDL: "GFDL",
    UNKNOWN: "Unknown license",
  };
  return map[String(license)] ?? String(license);
}

/**
 * Normalize Commons LicenseShortName values (e.g. "CC BY-SA 4.0",
 * "CC0", "Public domain") into our DrugImageLicense codes.
 */
export function normalizeLicense(short: string | undefined | null): DrugImageLicense {
  if (!short) return "UNKNOWN";
  const s = short.trim().toUpperCase().replace(/\s+/g, " ");
  if (s === "CC0" || s.includes("CC0")) return "CC0";
  if (s.includes("PUBLIC DOMAIN")) return "PUBLIC-DOMAIN";
  if (s.includes("GFDL")) return "GFDL";
  const m = s.match(/CC\s*BY(?:-|\s)?(SA)?\s*([0-9]\.[0-9])/);
  if (m) {
    const sa = m[1] ? "-SA" : "";
    return `CC-BY${sa}-${m[2]}` as DrugImageLicense;
  }
  return short as DrugImageLicense;
}
