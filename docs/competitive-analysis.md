# InjectCompass — Competitive Landscape Analysis

**Prepared:** April 2026
**Scope:** SERP analysis for Wave 1 priority keywords + broader competitor landscape + positioning moves.
**Target audience:** "Rachel, 36, first-time GLP-1 injector" (primary) + "Chris, 42, experienced researcher" (secondary).
**Source data:** DataForSEO (April 2026) via `docs/injectcompass-research.md` + live SERP observations.

**Headline finding:** InjectCompass sits on the most undervalued set of keywords in the network. "Peptide calculator" at 201k vol / KD 19 is essentially undefended. The technique and reconstitution SERPs are dominated by Healthline/WebMD/Mayo — high-authority but generic, visual-weak, and without calculators. A site that ships **calculators + HowTo schema + printable cheat sheets + safety-critical callouts** can dominate this space within 6-12 months.

---

## Part 1 — Keyword-level SERP analysis

### 1.1 "Peptide calculator" (201,000 vol / KD 19) — THE prize

**Live top 10:**

| Rank | Domain | Type | Wedge observed |
|---|---|---|---|
| 1 | Vendor calculator site (e.g., Amino Asylum) | Tool only | No teaching, no cheat sheet, commercial-first |
| 2 | Limitless Life calculator | Tool only | Same pattern |
| 3 | Muscle Chemistry forum | Thread | Unstructured, outdated |
| 4 | YouTube video | Video | Limited SERP dominance |
| 5 | Reddit r/Peptides | Thread | No authoritative structure |
| 6 | bodybuilding.com thread | Thread | Amateur guidance, no vetting |
| 7 | Tailor Made Compounding calculator | Tool only | Commercial bias |
| 8 | cheminst.com academic | Reference | Too technical for Rachel, useful for Chris |
| 9 | Reddit r/SARMs | Thread | Same issue as r/Peptides |
| 10 | Unknown minor calculator | Tool only | Same pattern |

**Structural gaps:**
- No top-10 result combines calculator + visual syringe + teaching explainer + printable cheat sheet
- No top-10 result has HowTo schema on the math walkthrough
- No top-10 result has editorial authority signals (named reviewer, methodology page, citations)
- Every vendor site has obvious commercial bias

**Displacement target:** Any of ranks 3-10 (the forum/Reddit/vendor mix). We beat them by being editorial + tool + instructional.

**Realistic ranking timeline:** Top-5 within 6 months. Top-3 within 9-12 months. Requires the calculator to actually work + HowTo schema + sustained backlinks.

**PFL-style wedge for InjectCompass:**
1. **The calculator is the content.** Client-side React with visual syringe SVG highlighting the correct tick mark.
2. **The math walkthrough renders as HowTo schema** — Google rich result eligibility.
3. **The printable PDF download** with date-stamped calculation is a Reddit-shareable artifact.
4. **Credentialed reviewer in the masthead** (by month 6) + methodology page = E-E-A-T signals none of the vendors have.

### 1.2 "Subcutaneous injection" (49,500 vol / KD 24)

**Live top 10:** Cleveland Clinic, Healthline, MedlinePlus, Mayo Clinic, WebMD, Verywell Health, dominating positions 1-6.

**Structural gaps:**
- All generic, none visual-first
- None have printable PDF cheat sheets
- None have embedded calculators
- HowTo schema is present on some but often incomplete
- Patient-handout design language is absent — the top results read like medical textbooks, not like the handout your NP would actually hand you

**Displacement target:** positions 7-10 (weaker results). Then push into the top 6 over 12+ months as authority builds.

**Realistic timeline:** Top-10 within 6 months. Top-5 requires compound authority (backlinks + brand mentions) — 12-18 months.

**Wedge:**
1. Step-numbered HowTo schema with images — full rich-results eligibility
2. Printable cheat sheet offered inline, not buried
3. Anatomical line drawings as SVG (not stock photos)
4. Decision tree for "angle / pinch / site / needle" decisions
5. Safety callouts with specific red-flag symptoms (vs generic "call your doctor" in competitors)

### 1.3 "How to inject peptides" (1,900 vol / KD 3) — trivial to rank

**Live top 10:** Mostly bodybuilding forums and commercial peptide sites. Essentially no editorial authority in this SERP.

**KD 3 means:** any half-competent editorial site ranks top-3 in 60-90 days. This is the fastest win in the entire network.

**Wedge:** ship a quality pillar + cross-link from the technique cluster + HowTo schema. Done.

### 1.4 "How to use ozempic pen" (33,100 vol / KD 30)

**Live top 10:** Novo Nordisk (manufacturer, #1), Ozempic.com official, Healthline, CVS, Walgreens, various pharmacy sites, YouTube.

**Observation:** The manufacturer sites are hard to beat on SERP position — they have authority. But they're instruction sheets, not patient-education. A well-produced patient-education post with step-numbered procedure + printable PDF + cross-links to side-effect context (PepTips) + reconstitution context (PepVise) ranks 4-8 within 6 months.

**Wedge:**
1. First-person POV video (Phase 2) — manufacturer pages never do this
2. Pen-click explainer (the clicks are confusing to new users; no top-10 result explains them clearly)
3. Troubleshooting section for common pen issues
4. Cross-site canonical: this post serves as the InjectCompass technique asset, while PepTips canonicals to it for GLP-1-specific audience

### 1.5 "Bacteriostatic water" (27,100 vol / KD 22)

**Live top 10:** Mostly product-listing pages (Amazon, medical supply retailers) + a few vendor content-marketing pages.

**Structural gap:** Nobody has a proper "bac water vs sterile water" explainer with the use-case decision tree.

**Wedge:** our Bacteriostatic Water vs Sterile Water post (Wave 1 Brief 3 context) ranks well here because we're the only editorial source explaining the distinction properly + linking to reconstitution calculator + citing the literature.

### 1.6 "Injection site bruising" (3,600 vol / KD 18)

**Live top 10:** Healthline, Mayo, Verywell, a few pen-manufacturer FAQs, a few pharmacy blogs.

**Structural gap:** No proper decision tree. Every top-10 result is 3-paragraph "mostly normal, call if X" without a structured triage.

**Wedge:** The decision tree IS the artifact. Pinterest-saveable, Reddit-shareable. Cross-links to needle-size post (smaller gauge = less bruising) and injection-technique post.

### 1.7 "Lipohypertrophy" (1,600 vol / KD 28)

**Live top 10:** Medical literature + patient-advocacy sites. Weak on visual + protocol.

**Wedge:** Visual diagram of a lipohypertrophy site + the 3-zone rotation protocol as prevention + clear identification (tap the skin, compare texture).

---

## Part 2 — Broader competitor landscape

### Category competitors (ranked by threat level)

| Competitor | Strengths | Weaknesses we exploit | Threat level |
|---|---|---|---|
| **Healthline** | High DA, broad coverage | Generic, non-visual, no calculators, no printable PDFs, weak on peptide-specific | Medium — we beat them on specificity |
| **Mayo Clinic** | Highest institutional trust | Extremely generic, doesn't go deep on technique | Low — they won't engage this niche |
| **Cleveland Clinic** | High trust, decent content | Similar to Mayo | Low |
| **WebMD / MedlinePlus** | High DA | Weak content depth, no tools | Low |
| **Manufacturer patient sites (Novo Nordisk, Lilly)** | First-party authority | Only cover their own products, no cross-drug comparison, promotional tone | Medium — they own the manufacturer-specific SERPs but not the cross-category ones |
| **YouTube channels (scattered)** | Video advantage | Unverified, unindexed for SEO, inconsistent quality | Medium — video is the format we need to enter (Phase 2) |
| **Reddit (r/Peptides, r/Ozempic, r/Mounjaro)** | Real-world Q&A, huge community | No structure, conflicting answers, no editorial | Low — we ally with Reddit (share calculator links there organically), not compete |
| **Vendor calculators (Amino Asylum, Limitless, Tailor Made)** | Domain presence on "peptide calculator" SERP | Obvious commercial bias, no teaching, no cheat sheet, tool-only | **Primary displacement target** |
| **Forum threads (Muscle Chemistry, bodybuilding.com)** | SERP presence | Amateur, outdated, no safety callouts | Easy displacement |

### Sites we'd like to be cited BY

- Peter Attia's newsletter
- Ben Greenfield's newsletter
- Reddit r/Peptides, r/Ozempic, r/Mounjaro (organic link-sharing)
- Patient-advocacy blogs (diabetes + GLP-1 focused)
- Sports nutrition newsletters (for reconstitution math + supplies)
- PepTips and PepVise internally (part of the same network — cross-link aggressively)

---

## Part 3 — 10 positioning moves for InjectCompass

These are the concrete, format-level moves that stack across the site to build the wedge.

### 1. Ship the Peptide Calculator as a real interactive tool, not a static page

Every top-10 vendor calculator works but teaches nothing. We build the calculator + 600-word methodology page + visual syringe SVG + printable PDF. The combined experience is 10× the competition.

### 2. Build HowTo schema into every technique post from day one

Every top-10 competitor either doesn't have HowTo schema or has it incomplete. We ship complete HowTo schema with HowToStep images, positions, and text for every step. Rich results become a ranking advantage + trust signal.

### 3. Auto-generate printable PDF cheat sheets for every technique post

Offered inline at the top of the post (free download) and as an email-gated lead magnet. No competitor does this at scale. The printed PDF becomes a physical artifact on the reader's fridge — a retention and word-of-mouth mechanism.

### 4. Credentialed-reviewer masthead by month 6

Launch under "The InjectCompass Editorial Team" + add a named RN, NP, or PharmD by month 6 per the research doc §10 budget. Every technique post gets "Medically reviewed by [Name, credentials], last reviewed [date]." This is the highest E-E-A-T signal Google rewards on YMYL content.

### 5. Visual syringe SVG as the calculator's output

Every vendor calculator outputs a number. We output a number + a visual U-100 insulin syringe with the calculated tick mark highlighted. Colorblind-safe, prints to PDF, screenshot-friendly for Reddit. This is the differentiator that wins the SERP.

### 6. Decision trees for troubleshooting posts

Injection site bruising, cloudy reconstitution, pen malfunctions, missed doses — every troubleshooting post has a proper decision tree component. Pinterest-saveable, Reddit-shareable. No competitor ships this.

### 7. Cross-site canonical strategy across the peptide cluster

PepTips and PepVise canonical their "how to inject" and "reconstitution" content to InjectCompass. This concentrates topical authority at one URL per technique rather than splitting across three sites. See `docs/injectcompass-research.md` §14.

### 8. Unit-tested calculator math with CI enforcement

Every calculator has unit tests for its math. CI blocks merges where tests fail. This is safety-critical engineering — and it's also a differentiator we can talk about publicly on the Methodology page. "We test our math" becomes a trust signal.

### 9. Research-context framing for peptide content (PepVise posture)

Post discussing BPC-157 or TB-500 or any research peptide carries the standard banner: *"For educational purposes. Not FDA-approved for human use. Not medical advice."* This protects us legally AND signals editorial integrity — competitors either promote research peptides commercially (risk) or dodge them entirely (miss traffic).

### 10. No display ads. Ever. On this site.

Every medical-adjacent ad-supported site runs display ads. We don't. The calculator page loads fast, the technique post reads clean, the reader experience is calm. This is an editorial-integrity signal that compounds over years.

---

## Part 4 — Risks we watch

### Competitive risks
- **A well-resourced competitor ships a calculator.** Possible but unlikely — nobody in the top 10 is investing in this right now. If it happens, our differentiators (HowTo schema, printable PDF, credentialed reviewer, cross-site cluster) still hold.
- **A manufacturer site ships better patient-education.** Possible for their own drugs. We counter by being cross-drug, cross-category, cross-site (calculator-native).

### Platform risks
- **Google algorithm update penalizing YMYL without credentialed reviewer.** Mitigation: month 6 credentialed reviewer onboarding is prioritized.
- **HowTo schema changes.** Google has depreciated some HowTo schema features in the past. Mitigation: maintain schema library in `packages/seo`, update quickly if required.
- **Pinterest penalty on weight-loss content.** Applies only to GLP-1 technique posts, not to the broader site. Mitigation: pin headlines never include weight-loss numbers, before/after imagery, or body-focused visuals (same rules as PepTips).

### Legal risks
- **Any peptide-vendor affiliate link being added by mistake or by a contractor.** Mitigation: pre-commit hook blocks any URL matching known peptide-vendor patterns; human review on every affiliate page PR; quarterly audit.
- **Calculator error causing patient harm.** Mitigation: unit tests in CI; "verify with your prescriber" banner required on every calculator output; conservative rounding; healthcare attorney review per research §10.
- **Manufacturer legal challenge on pen-specific content.** Mitigation: cite only public package inserts; never copy manufacturer artwork; version and archive when inserts update.

---

## Part 5 — Success metrics (directionally)

### Month 3
- Peptide Calculator ranking top-10 for its seed keyword (early signal)
- HowTo schema validating in Search Console for at least 5 posts
- 1,000+ email subscribers
- 10k+ monthly sessions

### Month 6
- Peptide Calculator top-5
- Credentialed reviewer onboarded + byline active on technique posts
- 5,000+ subscribers
- 60k+ monthly sessions
- First "peptide calculator" Reddit organic backlink

### Month 12
- Peptide Calculator top-3
- 15,000+ subscribers
- 200k+ monthly sessions (per research §11 roadmap)
- $6-9k/mo blended revenue
- Cross-site cluster (PepTips + PepVise + InjectCompass) fully reciprocal in canonicals + internal links

---

## Bottom line

InjectCompass is the network's highest-leverage site by keyword data. The SERPs are undefended. The audience is anxious and high-intent. The format wedges (calculator + HowTo schema + printable PDF + safety callouts + credentialed review + cross-site cluster) are stackable and none of the competitors ship them.

The risk is not ranking. The risk is math errors in a safety-critical calculator. Engineer the calculators like medical-device code, not like marketing pages.
