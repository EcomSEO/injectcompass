#!/usr/bin/env node
/**
 * Forbidden-claims audit. Scans content sources for medicinal /
 * disease-claim language that is prohibited under EU Regulation
 * 1924/2006 and country-specific overlays.
 *
 * Exits 1 if any violation is found (suitable for pre-commit /CI).
 */

import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

// Inline copy of the forbidden list (kept in sync with
// lib/compliance/forbidden-claims.ts). Patterns are matched as
// lenient word-boundary matches.
const FORBIDDEN = [
  { locale: "en", pattern: "treats" },
  { locale: "en", pattern: "cures" },
  { locale: "en", pattern: "heals" },
  { locale: "en", pattern: "prevents disease" },
  { locale: "en", pattern: "prevents cancer" },
  { locale: "de", pattern: "behandelt" },
  { locale: "de", pattern: "heilt" },
  { locale: "de", pattern: "verhindert krankheit" },
  { locale: "fr", pattern: "traite" },
  { locale: "fr", pattern: "guérit" },
  { locale: "fr", pattern: "prévient la maladie" },
  { locale: "it", pattern: "cura" },
  { locale: "it", pattern: "guarisce" },
  { locale: "it", pattern: "previene la malattia" },
  { locale: "es", pattern: "trata" },
  { locale: "es", pattern: "cura" },
  { locale: "es", pattern: "previene la enfermedad" },
  { locale: "nl", pattern: "geneest" },
  { locale: "nl", pattern: "behandelt ziekte" },
  { locale: "pl", pattern: "leczy" },
  { locale: "pl", pattern: "zapobiega chorobie" },
  { locale: "sv", pattern: "botar" },
  { locale: "sv", pattern: "förebygger sjukdom" },
  { locale: "pt", pattern: "trata" },
  { locale: "pt", pattern: "cura" },
  { locale: "pt", pattern: "previne a doença" },
  { locale: "ro", pattern: "tratează" },
  { locale: "ro", pattern: "vindecă" },
  { locale: "ro", pattern: "previne boala" },
  { locale: "cs", pattern: "léčí" },
  { locale: "cs", pattern: "vyléčí" },
  { locale: "cs", pattern: "předchází nemoci" },
  { locale: "no", pattern: "helbreder" },
  { locale: "no", pattern: "forebygger sykdom" },
];

function buildRegex(pattern) {
  const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}([^\\p{L}\\p{N}]|$)`, "iu");
}

const TARGETS = [
  "lib/content/posts.ts",
  "lib/content/post-bodies.ts",
  "lib/content/hubs.ts",
];

// Walk app/[locale]/**/page.tsx
function walk(dir, out) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (entry.isFile() && entry.name.endsWith(".tsx")) out.push(p);
  }
}
const tsxPages = [];
walk(path.join(repoRoot, "app"), tsxPages);
TARGETS.push(...tsxPages.map((p) => path.relative(repoRoot, p)));

// Per-locale dictionary files
for (const f of fs.readdirSync(path.join(repoRoot, "i18n", "dictionaries"))) {
  if (f.endsWith(".json")) TARGETS.push(`i18n/dictionaries/${f}`);
}

// Files we explicitly skip — they are *about* forbidden claims.
const SKIP = new Set(
  [
    "lib/compliance/forbidden-claims.ts",
    "scripts/audit-claims.mjs",
    "scripts/add-compliance-i18n.mjs",
    "lib/content/privacy-policy.ts",
    "lib/content/terms.ts",
    "lib/content/affiliate-disclosure.ts",
    "lib/content/cookie-policy.ts",
    "lib/content/impressum.ts",
    "lib/compliance/sweden-restrictions.ts",
    "lib/compliance/authorities.ts",
  ].map((p) => path.normalize(p))
);

let violations = 0;
for (const rel of TARGETS) {
  if (SKIP.has(path.normalize(rel))) continue;
  const full = path.join(repoRoot, rel);
  if (!fs.existsSync(full)) continue;
  const text = fs.readFileSync(full, "utf8");
  // Determine locale: if the file is i18n/dictionaries/<code>.json, restrict
  // checks to that locale's patterns + "en"; otherwise check English patterns.
  let locales;
  const dictMatch = rel.match(/^i18n\/dictionaries\/([a-z]{2})\.json$/);
  if (dictMatch) locales = new Set([dictMatch[1]]);
  else locales = new Set(["en"]);

  const lines = text.split(/\r?\n/);
  // Track regions allowlisted by `audit-claims:allow` markers.
  // The marker on a line allowlists itself + the next 8 lines.
  const allowUntil = new Array(lines.length).fill(-1);
  for (let i = 0; i < lines.length; i++) {
    if (/audit-claims:allow/.test(lines[i])) {
      const end = Math.min(lines.length - 1, i + 8);
      for (let j = i; j <= end; j++) allowUntil[j] = j;
    }
  }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (allowUntil[i] !== -1) continue;
    for (const f of FORBIDDEN) {
      if (!locales.has(f.locale)) continue;
      const re = buildRegex(f.pattern);
      if (re.test(line)) {
        // Suppress legitimate occurrences inside legal/compliance
        // notices that explicitly list forbidden words for awareness.
        if (/forbidden|prohibited|verboten|interdit|vietat|prohibido|verboden|zakazany|förbjuden|proibido|interzis|zakázán|forbudt|sweden|restricted|disclaimer|claim/iu.test(line)) {
          continue;
        }
        // Allow narrowly-scoped non-medicinal usages (descriptive
        // tense verbs about bruises healing, "a cura di" Italian
        // editor attribution, etc.).
        if (f.pattern === "heals" && /bruise|wound|skin|wound site|injection site/i.test(line)) continue;
        if (f.pattern === "cura" && f.locale === "it" && /a cura di|cura della pelle/i.test(line)) continue;
        if (f.pattern === "trata" && /trata-se|trata de/i.test(line)) continue;
        violations++;
        const trimmed = line.trim().slice(0, 160);
        console.log(`[${f.locale}] ${rel}:${i + 1}  pattern="${f.pattern}"  → ${trimmed}`);
      }
    }
  }
}

if (violations > 0) {
  console.error(`\nFAIL: ${violations} forbidden-claim match(es) found.`);
  process.exit(1);
} else {
  console.log("OK: no forbidden-claim patterns detected.");
}
