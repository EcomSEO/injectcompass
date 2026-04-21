# InjectCompass — Site Build Spec

The complete spec for building injectcompass.com on Next.js + Vercel. Pairs with `content/injectcompass/brand-book.md`, `docs/topical-maps/injectcompass.md`, `docs/injectcompass-sample-briefs.md`, `docs/injectcompass-affiliate-partners.md`, `docs/injectcompass-competitive-analysis.md`, `docs/injectcompass-research.md`, and `CLAUDE.md`.

**Critical difference from the other sites:** InjectCompass is calculator-heavy + safety-critical. Real interactive React components with unit tests. Visual syringe SVG. Auto-generated printable PDFs. HowTo schema on every technique post. Medical disclaimer banner site-wide.

---

## 1. Information architecture

### URL structure

```
https://injectcompass.com/
https://injectcompass.com/{slug}                      # post/guide at root
https://injectcompass.com/guides/{hub-slug}           # hub landing
https://injectcompass.com/peptide-calculator         # TOP-LEVEL calculator (SEO asset)
https://injectcompass.com/reconstitution-calculator  # TOP-LEVEL calculator
https://injectcompass.com/syringe-converter          # TOP-LEVEL calculator
https://injectcompass.com/dose-schedule-builder      # TOP-LEVEL calculator
https://injectcompass.com/about
https://injectcompass.com/editorial-standards
https://injectcompass.com/medical-disclaimer
https://injectcompass.com/methodology
https://injectcompass.com/privacy
https://injectcompass.com/terms
https://injectcompass.com/affiliate-disclosure
https://injectcompass.com/contact
https://injectcompass.com/newsletter
https://injectcompass.com/sitemap.xml
https://injectcompass.com/robots.txt
https://injectcompass.com/llms.txt
```

Hub slugs:
- `guides/calculators-and-tools`
- `guides/injection-technique`
- `guides/reconstitution`
- `guides/supplies-and-storage`
- `guides/troubleshooting`

**Why calculators are top-level:** they're the site's primary SEO assets. `injectcompass.com/peptide-calculator` is cleaner and ranks better than `injectcompass.com/calculators/peptide-calculator`. All four flagship calculators get top-level slugs.

### Canonical rules

Same pattern as other sites: self-canonical, no trailing slash, www → apex 301, http → https 301.

### Breadcrumbs

Home → Guides → Hub → Post. Calculators: Home → Tools → {Calculator}.

### Global navigation (header)

```
[Logo]  Tools ▾  Guides ▾  About  Newsletter       [Download Cheat Sheet]

Tools dropdown (primary position — this site IS its tools):
  Peptide Calculator         → /peptide-calculator
  Reconstitution Calculator  → /reconstitution-calculator
  Syringe Converter          → /syringe-converter
  Dose Schedule Builder      → /dose-schedule-builder

Guides dropdown:
  Calculators & Tools        → /guides/calculators-and-tools
  Injection Technique        → /guides/injection-technique
  Reconstitution             → /guides/reconstitution
  Supplies & Storage         → /guides/supplies-and-storage
  Troubleshooting            → /guides/troubleshooting
```

Mobile: hamburger → full-screen sheet. Tools and Guides as separate flat lists. Nothing collapsed.

### Footer (4 columns)

```
Col 1 — Tools          Col 2 — Guides         Col 3 — About              Col 4 — Fine print
(4 calculators)        (5 hub links)          About InjectCompass        Privacy Policy
                                              Editorial Standards        Terms of Service
                                              Methodology                Affiliate Disclosure
                                              Medical Disclaimer         Contact
                                              Newsletter

Bottom strip:
© 2026 InjectCompass · Not medical advice · Site-wide medical disclaimer (link)
Affiliate disclosure (one sentence, always visible)
```

---

## 2. Page templates

7 templates — the 5 standard + CalculatorPage (as in larderlab) + a new **TechniquePage** template with HowTo schema as a first-class requirement.

### A — HomePage (`/`)

1. Hero — "Injections, done right." + primary CTA to the Peptide Calculator
2. **Calculator grid** (featured, above the fold) — 4 calculator cards, each linking to its tool
3. Hub grid (5 cards)
4. Latest posts + technique cards
5. Email capture — lead magnet: "Your First Injection: A One-Page Cheat Sheet"
6. Trust strip — "Every procedure cited," "Every calculator unit-tested," "Printable cheat sheet on every technique post"
7. **Medical disclaimer footer (site-wide)**
8. Footer

### B — HubPage (`/guides/{hub-slug}`)

Hub hero → hub thesis → calculator/pillar card → ranked guides → everything-else grid → email capture → medical disclaimer → footer.

### C — CalculatorPage (each flagship calculator)

The site's signature template.

1. Breadcrumbs + H1
2. Review stamp (methodology + review date)
3. **The calculator in the first screen** — inputs left, outputs right on desktop; stacked on mobile
4. **Visual syringe SVG** highlighting the calculated tick mark (required — the differentiator)
5. **Safety banner below output:** "Verify with your prescriber before administering"
6. Share/export/download row — share URL, download PDF, "email me a copy" (newsletter capture)
7. How this calculator works — the methodology
8. Worked example — a concrete scenario with the syringe at each step
9. The formula, simplified
10. Common scenarios reference table
11. When the output looks wrong (and isn't)
12. Printable cheat sheet download
13. FAQ (schema-marked)
14. Sources (numbered, DOI where available)
15. Related tools
16. Email capture
17. Medical disclaimer footer + regular footer

### D — TechniquePage (how-to posts — the site's heaviest content type)

Same as ClusterTemplate + HowTo schema requirements.

1. Breadcrumbs + H1
2. Review stamp
3. **Opening safety disclaimer banner** (standard InjectCompass language, visually distinct)
4. **Printable PDF link at the top** ("Download the one-page version")
5. 60-80 word direct answer
6. What you need (supplies checklist with cross-links)
7. **Step-numbered procedure** — HowTo schema anchor. Each step: heading, prose (2-3 sentences), optional inline illustration, optional red-box safety call-out.
8. Technique deep-dive sections (angle, pinch vs stretch, site rotation, etc.)
9. **Red-box callout**: "Stop and call your prescriber if…" — specific symptoms
10. FAQ (schema-marked)
11. Related content
12. Author bio + credentialed-reviewer byline (once onboarded)
13. Medical disclaimer footer

### E — PillarPage (long-form reference)

Same as plasticfreelab pillar with injectcompass voice + the safety banner above the intro.

### F — ClusterPage (long-tail Q&A / troubleshooting)

Same structure + required decision tree component where applicable (for troubleshooting posts).

### G — ListiclePage

Same as network standard. Max 15 items.

### H — TrustPageTemplate

Clean reading layout, breadcrumbs, h1, typographic styling.

---

## 3. Component inventory

Everything from larderlab plus:

### Calculator primitives
- `<PeptideCalculator>` — flagship calculator. Inputs: peptide mg, BAC water mL, dose. Outputs: units on U-100 syringe, mL per dose, doses per vial, visual syringe SVG with highlighted tick mark
- `<ReconstitutionCalculator>` — inputs: peptide mg, desired concentration mg/mL, output: bac water volume + the reverse
- `<SyringeConverter>` — inputs: units OR mg + concentration → outputs the other, with the visual syringe
- `<DoseScheduleBuilder>` — inputs: start date, dose, frequency, escalation plan → outputs: printable calendar PDF
- `<SyringeSvg>` — the core SVG component. Takes a unit value, renders a U-100 insulin syringe with the correct tick mark highlighted. Colorblind-safe, 2 color modes.
- `<StorageTimer>` — client-side only, localStorage-backed, counts down from reconstitution date

### Safety-critical components
- `<MedicalDisclaimerBanner>` — site-wide top strip (or footer strip) on every page
- `<TechniqueSafetyHeader>` — standard opening banner on technique posts
- `<ResearchContextBanner>` — the "not FDA-approved" banner for peptide-specific posts
- `<CallOut variant="red|amber|green">` — the three-tier safety call-out system
- `<DecisionTree>` — structured decision tree component for troubleshooting posts
- `<PrescriberVerify>` — small inline "verify with prescriber" component (next to calculator outputs)

### Print / export
- `<PrintablePDF>` — generates a one-page PDF from post content (using jsPDF or react-pdf)
- `<CalculatorShareURL>` — serializes calculator state into a URL query string

### Schema (required)
- `<HowToJsonLd>` — for every technique post. Steps array with text, image (optional), position.
- `<SoftwareApplicationJsonLd>` — for every calculator page
- `<MedicalWebPageJsonLd>` — for technique, reconstitution, and troubleshooting posts
- Standard Article / Breadcrumb / FAQ / ItemList / Organization

---

## 4. SEO technical spec

### Meta tag patterns

| Page | Title | Description |
|---|---|---|
| Home | `InjectCompass — Injection technique, calculators, and supplies` | `Calculators, printable cheat sheets, and step-numbered technique guides for people prescribed injectable medications. Patient-education only.` |
| Hub | `{Hub} — InjectCompass` | Hub thesis, trimmed |
| Calculator | `{Calculator name} with Visual Syringe — InjectCompass` | "Calculate your [dose/reconstitution/units] with a visual syringe showing the exact tick mark. Printable cheat sheet. Sources included. Free." |
| Technique | `How to {action}: [N] Steps with Visuals — InjectCompass` | "Step-numbered procedure + printable cheat sheet + safety callouts. Reviewed against [source]." |
| Troubleshooting | `{problem}: What's Normal, What's Not — InjectCompass` | Direct-answer paragraph trimmed |

### Schema by template

| Template | Schema |
|---|---|
| Home | `Organization` + `WebSite` + `SearchAction` |
| Hub | `CollectionPage` + `BreadcrumbList` |
| **Calculator** | `SoftwareApplication` + `Article` + `FAQPage` + `HowTo` (for "how the math works") |
| **Technique** | `Article` + `HowTo` + `MedicalWebPage` + `FAQPage` + `BreadcrumbList` |
| Pillar | `Article` + `MedicalWebPage` + `FAQPage` + `BreadcrumbList` |
| Cluster / Troubleshooting | `Article` + `MedicalWebPage` + `FAQPage` + `BreadcrumbList` |
| Listicle | `Article` + `ItemList` + `BreadcrumbList` |

**HowTo schema on technique posts is non-negotiable.** Google rich results validation must pass before publication.

### robots.txt

While `SITE.launched = false`: Disallow all. Post-launch: standard allow + AI crawlers explicit.

### llms.txt

```
# InjectCompass

> Practical injection technique, reconstitution math, and supply guides for people prescribed injectable medications. Calculators, printable cheat sheets, step-numbered procedures. Patient-education only — not medical advice.

## Tools
- [Peptide Calculator](https://injectcompass.com/peptide-calculator)
- [Reconstitution Calculator](https://injectcompass.com/reconstitution-calculator)
- [Syringe Converter](https://injectcompass.com/syringe-converter)
- [Dose Schedule Builder](https://injectcompass.com/dose-schedule-builder)

## Guides
- [Calculators & Tools](https://injectcompass.com/guides/calculators-and-tools)
- [Injection Technique](https://injectcompass.com/guides/injection-technique)
- [Reconstitution](https://injectcompass.com/guides/reconstitution)
- [Supplies & Storage](https://injectcompass.com/guides/supplies-and-storage)
- [Troubleshooting](https://injectcompass.com/guides/troubleshooting)

## Editorial
- [Editorial Standards](https://injectcompass.com/editorial-standards)
- [Methodology](https://injectcompass.com/methodology)
- [Medical Disclaimer](https://injectcompass.com/medical-disclaimer)
- [About](https://injectcompass.com/about)
```

### Internal linking

- Every calculator → at least 3 supporting how-to posts
- Every technique post → the relevant calculator
- Every technique post → the supplies post for needles/syringes
- Every reconstitution post → the compound-specific reconstitution subpage (when applicable)
- **Cross-network canonical rules for the peptide cluster (PepTips ↔ PepVise ↔ InjectCompass):** see `docs/injectcompass-research.md` §14. Any "how to inject" or "reconstitution" content on PepTips or PepVise should canonical to InjectCompass. This is the topical-authority unlock.

### Core Web Vitals targets

Stricter than larderlab:
- LCP < 2.0s (p75)
- INP < 200ms (p75)
- CLS < 0.05 (p75)
- JS bundle per calculator page < 150KB gzipped (calculator code lazy-loads below-fold content)

---

## 5. Calculator engineering requirements (safety-critical)

**This section is binding. Merges blocked on violations.**

### Math lives in tested pure functions

```typescript
// lib/calculators/peptide-math.ts
export function calculateUnitsPerDose({
  peptideAmountMg,
  bacWaterMl,
  desiredDoseMcg,
}: PeptideCalcInputs): CalculatorOutput {
  // Pure function. No side effects. No DOM access.
  // Returns { units, mlPerDose, dosesPerVial, concentration }
}
```

### Unit tests are required in CI

- Every calculator's math has unit tests
- Edge cases: zero inputs, negative inputs, max-boundary inputs, extreme concentrations
- Rounding: tested to ensure we round conservatively
- CI blocks merges where math tests fail

### Rounding rules (documented in `/methodology`)

- Round units to the nearest whole number (insulin syringes don't subdivide below 1 unit)
- Show the unrounded value in a secondary line for transparency
- When rounding creates >2% dose error, the calculator displays a warning and suggests adjusting bac water volume

### Input validation

- All numeric inputs validated (min, max, required)
- Nonsense combinations (e.g., concentration > 50 mg/mL) display a warning
- If the calculator cannot produce a safe output, it shows an error, not a default value

### The "verify with your prescriber" banner

- Required on every calculator output screen
- Cannot be dismissed
- Cannot be hidden behind a scroll
- Renders in the safety-callout style (amber box)

### Sharing + persistence

- Calculator state serializes to URL query params for sharing
- LocalStorage persistence for the user's last N calculations (opt-in)
- PDF export includes the calculation, the visual syringe, the date, the safety disclaimer

### Visual syringe SVG requirements

- U-100 insulin syringe shape with all tick marks
- Calculated tick mark highlighted via both color AND outline weight (colorblind-safe)
- Readable at 400px wide on mobile and 800px on desktop
- Prints cleanly to PDF in black and white

---

## 6. Trust pages — ready-to-publish copy

### 6.1 About (`/about`)

```markdown
---
title: About InjectCompass
description: Who we are, what we do, and why we built this.
layout: page
---

# About InjectCompass

InjectCompass exists because injecting yourself is physical. It is actually happening. And most of the content that comes up when you search how to do it correctly is written by people who have never done it, or by vendors trying to sell you the drug, or by bodybuilding forums trying to sell you bravado.

We built InjectCompass to be the patient-education handout you always wished was this clear. We write step-numbered procedures. We cite the nursing-education literature. We ship calculators with a visual syringe that highlights the exact tick mark. We hand you a printable cheat sheet on every page.

## What we do

- **We write step-numbered procedures.** Not prose walkthroughs. Numbered steps, every time.
- **We cite.** Every technique post cites published nursing-education literature or a manufacturer package insert.
- **We ship calculators.** Not static "use this formula" content. Real tools, with a visual syringe, with unit-tested math, with printable output.
- **We print.** Every technique post has a printable PDF cheat sheet. One page. Refrigerator-ready.
- **We version.** Manufacturer pen instructions change. FDA guidance updates. We timestamp every revision.

## What we don't do

- We don't recommend specific peptides for human use.
- We don't link to peptide vendors.
- We don't promote unapproved peptide use.
- We don't run display ads.
- We don't write first-person transformation content.
- We don't use "hack," "secret," "ultimate," or "shocking."

## Credentialed review

Launch-phase content is reviewed by The InjectCompass Editorial Team against published best-practice literature. By month 6, we add a named RN, NP, or PharmD to the masthead whose review note appears on every technique post. Until then, verify all technique guidance with your own prescriber and the manufacturer package insert.

## How to get in touch

hello@injectcompass.com — general.
corrections@injectcompass.com — spotted something wrong? We want to know.
calculators@injectcompass.com — calculator edge cases and math bug reports.

The InjectCompass Editorial Team
```

### 6.2 Editorial Standards (`/editorial-standards`)

```markdown
---
title: Editorial Standards
description: Our sourcing, testing, safety, and correction policies.
layout: page
---

# Editorial Standards

InjectCompass publishes safety-critical content. Our rules are stricter than a typical health-adjacent site.

## We are not a clinic

**Nothing on InjectCompass is medical advice.** We describe what published nursing-education literature, peer-reviewed injection-technique research, and manufacturer package inserts say. We do not diagnose. We do not prescribe. We do not recommend starting or stopping any medication.

## Sourcing

Every technique claim is cited to at least one of:

- Published nursing-education literature (textbook, peer-reviewed journal, clinical procedure manual)
- Manufacturer package insert (FDA-approved labeling)
- A peer-reviewed study on injection technique (Frid et al., Heinemann et al., similar)
- CDC / WHO / USP published standards

When guidance is mixed across sources, we state the range and default to the most conservative.

## Calculator math

- Calculator math lives in unit-tested pure functions
- CI blocks merges where tests fail
- Every calculator output displays "Verify with your prescriber before administering"
- Every calculator has a documented methodology page explaining the formula and rounding rules

## HowTo schema + safety callouts

Required on every technique post:
- HowTo schema with step-numbered procedure
- Opening safety disclaimer banner
- Red-box "Stop and call your prescriber if…" callouts with specific symptoms
- Inline citations to nursing-education sources

## Research-context framing (peptide-specific)

For any content referencing compounds that are not FDA-approved for human use (BPC-157, TB-500, CJC-1295, etc.), every page carries the standard header: **"For educational purposes. Many compounds discussed in published literature are not FDA-approved for human use. Use with prescribed, FDA-approved medications."**

## Affiliate disclosures

We earn commission on medical-supply affiliate links (syringes, sharps containers, travel cases). We disclose on every page that includes affiliate links, above the product list, in plain English. **We do not affiliate-link to peptide vendors under any circumstances.**

## Corrections

When we're wrong, we correct the text, add a dated note at the bottom of the post, and do not silently edit. Email corrections@injectcompass.com. We respond within 5 business days.

## AI tooling

We use AI tools for research synthesis and first-pass drafting. Every post is reviewed, fact-checked, and edited by a human before publication. When AI tooling materially shapes a post's conclusions, we say so.

## Versioning

Manufacturer pen instructions change. FDA labeling gets updated. When a cited source updates, affected posts get a dated revision note. Previous versions archived, not deleted.

Last updated: April 2026.
```

### 6.3 Medical Disclaimer (`/medical-disclaimer`)

```markdown
---
title: Medical Disclaimer
description: Injection is a medical procedure. This site does not provide medical advice.
layout: page
---

# Medical Disclaimer

Injection is a medical procedure. Information on InjectCompass is educational only. It is not medical advice, diagnosis, treatment, or a substitute for guidance from your prescriber.

## What we do

We publish step-numbered technique guides, reconstitution math, calculators, and reference material — all drawn from published nursing-education literature, manufacturer package inserts, and peer-reviewed injection-technique research. We cite every claim.

## What we don't do

- Diagnose any condition
- Prescribe any medication
- Tell you to start, stop, or change any medication
- Tell you to inject a specific peptide for human use
- Link to peptide vendors or compounded-peptide pharmacies
- Replace your prescriber's instructions

## Always talk to your prescriber

Before administering any injection:
- Follow the instructions your prescriber gave you
- Follow the manufacturer package insert that came with your medication
- If the instructions conflict with anything on this site, follow your prescriber

After any injection, if you experience:
- Severe pain, bleeding that won't stop, swelling, warmth, redness, fever, or pus at the site
- A rapid heartbeat, trouble breathing, facial swelling, or any sign of allergic reaction
- Severe nausea, vomiting, abdominal pain, vision changes, or any other symptom you weren't expecting

**Call your prescriber or emergency services immediately.** Do not rely on InjectCompass or any other website for acute medical decisions.

## Calculators

Every calculator on this site shows its math, its assumptions, and its limits. Every calculator output includes "Verify with your prescriber before administering." Calculators are educational reference tools — they are not validated medical devices.

## Research-context compounds

Some content on InjectCompass describes injection technique for compounds that are not FDA-approved for human use. These descriptions reference published literature and are intended for people who are administering FDA-approved medications prescribed to them. They are not instructions to administer research compounds.

## Your responsibility

By using InjectCompass, you acknowledge that you will follow your prescriber's instructions and the manufacturer package insert, that you will not use content on this site as a substitute for professional medical care, and that any health decisions you make are your own.

Last updated: April 21, 2026.
```

### 6.4 Methodology (`/methodology`)

```markdown
---
title: Methodology
description: How we research, cite, calculate, and version.
layout: page
---

# Methodology

## Technique content

Every technique post starts from one or more of:
- The relevant manufacturer package insert (most current FDA-approved version)
- Published nursing-education textbooks (Perry & Potter; Lippincott)
- Peer-reviewed injection-technique literature (Frid et al. 2016, 2020; Heinemann et al.)
- CDC or WHO published standards

When sources conflict, we default to the most conservative guidance and note the discrepancy.

## Calculator math

- Every formula is stated explicitly on the calculator's page
- Math is implemented as tested pure functions; tests run in CI
- Rounding is conservative (nearest unit, with the unrounded value shown secondarily)
- Inputs are validated; nonsense combinations produce warnings, not defaults

## PDF cheat sheets

Each technique post's PDF is auto-generated from the post content. It contains: step-numbered procedure, supply checklist, safety call-outs, citation references, and the post's last-revised date. One page when possible.

## Versioning

When a cited source updates — new package insert, new Frid et al. recommendations — we:
1. Update the affected posts
2. Add a dated revision note at the bottom
3. Archive the previous version internally
4. Note the update in the next newsletter

## Schema

- HowTo schema on every technique post (HowToStep with text, image, position)
- SoftwareApplication schema on every calculator page
- MedicalWebPage schema on every safety-critical post
- FAQPage, BreadcrumbList, Article on all applicable pages
- Rich results validation runs in CI

Last updated: April 2026.
```

### 6.5 Privacy Policy / Terms / Affiliate Disclosure / Contact

Same templates as plasticfreelab with domain swap + brand name swap + peptips-style medical framing additions where applicable. See `docs/injectcompass-sample-briefs.md` + `docs/peptips-site-spec.md` for the phrasing.

---

## 7. Homepage copy (ready to paste)

### Hero
**H1:** Injections, done right.
**Subhead:** Calculators, step-numbered technique guides, and printable cheat sheets — for people prescribed injectable medications. Patient-education only. Not medical advice.
**Primary CTA:** Open the Peptide Calculator →
**Secondary CTA:** Browse technique guides

### Calculator grid (4 cards, featured — above the fold)

1. **Peptide Calculator** — mg + bac water + dose → units on a visual syringe
2. **Reconstitution Calculator** — peptide mg + desired concentration → bac water volume
3. **Syringe Converter** — units ↔ mg with the visual tick mark
4. **Dose Schedule Builder** — start + frequency + escalation → printable calendar PDF

### Hub grid
(5 cards — see navigation § for labels)

### Email capture
**Headline:** Your First Injection — A One-Page Cheat Sheet
**Subhead:** A printable, step-numbered PDF covering supplies, technique, site rotation, and the three questions to ask your prescriber. Free.
**Button:** Send me the cheat sheet

### Trust strip
- **Every procedure cited.** Published nursing-education literature. No vibes.
- **Every calculator unit-tested.** Math in CI. No math bugs in production.
- **Printable cheat sheet on every technique post.** One page. Refrigerator-ready.

---

## 8. Lead magnet spec — "Your First Injection: A One-Page Cheat Sheet"

Format: printable PDF, 8.5×11 US Letter, one page, auto-generated from the Subcutaneous Injection pillar post content.

Sections:
- Supplies checklist (with ADW Diabetes + Amazon links in the digital version; plain text in the print version)
- 7-step procedure (numbered, each step 1 sentence)
- Visual syringe + injection-site anatomical illustration
- 3-zone rotation chart
- "Stop and call your prescriber if…" red box
- The three questions to ask your prescriber
- Date-stamped, linked to current InjectCompass post

Delivered on email signup via Beehiiv. No gate on the Subcutaneous Injection pillar itself — the PDF link is inline at the top of the post (free download) AND offered in the post-read email capture (gated on email signup). Two-step lead capture.

### Welcome email sequence (3 emails, 7 days)

**Email 1 (instant):** Your cheat sheet is attached. Here's what's in it. Link to Calculator if you're about to dose.
**Email 2 (Day 3):** The 3 supply mistakes most first-time injectors make. Links to Needle Sizes + Sharps Containers posts.
**Email 3 (Day 7):** Traveling with your medication — TSA + refrigeration + time-zone dosing. Link to Travel post.

Day 8+: weekly digest with one practical topic.

---

## 9. Launch checklist

- [ ] Domain resolves to Vercel, SSL active
- [ ] www → apex and http → https redirects
- [ ] All 9 trust pages live (About, Editorial Standards, Medical Disclaimer, Methodology, Privacy, Terms, Affiliate Disclosure, Contact, Newsletter)
- [ ] Home with featured calculator grid
- [ ] At least 1 hub page live (Calculators & Tools)
- [ ] **All 4 flagship calculators functional with unit tests passing**
- [ ] At least 10 posts with real content (not stubs)
- [ ] HowTo schema on every technique post (validated)
- [ ] SoftwareApplication schema on every calculator page (validated)
- [ ] MedicalWebPage schema on safety-critical posts
- [ ] robots.txt, sitemap.xml, llms.txt, feed.xml
- [ ] Cookie banner
- [ ] Email capture wired to Beehiiv
- [ ] Lead magnet PDF auto-generated from the Subcutaneous Injection pillar
- [ ] Welcome sequence tested end-to-end
- [ ] Analytics wired (Neon)
- [ ] Medical disclaimer footer renders site-wide
- [ ] Core Web Vitals green including 2 calculator pages
- [ ] Google Search Console + Bing verified
- [ ] Sitemap submitted
- [ ] **Healthcare regulatory attorney review complete** (per research doc §10, budget $3-5k)
- [ ] Credentialed reviewer (NP/PharmD) identified for month-6 onboarding

---

## 10. Content at launch (10 posts + 4 calculators)

1. Peptide Calculator (`/peptide-calculator`) — THE signature asset
2. Reconstitution Calculator (`/reconstitution-calculator`)
3. Syringe Converter (`/syringe-converter`)
4. Dose Schedule Builder (`/dose-schedule-builder`)
5. Subcutaneous Injection pillar (`/subcutaneous-injection`)
6. How to Inject Peptides pillar (`/how-to-inject-peptides`)
7. How to Use an Ozempic Pen (`/how-to-use-ozempic-pen`)
8. How to Reconstitute Peptides pillar (`/how-to-reconstitute-peptides`)
9. Bacteriostatic Water vs Sterile Water (`/bacteriostatic-water-vs-sterile-water`)
10. Needle Sizes for Peptide Injection pillar (`/needle-sizes-for-peptide-injection`)
11. Best Sharps Containers for Home Use (`/best-sharps-containers`)
12. Peptide Storage Temperature Guide (`/peptide-storage-temperature-guide`)
13. Injection Site Bruising — Prevention and Care (`/injection-site-bruising`)
14. Rotating Injection Sites (`/rotating-injection-sites`)

---

## 11. Handoff to Claude Code

> Read `CLAUDE.md`, `content/injectcompass/brand-book.md`, `docs/topical-maps/injectcompass.md`, `docs/injectcompass-sample-briefs.md`, `docs/injectcompass-affiliate-partners.md`, `docs/injectcompass-competitive-analysis.md`, `docs/injectcompass-research.md`, and `docs/injectcompass-site-spec.md`. Scaffold a standalone Next.js 14 app at `~/Developer/active/injectcompass-standalone` following the peptips pattern (medical framing + site-wide disclaimer).
>
> Implement:
> - All 8 page templates (Home, Hub, Pillar, Comparison, Cluster, Listicle, TrustPage, **CalculatorPage, TechniquePage**)
> - All 4 flagship calculators as real React components with the `<SyringeSvg>` output visualization, math in tested pure functions, CI-blocking unit tests
> - Full component inventory including `<HowToJsonLd>`, `<SoftwareApplicationJsonLd>`, `<MedicalWebPageJsonLd>`, `<CallOut variant="red|amber|green">`, `<DecisionTree>`, `<PrintablePDF>`, `<ResearchContextBanner>`
> - Site-wide `<MedicalDisclaimerBanner>` (required)
> - robots.ts, sitemap.ts, llms.txt/route.ts
> - All 9 trust pages including Methodology
> - Homepage per site spec §7
> - 10 post stubs + 4 calculator stubs per §10, with math placeholders and "TODO: tests" markers
> - SITE.launched = false
>
> Brand tokens: `primary #2E5A88 (clinical blue), paper #F5F1E8, moss #7A9A7E, amber #C89968, red #B74A4A, charcoal #242424`. Fonts: IBM Plex Serif (headlines) + IBM Plex Sans (body) + IBM Plex Mono (numerics).
>
> Commit as `feat: initial injectcompass site — calculators, technique templates, safety-critical schema`.

Foundation pack is complete after injectcompass scaffolds.
