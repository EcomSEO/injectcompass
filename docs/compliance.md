# InjectCompass — Compliance README

Live as of **27 April 2026**. Review cadence: **quarterly** (next review: 27 July 2026).

This document mirrors the operational checklists from
`/tmp/compliance-audit.txt` (April 2026 *Deep Country-by-Country
Compliance Audit*). It describes what ships in this codebase to satisfy
each market's legal-launch baseline.

> Legal disclaimer: this document is operational planning. Local legal
> counsel must review each market before commercial launch.

## Universal EU baseline

- **EU Health Claims Regulation 1924/2006** — closed-list, EFSA-only.
  Enforced by `lib/compliance/forbidden-claims.ts` + `scripts/audit-claims.mjs`.
  Pre-commit: `pnpm audit:claims`.
- **EMA Synthetic Peptide Guideline (June 2026)** — peptides classified
  as medicinal products. Editorial framing in CLAUDE.md prohibits
  vendor links and human-use recommendations.
- **UCPD Directive 2005/29/EC** — affiliate compensation triggers
  trader status and disclosure obligation. `components/AffiliateLabel.tsx`
  emits the country-mandated label.
- **GDPR + ePrivacy** — granular, opt-in consent, equal-prominence
  reject. Implemented in `components/CookieConsent.tsx`.

## Country status

### Germany — Critical (launch-blocking)

| Item | Status | Path |
| ---- | ------ | ---- |
| Impressum (§ 5 TMG) | Shipped | `app/[locale]/impressum/page.tsx` |
| Affiliate label "Werbung" | Shipped | `components/AffiliateLabel.tsx` |
| TTDSG/TDDDG cookie banner with equal-prominence reject | Shipped | `components/CookieConsent.tsx` |
| German Datenschutzerklärung | Shipped | `lib/content/privacy-policy.ts` (de) |
| German Nutzungsbedingungen | Shipped | `lib/content/terms.ts` (de) |
| German Werbekennzeichnung | Shipped | `lib/content/affiliate-disclosure.ts` (de) |
| German Cookie-Richtlinie | Shipped | `lib/content/cookie-policy.ts` (de) |
| BfArM + BfDI footer authority | Shipped | `lib/compliance/authorities.ts` (de) |
| Operator placeholders to fill | OPEN | `lib/content/impressum.ts` |

### France — Critical (launch-blocking)

| Item | Status | Path |
| ---- | ------ | ---- |
| Politique de Confidentialité | Shipped | `lib/content/privacy-policy.ts` (fr) |
| Affiliate label "Publicité" | Shipped | `components/AffiliateLabel.tsx` |
| CNIL-compliant cookie consent | Shipped | `components/CookieConsent.tsx` |
| ANSM/CNIL footer | Shipped | `lib/compliance/authorities.ts` (fr) |
| EFSA register audit | Shipped | `scripts/audit-claims.mjs` |
| ANSES vendor notification check | OPEN — operator |

### Italy — Critical (launch-blocking)

| Item | Status | Path |
| ---- | ------ | ---- |
| Informativa sulla Privacy | Shipped | `lib/content/privacy-policy.ts` (it) |
| Affiliate label "Pubblicità" | Shipped | `components/AffiliateLabel.tsx` |
| Garante-compliant consent | Shipped | `components/CookieConsent.tsx` |
| AGCOM register check (≥500k followers) | OPEN — operator |

### Sweden — Critical (launch-blocking)

| Item | Status | Path |
| ---- | ------ | ---- |
| Integritetspolicy | Shipped | `lib/content/privacy-policy.ts` (sv) |
| Affiliate label "Annons" | Shipped | `components/AffiliateLabel.tsx` |
| Blocked-compound gating | Shipped | `lib/compliance/sweden-restrictions.ts` + `app/[locale]/[slug]/page.tsx` |
| IMY-compliant consent | Shipped | `components/CookieConsent.tsx` |
| Läkemedelsverket monthly monitor | Manual cadence — operator |

### Spain — High

Política de Privacidad shipped; "Publicidad" label shipped; AEPD authority shown in footer; AEMPS vendor compliance check is operator-side.

### Netherlands — High

Privacybeleid shipped; "Advertentie" label; AP authority. NVWA April 2026 working arrangements monitored manually.

### Czech Republic — High

Zásady ochrany osobních údajů shipped; "Reklama" label; SZPI/ÚOOÚ in footer. Czech regulatory counsel review before launch is operator-side.

### Norway — High

Personvernerklæring shipped; "Annonse" label; Datatilsynet/Mattilsynet in footer. Independent compliance review (Mattilsynet 90% non-compliance finding) advised before launch.

### Portugal — High

Política de Privacidade shipped; "Publicidade" label; CNPD/INFARMED in footer.

### Romania — Medium-High

Politică de Confidențialitate shipped; "Publicitate" label; ANSPDCP/ANSVSA in footer. Per-vendor Ministry of Health platform claim registration is operator-side.

### Poland — Medium

Polityka Prywatności shipped; "Reklama" label; UODO/GIS in footer.

## Cross-cutting infrastructure

- `components/CookieConsent.tsx` — TTDSG/GDPR/ePrivacy banner, granular categories, 13-month re-prompt, version-bump invalidation, `useCookieConsent()` hook, custom-event re-open.
- `components/EducationalBanner.tsx` — universal "educational only — not medical advice" banner above article bodies.
- `components/WadaBanner.tsx` — performance/recovery hub gate.
- `components/RegulatoryAuthoritiesStrip.tsx` — country authority links in footer.
- `components/AffiliateLabel.tsx` — per-locale label pill (Werbung / Publicité / etc.).
- `lib/compliance/sweden-restrictions.ts` — Swedish blocked-compound gate.
- `lib/compliance/forbidden-claims.ts` + `scripts/audit-claims.mjs` — pre-commit content gate.

## Operator follow-up checklist

1. Fill `lib/content/impressum.ts` placeholders (operator name, address, responsible person, registry, VAT-ID).
2. Fill `[Operator's chosen jurisdiction]` in `lib/content/terms.ts` for the governing-law clause.
3. Confirm vendor regulatory notifications per market (BfArM/ANSES/AIFA/AEMPS/INFARMED/ANSVSA/Ministry-of-Agriculture/GIS/Mattilsynet etc.).
4. Activate `pnpm audit:claims` in CI/pre-commit.
5. Engage local legal review in DE, FR, IT, SE, CZ, NO before commercial launch.
6. Quarterly review of this document and the upstream compliance-audit source.
