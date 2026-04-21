/**
 * First-draft post bodies for injectcompass.
 *
 * Keyed by slug. Each body is structured as sections the post templates can render.
 * These are patient-education drafts written to the brand book voice — they are NOT
 * peer-reviewed, not FDA-approved medical advice, and not substitutes for the
 * manufacturer package insert.
 *
 * Final production content requires:
 *  - Healthcare regulatory attorney review
 *  - Credentialed (RN/NP/PharmD) medical review
 *  - Primary-source citations (Frid et al. 2016, CDC guidance, manufacturer PIs)
 * See docs/site-spec.md §9.
 */

export type PostSection = {
  heading?: string;
  kind?: "prose" | "steps" | "callout-red" | "callout-amber" | "sources";
  body?: string;
  items?: string[];
  sources?: Array<{ label: string; url?: string }>;
};

export type PostBody = {
  intro: string;
  sections: PostSection[];
};

export const postBodies: Record<string, PostBody> = {
  "subcutaneous-injection": {
    intro:
      "Subcutaneous injection is the delivery route for most self-administered medications — GLP-1s (Ozempic, Wegovy, Mounjaro, Zepbound), insulin, growth hormone, and most peptide therapies. The technique is simple once you know the seven steps. This guide walks through each of them, with the prep details most handouts skip.",
    sections: [
      {
        heading: "What you need",
        kind: "prose",
        body:
          "Your prescribed medication at room temperature (15–20 minutes out of the fridge), a 31-gauge × 5/16-inch (8 mm) insulin syringe or pre-filled pen, a single-use alcohol swab, a sharps container within arm's reach, and a clean flat surface to stage everything. Room temperature matters — cold injections sting more and bruise more often.",
      },
      {
        heading: "The seven-step procedure",
        kind: "steps",
        items: [
          "Wash hands with soap and water for at least 20 seconds. Dry with a clean towel.",
          "Choose an injection site from the three-zone rotation (abdomen ≥2 inches from the navel, outer thigh, or back of upper arm). Rotate each dose.",
          "Clean the site in a single outward spiral motion with a fresh alcohol swab. Use one pass — do not scrub.",
          "Let the site air-dry for 30 seconds. Injecting through wet alcohol stings and carries alcohol into the tissue.",
          "Pinch a 1–2 inch fold of skin between thumb and index finger (for thin builds or thigh) OR stretch the skin flat (for abdomen with >1 inch subcutaneous fat).",
          "Insert the needle at a 90-degree angle in one steady motion. You should feel a brief sting; deep or sharp pain means you've hit muscle — withdraw and try a different site.",
          "Depress the plunger slowly and fully. Count five seconds after it bottoms out, then withdraw the needle straight out. Drop the syringe directly into the sharps container.",
        ],
      },
      {
        heading: "What a normal injection feels like",
        kind: "prose",
        body:
          "Most subcutaneous injections feel like a brief pinch at insertion and nothing at all once the needle is under the skin. The plunger usually goes in without resistance. A small amount of clear fluid at the site after withdrawal is normal; pressing a clean tissue against it for 30 seconds handles it. Some people bruise; most don't. A small red bump may appear for up to 24 hours.",
      },
      {
        heading: "Injection site rotation",
        kind: "prose",
        body:
          "Repeated injection into the same area causes lipohypertrophy — fibrotic fat that both absorbs drugs inconsistently and disfigures the tissue. The standard prevention is a three-zone rotation: left abdomen this week, right abdomen next week, then thighs, then back to abdomen. Within each zone, move at least an inch from the last injection point.",
      },
      {
        heading: "Stop and call your prescriber if",
        kind: "callout-red",
        items: [
          "Bleeding won't stop after 5 minutes of gentle pressure",
          "The site becomes progressively red, warm, or swollen over 24-48 hours (possible cellulitis)",
          "Fever above 100.4°F develops within 48 hours of injection",
          "A rapidly expanding hematoma appears under the skin",
          "Allergic-reaction symptoms: facial or throat swelling, hives, wheezing, difficulty breathing",
          "Severe persistent pain that doesn't resolve within an hour",
        ],
      },
      {
        heading: "Pinch-and-inject vs stretch — when to use each",
        kind: "prose",
        body:
          "Pinch the skin when the needle is 5/16 inch or longer and the subcutaneous layer is thin (lean build, thigh, upper arm). The pinch lifts the fat pad so the needle doesn't hit muscle. Stretch the skin flat when using a 3/16 or 5/16 inch needle in the abdomen with over an inch of subcutaneous fat — stretching creates a taut target surface and minimizes tissue bunching.",
      },
      {
        heading: "Angle and speed",
        kind: "prose",
        body:
          "90 degrees is the default for almost every self-injector. Some lean patients using longer needles shift to 45 degrees to avoid muscle penetration; your prescriber will say so if that applies. Insert in a single confident motion — slow insertion is painful and tends to skim the skin surface rather than penetrate cleanly.",
      },
      {
        heading: "Sources this guide is based on",
        kind: "sources",
        sources: [
          { label: "Frid AH et al. 2016. New Insulin Delivery Recommendations. Mayo Clinic Proceedings" },
          { label: "Heinemann L et al. 2019. Insulin pen needles: effects of extended use frequency" },
          { label: "CDC Guidelines for Safe Use of Needles and Lancets" },
          { label: "Manufacturer package inserts for Ozempic (Novo Nordisk), Mounjaro (Eli Lilly), and current FDA labeling" },
        ],
      },
    ],
  },

  "how-to-use-ozempic-pen": {
    intro:
      "The Ozempic pen looks more complicated than it is. It has three parts — the pen body, the dose selector, and the needle — and eight steps from box to injection. If you've never used one, this guide walks through each step with the pen clicks explained.",
    sections: [
      {
        heading: "Before you start",
        kind: "prose",
        body:
          "Take the pen out of the fridge 15-20 minutes before use so the medication is at room temperature. Room-temperature injections hurt less and bruise less. Check the expiration date on the pen label and the liquid — it should be clear and colorless. If cloudy, discolored, or showing particles, do not use.",
      },
      {
        heading: "The eight steps",
        kind: "steps",
        items: [
          "Wash hands. Lay out supplies: pen at room temperature, fresh needle, alcohol swab, sharps container.",
          "Remove the pen cap. Tear the paper tab off a new needle, screw the needle onto the pen, remove the outer needle cap (save it for disposal) and the inner needle cap (discard).",
          "Prime the pen: turn the dose selector to the flow-check symbol (two dots), hold the pen needle-up, and press the dose button until a drop of liquid appears. Repeat if no drop — up to 6 times. If still no drop, change the needle.",
          "Set your prescribed dose by turning the dose selector until your dose number aligns with the indicator arrow. You will hear distinct clicks as you turn — these are mechanical, not unit counts. Double-check the number in the dose window matches your prescription before proceeding.",
          "Choose an injection site from the rotation (abdomen, thigh, upper arm). Clean with an alcohol swab, let dry 30 seconds.",
          "Pinch or stretch the skin per the technique your prescriber showed you, insert the needle at a 90-degree angle in one motion.",
          "Depress the dose button fully until the dose window returns to 0. Keep the needle in place and count six seconds before withdrawing — this prevents medication backflow.",
          "Replace the outer needle cap (do not touch the needle), unscrew the needle, drop it in the sharps container. Replace the pen cap and return the pen to the fridge.",
        ],
      },
      {
        heading: "What the clicks mean",
        kind: "prose",
        body:
          "The pen clicks as you turn the dose selector because of an internal mechanical ratchet — it's a physical feedback sound, not a unit counter. The only thing that matters is the number in the dose window, which should match your prescription exactly. If the number doesn't match, turn the dose selector backward or forward to correct it.",
      },
      {
        heading: "Common pen issues",
        kind: "prose",
        body:
          "Dose button won't press: medication is cold, or there's an air gap. Prime again with the pen pointed up. No drop during priming: needle is blocked — replace it. Dose selector won't turn past a certain number: the pen may be low on medication and cannot deliver a full dose; reach out to your prescriber or pharmacist. Liquid leaks from the needle after injection: normal in small amounts, hold pressure with a tissue.",
      },
      {
        heading: "Stop and call your prescriber if",
        kind: "callout-red",
        items: [
          "You inject a dose significantly different from your prescribed dose",
          "The pen appears damaged, cracked, or leaking before use",
          "Medication has clumps, particles, or discoloration",
          "You experience symptoms of severe hypoglycemia (confusion, sweating, shakiness)",
          "Any allergic-reaction symptoms occur after injection",
        ],
      },
      {
        heading: "Storage after first use",
        kind: "prose",
        body:
          "After the first injection, the Ozempic pen can be stored at room temperature (below 86°F) for up to 56 days or in the refrigerator (36-46°F). Never freeze it. Always remove the needle before storing — leaving the needle attached can allow air into the cartridge and cause inaccurate dosing.",
      },
      {
        heading: "Sources",
        kind: "sources",
        sources: [
          { label: "Ozempic (semaglutide) FDA Prescribing Information, most current version" },
          { label: "Novo Nordisk Ozempic Patient Instructions for Use" },
          { label: "Frid AH et al. 2016 on subcutaneous injection technique" },
        ],
      },
    ],
  },

  "how-to-reconstitute-peptides": {
    intro:
      "Reconstitution is the process of dissolving a lyophilized (freeze-dried) peptide powder into a liquid solution you can draw into a syringe. The math is simple. The technique matters because shaking or rushing can denature the peptide and waste the vial. This guide is research-context education — many peptides discussed are not FDA-approved for human use. Always operate within your prescriber's pathway and FDA-compliant compounding frameworks.",
    sections: [
      {
        heading: "What you need",
        kind: "prose",
        body:
          "A sealed vial of lyophilized peptide (check that it's dry, not cloudy or liquid — if the seal has broken or the powder looks wet, discard). A vial of bacteriostatic water (0.9% benzyl alcohol preserved — not sterile water, for multi-use vials). A 1 mL or 3 mL syringe with a 23- or 25-gauge drawing needle. A fresh alcohol swab. A clean work surface.",
      },
      {
        heading: "The six-step procedure",
        kind: "steps",
        items: [
          "Calculate the bacteriostatic water volume using the Peptide Calculator. For a 5 mg vial targeting a 250 mcg dose, 2 mL of bac water yields 2.5 mg/mL — each dose is 10 units on a U-100 insulin syringe.",
          "Wipe the peptide vial stopper and the bac water vial stopper with alcohol swabs. Let both air-dry.",
          "Draw the calculated volume of bacteriostatic water into a syringe. Invert the bac water vial, draw slowly to avoid bubbles.",
          "Insert the bac water syringe into the peptide vial at a slight angle, aiming for the side wall of the vial (not directly onto the powder). Depress the plunger slowly — let the water run down the vial wall.",
          "Remove the syringe. Gently swirl the vial in a circular motion for 30-60 seconds until the powder dissolves. The solution should become clear. DO NOT shake — shaking introduces air bubbles and can denature the peptide.",
          "Label the vial with the reconstitution date, concentration (mg/mL), and your initials if sharing a space. Store per the compound's stability profile (typically refrigerated).",
        ],
      },
      {
        heading: "Do not shake — why the swirl matters",
        kind: "callout-amber",
        items: [
          "Shaking introduces air into the solution, creating bubbles that make accurate dose-drawing harder",
          "Many peptides are sensitive to mechanical stress — shaking can fragment the peptide chain and reduce potency",
          "Vigorous agitation can cause foaming, which traps peptide in the foam (lost dose)",
          "Swirling for 30-60 seconds provides sufficient mixing for all common peptides",
        ],
      },
      {
        heading: "Troubleshooting cloudy solutions",
        kind: "prose",
        body:
          "Some peptides go into solution immediately and remain clear. Others (notably BPC-157 in higher concentrations) may look slightly cloudy for the first few minutes and clear with additional gentle swirling. If a peptide remains cloudy after 5 minutes of swirling, it may have degraded in storage — do not use. Precipitation (visible particles or clumps) indicates a failed reconstitution; discard the vial.",
      },
      {
        heading: "Do not administer if",
        kind: "callout-red",
        items: [
          "The solution remains cloudy or particles are visible",
          "The bac water vial has expired or shows contamination",
          "The peptide vial was shipped without cold chain when cold chain was required",
          "The rubber stopper is compromised, pierced outside of use, or visibly damaged",
          "There is any uncertainty about the compound's identity or origin",
        ],
      },
      {
        heading: "Sources",
        kind: "sources",
        sources: [
          { label: "USP Chapter <797> Pharmaceutical Compounding — Sterile Preparations" },
          { label: "USP Chapter <1163> Quality Assurance in Pharmaceutical Compounding" },
          { label: "Published reconstitution protocols in peer-reviewed peptide pharmacology literature" },
        ],
      },
    ],
  },

  "bacteriostatic-water-vs-sterile-water": {
    intro:
      "Bacteriostatic water and sterile water are both injectable diluents, but they serve different purposes. Using the wrong one is a common mistake. Here's the actual difference and when each is appropriate.",
    sections: [
      {
        heading: "The short answer",
        kind: "prose",
        body:
          "Bacteriostatic water contains 0.9% benzyl alcohol, a preservative that inhibits bacterial growth. That means a multi-use vial reconstituted with bac water can be safely drawn from multiple times over 28 days without contamination risk. Sterile water contains no preservative — it is sterile at the time of manufacture but offers no protection once the seal is broken, so any reconstituted vial must be used within hours or discarded.",
      },
      {
        heading: "When to use bacteriostatic water",
        kind: "prose",
        body:
          "For any medication that will be drawn from the same vial over multiple days — most peptide therapy, multi-dose injectable formulations, and any compounded medication intended for repeated self-administration. The 0.9% benzyl alcohol is safe for adults at standard dose volumes but is not recommended for neonates or in very small body weights due to cumulative benzyl alcohol exposure.",
      },
      {
        heading: "When sterile water applies",
        kind: "prose",
        body:
          "Single-use injectable formulations where the entire reconstituted volume is administered in one session, pediatric-specific formulations to avoid benzyl alcohol exposure, and certain IV-preparation contexts where preservatives are contraindicated. If you are self-administering repeat doses from a single vial, sterile water is the wrong choice.",
      },
      {
        heading: "Verifying you have the right product",
        kind: "prose",
        body:
          "Look at the label. Bacteriostatic water will explicitly say 'Bacteriostatic Water for Injection USP' and list benzyl alcohol 0.9% as the preservative. Sterile water will say 'Sterile Water for Injection USP' with no preservative listed. If your supplier cannot confirm which you have received, do not use it — contact them for clarification.",
      },
      {
        heading: "After the first puncture",
        kind: "prose",
        body:
          "Standard USP guidance: a multi-dose vial of bac water is safe for 28 days after first puncture, stored per label (typically refrigerated). After 28 days, discard and replace. Mark the date of first puncture on the vial with a permanent marker the moment you first use it — this is the single most-forgotten safety practice in self-administration.",
      },
      {
        heading: "Sources",
        kind: "sources",
        sources: [
          { label: "USP Chapter <797> Pharmaceutical Compounding — Sterile Preparations" },
          { label: "FDA Guidance on Multi-Dose Vial Use" },
          { label: "CDC Infection Control in Outpatient Settings" },
        ],
      },
    ],
  },

  "needle-sizes-for-peptide-injection": {
    intro:
      "For almost every self-administering adult injecting subcutaneous peptides or GLP-1s, the correct needle is 31G × 5/16 inch (8 mm). The exceptions are specific and narrow. This guide explains which needle to use for which scenario, with $/needle math and brand recommendations.",
    sections: [
      {
        heading: "The default answer: 31G × 5/16 inch",
        kind: "prose",
        body:
          "This gauge and length is the category default for good reason — it's thin enough to minimize pain and bruising, short enough to stay in the subcutaneous layer and avoid accidental muscle injection, and widely stocked at every major needle supplier. If you are a typical adult injecting into your abdomen or thigh, this is the needle. Cost: $0.15–0.30 per needle depending on brand and bulk purchase.",
      },
      {
        heading: "Understanding gauge",
        kind: "prose",
        body:
          "Needle gauge is inversely related to thickness — a 31-gauge needle is thinner than a 29-gauge needle. Thinner needles hurt less and bruise less but may be slightly slower to draw through (not usually a meaningful delay for typical peptide viscosities). Ultra-thin needles (32G, 33G) exist but are less widely available and offer marginal benefit for most users. Thicker needles (27G, 25G) are drawing needles, used for filling syringes from a vial, not for self-injection.",
      },
      {
        heading: "Understanding length",
        kind: "prose",
        body:
          "Length options for subcutaneous use range from 3/16 inch (5 mm) to 1/2 inch (12.7 mm). 5/16 inch (8 mm) is the Goldilocks length for most adults. Shorter needles (3/16 or 4 mm) are used for very lean patients or pediatric doses. Longer needles (3/8 or 1/2 inch) are used when drawing from vials with syringe-and-needle technique (as opposed to pen-based delivery), or for patients with more than 2 inches of subcutaneous fat at the injection site.",
      },
      {
        heading: "The decision tree",
        kind: "steps",
        items: [
          "Typical adult, injecting into abdomen or thigh with a pen or syringe → 31G × 5/16 inch",
          "Lean adult (BMI under 20) with thin subcutaneous fat → 31G × 3/16 inch or 32G × 5/16 inch",
          "Higher body weight with over 2 inches of subcutaneous fat at the injection site → 30G × 3/8 inch",
          "Drawing from a vial with a syringe (not a pen) → 25G × 1 inch for drawing, then switch to 31G × 5/16 inch for injection",
          "Pediatric use → consult the prescribing pediatrician; this guide does not cover pediatric dosing",
        ],
      },
      {
        heading: "Brands we trust",
        kind: "prose",
        body:
          "BD Ultra-Fine Nano (31G × 5/16 inch) is the category standard — widely available, consistent quality, trusted by prescribers. ADW Diabetes carries Exel Comfort Point at a lower price point with equivalent specs. For pen users, NovoFine Plus 32G needles are compatible with most pens including Ozempic and Wegovy. Avoid generic unbranded syringes from non-pharmacy suppliers on Amazon — quality variance is real.",
      },
      {
        heading: "Cost per needle, rounded",
        kind: "prose",
        body:
          "BD Ultra-Fine Nano, 100-pack on Amazon: ~$25 = $0.25/needle. ADW Diabetes Exel Comfort Point, 100-pack: ~$18 = $0.18/needle. Generic private label from diabetes-supply retailers: $0.10–0.15/needle. For someone injecting weekly, annual needle cost is $12–15 — not a meaningful category to budget-optimize on. For those injecting daily, $36–55/year.",
      },
      {
        heading: "Disposal",
        kind: "prose",
        body:
          "Every used needle goes immediately into a sharps container — not into a household trash bag, not into a recycling bin, and not onto a counter. Most states have free sharps-disposal programs at pharmacies, and mail-back sharps-disposal services cost $20-30 for a small container with prepaid return. The legal requirement is that used needles never enter the waste stream unprotected.",
      },
      {
        heading: "Sources",
        kind: "sources",
        sources: [
          { label: "Frid AH et al. 2016 on insulin needle length and gauge recommendations" },
          { label: "BD Medical Technical Specifications for Ultra-Fine Nano series" },
          { label: "FDA Guidance on Sharps Disposal" },
        ],
      },
    ],
  },

  "best-sharps-containers": {
    intro:
      "A sharps container is a one-way, puncture-resistant disposal unit for used needles. Federal and state law prohibit throwing unprotected needles into household trash. This guide compares the best home-use containers, the three disposal methods, and when each makes sense.",
    sections: [
      {
        heading: "What makes a container safe",
        kind: "prose",
        body:
          "OSHA and state health departments define four requirements for a home sharps container: puncture-resistant walls (so a loose needle cannot pierce the container), a lid that locks permanently when closed (preventing accidental re-opening), leak-resistant construction (in case of residual medication), and clear labeling identifying it as biohazard waste. Off-brand or repurposed containers (coffee cans, plastic bottles) meet none of these criteria and are not legal disposal.",
      },
      {
        heading: "Size selection",
        kind: "prose",
        body:
          "For weekly injections (GLP-1s): a 1-quart container lasts 12-18 months for a single user. For daily injections (insulin): a 2-quart container lasts about 8-12 months. Travel-specific containers (8 oz portable units) fit in a toiletry bag and handle a 2-week trip. Buy one size larger than you think you need — a full container that you can't easily dispose of is worse than one with headroom.",
      },
      {
        heading: "The three disposal methods",
        kind: "steps",
        items: [
          "Mail-back services (Sharps Compliance TakeAway, Stericycle): you purchase a kit ($20-40) that includes the container and a prepaid return label. When full, seal and mail. Services are available in all 50 states and handle the regulatory paperwork.",
          "Pharmacy drop-off: Many pharmacies (CVS, Walgreens, Walmart, plus most independent pharmacies) accept sealed sharps containers for free disposal. Call ahead to confirm current policy — programs vary by state.",
          "Household hazardous-waste collection: Most counties run periodic hazardous-waste collection days that accept sharps. Search '[your county] household hazardous waste' for schedules.",
        ],
      },
      {
        heading: "Our picks",
        kind: "prose",
        body:
          "For daily home use: BD Home Sharps Container (1.5 quart, about $14 on Amazon). Wall-mount option, transparent fill-level indicator, latching lid. Category standard. For travel: SharpStar compact 8 oz container (~$8), fits a toiletry bag. For high-volume users or multi-person households: Dynarex 5-quart container, about $20, lasts multiple years. For the lowest lifetime cost including disposal: Sharps Compliance TakeAway 1-quart mail-back kit ($22 all-in, disposal included).",
      },
      {
        heading: "What not to use",
        kind: "prose",
        body:
          "Repurposed detergent bottles, plastic milk jugs, metal coffee cans, or any other household container fails at least one of the regulatory requirements and is not legal disposal in most states. Glass jars are especially dangerous — they can shatter. Ziploc bags, cardboard boxes, and paper envelopes fail the puncture-resistance requirement. The $14-20 for a proper container is the lowest-risk path.",
      },
      {
        heading: "Sources",
        kind: "sources",
        sources: [
          { label: "FDA Needle and Other Sharps Disposal Guidance" },
          { label: "OSHA Bloodborne Pathogens Standard 29 CFR 1910.1030" },
          { label: "EPA Medical Waste Regulation Overview" },
        ],
      },
    ],
  },

  "peptide-storage-temperature-guide": {
    intro:
      "Peptide stability is sensitive to temperature, light, and time since reconstitution. Storage mistakes waste expensive compounds and — in the worst case — can alter the molecule enough to affect dosing. This guide covers temperature ranges by compound state (lyophilized vs reconstituted), cold-chain requirements, and what happens when the supply chain breaks down.",
    sections: [
      {
        heading: "Lyophilized (powder) peptides",
        kind: "prose",
        body:
          "Most peptide manufacturers specify refrigerated storage (2-8°C / 36-46°F) for lyophilized vials, with freezer storage (-20°C / -4°F) for long-term storage beyond 6 months. Room-temperature stability varies by compound — some peptides (BPC-157, TB-500) are reasonably stable at room temperature for short durations (2-4 weeks), while others degrade within days. When in doubt, refrigerate.",
      },
      {
        heading: "Reconstituted (liquid) peptides",
        kind: "prose",
        body:
          "Once bacteriostatic water is added, the clock starts. Most reconstituted peptides remain stable refrigerated for 28 days — the same window as bacteriostatic water's preservative effectiveness. Some peptides degrade faster (within 7-14 days), notably those with disulfide bonds or protease-sensitive sequences. Never freeze reconstituted solutions — freezing and thawing introduces ice crystals that can fragment peptide chains.",
      },
      {
        heading: "The 24-hour temperature-excursion rule",
        kind: "prose",
        body:
          "If a refrigerated peptide sits at room temperature for less than 24 hours (pharmacy transit, travel day), stability is generally preserved for most compounds. Beyond 24 hours, potency loss becomes compound-specific and hard to predict. If a package sat on a porch in summer heat for 24+ hours, contact the supplier — don't assume the compound is still fully active.",
      },
      {
        heading: "Travel protocols",
        kind: "prose",
        body:
          "For travel under 24 hours: a small insulated pouch with one ice pack is sufficient, kept in carry-on (checked luggage is not temperature-controlled). For travel 24-72 hours: use a TSA-approved cooling case like Frio or VIVI Cap, which use evaporative or active cooling. For international travel beyond 72 hours: consider shipping compounds ahead to your destination with a compounding pharmacy partner, rather than carrying multi-day supplies.",
      },
      {
        heading: "What damages peptides in storage",
        kind: "callout-amber",
        items: [
          "Repeated freeze-thaw cycles (over 2-3 cycles can degrade disulfide-bonded compounds)",
          "Direct sunlight or UV exposure (store in original box or opaque container)",
          "Vibration or mechanical stress during shipping (shock can cause protein aggregation)",
          "Humidity exposure to lyophilized powder (introduces water that allows enzymatic degradation)",
          "Cross-contamination from needle re-insertion into the stopper (use fresh needles each draw)",
        ],
      },
      {
        heading: "Signs a peptide is no longer good",
        kind: "callout-red",
        items: [
          "Cloudy solution that doesn't clear with gentle swirling",
          "Visible particles, strings, or floaters in the reconstituted solution",
          "Color change (peptides should be colorless or very pale yellow)",
          "Unusual smell (bacteriostatic water has a faint alcohol smell; anything else is concerning)",
          "Broken seal on a vial that wasn't in your possession at the time",
          "Dry powder that has become wet or cake-like",
        ],
      },
      {
        heading: "Sources",
        kind: "sources",
        sources: [
          { label: "Manufacturer stability studies for major FDA-approved peptide therapies" },
          { label: "USP Chapter <1151> Pharmaceutical Dosage Forms — Stability" },
          { label: "Peer-reviewed stability literature for BPC-157, TB-500, and other research peptides" },
        ],
      },
    ],
  },

  "injection-site-bruising": {
    intro:
      "Bruising after a subcutaneous injection is common, mostly harmless, and usually preventable with small technique changes. The real question is when bruising is normal and when it signals something that needs a call to your prescriber. This guide gives you the decision tree and the prevention checklist.",
    sections: [
      {
        heading: "Is this normal? A decision tree",
        kind: "prose",
        body:
          "Small bruise under 2 cm, no warmth, no increasing pain, fades in 5-10 days: normal, expected, no action needed. Larger bruise (2-5 cm), spreading, mild increasing tenderness but no warmth or redness: monitor, mention at your next appointment, no urgent action. Warmth, spreading redness, fever above 100.4°F, or a rapidly expanding hematoma under the skin: call your prescriber now — possible cellulitis or significant bleed that needs evaluation.",
      },
      {
        heading: "Why bruising happens",
        kind: "prose",
        body:
          "Subcutaneous tissue is full of tiny capillaries. The needle inevitably punctures some on the way in. Usually the vessel seals itself within seconds. Sometimes it bleeds a small amount into the surrounding tissue, creating the visible bruise. The severity depends on needle gauge (thicker = more trauma), how steady the insertion was, whether you're on any blood-thinning medications, and individual capillary fragility.",
      },
      {
        heading: "The 10-point prevention checklist",
        kind: "steps",
        items: [
          "Let the alcohol swab dry fully (30 seconds) before injecting — wet alcohol stings and can cause surface irritation that looks like bruising.",
          "Use a fresh needle for every injection. Reused needles dull quickly and cause more tissue trauma.",
          "Match the needle length to your body composition — see our Needle Sizes guide.",
          "Insert the needle at a 90-degree angle in one steady, confident motion. Slow or hesitant insertions increase trauma.",
          "Depress the plunger slowly over 5-8 seconds rather than pushing it down quickly.",
          "Keep the needle in for 5-6 seconds after the plunger bottoms out before withdrawing.",
          "Press a clean gauze or tissue against the site for 15-30 seconds after withdrawal — don't rub.",
          "Rotate injection sites per the 3-zone protocol; repeated injection into the same spot compounds bruising.",
          "Avoid aspirin or NSAIDs in the 2 hours before injection when possible (discuss with your prescriber first if you take these regularly).",
          "Bring medications to room temperature before injecting — cold fluid injected into warm tissue causes more local trauma.",
        ],
      },
      {
        heading: "If you're already bruised",
        kind: "prose",
        body:
          "For the first 24 hours, cold compress (ice wrapped in a cloth, 10-15 minutes on, 10 off) reduces hematoma spread. After 24 hours, warm compress helps clear the pooled blood faster. Most bruises resolve in 7-14 days regardless of treatment. Arnica gel is commonly used but evidence is thin — harmless but not strongly supported. Avoid aspirin for the first 48 hours after a significant bruise.",
      },
      {
        heading: "Red flags — call your prescriber now",
        kind: "callout-red",
        items: [
          "Bruise is larger than 5 cm and actively expanding over 1-2 hours",
          "Bruise is warm to the touch or accompanied by fever above 100.4°F",
          "Red streaking spreading from the injection site up the arm or leg (lymphangitis)",
          "Sharp increasing pain, not mild tenderness",
          "Pus, blistering, or open skin at the site",
          "You are on blood thinners (warfarin, apixaban, clopidogrel) and have a bruise over 5 cm",
        ],
      },
      {
        heading: "Bruising vs infection — how to tell",
        kind: "prose",
        body:
          "A bruise progresses through color changes: dark red or purple at first, then green or brown, then yellow as it heals. It does not increase in warmth and does not spread through red streaks. An infection is warm to the touch, often accompanied by fever, and the red area expands with defined borders rather than fading into adjacent skin. If in doubt, photograph the site every 12 hours — an expanding red area is easier to recognize in comparison than in the moment.",
      },
      {
        heading: "Sources",
        kind: "sources",
        sources: [
          { label: "Frid AH et al. 2016 on injection-site complications and prevention" },
          { label: "CDC Infection Prevention in Outpatient Settings" },
          { label: "Clinical review: Subcutaneous injection technique — Nurse Education in Practice" },
        ],
      },
    ],
  },

  "rotating-injection-sites": {
    intro:
      "Injection site rotation is the single most important technique practice for long-term self-administration. Done well, it prevents lipohypertrophy (fibrotic fat tissue that ruins absorption) and keeps injections evenly painless. Done poorly, it can lead to lumps you can feel under the skin, erratic dosing, and visible changes to the injection area. Here's the 3-zone protocol most endocrinologists teach.",
    sections: [
      {
        heading: "Why rotation matters",
        kind: "prose",
        body:
          "Repeated injection into the same small area causes lipohypertrophy — thickened, fibrotic fat tissue that looks and feels lumpy under the skin. Beyond cosmetics, lipohypertrophy absorbs medications unpredictably. A dose delivered into lipohypertrophic tissue may be absorbed slowly or not at all, then a later dose into normal tissue absorbs normally — creating dose variability that feels like medication inconsistency. The fix is to never let any one area become over-used.",
      },
      {
        heading: "The 3-zone protocol",
        kind: "steps",
        items: [
          "Zone A: Abdomen, avoiding a 2-inch radius around the navel. The full abdominal wall (lower ribs to pubic bone, side to side) is available.",
          "Zone B: Outer thigh, upper-third. The hand's-width above the knee to a hand's-width below the hip.",
          "Zone C: Back of upper arm, if you can reach it (often requires a caregiver for reliable technique).",
          "Rotate zones weekly: Zone A this week, Zone B next week, Zone C the following, then back to A. Within each zone, use a different specific spot each day/dose.",
        ],
      },
      {
        heading: "Within-zone rotation",
        kind: "prose",
        body:
          "Within a zone, move at least an inch from your last injection point. Many patients use a mental grid: divide the abdomen into 6 quadrants (upper left, upper right, mid-left, mid-right, lower-left, lower-right) and inject sequentially. Some use a written log — a simple date + spot notation in a phone note suffices. The goal is that no specific point gets injected more than once in a 4-week window.",
      },
      {
        heading: "How to check for lipohypertrophy",
        kind: "prose",
        body:
          "Every few months, run your fingers firmly over each injection zone. Lipohypertrophy feels like a firm, raised, sometimes rubbery patch under the skin — distinct from normal subcutaneous fat. If you find a spot, stop injecting there for at least 3 months. The tissue will slowly remodel and return to normal absorption characteristics.",
      },
      {
        heading: "Common rotation mistakes",
        kind: "callout-amber",
        items: [
          "Always injecting into the same 'favorite' spot (often right side of abdomen for right-handed users)",
          "Rotating within too small an area (2-3 cm circle) — this is clustering, not rotation",
          "Skipping zones because one zone is more comfortable (eventually that zone is over-used)",
          "Not tracking injections, leading to unintentional clustering",
          "Returning to a lipohypertrophic zone too soon — it needs at least 3 months of rest",
        ],
      },
      {
        heading: "Absorption differences by zone",
        kind: "prose",
        body:
          "Subcutaneous medications absorb fastest from the abdomen, moderately from the thigh, and slowest from the buttock or upper arm. For most GLP-1s and peptides, these differences are clinically small and don't affect overall efficacy. For insulin, absorption differences matter more — many insulin users keep their mealtime doses in the abdomen and basal doses in the thigh to preserve predictable absorption profiles. If you're on insulin, discuss zone consistency with your prescriber.",
      },
      {
        heading: "Sources",
        kind: "sources",
        sources: [
          { label: "Frid AH et al. 2016 on injection site rotation protocols" },
          { label: "Gibney MA et al. 2010 on lipohypertrophy prevalence and prevention" },
          { label: "American Diabetes Association Standards of Medical Care" },
        ],
      },
    ],
  },
};
