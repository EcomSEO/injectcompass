# injectcompass.com

The practical-instruction site for injection technique + calculators. Next.js 14 source for **injectcompass.com**.

Read [CLAUDE.md](./CLAUDE.md) first — the legal/medical framing rules live there.

## Local dev
```bash
pnpm install
pnpm dev       # http://localhost:3001
pnpm build
```

## Deploy
Auto-deploys to Vercel on push to `main`. Keep `SITE.launched = false` in `lib/content/site.ts` until the launch checklist (`docs/site-spec.md` §9) is green — which includes healthcare regulatory attorney review.

## The legal posture
1. Site-wide MedicalDisclaimerFooter on every page
2. Per-post PostReviewStamp for drug-specific posts
3. Dedicated `/medical-disclaimer` page
4. **Zero peptide-vendor affiliate links**
5. Research-context framing for non-FDA-approved compounds

## Key docs
- `content/brand-book.md` — voice, Rachel persona, safety-critical framing
- `docs/topical-map.md` — 150 posts + 4 flagship calculators
- `docs/site-spec.md` — IA, 8 templates, calculator engineering requirements
- `docs/sample-briefs.md` — 5 anchor briefs including Peptide Calculator
- `docs/affiliate-partners.md` — medical supplies only, zero peptide vendors
- `docs/competitive-analysis.md` — SERP wedge analysis
