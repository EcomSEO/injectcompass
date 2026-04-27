# Drug Image Usage

Real, license-compliant drug product imagery for InjectCompass article pages,
sourced from Wikimedia Commons (and Wikipedia chemical-structure SVGs for
research peptides without free product photos).

## Quick start

```tsx
import { DrugImage } from "@/components/DrugImage";

// Inline anywhere in MDX/JSX where the article references the drug
<DrugImage drugSlug="ozempic" />;

// Hero variant, eager-loaded
<DrugImage drugSlug="mounjaro" size="lg" priority />;

// Sidebar / inline-quote variant
<DrugImage drugSlug="bpc-157" size="sm" />;
```

`<DrugImage drugSlug="…" />` returns `null` if the slug is not in the
manifest — safe to call without guarding.

## Props

| Prop          | Type                  | Default | Notes                                                                |
| ------------- | --------------------- | ------- | -------------------------------------------------------------------- |
| `drugSlug`    | `string`              | —       | Key in `DRUGS` map (e.g. `"ozempic"`, `"bpc-157"`).                   |
| `size`        | `"sm" \| "md" \| "lg"` | `"md"`  | 200×150, 400×300, 800×600.                                           |
| `showCaption` | `boolean`             | `true`  | **Do not set to false** in published articles — caption is legal.    |
| `priority`    | `boolean`             | `false` | Eager-load only above-the-fold.                                       |
| `className`   | `string`              | `""`    | Optional class for the `<figure>` wrapper.                           |

## Manifest

Source of truth: [`lib/content/drug-images.ts`](../lib/content/drug-images.ts).

Each entry holds:

- `slug`, `brandName`, `genericName`, `manufacturer`
- `imagePath` — public path under `/images/drugs/{slug}.{ext}` for product
  photos, or `/images/drugs/structures/{slug}.{ext}` for structure SVGs/PNGs.
- `source` — `"wikimedia"` or `"structure-svg"`.
- `sourceUrl` — canonical Wikimedia / Wikipedia file page (used as the
  attribution link in the caption).
- `license` — normalized SPDX-ish code (`CC-BY-4.0`, `CC-BY-SA-4.0`,
  `PUBLIC-DOMAIN`, etc.).
- `attribution` — the `Artist` field from Commons `extmetadata`, HTML stripped.
- `altText` — screen-reader description.
- `caption` — short human label rendered above the legal line.
- `width`, `height` — pixel dimensions of the saved file.

## Adding a new drug

1. Add a new entry to the `DRUGS` map in `lib/content/drug-images.ts`. Start
   with `source: "wikimedia"` for marketed products and `source:
   "structure-svg"` for research peptides without free product photos.
2. Run the fetch script:

   ```bash
   node scripts/fetch-drug-images.mjs
   ```

3. Inspect the printed report and the JSON dump at
   `lib/content/drug-images.fetched.json`. Copy the resolved `licenseShort`,
   `artist`, `descriptionUrl`, `width`, `height` into the manifest entry
   (normalize the license via `normalizeLicense()` semantics; e.g. `CC BY-SA
   4.0` → `CC-BY-SA-4.0`).
4. The downloaded file lands at the path declared in the manifest — verify
   with `ls public/images/drugs/`.
5. Commit both the manifest and the public asset.

## Where to wire it

- **Article hero block**: when `post.primaryDrug` (or equivalent) matches a
  manifest slug, render `<DrugImage drugSlug={post.primaryDrug} size="lg"
  priority />` near the H1 — this gives readers immediate visual confirmation
  of the product being discussed.
- **Inline references**: drop `<DrugImage drugSlug="…" size="md" />` in the
  body where the drug is first introduced.
- **Comparison posts** (e.g. Ozempic vs Wegovy): render two `size="md"`
  side-by-side, one per drug.

This run does **not** wire DrugImage into `ArticleTemplate.tsx` — that file
is being modified by the compliance agent in parallel. A follow-up task should
land the integration after both branches merge.

## Compliance — non-negotiable

1. Editorial / educational use only. Do **not** render `<DrugImage>` on
   product, marketing, pricing, or affiliate-style surfaces. The captions are
   designed for editorial article context.
2. Never set `showCaption={false}` in production. The caption carries the
   attribution + license + "Editorial use for educational purposes only"
   notice. Stripping it would breach the Wikimedia Commons CC license terms
   (which require attribution) and weaken the editorial / fair-use posture for
   trademarked brand imagery.
3. CC-BY-SA images carry a "share-alike" obligation: derivatives must license
   under the same terms. We **do not** modify or composite these images — we
   render them as-is, with attribution. Do not crop, tint, overlay text on, or
   re-export these files into other formats without explicit license review.
4. Never strip or alter the `Artist` (attribution) field that the fetch
   script writes into the manifest.

## Manifest summary (current state)

| Slug          | Brand        | Source      | License        | Path                                            |
| ------------- | ------------ | ----------- | -------------- | ----------------------------------------------- |
| ozempic       | Ozempic      | Wikimedia   | CC BY-SA 4.0   | /images/drugs/ozempic.jpg                       |
| wegovy        | Wegovy       | Wikimedia   | CC BY 4.0      | /images/drugs/wegovy.jpg                        |
| rybelsus      | Rybelsus     | Wikimedia   | CC BY-SA 4.0   | /images/drugs/rybelsus.jpg                      |
| saxenda       | Saxenda      | Wikimedia   | CC BY 3.0      | /images/drugs/saxenda.jpg                       |
| victoza       | Victoza      | Structure   | Public domain  | /images/drugs/structures/victoza.svg            |
| mounjaro      | Mounjaro     | Wikimedia   | CC BY-SA 4.0   | /images/drugs/mounjaro.jpg                      |
| zepbound      | Zepbound     | Structure   | Public domain  | /images/drugs/structures/zepbound.svg           |
| trulicity    | Trulicity    | Wikimedia   | CC BY-SA 4.0   | /images/drugs/trulicity.jpg                     |
| bpc-157       | BPC-157      | Structure   | Public domain  | /images/drugs/structures/bpc-157.svg            |
| tb-500        | TB-500       | Structure   | Public domain  | /images/drugs/structures/tb-500.png             |
| ipamorelin    | Ipamorelin   | Structure   | Public domain  | /images/drugs/structures/ipamorelin.svg         |
| cjc-1295      | CJC-1295     | Structure   | CC BY-SA 4.0   | /images/drugs/structures/cjc-1295.svg           |
| melanotan-ii  | Melanotan II | Structure   | CC BY-SA 3.0   | /images/drugs/structures/melanotan-ii.svg       |
| ghk-cu        | GHK-Cu       | Structure   | Public domain  | /images/drugs/structures/ghk-cu.svg             |

## Honest deferrals

- **Victoza** and **Zepbound** — no free-licensed product photo on Wikimedia
  Commons at the time of fetch. Both fall back to the active-ingredient
  chemical structure (liraglutide / tirzepatide). Resolution path: (a) wait
  for community contributions, (b) license a press-kit photo directly from
  Novo Nordisk / Eli Lilly, or (c) commission an editorial photo and self-host
  CC-BY (out of scope for this run).
- **Saxenda** photo is small (1683×947) and shows an in-progress arm
  injection rather than the pen alone. Acceptable for editorial, but a
  cleaner pen-on-white shot would be preferable if a CC-licensed one becomes
  available.

## Re-running

```bash
node scripts/fetch-drug-images.mjs
```

The script:

- Queries Wikimedia Commons (User-Agent: `injectcompass-fetch/1.0`).
- Sleeps 1s between API calls.
- Restricts downloads to image MIME types only (jpeg/png/webp for photos,
  svg+xml/png/jpeg for structures), with a sanity size cap (8 MB photos /
  4 MB structures).
- Hard-rejects any title that does not contain the brand name.
- Writes provenance to `lib/content/drug-images.fetched.json`.

After running, manually merge resolved license/attribution fields back into
`lib/content/drug-images.ts` (the script does not currently rewrite the TS
manifest itself).
