#!/usr/bin/env node
// @ts-check
/**
 * fetch-drug-images.mjs
 *
 * Source real, license-compliant drug product photos and chemical-structure
 * SVGs from Wikimedia Commons / Wikipedia for InjectCompass article pages.
 *
 * Usage: node scripts/fetch-drug-images.mjs
 *
 * Reads the DRUG manifest defined in lib/content/drug-images.ts (parsed by
 * regex — we don't ts-load it). For each entry:
 *   - For "wikimedia" sources, search Commons for the brand name in the File
 *     namespace, score candidates, and pick the best product photo.
 *   - For "structure-svg" sources, search Commons specifically for the
 *     compound's chemical-structure SVG.
 *   - Pull license + attribution from extmetadata, verify it is free, and
 *     download to public/images/drugs/{slug}.{ext} (or
 *     public/images/drugs/structures/{slug}.svg).
 *   - On any failure or non-free license, log + skip; don't throw.
 *
 * After running, manually open lib/content/drug-images.ts and update the
 * `license`, `attribution`, `sourceUrl` fields per the printed report — or
 * re-export this script's JSON deferral list into the manifest.
 *
 * The script ALSO writes lib/content/drug-images.fetched.json with the latest
 * fetched metadata so you can diff / merge it into the TS manifest by hand.
 *
 * No external deps — uses Node 18+ built-in fetch.
 */

import { mkdir, writeFile, readFile, stat } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const MANIFEST_PATH = join(REPO_ROOT, "lib/content/drug-images.ts");
const PUBLIC_DRUGS = join(REPO_ROOT, "public/images/drugs");
const PUBLIC_STRUCTURES = join(PUBLIC_DRUGS, "structures");
const REPORT_PATH = join(REPO_ROOT, "lib/content/drug-images.fetched.json");

const UA = "injectcompass-fetch/1.0 (https://injectcompass.com; editorial-research-use)";
const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

const ACCEPTED_LICENSES = [
  "CC0",
  "CC BY",
  "CC-BY",
  "CC BY-SA",
  "CC-BY-SA",
  "PUBLIC DOMAIN",
  "PD",
  "GFDL",
];

/** Sleep n ms */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Parse the TS manifest file. We isolate the DRUGS object literal then
 * walk it brace-aware, splitting into per-drug blocks at depth 1.
 */
async function parseManifest() {
  const src = await readFile(MANIFEST_PATH, "utf8");
  const startIdx = src.indexOf("export const DRUGS");
  if (startIdx === -1) throw new Error("could not find DRUGS export in manifest");
  const openIdx = src.indexOf("{", startIdx);
  if (openIdx === -1) throw new Error("no opening brace for DRUGS");
  let depth = 0;
  let i = openIdx;
  for (; i < src.length; i++) {
    const c = src[i];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) break;
    }
  }
  const objBody = src.slice(openIdx + 1, i);

  const drugs = [];
  let bdepth = 0;
  let blockStart = -1;
  let keyForBlock = "";
  let lastKey = "";
  for (let j = 0; j < objBody.length; j++) {
    const c = objBody[j];
    if (bdepth === 0) {
      // look for a "key": { pattern at depth 0
      const m = objBody.slice(j).match(/^\s*"?([a-zA-Z0-9_-]+)"?\s*:\s*\{/);
      if (m) {
        lastKey = m[1];
        j += m[0].length - 1;
        bdepth = 1;
        blockStart = j + 1;
        keyForBlock = lastKey;
        continue;
      }
    } else {
      if (c === "{") bdepth++;
      else if (c === "}") {
        bdepth--;
        if (bdepth === 0) {
          const body = objBody.slice(blockStart, j);
          const get = (k) => {
            const r = body.match(new RegExp(`${k}:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
            return r ? r[1] : "";
          };
          drugs.push({
            slug: get("slug") || keyForBlock,
            brandName: get("brandName"),
            genericName: get("genericName"),
            manufacturer: get("manufacturer"),
            source: get("source"),
            imagePath: get("imagePath"),
            altText: get("altText"),
          });
        }
      }
    }
  }
  return drugs;
}

/**
 * Wrapper for Commons API GET requests with UA + politeness sleep.
 */
async function commons(params) {
  const url = new URL(COMMONS_API);
  for (const [k, v] of Object.entries({
    format: "json",
    formatversion: "2",
    origin: "*",
    ...params,
  })) {
    url.searchParams.set(k, String(v));
  }
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Commons ${res.status}: ${url}`);
  return res.json();
}

/**
 * Search Commons in the File namespace (6) for a query, returning titles.
 */
async function searchFiles(query, limit = 15) {
  const data = await commons({
    action: "query",
    list: "search",
    srsearch: query,
    srnamespace: "6",
    srlimit: String(limit),
  });
  return (data.query?.search ?? []).map((r) => r.title);
}

/**
 * Strip HTML tags and decode common entities from extmetadata strings.
 */
function stripHtml(s) {
  if (!s) return "";
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Fetch full imageinfo (URL, size, extmetadata) for a list of titles.
 */
async function imageInfo(titles) {
  if (!titles.length) return [];
  const data = await commons({
    action: "query",
    titles: titles.join("|"),
    prop: "imageinfo",
    iiprop: "url|size|extmetadata|mime",
  });
  return (data.query?.pages ?? []).map((p) => {
    const ii = p.imageinfo?.[0];
    if (!ii) return null;
    const meta = ii.extmetadata ?? {};
    return {
      title: p.title,
      url: ii.url,
      mime: ii.mime,
      width: ii.width,
      height: ii.height,
      descriptionUrl: ii.descriptionurl,
      licenseShort: meta.LicenseShortName?.value || "",
      artist: stripHtml(meta.Artist?.value || ""),
      credit: stripHtml(meta.Credit?.value || ""),
      description: stripHtml(meta.ImageDescription?.value || ""),
    };
  }).filter(Boolean);
}

function isFreeLicense(short) {
  if (!short) return false;
  const s = short.toUpperCase();
  if (s.includes("NON-COMMERCIAL") || s.includes("NC")) return false;
  if (s.includes("ALL RIGHTS RESERVED")) return false;
  return ACCEPTED_LICENSES.some((tag) => s.includes(tag));
}

const ACCEPTED_MIMES_PHOTO = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const ACCEPTED_MIMES_STRUCTURE = new Set([
  "image/svg+xml",
  "image/png",
  "image/jpeg",
]);
const ACCEPTED_EXTS_PHOTO = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const ACCEPTED_EXTS_STRUCTURE = new Set([".svg", ".png", ".jpg", ".jpeg"]);

const MAX_BYTES_PHOTO = 8 * 1024 * 1024; // 8 MB sanity cap
const MAX_BYTES_STRUCTURE = 4 * 1024 * 1024; // 4 MB sanity cap

function fileExt(url) {
  return (extname(new URL(url).pathname) || "").toLowerCase();
}

/**
 * Score a candidate File: title for product-photo suitability.
 * Higher = better.
 */
function scoreProductCandidate(title, brandName) {
  const t = title.toLowerCase();
  const b = brandName.toLowerCase();
  let score = 0;
  if (t.includes(b)) score += 10;
  else score -= 100; // brand name MUST appear; reject mis-matches
  if (t.includes("pen")) score += 6;
  if (t.includes("injection") || t.includes("injector")) score += 4;
  if (t.includes("vial") || t.includes("syringe")) score += 4;
  if (t.includes("box") || t.includes("packaging") || t.includes("package")) score += 3;
  if (t.includes("tablet") || t.includes("pill")) score += 2; // for Rybelsus
  if (t.endsWith(".jpg") || t.endsWith(".jpeg") || t.endsWith(".png")) score += 5;
  if (t.endsWith(".svg")) score -= 5; // structures aren't product photos
  if (t.includes("logo")) score -= 3;
  if (t.includes("structure") || t.includes("formula") || t.includes("skeletal")) score -= 8;
  return score;
}

/**
 * Score a candidate File: title for chemical-structure SVG suitability.
 */
function scoreStructureCandidate(title, name) {
  const t = title.toLowerCase();
  const n = name.toLowerCase().replace(/[^a-z0-9-]/g, "");
  let score = 0;
  if (t.replace(/[^a-z0-9-]/g, "").includes(n)) score += 10;
  if (t.endsWith(".svg")) score += 8;
  if (t.includes("structure") || t.includes("skeletal") || t.includes("formula")) score += 5;
  if (t.includes("3d") || t.includes("model")) score += 2;
  if (t.endsWith(".png") || t.endsWith(".jpg")) score += 1;
  if (t.includes("logo") || t.includes("photo") || t.includes("box")) score -= 5;
  return score;
}

async function downloadTo(url, target, maxBytes) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`download ${res.status}: ${url}`);
  const cl = Number(res.headers.get("content-length") || "0");
  if (cl && cl > maxBytes) throw new Error(`oversize ${cl} > ${maxBytes}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > maxBytes) throw new Error(`oversize ${buf.length} > ${maxBytes}`);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, buf);
  return buf.length;
}

async function pickProductImage(drug) {
  const queries = [
    `${drug.brandName} pen`,
    `${drug.brandName} injection`,
    `${drug.brandName}`,
  ];
  let best = null;
  let bestScore = -Infinity;
  let bestQuery = "";
  for (const q of queries) {
    let titles;
    try {
      titles = await searchFiles(q, 15);
    } catch (e) {
      console.warn(`  search failed for "${q}":`, e.message);
      await sleep(1000);
      continue;
    }
    await sleep(1000);
    if (!titles.length) continue;
    let infos;
    try {
      infos = await imageInfo(titles);
    } catch (e) {
      console.warn(`  imageInfo failed for "${q}":`, e.message);
      await sleep(1000);
      continue;
    }
    await sleep(1000);
    for (const info of infos) {
      if (!ACCEPTED_MIMES_PHOTO.has(info.mime)) continue;
      const ext = fileExt(info.url);
      if (!ACCEPTED_EXTS_PHOTO.has(ext)) continue;
      const s = scoreProductCandidate(info.title, drug.brandName);
      if (s < 0) continue; // hard reject any title not containing the brand
      if (s > bestScore && isFreeLicense(info.licenseShort)) {
        bestScore = s;
        best = info;
        bestQuery = q;
      }
    }
    if (best && bestScore >= 15) break; // good enough
  }
  return best ? { info: best, query: bestQuery, score: bestScore } : null;
}

async function pickStructureImage(drug) {
  const queries = [
    `${drug.brandName} structure`,
    `${drug.brandName} skeletal`,
    `${drug.brandName}`,
    `${drug.genericName.split(/[\s(]/)[0]} structure`,
  ];
  let best = null;
  let bestScore = -Infinity;
  let bestQuery = "";
  for (const q of queries) {
    let titles;
    try {
      titles = await searchFiles(q, 15);
    } catch (e) {
      console.warn(`  search failed for "${q}":`, e.message);
      await sleep(1000);
      continue;
    }
    await sleep(1000);
    if (!titles.length) continue;
    let infos;
    try {
      infos = await imageInfo(titles);
    } catch (e) {
      console.warn(`  imageInfo failed for "${q}":`, e.message);
      await sleep(1000);
      continue;
    }
    await sleep(1000);
    for (const info of infos) {
      if (!ACCEPTED_MIMES_STRUCTURE.has(info.mime)) continue;
      const ext = fileExt(info.url);
      if (!ACCEPTED_EXTS_STRUCTURE.has(ext)) continue;
      const s = scoreStructureCandidate(info.title, drug.brandName);
      if (s > bestScore && isFreeLicense(info.licenseShort)) {
        bestScore = s;
        best = info;
        bestQuery = q;
      }
    }
    if (best && bestScore >= 15) break;
  }
  return best ? { info: best, query: bestQuery, score: bestScore } : null;
}

async function main() {
  await mkdir(PUBLIC_DRUGS, { recursive: true });
  await mkdir(PUBLIC_STRUCTURES, { recursive: true });

  const drugs = await parseManifest();
  console.log(`manifest: ${drugs.length} drugs`);
  console.log("");

  const results = [];
  let countProduct = 0;
  let countStructure = 0;
  const deferred = [];

  for (const drug of drugs) {
    console.log(`-> ${drug.brandName} (${drug.slug}) [${drug.source}]`);

    let pick = null;
    let kind = drug.source;

    if (drug.source === "wikimedia" || drug.source === "wikipedia") {
      pick = await pickProductImage(drug);
      if (!pick) {
        console.log(`  no product image; trying structure fallback`);
        pick = await pickStructureImage(drug);
        kind = pick ? "structure-svg" : drug.source;
      }
    } else if (drug.source === "structure-svg") {
      pick = await pickStructureImage(drug);
    } else {
      console.log(`  skipping unknown source: ${drug.source}`);
      deferred.push({ slug: drug.slug, reason: `unknown source ${drug.source}` });
      continue;
    }

    if (!pick) {
      console.log(`  DEFERRED: no acceptable free-licensed file found`);
      deferred.push({ slug: drug.slug, reason: "no free-licensed match on Commons" });
      continue;
    }

    const { info } = pick;
    const ext = (extname(info.url) || ".jpg").toLowerCase();
    const targetDir = kind === "structure-svg" ? PUBLIC_STRUCTURES : PUBLIC_DRUGS;
    const filename = `${drug.slug}${ext}`;
    const target = join(targetDir, filename);
    const publicPath =
      "/images/drugs" +
      (kind === "structure-svg" ? "/structures/" : "/") +
      filename;

    const maxBytes = kind === "structure-svg" ? MAX_BYTES_STRUCTURE : MAX_BYTES_PHOTO;
    try {
      const bytes = await downloadTo(info.url, target, maxBytes);
      console.log(
        `  OK ${info.title} -> ${publicPath} (${bytes} bytes, ${info.licenseShort})`,
      );
      if (kind === "structure-svg") countStructure++;
      else countProduct++;
      results.push({
        slug: drug.slug,
        brandName: drug.brandName,
        kind,
        publicPath,
        sourceTitle: info.title,
        sourceUrl: info.descriptionUrl,
        licenseShort: info.licenseShort,
        artist: info.artist,
        credit: info.credit,
        description: info.description,
        width: info.width,
        height: info.height,
        bytes,
        score: pick.score,
        query: pick.query,
      });
    } catch (e) {
      console.log(`  download failed: ${e.message}`);
      deferred.push({ slug: drug.slug, reason: `download failed: ${e.message}` });
    }
    await sleep(1000);
  }

  await writeFile(REPORT_PATH, JSON.stringify({ results, deferred }, null, 2));

  console.log("");
  console.log("=== SUMMARY ===");
  console.log(`product images: ${countProduct}`);
  console.log(`structure SVGs: ${countStructure}`);
  console.log(`deferred:       ${deferred.length}`);
  if (deferred.length) {
    console.log("deferred list:");
    for (const d of deferred) console.log(`  - ${d.slug}: ${d.reason}`);
  }
  console.log(`report written: ${REPORT_PATH}`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
