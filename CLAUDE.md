# InjectCompass — Claude Code Guide

Source of truth for how injectcompass.com is built.

## What this repo is
Next.js 14 site at **injectcompass.com** — the practical-instruction site for peptide injection, reconstitution, storage, and technique. Nurse-educator voice. Safety-critical calculator engineering. Research-context framing for non-FDA-approved compounds.

## Stack
- Next.js 14 App Router, TypeScript, Tailwind
- Brand tokens: `clinical #2E5A88, paper #F5F1E8, moss #7A9A7E, amber #C89968, alert #B74A4A`
- Fonts: IBM Plex Serif (headlines) + IBM Plex Sans (body) + IBM Plex Mono (numerics)

## Legal framing — NON-NEGOTIABLE
1. Site-wide `<MedicalDisclaimerFooter>` on every page (never remove)
2. `<PostReviewStamp>` on drug-specific posts (when `medicalDisclaimer: "required"`)
3. Dedicated `/medical-disclaimer` page linked from footer
4. **No affiliate links to peptide vendors. Zero. Ever.**
5. No vendor promotion in any form
6. Research-context framing for non-FDA-approved compounds

## Signature components (planned, stubbed)
- `<PeptideCalculator>` — the 201k-vol / KD 19 SEO asset
- `<ReconstitutionCalculator>`
- `<SyringeSvg>` — U-100 insulin syringe with highlighted tick mark
- `<HowToJsonLd>` for every technique post
- `<CallOut variant="red|amber|green">` safety-callout system

Build these post-launch per `docs/site-spec.md` §3 + §5.

## Launch flag
`lib/content/site.ts` → `SITE.launched` — keep `false` until the launch checklist in `docs/site-spec.md` §9 is green.

## Commands
```bash
pnpm install
pnpm dev       # http://localhost:3001
pnpm build
```

## What not to do
- Flip `SITE.launched` early
- Add any peptide vendor affiliate link — EVER
- Remove `<MedicalDisclaimerFooter>`
- Publish drug-specific content without `medicalDisclaimer: "required"`
- Recommend a specific peptide for human use
- Imitate pen manufacturer artwork

## Pointers
- Voice + audience: `content/brand-book.md`
- 150 posts + 4 calculators: `docs/topical-map.md`
- Calculator engineering requirements: `docs/site-spec.md` §5
- SERP wedge analysis: `docs/competitive-analysis.md`
- Sample briefs: `docs/sample-briefs.md`
