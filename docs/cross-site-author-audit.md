# Cross-site author audit — 2026-04-29

Per the 2026-04-29 operator-isolation lock (`README.md` § "Cross-site
author/reviewer reuse"), no author or reviewer person can appear on
more than one network site. The 2026-04-29 audit found **Sara Lin RN
BSN** appearing on both injectcompass and peptips. This document
records the resolution.

## Resolution

**Sara Lin RN BSN — kept on injectcompass.**

Rationale per `03-injectcompass.md` Phase 0.3:

> "Sara Lin RN BSN appears on both injectcompass and peptips.
> Recommendation: keep on injectcompass (technique focus fits her
> credential), instruct peptips team to swap her byline for a new
> patient-educator pen-name."

Sara's RN-leaning credential and outpatient diabetes-education
background sit at the intersection of injection technique +
reconstitution + patient self-administration coaching that defines
the injectcompass editorial scope. Her bio on `lib/content/authors.ts`
is anchored to that focus.

## Action required on peptips

The peptips repo must:

1. Remove Sara Lin from `lib/content/authors.ts`.
2. Replace her bylines with a new author whose credential profile
   fits the peptips patient-education focus (RN-leaning health
   writer, distinct name).
3. Verify schema.org `Person` `sameAs` URLs do not overlap with the
   injectcompass record.

This is tracked in the peptips repo's `feat/seo-readiness-2026-04-29`
branch. Per the operator-isolation rule: a person cannot appear on
both at any point — even during the migration window.

## Other potential overlaps (audit, 2026-04-29)

| Person | Site(s) | Resolution |
|---|---|---|
| Sara Lin RN BSN | injectcompass + peptips (live) | Kept on injectcompass; peptips assigns new author |
| Dr. Maya Rao RDN | larderlab (live) — flagged for cross-site presence | larderlab swapped to Dr. Soraya Khan PhD RDN CSSD per 04-larderlab.md Phase 0.5 |
| Jordan Pratt PharmD | injectcompass only | OK — no overlap |
| Maya Koenig MPH | injectcompass only | OK — no overlap |

Re-audit cadence: every quarterly editorial review. Any new author
added to a network site must be cleared against all 6 other sites
before publish.
