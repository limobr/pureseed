// Replaces the placeholder photos in public/images with real, openly licensed photos, cropped to the exact sizes the site needs.
// No API key needed (uses Openverse). If you do have PEXELS_API_KEY set, Pexels is used instead.
//   npm run fetch-images                      replace placeholders only
//   npm run fetch-images -- --only=hero.jpg   re-pick specific files (comma separated)
//   npm run fetch-images -- --safe            only CC0 / public-domain images (no attribution needed)
//   npm run fetch-images -- --force           replace everything, even files you added yourself
// Credits are written to public/images/CREDITS.md. Keep that file: most licences require attribution.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "public", "images");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "scripts", "images.json"), "utf8"));
const regPath = path.join(dir, ".placeholders.json");
const creditsPath = path.join(dir, "CREDITS.md");
const registry = fs.existsSync(regPath) ? JSON.parse(fs.readFileSync(regPath, "utf8")) : {};

const args = process.argv.slice(2);
const force = args.includes("--force");
const safe = args.includes("--safe");
const only = args.find((a) => a.startsWith("--only="))?.slice(7).split(",");
const delay = Number(args.find((a) => a.startsWith("--delay="))?.slice(8) ?? 2500);
const pexelsKey = process.env.PEXELS_API_KEY;
const UA = { "User-Agent": "pureseed-site-image-fetch/1.0" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const sha = (f) => crypto.createHash("sha256").update(fs.readFileSync(f)).digest("hex");
const { default: sharp } = await import("sharp");

async function getJson(url, headers = {}) {
  for (let i = 0; i < 4; i++) {
    const res = await fetch(url, { headers: { ...UA, ...headers }, signal: AbortSignal.timeout(30000) });
    if (res.status === 429) {
      const wait = (Number(res.headers.get("retry-after")) || 60) * 1000;
      console.log(`  rate limited, waiting ${Math.round(wait / 1000)}s...`);
      await sleep(wait); continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
  throw new Error("still rate limited, try again in an hour");
}

async function searchOpenverse(it, q, strict) {
  const p = new URLSearchParams({ q, category: "photograph", page_size: "20", mature: "false" });
  if (strict && it.orientation === "square") p.set("aspect_ratio", "square");
  if (safe) p.set("license", "cc0,pdm"); else p.set("license_type", "commercial");
  const j = await getJson(`https://api.openverse.org/v1/images/?${p}`);
  return (j.results ?? []).map((r) => ({
    id: r.id ?? r.url, url: r.url, w: r.width, h: r.height,
    credit: `"${r.title || "Untitled"}" by ${r.creator || "unknown"}, ${String(r.license).toUpperCase()} ${r.license_version ?? ""}, ${r.foreign_landing_url}`.replace(/\s+,/g, ","),
  }));
}

async function searchPexels(it, q) {
  const p = new URLSearchParams({ query: q, per_page: "30", orientation: it.orientation });
  const j = await getJson(`https://api.pexels.com/v1/search?${p}`, { Authorization: pexelsKey });
  return (j.photos ?? []).map((r) => ({
    id: r.id, url: `${r.src.original}?auto=compress&cs=tinysrgb&w=${Math.round(it.w * 1.25)}`, w: r.width, h: r.height,
    credit: `Photo by ${r.photographer} on Pexels, ${r.url}`,
  }));
}
const search = pexelsKey ? searchPexels : searchOpenverse;
// Most free photos are ~1000px wide, so accept those and never upscale beyond what the source has.
const minSize = (it) => ({ w: Math.min(it.w * 0.6, 900), h: it.h * 0.45 });

async function save(c, it, out) {
  const res = await fetch(c.url, { headers: UA, signal: AbortSignal.timeout(45000) });
  if (!res.ok) throw new Error(`download HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const meta = await sharp(buf).metadata(); const min = minSize(it);
  if ((meta.width ?? 0) < min.w || (meta.height ?? 0) < min.h) throw new Error("too small");
  const cropW = Math.min(meta.width, (meta.height * it.w) / it.h);   // widest crop of the right shape that the source allows
  const outW = Math.min(it.w, Math.round(cropW)), outH = Math.round((outW * it.h) / it.w);   // same aspect ratio, no upscaling
  let img = sharp(buf).rotate().resize(outW, outH, { fit: "cover", position: "attention" });
  img = it.file.endsWith(".png") ? img.png({ compressionLevel: 9 }) : img.jpeg({ quality: 82, mozjpeg: true });
  await img.toFile(out);
}

const credits = new Map();
if (fs.existsSync(creditsPath)) for (const l of fs.readFileSync(creditsPath, "utf8").split("\n")) { const m = l.match(/^- (\S+?): /); if (m) credits.set(m[1], l); }
const used = new Set();
let ok = 0, missed = [];

for (const it of manifest) {
  if (only && !only.includes(it.file)) continue;
  const out = path.join(dir, it.file);
  const replaceable = !fs.existsSync(out) || registry[it.file] === sha(out);
  if (!replaceable && !force) { console.log("skip (already your own file):", it.file); continue; }

  const queries = it.queries ?? [it.query]; const min = minSize(it); const notes = []; let done = false;
  for (const [qi, q] of queries.entries()) {
    if (done) break;
    let cands;
    try { cands = await search(it, q, qi === 0); } catch (e) { notes.push(`"${q}": search error (${e.message})`); continue; }
    let small = 0, failed = 0;
    for (const c of cands.filter((c) => !used.has(c.id))) {
      if (failed >= 10) break;
      if (c.w && (c.w < min.w || (c.h && c.h < min.h))) { small++; continue; }
      try {
        await save(c, it, out); used.add(c.id); delete registry[it.file];
        credits.set(it.file, `- ${it.file}: ${c.credit}`); console.log("ok  ", it.file, `(query "${q}")`); ok++; done = true; break;
      } catch { failed++; }
    }
    if (!done) notes.push(`"${q}": ${cands.length} found, ${small} too small, ${failed} failed to download`);
    await sleep(delay);
  }
  if (!done) { console.log("MISS", it.file); notes.forEach((n) => console.log("     " + n)); missed.push(it.file); }
}

fs.writeFileSync(regPath, JSON.stringify(registry, null, 1));
if (credits.size) fs.writeFileSync(creditsPath, "# Image credits\n\n" + [...credits.values()].join("\n") + "\n");
console.log(`\n${ok} replaced${missed.length ? `, ${missed.length} not found: re-run later with --only=${missed.join(",")}` : ""}.`);
console.log("Review the photos in public/images (search results can be off-target) and keep CREDITS.md for attribution.");
