# Launch blockers — InjectCompass.com

The operator-decided items that must be cleared before public launch. Phases 1–8 of the finishing pass complete without these. Phases 9–10 are gated on items 4–5.

**Last updated:** 29 April 2026 (post 2026-04-29 audit-fix sweep + monetization scaffolding).
**Owner:** operator (human decision-maker)

## 2026-04-29 audit-fix status (Claude side)

| Audit blocker | Status |
|---|---|
| Sister-site footer ("FROM THE NETWORK") drop | ✅ shipped — replaced with newsletter CTA in 12 locales |
| Self-host fonts via `next/font` | ✅ shipped — Inter + Merriweather + IBM Plex Mono via `next/font/google`, no `fonts.gstatic.com` runtime calls |
| Cross-site author reuse (Sara Lin on injectcompass + peptips) | ✅ resolved — Sara kept on injectcompass per technique-credential fit; peptips assigns new author. Documented in `docs/cross-site-author-audit.md` |
| Affiliate registry scaffolded | ✅ `lib/affiliate/registry.ts` — 13 SKUs across sharps containers, syringe boxes, travel cool-bags, needle-disposal services, CGM. ZERO peptide vendors. ZERO telehealth |
| Methodology versioning helper | ✅ `lib/content/methodology-version.ts` |
| OrganizationJsonLd `sameAs` cross-site leak | ✅ verified clean |
| Operator placeholders in impressum / terms | ❌ **operator-side blocker, see below** |

---

## 1. Impressum operator name + address

**Required by:** TTDSG §5 (Telekommunikation-Telemedien-Datenschutz-Gesetz). Mandatory for any commercial site accessible from Germany.

**File:** `lib/content/impressum.ts`

**Fields to fill:**

| Field | Type | Required? | Example |
|---|---|---|---|
| `operator` | string | yes | `"Health Network Media Ltd."` |
| `address` | string | yes | `"Friedrichstraße 1, 10117 Berlin, Germany"` |
| `email` | string | yes (already set) | `kontakt@injectcompass.com` |
| `phone` | string | optional but recommended | `"+49 30 12345678"` |
| `responsiblePerson` | string | yes | Name of the natural person responsible per § 18 Abs. 2 MStV |
| `registry` | string | only if registered Gewerbe | `"Amtsgericht Berlin Charlottenburg, HRB 12345"` |
| `vatId` | string | only if VAT-registered | `"DE123456789"` |

The brackets in the existing values (`"[Operator Name]"`, etc.) are placeholders — replace verbatim, do not remove the keys.

**Risk if unfilled:** Abmahnung (cease-and-desist letters) under German competition law. €1,500-€5,000 per incident is the typical first-letter cost.

---

## 2. Terms governing-law jurisdiction

**File:** `lib/content/terms.ts`

**Constant to fill:**

```ts
const JURISDICTION = "[Operator's chosen jurisdiction]";
```

The string is interpolated into the §9 "Governing law" clause of all 12 locale variants of the Terms (en/de/fr/it/es/nl/pl/sv/pt/ro/cs/no).

**Common choices:**
- `"England and Wales"`
- `"the Federal Republic of Germany"`
- `"the State of Delaware, USA"`
- `"the Republic of Ireland"`
- `"the Republic of Estonia"` (EU passport with low admin overhead)

The choice affects which courts can hear disputes and which consumer-protection regime applies. **Operator decision; not a code-level choice.**

Once filled, every locale's §9 clause auto-references the same jurisdiction string with native phrasing intact (e.g. DE renders "Es gilt das Recht von {JURISDICTION}", FR renders "régies par le droit de {JURISDICTION}").

---

## 3. DSR (Data Subject Request) contact email

**Files referencing email addresses (verify each is a monitored inbox):**
- `lib/content/impressum.ts` → `kontakt@injectcompass.com`
- `lib/content/terms.ts` → `hello@injectcompass.com` + `corrections@injectcompass.com`
- `lib/content/privacy-policy.ts` → DSR channel (verify which address is used)

**GDPR Articles 15-22** (right of access / rectification / erasure / portability / restriction / objection) require a working channel. The address(es) above must:
- Resolve to an actually-monitored inbox
- Have a documented response SLA (≤30 days per GDPR; we publish 5 business days as our target)
- Be the same address quoted in `lib/content/privacy-policy.ts` §"Contact for DSR"

**Action:** confirm each address resolves to a real inbox. If only one is monitored, consolidate references across the three files.

---

## 4. DNS cutover timing

**Currently:** `injectcompass.com` parked at GoDaddy/AWS. Live site serves from `injectcompass-ecom-seo.vercel.app` (Vercel preview alias).

**Phases gated on DNS cutover:**
- Phase 9 — On-page audit + Lighthouse on production (canonical domain required for Lighthouse SEO score; preview-domain runs cap at 0.58 because of `noindex` headers)
- Phase 10 — Search Console + Bing Webmaster Tools property verification + sitemap submission

**When DNS cuts over, also fill:**
- `lib/seo.ts` → `siteUrl: "https://injectcompass.com"`
- `app/sitemap.ts` → same canonical base

See `runbooks/LAUNCH-plasticfreelab.md` (in the network repo) for the GoDaddy clickpath; the procedure is identical for injectcompass.com.

---

## 5. Brand-token reconciliation

**The drift:**

| Source | Tokens |
|---|---|
| Brand book §5 (`~/Developer/active/health-network/content/injectcompass/brand-book.md`) | Clinical blue `#2E5A88` · Warm paper `#F5F1E8` · Moss `#7A9A7E` · Amber `#C89968` · Alert `#B74A4A` · IBM Plex Serif/Sans/Mono |
| Live UI (shipped at commit `064dda7` and successors) | Medical teal `#0E8A7A` · Inter body · Merriweather H1 |

The live UI ships the medical-teal direction. Lighthouse + on-page numbers are cited against that build. The brand book wasn't updated when the redesign shipped.

**Operator must choose one path:**

- **(a)** Update brand book §5 to match the medical-teal + Inter + Merriweather direction. Zero code changes. Lower risk. Easier to ship.
- **(b)** Revert UI to brand book IBM Plex Serif/Sans/Mono + clinical blue. Multi-day refactor. Re-runs Lighthouse + on-page audits. Brand book stays canonical.

**Recommendation:** (a). The medical-teal direction tested well in the redesign, the Lighthouse numbers are excellent, and the network-wide tooling (kie.ai prompts in `_shared/kie-ai-cookbook.md` Layer 4) was tuned to the medical-teal palette. Reverting would invalidate the photography pass downstream.

---

## Sign-off checklist

When all 5 items above are cleared, this file gets archived to `docs/_archive/launch-blockers-resolved-{YYYY-MM-DD}.md` and `SITE.launched` flips to `true` in `lib/content/site.ts`. Then Phase 9 + Phase 10 fire.

**Operator:** initial each line below when filled, with date.

- [ ] 1. Impressum operator name + address — _______ (date: _______)
- [ ] 2. Terms governing-law jurisdiction — _______ (date: _______)
- [ ] 3. DSR contact email confirmed monitored — _______ (date: _______)
- [ ] 4. DNS cutover scheduled / completed — _______ (date: _______)
- [ ] 5. Brand-token reconciliation decision — _______ (date: _______)
