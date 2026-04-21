# InjectCompass — Sample Briefs

Five anchor briefs — one per hub — that establish the format for the injectcompass editorial pipeline. Same structure as `docs/sample-briefs.md` but adapted for injection technique, calculators, HowTo schema, and safety-critical callouts.

**Keyword data below:** DataForSEO April 2026, sourced from `docs/injectcompass-research.md` §4.

---

## Brief 1: Peptide Calculator (pillar + flagship calculator — THE site's #1 priority asset)

```markdown
---
slug: peptide-calculator
site: injectcompass
hub: calculators-tools
post_type: pillar_with_calculator
target_keyword: peptide calculator
target_keyword_volume: 201000
target_keyword_difficulty: 19
secondary_keywords:
  - peptide reconstitution calculator (12100, kd 18)
  - peptide syringe chart (480, kd 6)
  - insulin syringe units to mg (320, kd 4)
  - how to reconstitute peptides (3600, kd 15)
  - peptide dosage calculator (2400, kd 16)
search_intent: tool_use
serp_dominant_format: calculator_only
word_count_target: 1200_plus_calculator
schema_types: [Article, SoftwareApplication, FAQPage, HowTo]
internal_links:
  - calculators-tools/reconstitution-calculator
  - calculators-tools/insulin-syringe-units-converter
  - reconstitution/how-to-reconstitute-peptides
  - technique/how-to-inject-peptides
analyst: The Analyst
review_status: brief
generated_at: 2026-04-21
legal_framing: research_context
medical_reviewer: required_by_month_6
---

## The opportunity
**This is the single most valuable SEO asset in the entire health network.** "Peptide calculator" is 201,000 monthly US searches at KD 19. The SERP is essentially undefended — the top results are either vendor calculators with no teaching (Amino Asylum, Limitless Life, Tailor Made Compounding) or Reddit threads. Nobody ships a calculator + visual syringe + teaching explainer + printable cheat sheet together.

Our wedge, stated plainly:
1. **A better calculator** — client-side React, saves to localStorage, shares via query string
2. **A visual syringe SVG** that highlights the exact tick mark for the calculated unit value
3. **A 600-1000 word explainer** answering "what this output means" + the math walkthrough
4. **A printable cheat-sheet PDF** auto-generated from the calculation
5. **Cross-links** to the reconstitution calculator, the technique post, and the supply guide

Realistic target: top-3 SERP position within 6 months. The calculator is the site's flywheel — every newsletter signup, every cross-link from PepTips/PepVise, every Reddit mention lands here.

## Search intent (from SEO skill Phase 1 + research doc)
- Primary intent: transactional — the reader wants to use the tool right now
- Secondary intent: informational — how does this math work
- Dominant SERP format: calculator above the fold, minimal text
- Average word count of top 10: 300-800 (mostly calculator-only)
- People Also Ask:
  - How do you calculate peptide dosage?
  - How many units is 250 mcg of semaglutide?
  - How do you convert mg to units on an insulin syringe?
  - What is the formula for reconstituting peptides?
  - How many mg are in 1 mL of reconstituted peptide?
- Featured snippet target: paragraph (~50 words) stating the formula: `dose_in_units = (desired_dose_mcg / peptide_concentration_mcg_per_mL) × 100`

## Required structure (from SERP analysis)
- H1 with primary keyword
- **The calculator itself in the first screen** — no preamble, no "welcome to InjectCompass"
- Calculator inputs: peptide amount (mg), bacteriostatic water volume (mL), desired dose (mcg or mg selectable)
- Calculator outputs:
  - Units on a U-100 insulin syringe (the main answer)
  - mL per dose
  - Number of doses per vial
  - **Visual SVG syringe** showing the exact tick mark highlighted
  - "Save this calculation as a PDF" button (jsPDF)
  - "Email me a copy" (newsletter lead capture, optional)
  - "Share this calculation" (URL with query params)
- **Safety banner directly under the output:** "Verify with your prescriber before administering. This calculator is for educational reference."
- H2: How this calculator works — the math
- H2: Worked example — 5mg BPC-157 + 2mL bac water → 250 mcg dose (step-by-step, with the visual syringe at each stage)
- H2: The formula, simplified — for readers who want to do it in their head
- H2: Common inputs and their outputs — a reference table of 10 common scenarios
- H2: When the calculator output looks wrong (and isn't)
- H2: Printable cheat sheet — download link + explanation of what it contains
- H2: FAQ (schema-marked)
- H2: Related tools — cross-links to Reconstitution Calculator, Syringe Converter, Dose Schedule Builder
- **Research-context frame:** the entire page includes the standard header: *"For educational purposes. Calculations apply to compounds discussed in published literature. Research peptides are not FDA-approved for human use."*

## Required citations
- A published reconstitution-math primer (nursing or pharmacy education literature)
- The FDA guidance on compound reconstitution where applicable
- Manufacturer package inserts for any specific drug mentioned (Ozempic, Wegovy, Mounjaro, Zepbound)
- Note on rounding: explain why we round to the nearest unit and the clinical-practice source for that convention

## Pinterest pin angles
1. "Peptide calculator with visual syringe — save this"
2. "How to calculate peptide doses — the formula + a live tool"
3. "Units to mg — the conversion, visualized"
4. "The reconstitution math, worked: 5mg + 2mL = ?"
5. "Save: the one-page peptide dosing cheat sheet"

## Editor notes
- **THE CALCULATOR MATH MUST BE UNIT-TESTED IN CI.** This is a safety-critical tool. Merges blocked on test failures. See `docs/injectcompass-site-spec.md` §Calculator engineering requirements.
- The visual syringe SVG is as important as the numerical output. Build it correctly — each tick mark labeled, the output mark highlighted, colorblind-safe (use the syringe-body color + a thick outline, not just a color change).
- The worked example must use a specific compound (BPC-157 works because it's common and the math is non-trivial) but carry the "for educational/research context" framing. Do not suggest human administration.
- The "Common inputs" reference table should include at least: semaglutide 10mg+2mL, tirzepatide 15mg+3mL, BPC-157 5mg+2mL, TB-500 5mg+5mL, Ipamorelin 5mg+2mL, GLP-1 compounded pen-volume scenarios.
- PDF output: design it to be refrigerator-ready. Logo, calculation inputs, calculation outputs, visual syringe, safety disclaimer, date-stamped. One page.
- HowTo schema: required. Walks through the math as a schema-marked procedure.
- SoftwareApplication schema: required. The calculator is literally a software application. Name, URL, application category = "HealthApplication," offers = free.
- **No affiliate links on this page.** This is a pure tool page. Affiliate links live on the Supply pages (needles, syringes, bac water).
```

---

## Brief 2: Subcutaneous Injection — The Full Guide (technique pillar)

```markdown
---
slug: subcutaneous-injection
site: injectcompass
hub: injection-technique
post_type: pillar_with_howto
target_keyword: subcutaneous injection
target_keyword_volume: 49500
target_keyword_difficulty: 24
secondary_keywords:
  - how to give subcutaneous injection (14800, kd 22)
  - subq injection sites (5400, kd 20)
  - how to give yourself a shot in the stomach (3600, kd 18)
  - 45 degree vs 90 degree injection (880, kd 15)
  - pinch and inject technique (720, kd 14)
search_intent: how_to
serp_dominant_format: procedural_article
word_count_target: 2500
schema_types: [Article, HowTo, MedicalWebPage, FAQPage]
internal_links:
  - injection-technique/how-to-inject-peptides
  - injection-technique/rotating-injection-sites
  - injection-technique/pinch-and-inject-vs-stretch
  - calculators-tools/peptide-calculator
  - supplies-storage/needle-sizes-for-peptide-injection
analyst: The Analyst
review_status: brief
generated_at: 2026-04-21
legal_framing: patient_education
medical_reviewer: required_by_month_6
---

## The opportunity
49,500/month at KD 24. Top 10: Cleveland Clinic, Healthline, MedlinePlus, Mayo Clinic, WebMD, Verywell Health. All generic, none visual-first, none with embedded cheat-sheet download, none with HowTo schema worth calling out. Our wedge: the step-numbered procedure + the printable cheat sheet + the anatomical illustrations + the HowTo schema running rich results. Realistic top-10 ranking in 90-120 days; top-5 within 6 months.

## Search intent (from SEO skill Phase 1)
- Primary intent: how-to — the reader needs to do this, probably today
- Dominant SERP format: step-numbered procedural article with visuals
- Average word count of top 5: 1,800
- People Also Ask:
  - Where is the best place to give a subcutaneous injection?
  - Do you pinch the skin for subcutaneous injection?
  - What angle for subcutaneous injection?
  - How deep should a subcutaneous injection be?
  - Can you give a subcutaneous injection in the arm yourself?
- Featured snippet target: the 7-step procedure as a numbered list (HowTo schema is the SERP feature to capture)

## Required structure
- H1 with primary keyword
- **Opening safety disclaimer** (the standard InjectCompass header, required on all technique posts): *"This is patient-education material for individuals who have been prescribed injectable medications. It is not a substitute for your prescriber's instructions or the manufacturer package insert."*
- 80-word intro: what this guide covers, who it's for (first-time + experienced self-injectors), what a subq injection is in one sentence
- **Printable cheat-sheet link at the top** — "Download the one-page version (PDF)" — generated from post content
- H2: What you need (supplies checklist, with links to the supplies posts)
- H2: The 7-step procedure (the HowTo schema anchor)
  - Step 1: Wash hands and lay out supplies
  - Step 2: Choose an injection site from the rotation chart
  - Step 3: Clean the site with an alcohol swab
  - Step 4: Let the site air-dry (30+ seconds)
  - Step 5: Pinch a fold of skin (or stretch, depending on needle + body composition)
  - Step 6: Insert the needle at 90° (or 45° in specific cases)
  - Step 7: Depress the plunger steadily, count 5 seconds after, withdraw, discard
- Each step gets: a subheading, a 2-3 sentence explanation, an inline anatomical illustration where applicable, a red-box safety call-out if there's a red flag
- H2: Injection site selection — the 3-zone rotation protocol (abdomen / thigh / upper arm)
- H2: Pinch-and-inject vs stretch — when to use each
- H2: Angle — 90° vs 45° — when the answer is which
- H2: Needle length + gauge — link to the pillar post
- H2: What a normal injection feels like vs what's not normal
- **Red-box callout:** "Stop and call your prescriber if: bleeding that won't stop after 5 minutes of gentle pressure / injection into muscle (deep pain) / persistent severe pain / signs of infection (redness, warmth, fever, pus)"
- H2: FAQ (schema-marked)
- H2: Related content — reconstitution, rotation, calculator, supplies
- Author bio + credentialed-reviewer byline (once onboarded)

## Required citations
- CDC guidance on subcutaneous injection technique
- A nursing-education source (textbook or peer-reviewed procedure article)
- Manufacturer package inserts (Ozempic, Wegovy, Mounjaro, Zepbound) for drug-specific angle/technique guidance
- A published study on site rotation and lipohypertrophy prevention

## Pinterest pin angles
1. "The 7-step subcutaneous injection procedure — printable"
2. "The 3-zone rotation chart for GLP-1 users"
3. "Pinch vs stretch: which technique, when"
4. "Save: the one-page injection cheat sheet"
5. "Subcutaneous injection, step by step"

## Editor notes
- **HowTo schema is mandatory.** Each of the 7 steps is a HowToStep with `text`, `image` (optional but preferred), and `position`. Google rich-results validation must pass before publication.
- **Printable PDF is the lead magnet for this post.** Even without email gating, the PDF is offered inline at the top. Email-gated version is the "Your First Injection" lead magnet (same PDF, captured via newsletter signup).
- Use anatomical line-drawing SVGs, not photographs. Keep the visual language clinical but warm (ink + paper + copper brand colors).
- The red/amber/green callout system is consistent with the brand book §5. Red only for true emergency indicators. Amber for "pause and check." Green for success confirmation ("You should feel normal within 60 seconds").
- **No first-person voice.** No "I always find it easier to..." — always "most people find it easier to..."
- The FAQ section should answer the PAA questions literally, in the same language the reader is searching.
```

---

## Brief 3: How to Reconstitute Peptides (reconstitution pillar + research-context framing)

```markdown
---
slug: how-to-reconstitute-peptides
site: injectcompass
hub: reconstitution
post_type: pillar_with_howto
target_keyword: how to reconstitute peptides
target_keyword_volume: 3600
target_keyword_difficulty: 15
secondary_keywords:
  - peptide reconstitution (2900, kd 17)
  - how to mix peptides with bacteriostatic water (1900, kd 12)
  - peptide reconstitution steps (720, kd 10)
  - how much bac water for 5mg peptide (480, kd 8)
  - peptide vial mixing technique (320, kd 7)
search_intent: how_to
serp_dominant_format: procedural_article
word_count_target: 2200
schema_types: [Article, HowTo, MedicalWebPage, FAQPage]
internal_links:
  - calculators-tools/reconstitution-calculator
  - calculators-tools/peptide-calculator
  - reconstitution/bacteriostatic-water-vs-sterile-water
  - reconstitution/cloudy-peptide-troubleshooting
  - reconstitution/bubbles-in-syringe
analyst: The Analyst
review_status: brief
generated_at: 2026-04-21
legal_framing: research_context_strict
medical_reviewer: required_by_month_6
---

## The opportunity
3,600/month at KD 15 — very accessible. Top 10 is a mix of peptide vendor content (commercial-biased) and Reddit (no structure). A clean step-numbered procedure with the Reconstitution Calculator embedded mid-post ranks top-3 within 90 days. This post also cross-links heavily to the compound-specific reconstitution pages (BPC-157, TB-500, etc.) and is the canonical parent for that cluster.

## Search intent
- Primary intent: how-to — the reader has a vial in front of them, needs to mix it now
- Dominant SERP format: step-numbered procedure with math worked example
- Average word count of top 5: 1,600
- People Also Ask:
  - How do you mix bacteriostatic water with peptides?
  - How much bac water do I use?
  - Do you shake or swirl peptides when reconstituting?
  - Can you reconstitute peptides with regular water?
  - How long do reconstituted peptides last?
- Featured snippet target: the 6-step reconstitution procedure as a HowTo-schema numbered list

## Required structure
- H1 with primary keyword
- **Opening safety + research-context banner (DOUBLE disclaimer, required for this hub):**
  - InjectCompass standard: "This is patient-education material..."
  - Research-context addendum: "Many of the compounds discussed in published reconstitution literature are not FDA-approved for human use. This guide describes the technique as published in peer-reviewed and nursing-education sources. Use with prescribed, FDA-approved medications. Do not use with research compounds for human administration."
- 60-word intro: what reconstitution means, when you need to do it, what this guide walks through
- H2: What you need (supplies — link to supplies post)
- H2: The 6-step reconstitution procedure (HowTo schema anchor)
  - Step 1: Calculate the bac water volume (embed the Reconstitution Calculator here)
  - Step 2: Prepare the workspace
  - Step 3: Draw up the bac water
  - Step 4: Slowly add the bac water to the peptide vial (angle matters)
  - Step 5: Gently swirl (do not shake) until fully dissolved
  - Step 6: Label and refrigerate
- H2: Worked example — 5mg compound + 2mL bac water → 2.5 mg/mL concentration
- H2: Why volume + dose matters more than "brand of bac water"
- H2: Troubleshooting — cloudy solution, precipitation, stuck stopper (links to deep-dive posts)
- H2: Storage after reconstitution — cross-link to storage pillar
- **Red-box callout:** "Do not administer if: cloudy and won't clear / particulate matter visible / expired bac water / any sign of contamination. Discard and start over."
- H2: FAQ (schema-marked)
- H2: Compound-specific guides (links to BPC-157, tirzepatide compounded, etc.)

## Required citations
- USP standards on compounded sterile preparations
- A nursing-education reconstitution procedure (e.g., Perry & Potter textbook)
- Manufacturer package inserts where relevant
- Published stability studies for common peptide compounds

## Pinterest pin angles
1. "Peptide reconstitution: the 6-step procedure"
2. "Bac water math, worked: 5mg + 2mL = what"
3. "Save: the reconstitution checklist"
4. "Peptide reconstitution troubleshooting tree"

## Editor notes
- **The research-context language is legally load-bearing.** Do not soften it. Do not move it. Every compound-specific subpage (BPC-157, TB-500, etc.) inherits this frame.
- The Reconstitution Calculator embed is mid-post because it's the tool readers will use once they've understood the procedure. The Peptide Calculator (from Brief 1) is linked for dose math; the Reconstitution Calculator is linked here for volume math.
- HowTo schema is mandatory.
- "Do not shake" rule is counterintuitive — treat it as its own callout with the citation, because readers will ignore it otherwise.
- Link to every compound-specific reconstitution post (topical map #73 onward) for long-tail traffic capture.
```

---

## Brief 4: Injection Site Bruising — Prevention and Care (troubleshooting)

```markdown
---
slug: injection-site-bruising
site: injectcompass
hub: troubleshooting-edge-cases
post_type: cluster_troubleshooting
target_keyword: injection site bruising
target_keyword_volume: 3600
target_keyword_difficulty: 18
secondary_keywords:
  - ozempic bruising (2400, kd 22)
  - bruising after insulin injection (1300, kd 15)
  - how to prevent injection bruises (880, kd 14)
  - bleeding after injection (720, kd 13)
  - injection site reaction (2900, kd 20)
search_intent: troubleshooting
serp_dominant_format: explainer_with_triage
word_count_target: 1800
schema_types: [Article, FAQPage, MedicalWebPage]
internal_links:
  - injection-technique/subcutaneous-injection
  - injection-technique/rotating-injection-sites
  - supplies-storage/needle-sizes
  - troubleshooting/infection-red-flags
analyst: The Analyst
review_status: brief
generated_at: 2026-04-21
legal_framing: patient_education
medical_reviewer: required_by_month_6
---

## The opportunity
3,600/month at KD 18. The SERP has Healthline, Mayo, Verywell, and a scattering of pen-manufacturer FAQs. Most answers are 3-paragraph "this is normal, call if X" with no decision tree. Our wedge: a proper triage decision tree ("Is this normal? Is this serious? When to call?") + prevention checklist + cross-link to technique + needle choice. Rank top-5 in 60-90 days.

## Search intent
- Primary intent: triage + prevention — reader just bruised, wants to know if it's okay
- Dominant SERP format: explainer with clear normal/not-normal distinction
- Average word count of top 5: 1,200
- People Also Ask:
  - Is bruising normal after Ozempic injection?
  - How long does bruising from injection last?
  - How do you prevent injection bruises?
  - What's the difference between a bruise and a hematoma?
  - Why do I bruise so easily from injections?
- Featured snippet target: 60-word paragraph summarizing when bruising is normal

## Required structure
- H1 with primary keyword
- Standard safety disclaimer
- 60-word direct answer: bruising after subcutaneous injection is common and usually harmless; here's what's normal, what's not, and what prevents it
- H2: Is this normal? (a decision tree)
  - Branch 1: Small bruise, <2cm, no warmth, no increasing pain → normal, expected, fades in 7-10 days
  - Branch 2: Larger bruise, spreading, increasing pain → monitor, not emergent, discussion-worthy at next appointment
  - Branch 3: Warmth + redness + fever OR rapidly expanding hematoma OR significant pain → call prescriber now (red box)
- H2: Why injection bruising happens (brief: capillary rupture, needle size, site)
- H2: The prevention checklist (7-10 items)
  - Let the alcohol dry fully
  - Don't re-use needles (dullness causes tissue trauma)
  - Pinch or stretch properly
  - Insert at 90° in most cases
  - Depress the plunger slowly, count 5 seconds after
  - Rotate sites per the 3-zone protocol
  - Avoid Aspirin/NSAIDs within 2 hours of injection when possible (+ the usual caveat to discuss with prescriber)
  - Apply gentle pressure (not rubbing) post-injection
  - Smaller needle gauges (31G vs 29G) bruise less
  - Warm the injection site briefly before injecting
- H2: If you're already bruised — care protocol (cold for first 24h, warm after, timeline of healing)
- H2: When to call your prescriber (the red-box items, again)
- H2: How to tell bruising from a more serious reaction (cellulitis / abscess / allergic reaction)
- H2: FAQ (schema-marked)

## Required citations
- CDC / nursing-education literature on post-injection care
- A published source on needle gauge and site trauma (e.g., Frid et al. on subcutaneous injection technique)
- Manufacturer package inserts where relevant
- A clinical reference on distinguishing bruising from cellulitis/infection

## Pinterest pin angles
1. "Injection bruising — normal vs not: the decision tree"
2. "10 ways to prevent injection bruises"
3. "Save: the post-injection care protocol"
4. "When to call your prescriber — the red flags"

## Editor notes
- **The decision tree is the artifact.** Design it to screenshot well. Three branches, clear language, red box for branch 3.
- Infection red flags must be unambiguous. The reader may be scared. Give them the "call now" signs in a distinct callout, then cross-link to the Infection Red Flags post for depth.
- Prevention checklist should cross-link generously — to the subcutaneous injection post for technique, to needle-size post for gauge, to site rotation post for the protocol.
- Do not editorialize on NSAIDs. The guidance is "discuss with your prescriber" because the tradeoff (cardiovascular/pain/stroke prevention vs minor bruising) is not ours to make.
```

---

## Brief 5: Needle Sizes for Peptide Injection (supplies pillar + commercial-intent)

```markdown
---
slug: needle-sizes-for-peptide-injection
site: injectcompass
hub: supplies-storage
post_type: pillar_commercial
target_keyword: needle sizes for peptide injection
target_keyword_volume: 4400
target_keyword_difficulty: 23
secondary_keywords:
  - insulin needle size (4400, kd 23)
  - 31 gauge needle (2400, kd 20)
  - 29g vs 30g vs 31g (880, kd 14)
  - best needle for subcutaneous injection (590, kd 17)
  - what size needle for ozempic (1600, kd 19)
  - what size needle for peptides (720, kd 12)
  - 5 16 inch needle (480, kd 13)
search_intent: commercial_informational
serp_dominant_format: buyer_guide_with_specs
word_count_target: 2800
schema_types: [Article, ItemList, FAQPage, Product_per_recommendation]
internal_links:
  - injection-technique/subcutaneous-injection
  - injection-technique/rotating-injection-sites
  - supplies-storage/best-insulin-syringes
  - supplies-storage/alcohol-swabs
  - calculators-tools/peptide-calculator
analyst: The Analyst
review_status: brief
generated_at: 2026-04-21
legal_framing: patient_education
medical_reviewer: required_by_month_6
has_affiliate_links: true
---

## The opportunity
4,400/month on the seed term, 2,400/month on "insulin needle size," plus a cluster of KD ≤20 modifiers. Total capture ~12k/month at an average KD of ~19. Amazon affiliate backbone — insulin syringes are ~$15-50 purchases, 3-4% commission, but extremely high purchase intent. The SERP is dominated by vendor pages (BD, Easy Touch brand sites) and Healthline-style generic content. Our wedge: a needle-size decision tree matched to body composition + injection-drug + site, plus specific brand recommendations with third-party testing notes and $/needle math.

## Search intent
- Primary intent: commercial informational — the reader needs to buy needles and wants the right specs
- Dominant SERP format: explainer with comparison table
- Average word count of top 5: 2,000
- People Also Ask:
  - What size needle do you use for Ozempic?
  - What is the difference between 29 and 30 gauge?
  - Which needle is least painful?
  - How long should a subcutaneous needle be?
  - Are insulin syringes the same as peptide syringes?
- Featured snippet target: comparison table with gauge, length, typical use case

## Required structure
- H1 with primary keyword
- Standard safety disclaimer
- Affiliate disclosure banner (FTC-compliant, above the product list — InjectCompass `<AffiliateDisclosure>` component)
- 80-word intro: the answer is almost always 31G × 5/16" for most self-injectors, but there are three exceptions — this guide covers all of them
- H2: The quick answer — 31G × 5/16" for most adults injecting GLP-1s or peptides in the abdomen
- H2: Decision tree — when 30G, when 29G, when ½" length
  - By body composition (leaner → shorter, more subcutaneous fat → longer)
  - By injection site (abdomen vs upper thigh — different fat depth)
  - By compound (more viscous compounds need wider gauge)
- H2: Understanding gauge (higher number = thinner; 31G is thinner than 29G)
- H2: Understanding length (5/16" = 8mm, shortest commonly available; 3/8" = 10mm; 1/2" = 12.7mm)
- H2: The comparison table — 29G, 30G, 31G, 32G with: gauge number, needle diameter (mm), typical price per needle, who it's for
- H2: Specific brand picks (commercial-intent section, our recommendations)
  - Best overall: BD Ultra-Fine Nano 31G × 5/16" (Amazon link, $/needle, Amazon Basics alternative noted)
  - Best budget: Easy Touch 31G × 5/16" (Amazon link, $/needle, tradeoff noted)
  - Best for viscous compounds: BD 29G × 1/2" (when needed — Mounjaro/Zepbound vial-and-syringe use case)
  - Best for lean body composition: BD 32G × 3/16" (rare availability, noted)
  - International / bulk: Exel 31G × 5/16" (ADW Diabetes direct — link, $/needle)
- H2: What NOT to use (name specific failing products)
  - Generic unbranded Amazon syringes — highly variable quality
  - Acupuncture-grade needles (non-sterile for injection)
  - Glass syringes without single-use certification
- H2: Where to buy (Amazon, ADW Diabetes, Diabetes Warehouse) — cost per needle at each
- H2: Disposal — cross-link to sharps container post
- H2: FAQ (schema-marked)

## Required citations
- Frid et al. 2016 (*Mayo Clin Proc*) — injection technique guidelines including needle length/gauge recommendations
- Manufacturer technical specs (BD, Becton-Dickinson)
- A published source on needle gauge and pain perception

## Pinterest pin angles
1. "The needle-size decision tree for peptide injection"
2. "29G vs 30G vs 31G — a visual comparison"
3. "Save: the needle size cheat sheet by injection site"
4. "What size needle for Ozempic? A clear answer"

## Editor notes
- **This is the highest-converting affiliate page at launch.** Prices dated, links `rel="sponsored nofollow noopener"`, disclosure above the fold.
- Include ADW Diabetes (direct affiliate) alongside Amazon — ADW pays better commission and is a medical-supply specialist (adds credibility).
- The comparison table must include $/needle calculated at two purchase-quantity tiers (e.g., 100-pack vs 500-pack). Cost-conscious readers want the math.
- Do not recommend any generic unbranded syringe. The brand matters here — counterfeit and out-of-spec needles are a known Amazon problem.
- Link to the Peptide Calculator because the needle-size decision depends on concentration (mg/mL after reconstitution) — the reader may need to revise both together.
- Affiliate disclosure above the fold is not optional. Enforced via the `<AffiliateDisclosure>` component per `docs/injectcompass-site-spec.md` §4.
```

---

## How Claude Code generates the rest

```
For injectcompass, hub {hub}:
1. Read content/injectcompass/brand-book.md (voice + legal framing)
2. Read docs/topical-maps/injectcompass.md (post list)
3. Read docs/injectcompass-sample-briefs.md (format reference)
4. Read docs/injectcompass-research.md (keyword data — DataForSEO April 2026)
5. For each post in the topical map under hub {hub} that doesn't have a brief in content/injectcompass/briefs/:
   a. Use Semrush MCP (or the embedded DataForSEO data) to confirm keyword data
   b. Run the SEO skill Phase 1 SERP intelligence on the target keyword
   c. Generate a brief matching the format above
   d. For technique posts, confirm HowTo schema + safety callout requirements
   e. For calculator posts, specify the calculator's inputs/outputs/unit tests
   f. Save to content/injectcompass/briefs/{slug}.md
6. Report with the list of briefs generated.
```

Run hub-by-hub. Expect ~25-30 briefs per hub. Calculator + Technique hubs are the Wave 1 priority.
