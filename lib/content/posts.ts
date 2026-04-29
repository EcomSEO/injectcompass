export type PostType = "pillar" | "comparison" | "cluster" | "listicle";

export type Post = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  hub: string;
  postType: PostType;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  status: "draft" | "stub" | "published";
  ourPick?: { name: string; tier: string; reason: string };
  products?: Array<{ rank: number; name: string; tier: string; summary: string }>;
  items?: Array<{ rank: number; name: string; summary: string }>;
  faq?: Array<{ q: string; a: string }>;
  sources?: Array<{ label: string; url: string }>;
  featured?: boolean;
  medicalDisclaimer?: "required" | "light";
  /** Slug into the DRUGS manifest (lib/content/drug-images.ts).
   *  When set, ArticleTemplate renders a license-compliant DrugImage
   *  in the right rail. Leave undefined for generic technique posts. */
  primaryDrug?: string;
  /** HowTo-emittable structured procedure. When present, takes precedence
   *  over `items[]` in the HowToJsonLd schema component. Aligned with
   *  schema-library.md §11. Step images are schematic-only (never
   *  needle-in-skin photography). */
  steps?: Array<{ name: string; text: string; image?: string }>;
  /** Pre-injection supplies — emitted as HowToSupply[]. */
  supplies?: string[];
  /** Tools (durable equipment) — emitted as HowToTool[]. */
  tools?: string[];
  /** Total time in minutes — converted to ISO-8601 duration for HowTo. */
  totalTimeMinutes?: number;
  /** Pre-injection checklist (rendered before the procedure). Plain bullets. */
  preChecklist?: string[];
  /** After-injection care bullets. */
  aftercare?: string[];
  /** Common-mistake / corrective-behaviour pairs. */
  commonMistakes?: Array<{ mistake: string; correction: string }>;
  /** Red-flag symptoms — when to call a clinician. Emits a red callout. */
  redFlags?: string[];
};

export const posts: Post[] = [
  {
    slug: "peptide-calculator",
    title: "The Peptide Calculator, with Visual Syringe",
    h1: "The Peptide Calculator",
    description:
      "Calculate peptide dose in insulin-syringe units, with a visual U-100 syringe highlighting the exact tick mark. For educational and research purposes only. Not intended for human use. Not medical advice.",
    hub: "calculators-and-tools",
    postType: "pillar",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 8,
    status: "published",
    featured: true,
    medicalDisclaimer: "required",
    items: [
      {
        rank: 1,
        name: "Inputs required by the calculator",
        summary:
          "Peptide mass in the vial (mg), reconstitution volume of bacteriostatic water (mL), and desired dose (mcg or mg). These are the three variables that define the concentration and per-dose volume described in standard reconstitution literature.",
      },
      {
        rank: 2,
        name: "Primary output: units on a U-100 insulin syringe",
        summary:
          "On a U-100 insulin syringe, 100 units equals 1 mL. The calculator converts the computed per-dose volume to the equivalent tick mark on the barrel.",
      },
      {
        rank: 3,
        name: "Secondary output: concentration in mg/mL",
        summary:
          "Concentration is a derived value (peptide mass divided by reconstitution volume). Published protocols frequently report dosing relative to concentration rather than absolute volume.",
      },
      {
        rank: 4,
        name: "Visual syringe highlight",
        summary:
          "An SVG of a 1 mL U-100 insulin syringe with the computed tick mark highlighted. It is a visual cross-check against the numeric output.",
      },
      {
        rank: 5,
        name: "Worked reference example (BPC-157, as published)",
        summary:
          "A 5 mg vial reconstituted in 2 mL of bacteriostatic water gives a 2.5 mg/mL solution. The research literature on BPC-157 (Sikiric et al.) reports animal-model dosing in micrograms per kilogram; per-dose volumes in that literature follow from the computed concentration.",
      },
      {
        rank: 6,
        name: "Rounding convention",
        summary:
          "Outputs are rounded to the nearest whole unit on the syringe barrel, consistent with graduations on commercially available U-100 insulin syringes. Sub-unit precision is not readable on standard syringe markings.",
      },
      {
        rank: 7,
        name: "Printable PDF summary",
        summary:
          "The calculator exports a single-page PDF containing the inputs, computed outputs, the syringe visualization, and the standard research-context disclaimer. Dated at export for version tracking.",
      },
    ],
    ourPick: {
      name: "Peptide Protocols (William A. Seeds, MD)",
      tier: "Reference text",
      reason:
        "Frequently cited reference work summarizing published peptide literature, reconstitution math, and storage conventions. Used as a general reference only; does not replace peer-reviewed sources or manufacturer package inserts.",
    },
    faq: [
      {
        q: "What math does the calculator apply?",
        a: "The calculator applies the standard dilution identity used in compounded sterile preparation literature: concentration (mg/mL) equals peptide mass divided by reconstitution volume, and per-dose volume equals desired dose divided by concentration. Units on a U-100 syringe equal per-dose volume (mL) multiplied by 100, as defined by U-100 syringe graduations.",
      },
      {
        q: "Are the dosing values recommendations?",
        a: "No. The calculator performs an arithmetic conversion between user-supplied inputs. It does not recommend a dose. Published protocols (for example, animal-model dosing reported by Sikiric and colleagues for BPC-157, or clinical trial protocols such as Wilding 2021 STEP-1 for semaglutide) are cited for reference only. Administration decisions are the responsibility of a prescriber.",
      },
      {
        q: "Why a U-100 insulin syringe for the output display?",
        a: "The U-100 insulin syringe is the graduation standard referenced across nursing-education literature and clinical-trial protocols for subcutaneous administration of aqueous peptide and insulin preparations. Its 100-unit-per-millilitre scale is the de facto reference for small-volume subcutaneous dosing.",
      },
      {
        q: "What is the regulatory status of research peptides discussed in the worked examples?",
        a: "Compounds such as BPC-157, TB-500, CJC-1295, and ipamorelin are not FDA-approved for human use. The FDA has issued warning letters to compounding pharmacies distributing several of these compounds and included certain peptides on its 503A and 503B bulk substances lists under review. The calculator is provided for educational and research purposes only.",
      },
      {
        q: "Does the calculator account for overfill or vial losses?",
        a: "No. The calculator assumes the labeled peptide mass reconstitutes fully into the stated volume, consistent with the assumptions in published reconstitution-math primers. Real-world losses (residual volume, adsorption to vial surfaces) are acknowledged in the pharmaceutical literature but are not modelled here.",
      },
      {
        q: "What bacteriostatic water reference does the calculator assume?",
        a: "The calculator assumes standard 0.9% benzyl alcohol bacteriostatic water for injection, USP, as described in the United States Pharmacopeia monograph for multi-dose diluents. It does not account for sterile water for injection (preservative-free, single-use).",
      },
      {
        q: "How are outputs intended to be verified?",
        a: "Verify outputs against the primary published source for any given protocol and, where applicable, against the manufacturer package insert. The visual syringe is a cross-check against the numeric output, not a substitute for independent verification.",
      },
    ],
    sources: [
      {
        label: "Wilding JPH et al., 2021. Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP-1), NEJM",
        url: "https://pubmed.ncbi.nlm.nih.gov/33567185/",
      },
      {
        label: "Jastreboff AM et al., 2022. Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1), NEJM",
        url: "https://pubmed.ncbi.nlm.nih.gov/35658024/",
      },
      {
        label: "Sikiric P et al.. Stable gastric pentadecapeptide BPC 157 (review of preclinical literature)",
        url: "https://pubmed.ncbi.nlm.nih.gov/24139076/",
      },
      {
        label: "Teichman SL et al., 2006. Prolonged stimulation of growth hormone by CJC-1295, JCEM",
        url: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
      },
      {
        label: "United States Pharmacopeia. Bacteriostatic Water for Injection monograph (reference)",
        url: "https://www.usp.org/",
      },
      {
        label: "FDA. Compounding and the FDA: Questions and Answers (regulatory status of peptides)",
        url: "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
      },
    ],
  },
  {
    slug: "subcutaneous-injection",
    title: "Subcutaneous Injection. The Complete Guide",
    h1: "Subcutaneous injection",
    description:
      "A step-numbered procedure for self-administered subcutaneous injection of prescribed medications, citing published nursing-education literature. For educational and patient-education purposes only. Not medical advice.",
    hub: "injection-technique",
    postType: "pillar",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 12,
    status: "published",
    medicalDisclaimer: "required",
    items: [
      {
        rank: 1,
        name: "Hand hygiene and supply preparation",
        summary:
          "CDC hand-hygiene guidance is applied before any parenteral procedure. Supplies, single-use syringe, alcohol prep pad, sharps container, and the prescribed medication, are laid out before the vial or pen is opened.",
      },
      {
        rank: 2,
        name: "Injection-site selection within the three documented zones",
        summary:
          "The abdomen (avoiding a two-inch radius around the umbilicus), the anterolateral thigh, and the posterior upper arm are the three subcutaneous sites described in nursing-education literature (Perry & Potter; Frid et al. 2016).",
      },
      {
        rank: 3,
        name: "Skin antisepsis",
        summary:
          "A 70% isopropyl alcohol prep pad is applied in a single outward spiral. The site is allowed to air-dry before needle insertion, per CDC injection-safety guidance.",
      },
      {
        rank: 4,
        name: "Pinch versus stretch",
        summary:
          "The skin-pinch technique raises the subcutaneous layer away from the underlying muscle. Frid et al. 2016 (Mayo Clinic Proceedings) describe this as the default approach for short (5/16\") insulin needles in lean individuals. The same paper describes stretching for sites with abundant subcutaneous tissue and shorter needles.",
      },
      {
        rank: 5,
        name: "Needle angle",
        summary:
          "A 90-degree angle is described in nursing-education literature for 5/16\" (8 mm) needles. A 45-degree angle is described in the same literature for longer needles in individuals with reduced subcutaneous tissue.",
      },
      {
        rank: 6,
        name: "Plunger depression and needle dwell",
        summary:
          "The plunger is depressed at a steady rate. A five-to-ten-second dwell after plunger completion is described in pen-manufacturer package inserts (Novo Nordisk; Eli Lilly) to reduce incomplete dose delivery.",
      },
      {
        rank: 7,
        name: "Needle withdrawal and sharps disposal",
        summary:
          "The needle is withdrawn at the insertion angle and placed directly into an FDA-cleared sharps container. Recapping is not performed, per OSHA bloodborne-pathogen guidance.",
      },
    ],
    faq: [
      {
        q: "What angle is described in the published technique literature for subcutaneous injection?",
        a: "Frid et al. 2016 (Mayo Clinic Proceedings) describe a 90-degree insertion angle for 4–6 mm needles in most adults and a 45-degree angle for longer needles in individuals with thinner subcutaneous tissue. Specific pen-manufacturer package inserts (for example, the Ozempic and Mounjaro prescribing information) reference the 90-degree convention for their provided pen needles.",
      },
      {
        q: "Is pinching the skin required?",
        a: "Nursing-education literature (Perry & Potter; Frid et al.) describes skin-pinch as the default for shorter needles in lean individuals, and stretching as acceptable for sites with abundant subcutaneous tissue. The package inserts for major GLP-1 pens do not uniformly require pinching.",
      },
      {
        q: "Which sites are described for subcutaneous administration?",
        a: "The abdomen (outside a two-inch radius around the umbilicus), the anterolateral thigh, and the posterior upper arm are the three sites described in nursing-education procedure literature and in GLP-1 pen package inserts (Ozempic, Wegovy, Mounjaro, Zepbound).",
      },
      {
        q: "What are the documented red-flag signs following injection?",
        a: "Published nursing-reference material identifies the following as warranting prescriber contact: bleeding that does not stop after five minutes of gentle pressure, expanding redness or warmth, fever, purulent discharge, or unexpected deep pain suggestive of intramuscular deposition. These criteria are consistent across CDC injection-safety guidance and the IDSA guidelines on soft-tissue infection.",
      },
      {
        q: "Is site rotation described in the literature?",
        a: "Yes. The three-zone rotation protocol is described in the Forum for Injection Technique (FIT) recommendations and in Frid et al. 2016, specifically for prevention of lipohypertrophy in patients receiving repeated subcutaneous injections.",
      },
      {
        q: "How does the procedure differ between pen devices and vial-and-syringe administration?",
        a: "The needle-insertion steps are identical. Vial-and-syringe administration adds a reconstitution or dose-drawing step that is not required for pre-filled pens. Package inserts for pre-filled pens specify a dose-dial priming step and a five-to-ten-second dwell after plunger completion.",
      },
      {
        q: "Is the alcohol swab required by the published guidance?",
        a: "CDC injection-safety guidance describes skin antisepsis with 70% isopropyl alcohol prior to parenteral administration. The swab is to be allowed to dry before insertion, per the same guidance, both for antiseptic effect and to reduce the stinging sensation reported in patient-education literature.",
      },
    ],
    sources: [
      {
        label: "Frid AH et al., 2016. New Insulin Delivery Recommendations, Mayo Clinic Proceedings",
        url: "https://pubmed.ncbi.nlm.nih.gov/27594187/",
      },
      {
        label: "CDC. Injection Safety: Safe Injection Practices",
        url: "https://www.cdc.gov/injection-safety/hcp/clinical-safety/index.html",
      },
      {
        label: "Wilding JPH et al., 2021. Semaglutide STEP-1, NEJM (injection administration protocol)",
        url: "https://pubmed.ncbi.nlm.nih.gov/33567185/",
      },
      {
        label: "Ozempic (semaglutide) Prescribing Information. Novo Nordisk",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/209637s003lbl.pdf",
      },
      {
        label: "Mounjaro (tirzepatide) Prescribing Information. Eli Lilly",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/215866s000lbl.pdf",
      },
    ],
  },
  {
    slug: "how-to-use-ozempic-pen",
    title: "How to Use an Ozempic Pen, 8 Steps with Visuals",
    h1: "How to use an Ozempic pen",
    description:
      "Step-numbered Ozempic (semaglutide) pen administration procedure as described in the current Novo Nordisk prescribing information. For educational and patient-education purposes only. Not medical advice.",
    hub: "injection-technique",
    postType: "cluster",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 10,
    status: "published",
    medicalDisclaimer: "required",
    primaryDrug: "ozempic",
    items: [
      {
        rank: 1,
        name: "Pre-use inspection",
        summary:
          "The pen is inspected for clarity and colour. The Ozempic prescribing information specifies that the solution be clear and colourless; a cloudy or coloured solution is described as grounds for discard.",
      },
      {
        rank: 2,
        name: "Needle attachment",
        summary:
          "A new single-use NovoFine or NovoTwist pen needle is attached to the pen as described in the Novo Nordisk Instructions for Use. Needle reuse is not supported by the manufacturer.",
      },
      {
        rank: 3,
        name: "Flow check (priming)",
        summary:
          "Each new pen is primed before the first use. The dose selector is turned to the flow-check symbol and the dose button is pressed with the needle pointing up, until a drop of semaglutide appears at the needle tip, per the Instructions for Use.",
      },
      {
        rank: 4,
        name: "Dose selection",
        summary:
          "The dose selector is turned to the prescribed dose. The pen clicks once per dose increment. A mismatched dose is corrected by rotating the selector without pressing the dose button.",
      },
      {
        rank: 5,
        name: "Site selection and antisepsis",
        summary:
          "Abdomen, anterolateral thigh, or posterior upper arm are the three sites described in the prescribing information. The site is cleaned with 70% isopropyl alcohol and allowed to dry.",
      },
      {
        rank: 6,
        name: "Injection",
        summary:
          "The needle is inserted at 90 degrees and the dose button is pressed and held until the dose counter returns to zero. A six-second dwell is specified in the Instructions for Use to ensure complete dose delivery.",
      },
      {
        rank: 7,
        name: "Needle withdrawal and disposal",
        summary:
          "The needle is withdrawn and immediately placed into an FDA-cleared sharps container. The pen is stored with the needle detached, per storage guidance in the prescribing information.",
      },
      {
        rank: 8,
        name: "Post-use storage",
        summary:
          "In-use Ozempic pens are described in the prescribing information as storable at room temperature (below 30 °C) or refrigerated (2–8 °C) for up to 56 days. The pen cap is replaced after each use.",
      },
    ],
    faq: [
      {
        q: "What do the pen clicks correspond to?",
        a: "The Ozempic pen selector produces one mechanical click per dose increment as the selector is rotated. The Instructions for Use indicates that clicks heard while rotating the dose selector do not correspond to units delivered; delivery is indicated only by the dose counter returning to zero during injection.",
      },
      {
        q: "How long is the dwell after plunger completion?",
        a: "A six-second dwell following the dose counter returning to zero is specified in the Novo Nordisk Instructions for Use. Early needle withdrawal is associated with incomplete dose delivery in the package-insert guidance.",
      },
      {
        q: "What storage conditions are described in the prescribing information?",
        a: "Unopened pens are stored refrigerated (2–8 °C). In-use pens may be kept at room temperature below 30 °C or refrigerated for up to 56 days from first use, as described in the Ozempic prescribing information.",
      },
      {
        q: "Is needle reuse supported?",
        a: "No. The Novo Nordisk Instructions for Use and the Ozempic prescribing information specify single-use needles. Reuse has been associated with needle-tip dulling and increased injection-site trauma in the published injection-technique literature (Frid et al. 2016).",
      },
      {
        q: "What is the documented procedure for a missed dose?",
        a: "The Ozempic prescribing information describes the procedure for missed doses: if the next scheduled dose is more than 48 hours away, the missed dose is administered as soon as possible; if less than 48 hours away, the missed dose is skipped. Prescriber contact is indicated for uncertainty.",
      },
      {
        q: "Is the semaglutide solution meant to be clear?",
        a: "Yes. The prescribing information specifies a clear and colourless solution. A cloudy, coloured, or particulate-containing solution is described as grounds for discard without administration.",
      },
      {
        q: "What gauge and length needle is paired with Ozempic pens?",
        a: "The Ozempic Instructions for Use describes compatibility with NovoFine and NovoTwist disposable pen needles. Common paired specifications in the package-insert literature are 32 G × 4 mm or 31 G × 5 mm.",
      },
    ],
    sources: [
      {
        label: "Ozempic (semaglutide) Prescribing Information. Novo Nordisk (FDA label)",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/209637s003lbl.pdf",
      },
      {
        label: "Wilding JPH et al., 2021. STEP-1 Semaglutide Trial, NEJM",
        url: "https://pubmed.ncbi.nlm.nih.gov/33567185/",
      },
      {
        label: "Frid AH et al., 2016. New Insulin Delivery Recommendations, Mayo Clinic Proceedings",
        url: "https://pubmed.ncbi.nlm.nih.gov/27594187/",
      },
      {
        label: "FDA Drug Safety. Compounded Semaglutide Warning (patient safety communication)",
        url: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/medications-containing-semaglutide-marketed-type-2-diabetes-or-weight-loss",
      },
      {
        label: "CDC. Safe Injection Practices",
        url: "https://www.cdc.gov/injection-safety/hcp/clinical-safety/index.html",
      },
    ],
  },
  {
    slug: "how-to-reconstitute-peptides",
    title: "How to Reconstitute Peptides, the Complete Guide",
    h1: "How to reconstitute peptides",
    description:
      "The reconstitution procedure as published in pharmacy and nursing-education literature. Research-context framing. For educational and research purposes only. Not intended for human use. Not medical advice.",
    hub: "reconstitution",
    postType: "pillar",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 10,
    status: "published",
    medicalDisclaimer: "required",
    items: [
      {
        rank: 1,
        name: "Volume calculation",
        summary:
          "Reconstitution volume is calculated before the vial is opened. The identity applied is concentration (mg/mL) equals peptide mass divided by diluent volume, per standard USP compounded-sterile-preparation references.",
      },
      {
        rank: 2,
        name: "Workspace preparation",
        summary:
          "A clean, flat surface is prepared. USP <797> on compounded sterile preparations describes hand hygiene and surface antisepsis with 70% isopropyl alcohol prior to any reconstitution procedure.",
      },
      {
        rank: 3,
        name: "Diluent withdrawal",
        summary:
          "The bacteriostatic water stopper is wiped with a 70% isopropyl alcohol prep pad. The calculated diluent volume is withdrawn into a sterile single-use syringe.",
      },
      {
        rank: 4,
        name: "Slow addition to the peptide vial",
        summary:
          "The diluent is added slowly along the inner wall of the peptide vial. Pharmacy-compounding references describe this angle-of-addition approach to reduce peptide denaturation from mechanical shear.",
      },
      {
        rank: 5,
        name: "Gentle swirl, not shaken",
        summary:
          "Swirl the vial gently until the lyophilized powder is fully dissolved. Peptide-stability references describe the swirl-versus-shake distinction; vigorous agitation is associated with denaturation of labile peptide structures in the published pharmaceutical literature.",
      },
      {
        rank: 6,
        name: "Labelling and refrigeration",
        summary:
          "The vial is labelled with the date of reconstitution and stored at 2–8 °C. Beyond-use dating conventions for reconstituted peptides as reported in pharmaceutical stability literature vary by compound and are the subject of ongoing published research.",
      },
    ],
    faq: [
      {
        q: "What diluent is described for peptide reconstitution?",
        a: "Bacteriostatic water for injection, USP (0.9% benzyl alcohol), is described in compounding references for multi-dose reconstitution. Sterile water for injection is described for single-use preparations. The USP monographs define both products.",
      },
      {
        q: "Why is shaking not described in the literature?",
        a: "Mechanical agitation is reported in pharmaceutical stability literature to denature peptide secondary structure and to generate foaming that introduces dosing error. The swirl-until-dissolved convention is described across pharmacy-compounding references and published peptide-handling protocols.",
      },
      {
        q: "What concentration results from 5 mg of compound in 2 mL of bacteriostatic water?",
        a: "The resulting concentration is 2.5 mg/mL, applying the standard dilution identity from USP <797>. This worked example is provided for arithmetic reference only and is not a recommendation.",
      },
      {
        q: "What is the regulatory status of the compounds frequently discussed in reconstitution literature?",
        a: "Compounds such as BPC-157, TB-500, CJC-1295, ipamorelin, and GHK-Cu are not FDA-approved for human use. The FDA's 503A bulk substances review and multiple agency warning letters to compounding pharmacies document the current regulatory posture. Reconstitution procedures are described here for research-context reference only.",
      },
      {
        q: "How long do reconstituted peptides remain stable, as reported in the literature?",
        a: "Beyond-use dating depends on the specific peptide and diluent. Published stability studies report a range of conditions. General pharmaceutical references for bacteriostatically-preserved aqueous preparations describe refrigerated storage timeframes on the order of weeks, subject to compound-specific confirmation.",
      },
      {
        q: "Should cloudy reconstituted solution be administered?",
        a: "No. USP <797> and manufacturer package inserts for FDA-approved injectable products describe visual inspection prior to administration. Persistent cloudiness, precipitation, or visible particulate matter are described as grounds for discard without use.",
      },
      {
        q: "Is sterile water for injection interchangeable with bacteriostatic water?",
        a: "Not for multi-dose preparations. Sterile water for injection contains no preservative and is described for single-use only. Bacteriostatic water contains 0.9% benzyl alcohol as a preservative and supports multi-dose use within its labelled beyond-use period.",
      },
    ],
    sources: [
      {
        label: "USP General Chapter <797>. Pharmaceutical Compounding – Sterile Preparations",
        url: "https://www.usp.org/compounding/general-chapter-797",
      },
      {
        label: "USP. Bacteriostatic Water for Injection monograph",
        url: "https://www.usp.org/",
      },
      {
        label: "Sikiric P et al.. BPC-157 preclinical review (reconstitution referenced in methods)",
        url: "https://pubmed.ncbi.nlm.nih.gov/24139076/",
      },
      {
        label: "Teichman SL et al., 2006. CJC-1295 clinical pharmacology (methods describe reconstitution)",
        url: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
      },
      {
        label: "FDA. Compounding: Bulk Drug Substances Used in Compounding (503A review)",
        url: "https://www.fda.gov/drugs/human-drug-compounding/bulk-drug-substances-used-compounding-under-section-503a-fdc-act",
      },
    ],
  },
  {
    slug: "bacteriostatic-water-vs-sterile-water",
    title: "Bacteriostatic Water vs Sterile Water",
    h1: "Bacteriostatic water vs sterile water",
    description:
      "The USP monograph differences between bacteriostatic water for injection and sterile water for injection, preservative, intended use, and beyond-use dating. Reference content. Not medical advice.",
    hub: "reconstitution",
    postType: "cluster",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 7,
    status: "published",
    items: [
      {
        rank: 1,
        name: "Bacteriostatic water for injection, USP",
        summary:
          "Sterile water containing 0.9% benzyl alcohol as a bacteriostatic preservative. The USP monograph describes its use as a diluent for multi-dose parenteral preparations.",
      },
      {
        rank: 2,
        name: "Sterile water for injection, USP",
        summary:
          "Preservative-free sterile water. The USP monograph describes single-dose parenteral use only. The absence of a preservative is the defining distinction from bacteriostatic water.",
      },
      {
        rank: 3,
        name: "Bacteriostatic sodium chloride, USP",
        summary:
          "A further variation, sterile saline with 0.9% benzyl alcohol as preservative. Included in some compounding references as an alternative diluent where tonicity matters.",
      },
      {
        rank: 4,
        name: "Preservative-free saline for injection, USP",
        summary:
          "Sterile 0.9% saline without preservative. Described in the USP monograph for single-dose use.",
      },
    ],
    ourPick: {
      name: "USP Monographs. Water and Sodium Chloride Parenteral Preparations",
      tier: "Primary reference",
      reason:
        "The USP monographs are the primary reference for composition, labelling, and intended use of parenteral diluents. Pharmaceutical compounding references and FDA-cleared manufacturer labelling cite the monographs directly.",
    },
    faq: [
      {
        q: "What does 'bacteriostatic' mean on the label?",
        a: "Bacteriostatic describes a preservative that inhibits bacterial growth within a multi-dose vial. In bacteriostatic water for injection, USP, the preservative is 0.9% benzyl alcohol, as specified in the USP monograph.",
      },
      {
        q: "Why is sterile water for injection limited to single-use?",
        a: "Sterile water for injection contains no preservative. Once a preservative-free vial is entered, the USP monograph and manufacturer package inserts describe a single-use convention consistent with infection-control practice.",
      },
      {
        q: "Is benzyl alcohol safe in the quantities present in bacteriostatic water?",
        a: "Benzyl alcohol at 0.9% is the specified preservative in the USP monograph for bacteriostatic water. Neonatal use is contraindicated per FDA labelling due to historical reports of gasping syndrome; adult parenteral use of bacteriostatic water is described in the manufacturer package inserts without the same restriction.",
      },
      {
        q: "Can tap water or distilled water be substituted?",
        a: "No. Neither tap water nor non-USP distilled water meets the sterility, endotoxin, or labelling requirements described in the USP monograph for parenteral diluents.",
      },
      {
        q: "What beyond-use date is described for opened bacteriostatic water?",
        a: "Manufacturer labelling typically describes a beyond-use period of approximately 28 days following initial entry, subject to storage conditions specified on the label. USP <797> and the product-specific labelling are the primary references.",
      },
      {
        q: "Which diluent is referenced in published research protocols for peptides?",
        a: "Published research-context reconstitution procedures commonly reference bacteriostatic water for injection, USP, for multi-dose vial preparation. Peer-reviewed clinical-trial methods sections frequently specify the diluent explicitly; non-clinical research literature typically cites the USP monograph.",
      },
    ],
    sources: [
      {
        label: "USP. Bacteriostatic Water for Injection monograph",
        url: "https://www.usp.org/",
      },
      {
        label: "USP. Sterile Water for Injection monograph",
        url: "https://www.usp.org/",
      },
      {
        label: "FDA. Bacteriostatic Water for Injection labelling (Hospira / Pfizer)",
        url: "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm",
      },
      {
        label: "USP General Chapter <797>. Pharmaceutical Compounding – Sterile Preparations",
        url: "https://www.usp.org/compounding/general-chapter-797",
      },
      {
        label: "FDA. Human Drug Compounding (regulatory overview)",
        url: "https://www.fda.gov/drugs/human-drug-compounding",
      },
    ],
  },
  {
    slug: "needle-sizes-for-peptide-injection",
    title: "Needle Sizes for Peptide Injection, 29G vs 30G vs 31G",
    h1: "Needle sizes for peptide injection",
    description:
      "Gauge and length conventions for subcutaneous injection as described in the published technique literature. Comparison of ancillary insulin-syringe products. Not medical advice.",
    hub: "supplies-and-storage",
    postType: "comparison",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 12,
    status: "published",
    medicalDisclaimer: "light",
    ourPick: {
      name: "BD Ultra-Fine Nano 31G × 5/16\" (8 mm) insulin syringe",
      tier: "Category reference",
      reason:
        "The 31 G × 5/16\" specification is the default described in Frid et al. 2016 (Mayo Clinic Proceedings) for subcutaneous administration in most adults. BD is the manufacturer most frequently referenced in US nursing-education literature.",
    },
    products: [
      {
        rank: 1,
        name: "BD Ultra-Fine Nano 31G × 5/16\" (8 mm)",
        tier: "Category reference",
        summary:
          "A widely referenced U-100 insulin syringe specification in the subcutaneous-injection technique literature. Luer-integrated needle; single-use.",
      },
      {
        rank: 2,
        name: "Easy Touch 31G × 5/16\" (8 mm)",
        tier: "Budget reference",
        summary:
          "Common secondary specification cited in patient-education references. Same gauge and length convention as the BD reference product.",
      },
      {
        rank: 3,
        name: "Covidien Monoject 31G × 5/16\"",
        tier: "Clinical reference",
        summary:
          "Hospital-brand U-100 insulin syringe carried by medical-supply distributors. Referenced in clinical-supply catalogues.",
      },
      {
        rank: 4,
        name: "BD SafetyGlide 30G × 1/2\" (12.7 mm)",
        tier: "Longer-length reference",
        summary:
          "Cited in the technique literature for cases where the 5/16\" specification does not reach subcutaneous tissue (for example, individuals with substantial adipose in a given site).",
      },
      {
        rank: 5,
        name: "NovoFine Plus 32G × 4 mm (pen needle)",
        tier: "Pen-device reference",
        summary:
          "A common pen-needle specification paired with Novo Nordisk pen devices as referenced in the Ozempic and Wegovy Instructions for Use.",
      },
    ],
    faq: [
      {
        q: "What gauge does the published technique literature describe as standard?",
        a: "Frid et al. 2016 (Mayo Clinic Proceedings) describes 4–6 mm pen needles and 31 G × 5/16\" (8 mm) U-100 syringes as appropriate for most adults receiving subcutaneous injection. The same reference describes 32 G × 4 mm as equivalent in efficacy with reduced insertion-force perception.",
      },
      {
        q: "Is higher gauge number thinner or thicker?",
        a: "A higher gauge number corresponds to a thinner needle. 31 G is thinner than 30 G, which is thinner than 29 G. The needle-diameter values are defined by the Birmingham Wire Gauge scale referenced in ISO 7864.",
      },
      {
        q: "When does the literature describe using a longer needle?",
        a: "Longer needles (for example, 1/2\" / 12.7 mm) are described in the technique literature for individuals in whom the standard 5/16\" length may not consistently reach subcutaneous tissue at a chosen site. Frid et al. 2016 discuss this scenario with reference to BMI and site selection.",
      },
      {
        q: "Is needle reuse described as acceptable?",
        a: "No. The CDC injection-safety guidance and the published injection-technique literature describe single-use needles only. Reuse has been associated with needle-tip dulling, site trauma, and lipohypertrophy risk.",
      },
      {
        q: "Are pen needles and insulin-syringe needles interchangeable?",
        a: "No. Pen needles are designed to thread onto the cartridge seal of specific pen devices and are double-ended. Insulin-syringe needles are integrated with the barrel of a U-100 syringe. The two formats are not interchangeable.",
      },
      {
        q: "What disposal method is described?",
        a: "An FDA-cleared sharps container is described in CDC injection-safety guidance and in most state-level household sharps-disposal regulations. Recapping is not described in any published safety guidance.",
      },
    ],
    sources: [
      {
        label: "Frid AH et al., 2016. New Insulin Delivery Recommendations, Mayo Clinic Proceedings",
        url: "https://pubmed.ncbi.nlm.nih.gov/27594187/",
      },
      {
        label: "CDC. Safe Injection Practices",
        url: "https://www.cdc.gov/injection-safety/hcp/clinical-safety/index.html",
      },
      {
        label: "ISO 7864. Sterile hypodermic needles for single use (reference standard)",
        url: "https://www.iso.org/standard/45087.html",
      },
      {
        label: "BD Technical Literature. Insulin Syringes product specifications",
        url: "https://www.bd.com/en-us/products/diabetes-care/insulin-syringes",
      },
      {
        label: "Ozempic (semaglutide) Prescribing Information, paired pen-needle specifications",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/209637s003lbl.pdf",
      },
    ],
  },
  {
    slug: "best-sharps-containers",
    title: "Best Sharps Containers for Home Use",
    h1: "Best sharps containers for home use",
    description:
      "Reference comparison of FDA-cleared sharps containers for home use, capacity, locking lid, wall-mount option, and mail-back disposal availability. Ancillary-product reference. Not medical advice.",
    hub: "supplies-and-storage",
    postType: "comparison",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 9,
    status: "published",
    products: [
      {
        rank: 1,
        name: "BD Home Sharps Container (1.5 qt)",
        tier: "Category reference",
        summary:
          "A 1.5-quart FDA-cleared home sharps container with locking lid and wall-mount option. The specification is consistent with EPA and state-level household-sharps disposal guidance.",
      },
      {
        rank: 2,
        name: "SharpSafety Sharps Collector (2 qt)",
        tier: "Larger-capacity reference",
        summary:
          "A 2-quart variant of the same form factor, referenced in clinical-supply catalogues for higher-volume home users.",
      },
      {
        rank: 3,
        name: "OakRidge Products Portable Sharps Container (1 qt)",
        tier: "Travel reference",
        summary:
          "A 1-quart compact form factor referenced in patient-education travel materials for short-term transport of used sharps.",
      },
      {
        rank: 4,
        name: "Dynarex Sharps Disposal Container (5 qt)",
        tier: "High-volume reference",
        summary:
          "A 5-quart container specification for home users with frequent injection schedules; referenced in medical-supply catalogues.",
      },
      {
        rank: 5,
        name: "Sharps Compliance TakeAway Recovery System",
        tier: "Mail-back reference",
        summary:
          "A consumer mail-back disposal programme, container plus prepaid return label, compliant with the FDA and US Postal Service Publication 52 guidelines for regulated medical waste.",
      },
      {
        rank: 6,
        name: "Local pharmacy take-back / DEA collection boxes",
        tier: "Non-commercial reference",
        summary:
          "Free community disposal options described in FDA guidance as the preferred method where available. Included here because the regulatory guidance frames this as the default home-disposal pathway.",
      },
    ],
    faq: [
      {
        q: "What defines an FDA-cleared sharps container?",
        a: "The FDA describes FDA-cleared sharps containers as puncture-resistant, leak-resistant on the sides and bottom, with a tight-fitting and puncture-resistant lid, a labelled biohazard marking, and an upright stable base. The Safe Needle Disposal guidance lists these criteria.",
      },
      {
        q: "Is a milk jug or detergent bottle acceptable in the published guidance?",
        a: "No. The FDA Safe Needle Disposal guidance specifically describes FDA-cleared sharps containers as the standard and notes that household containers do not meet the puncture-resistance and biohazard-labelling criteria.",
      },
      {
        q: "What is the described fill-line convention?",
        a: "Sharps container labelling describes a fill line at approximately three-quarters of internal capacity. FDA guidance describes this as the point at which the container is to be sealed and disposed of per local regulations.",
      },
      {
        q: "How are full containers disposed of?",
        a: "FDA guidance describes four pathways: drop-off at supervised collection sites (pharmacies, health departments), household hazardous-waste collection, residential special-waste pickup where offered, or mail-back programs using FDA-cleared containers with prepaid return shipping.",
      },
      {
        q: "Is mail-back disposal regulated?",
        a: "Yes. US Postal Service Publication 52 covers mailing of regulated medical waste and sharps, and mail-back disposal services operate under those regulations. FDA-cleared mail-back systems are listed on the FDA Safe Needle Disposal reference page.",
      },
      {
        q: "Are locking lids required by the guidance?",
        a: "A 'tight-fitting, puncture-resistant lid' is described in FDA guidance; many home-use containers implement this as a locking lid, though a lockable seal is not strictly required by the guidance text.",
      },
    ],
    sources: [
      {
        label: "FDA. Safe Sharps Disposal Outside of Health Care Settings",
        url: "https://www.fda.gov/medical-devices/consumer-products/safely-using-sharps-needles-and-syringes-home-work-and-travel",
      },
      {
        label: "EPA. Medical Waste Management",
        url: "https://www.epa.gov/rcra/medical-waste",
      },
      {
        label: "US Postal Service Publication 52. Hazardous, Restricted, and Perishable Mail",
        url: "https://pe.usps.com/pubs",
      },
      {
        label: "CDC. Safe Injection Practices (sharps handling)",
        url: "https://www.cdc.gov/injection-safety/hcp/clinical-safety/index.html",
      },
    ],
  },
  {
    slug: "peptide-storage-temperature-guide",
    title: "Peptide Storage Temperature Guide",
    h1: "Peptide storage temperature guide",
    description:
      "Temperature and stability references for injectable compounds, refrigerated, room-temperature, and travel conditions, as described in manufacturer package inserts and published stability literature. Reference content. Not medical advice.",
    hub: "supplies-and-storage",
    postType: "pillar",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 14,
    status: "published",
    medicalDisclaimer: "light",
    items: [
      {
        rank: 1,
        name: "Unopened refrigerated storage (2–8 °C)",
        summary:
          "The 2–8 °C refrigerated range is the most frequently specified unopened-storage condition across injectable-compound package inserts. The range is consistent with USP <659> packaging and storage requirements.",
      },
      {
        rank: 2,
        name: "In-use room-temperature allowance",
        summary:
          "Many GLP-1 pen package inserts describe an in-use allowance below 30 °C for a defined number of days following first use. Ozempic: up to 56 days. Mounjaro: up to 21 days refrigerated only per label. Zepbound: up to 21 days refrigerated only per label.",
      },
      {
        rank: 3,
        name: "Freezing excursion",
        summary:
          "Package inserts for major GLP-1 products describe freezing as grounds for discard. The USP monograph for biologic-adjacent aqueous preparations describes freeze-thaw as a denaturation risk.",
      },
      {
        rank: 4,
        name: "Reconstituted compound stability",
        summary:
          "Beyond-use dating for reconstituted compounds is compound-specific and diluent-specific. Published peptide-stability studies report ranges in days to weeks under refrigerated conditions for common aqueous preparations; the primary source for any given compound is the definitive reference.",
      },
      {
        rank: 5,
        name: "Travel and excursion logging",
        summary:
          "Cold-chain accessories (for example, evaporative or battery-powered travel coolers and Bluetooth temperature sensors) are described in patient-education literature as aids to documenting storage conditions during travel. Stability data for out-of-range excursions is compound- and duration-specific.",
      },
    ],
    faq: [
      {
        q: "What storage range do the GLP-1 package inserts specify for unopened pens?",
        a: "Ozempic, Wegovy, Mounjaro, and Zepbound prescribing information each specifies refrigerated storage at 2–8 °C (36–46 °F) for unopened pens, consistent with the USP <659> packaging and storage convention.",
      },
      {
        q: "How long is an in-use Ozempic pen stable outside the refrigerator?",
        a: "The Ozempic prescribing information describes in-use storage at room temperature below 30 °C (86 °F) or refrigerated for up to 56 days from first use. Verify against the current label at the time of use.",
      },
      {
        q: "What do the Mounjaro and Zepbound labels describe?",
        a: "The Mounjaro and Zepbound prescribing information describes refrigerated storage (2–8 °C) of unopened pens. The labels describe a limited temporary room-temperature allowance not exceeding 30 °C for up to 21 days; for current specifics consult the active FDA label.",
      },
      {
        q: "Is a pen that has been frozen usable?",
        a: "No. The prescribing information for Ozempic, Wegovy, Mounjaro, and Zepbound describes frozen product as grounds for discard. Freeze-thaw is a documented denaturation mechanism for aqueous peptide preparations in the stability literature.",
      },
      {
        q: "How is beyond-use dating for reconstituted research compounds described in the literature?",
        a: "Published peptide-stability studies report compound-specific beyond-use ranges under refrigerated conditions. Generalization across compounds is not supported by the stability literature; the primary peer-reviewed source for a given compound is the definitive reference.",
      },
      {
        q: "What tools are referenced for documenting storage conditions during travel?",
        a: "Bluetooth temperature-logging devices (for example, MedAngel) and evaporative or active-cooling cases (Frio, VIVI Cap, 4AllFamily) are referenced in patient-education literature. The logged record is the primary use case: an auditable trail of in-range storage.",
      },
      {
        q: "Does TSA permit refrigerated medications and gel-packs?",
        a: "Yes. TSA guidance permits medications and their associated ice or gel packs in carry-on luggage, subject to declaration at the screening checkpoint. The TSA 'What Can I Bring?' guidance is the current reference.",
      },
    ],
    sources: [
      {
        label: "Ozempic (semaglutide) Prescribing Information, storage section (Novo Nordisk)",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/209637s003lbl.pdf",
      },
      {
        label: "Mounjaro (tirzepatide) Prescribing Information, storage section (Eli Lilly)",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/215866s000lbl.pdf",
      },
      {
        label: "USP General Chapter <659>. Packaging and Storage Requirements",
        url: "https://www.usp.org/",
      },
      {
        label: "TSA. What Can I Bring? Medications",
        url: "https://www.tsa.gov/travel/security-screening/whatcanibring/items/medications",
      },
      {
        label: "FDA. Storing Your Medicines (general guidance)",
        url: "https://www.fda.gov/drugs/special-features/storing-your-medicines",
      },
    ],
  },
  {
    slug: "injection-site-bruising",
    title: "Injection Site Bruising. Prevention and Care",
    h1: "Injection site bruising",
    description:
      "The published literature on post-injection bruising: normal versus abnormal findings, prevention per technique-literature convention, and red-flag criteria for prescriber contact. Patient-education reference. Not medical advice.",
    hub: "troubleshooting",
    postType: "cluster",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 8,
    status: "published",
    medicalDisclaimer: "required",
    items: [
      {
        rank: 1,
        name: "Allow the antiseptic to dry fully",
        summary:
          "CDC injection-safety guidance describes allowing the alcohol prep pad to air-dry prior to insertion. Residual alcohol at the insertion point is associated with stinging and irritation in the nursing-education literature.",
      },
      {
        rank: 2,
        name: "Use a single-use needle",
        summary:
          "Needle-tip dulling with reuse is documented in Frid et al. 2016 as a contributor to tissue trauma and subsequent bruising.",
      },
      {
        rank: 3,
        name: "Apply the pinch or stretch as described for the selected needle length",
        summary:
          "Skin-pinch for short needles in lean individuals is described in Frid et al. 2016 and Perry & Potter. Correct technique reduces disruption of subcutaneous vasculature.",
      },
      {
        rank: 4,
        name: "Insert at the documented angle (90° for short needles)",
        summary:
          "The 90-degree insertion convention for 4–6 mm needles is described in the published technique literature. Oblique insertion at the wrong depth contributes to capillary disruption.",
      },
      {
        rank: 5,
        name: "Depress the plunger at a steady rate",
        summary:
          "Rapid plunger depression is described in nursing-reference literature as a contributor to local tissue pressure and small-vessel disruption.",
      },
      {
        rank: 6,
        name: "Rotate sites per the three-zone protocol",
        summary:
          "FIT injection-technique recommendations describe site rotation for prevention of lipohypertrophy and vascular-site overuse.",
      },
      {
        rank: 7,
        name: "Apply gentle pressure rather than rubbing after withdrawal",
        summary:
          "Post-injection rubbing is described in nursing-education literature as increasing small-vessel trauma. Gentle pressure with a clean gauze is the described convention.",
      },
      {
        rank: 8,
        name: "Consider needle gauge",
        summary:
          "Smaller-diameter needles (higher gauge number) are associated with reduced bruising incidence in the published technique literature (Frid et al. 2016).",
      },
      {
        rank: 9,
        name: "Be aware of anticoagulant and antiplatelet medications",
        summary:
          "Aspirin, NSAIDs, warfarin, direct oral anticoagulants, and other antiplatelet or anticoagulant agents are described in general medical reference literature as increasing bruising risk. Medication management is a prescriber-directed decision.",
      },
      {
        rank: 10,
        name: "Apply cold for the first 24 hours, warmth thereafter",
        summary:
          "The cold-then-warm convention for minor soft-tissue bruising is described in general patient-education literature; it addresses local vasoconstriction followed by perfusion support during resolution.",
      },
    ],
    faq: [
      {
        q: "Is bruising after subcutaneous injection normal?",
        a: "Small, self-limited bruising after subcutaneous injection is described as common in the injection-technique literature. Frid et al. 2016 and multiple pen-manufacturer patient-information references describe its incidence as frequent and generally self-resolving within seven to ten days.",
      },
      {
        q: "What findings warrant prescriber contact per the published guidance?",
        a: "Published nursing-reference material identifies the following as warranting contact with a prescriber: bruising accompanied by expanding redness, warmth, fever, purulent discharge, or disproportionate pain; a rapidly expanding haematoma; or bleeding that does not stop after five minutes of gentle pressure. These criteria are consistent with CDC injection-safety guidance and IDSA soft-tissue infection guidance.",
      },
      {
        q: "Why does bruising occur?",
        a: "Capillary disruption in the subcutaneous layer at the needle track is the mechanism described in nursing-reference literature. Needle gauge, insertion speed, and rubbing after withdrawal are contributing factors.",
      },
      {
        q: "Is NSAID use before injection described as a contributor to bruising?",
        a: "Aspirin and NSAIDs are described as antiplatelet agents in general pharmacology references, and their use is associated with increased bruising incidence in published surgical and procedural literature. Medication management is a prescriber decision.",
      },
      {
        q: "How does bruising differ from an injection-site infection?",
        a: "Bruising is typically non-tender or mildly tender, without warmth, and without systemic signs. Cellulitis or abscess is characterized by expanding redness, warmth, fluctuance, disproportionate pain, and possible systemic signs (fever, malaise). The IDSA guidelines on soft-tissue infection describe the distinction.",
      },
      {
        q: "What does the literature describe for care of an existing bruise?",
        a: "The general patient-education convention is cold application during the first 24 hours to reduce further extravasation, followed by warm compresses thereafter to support local perfusion and resolution. Typical resolution is described as seven to ten days.",
      },
      {
        q: "Is lipohypertrophy related to bruising?",
        a: "Lipohypertrophy is a separate phenomenon, thickening or nodularity of subcutaneous tissue at repeatedly used sites. It is described in Frid et al. 2016 and FIT recommendations as associated with non-rotation of injection sites rather than with bruising per se.",
      },
    ],
    sources: [
      {
        label: "Frid AH et al., 2016. New Insulin Delivery Recommendations, Mayo Clinic Proceedings",
        url: "https://pubmed.ncbi.nlm.nih.gov/27594187/",
      },
      {
        label: "CDC. Safe Injection Practices",
        url: "https://www.cdc.gov/injection-safety/hcp/clinical-safety/index.html",
      },
      {
        label: "Stevens DL et al., 2014. IDSA Practice Guidelines for Skin and Soft Tissue Infections",
        url: "https://pubmed.ncbi.nlm.nih.gov/24947530/",
      },
      {
        label: "Ozempic (semaglutide) Prescribing Information, injection-site reaction section",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/209637s003lbl.pdf",
      },
      {
        label: "Forum for Injection Technique (FIT). Injection Recommendations",
        url: "https://www.fit4diabetes.com/",
      },
    ],
  },
  {
    slug: "rotating-injection-sites",
    title: "Rotating Injection Sites. The 3-Zone Protocol",
    h1: "Rotating injection sites",
    description:
      "The three-zone site-rotation protocol described in Frid et al. 2016 and FIT injection recommendations, rationale, mapping, and lipohypertrophy prevention. Patient-education reference. Not medical advice.",
    hub: "injection-technique",
    postType: "cluster",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    readingTime: 7,
    status: "published",
    medicalDisclaimer: "required",
    items: [
      {
        rank: 1,
        name: "Zone 1. Abdomen",
        summary:
          "The abdominal zone, excluding a two-inch radius around the umbilicus, is described in Frid et al. 2016 as the primary site for subcutaneous administration. Absorption rates are most consistent at this site per the published pharmacokinetic literature for insulin and GLP-1 analogues.",
      },
      {
        rank: 2,
        name: "Zone 2. Anterolateral thigh",
        summary:
          "The anterior and lateral thigh is the secondary site described in FIT recommendations. The same literature notes a slightly slower absorption rate than the abdominal site for insulin preparations.",
      },
      {
        rank: 3,
        name: "Zone 3. Posterior upper arm",
        summary:
          "The posterior upper arm is the third described site. Self-administration is described as more technically demanding at this site; assisted administration is referenced in the nursing-education literature.",
      },
      {
        rank: 4,
        name: "Intra-zone spacing",
        summary:
          "Frid et al. 2016 and FIT recommendations describe a minimum spacing of approximately one centimetre between sequential injection points within a zone.",
      },
      {
        rank: 5,
        name: "Inter-zone rotation cadence",
        summary:
          "A weekly zone change, with intra-zone rotation between injections, is the convention described in the FIT injection-technique recommendations.",
      },
    ],
    faq: [
      {
        q: "What is the published rationale for site rotation?",
        a: "Frid et al. 2016 (Mayo Clinic Proceedings) and FIT injection-technique recommendations describe site rotation as the principal modifiable factor in preventing lipohypertrophy, which is associated with erratic drug absorption and reduced therapeutic consistency.",
      },
      {
        q: "What is lipohypertrophy?",
        a: "Lipohypertrophy is thickening or nodular enlargement of subcutaneous tissue at repeatedly used injection sites. It is described in the published insulin-technique literature and in Frid et al. 2016 as a consequence of non-rotation of injection sites.",
      },
      {
        q: "Do published absorption rates differ across the three zones?",
        a: "Yes. The published insulin pharmacokinetic literature describes the abdomen as the most consistent site, the thigh as slower, and the arm as intermediate. GLP-1 analogue package inserts (Ozempic, Wegovy, Mounjaro, Zepbound) describe their own absorption as not meaningfully dependent on site among the three documented zones.",
      },
      {
        q: "What spacing between sites is described?",
        a: "FIT recommendations and Frid et al. 2016 describe a minimum of approximately one centimetre between sequential injection points within a zone to avoid re-use of the same skin microsite.",
      },
      {
        q: "Is the buttock a documented injection site?",
        a: "The upper outer buttock is included as a fourth documented subcutaneous site in some nursing-reference texts, primarily for assisted administration. It is not typically included in self-administration guidance due to anatomical-access limitations.",
      },
      {
        q: "How is lipohypertrophy detected?",
        a: "Frid et al. 2016 describes palpation of injection sites as the standard detection method, firm, thickened, or nodular areas distinct from surrounding tissue. Visual inspection alone is described as insufficient.",
      },
      {
        q: "What does the guidance describe if lipohypertrophy is identified?",
        a: "The published guidance describes avoidance of the affected area until palpation returns to normal and adjustment of dose in consultation with the prescriber, as absorption from lipohypertrophic tissue is described as unreliable.",
      },
    ],
    sources: [
      {
        label: "Frid AH et al., 2016. New Insulin Delivery Recommendations, Mayo Clinic Proceedings",
        url: "https://pubmed.ncbi.nlm.nih.gov/27594187/",
      },
      {
        label: "Forum for Injection Technique (FIT). Injection Recommendations",
        url: "https://www.fit4diabetes.com/",
      },
      {
        label: "Blanco M et al., 2013. Prevalence and risk factors of lipohypertrophy in insulin-injecting patients, Diabetes & Metabolism",
        url: "https://pubmed.ncbi.nlm.nih.gov/23643352/",
      },
      {
        label: "Ozempic (semaglutide) Prescribing Information, injection site guidance",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/209637s003lbl.pdf",
      },
      {
        label: "CDC. Safe Injection Practices",
        url: "https://www.cdc.gov/injection-safety/hcp/clinical-safety/index.html",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined { return posts.find((p) => p.slug === slug); }
export function postsByHub(hubSlug: string): Post[] { return posts.filter((p) => p.hub === hubSlug); }
export function latestPosts(limit = 6): Post[] { return [...posts].sort((a,b) => (a.publishedAt < b.publishedAt ? 1 : -1)).slice(0, limit); }
export function featuredPost(): Post | undefined { return posts.find((p) => p.featured); }
export function relatedPosts(post: Post, limit = 3): Post[] { return posts.filter((p) => p.hub === post.hub && p.slug !== post.slug).slice(0, limit); }
