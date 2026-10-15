// Generates tiny (~300-600 byte) blurred previews of every image in public/images
// and writes them to lib/blur-data.json. <Media> shows them instantly (inline, zero
// extra requests), then cross-fades to the full image once it has loaded.
// Runs automatically before `dev` and `build`. Re-run after replacing an image.
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "public", "images");
const out = path.join(root, "lib", "blur-data.json");

const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
const map = {};
for (const f of files) {
  try {
    const buf = await sharp(path.join(dir, f))
      .rotate()
      .resize(24, 24, { fit: "inside" })
      .flatten({ background: "#ffffff" })
      .webp({ quality: 35 })
      .toBuffer();
    map[`/images/${f}`] = `data:image/webp;base64,${buf.toString("base64")}`;
  } catch (e) {
    console.warn(`blur: skipped ${f} (${e.message})`);
  }
}
await writeFile(out, JSON.stringify(map));
console.log(`blur: wrote ${Object.keys(map).length} previews to lib/blur-data.json`);
