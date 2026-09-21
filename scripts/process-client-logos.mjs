#!/usr/bin/env node
/**
 * Turns the raw client logos in `src/client logo/` into web-ready files in
 * `public/clients/`.
 *
 *   node scripts/process-client-logos.mjs
 *   node scripts/process-client-logos.mjs --prune   # also delete published
 *                                                   # files whose source is gone
 *
 * Client logos arrive in wildly inconsistent shapes, and three problems come up
 * again and again. This handles all of them:
 *
 *  1. Padding. Artwork often sits in a much larger canvas (PSRI's mark filled
 *     a third of its file), so a contain-fit renders it tiny. We find the true
 *     content box and crop to it.
 *  2. Baked-in backgrounds. Some files carry an opaque white panel, a border
 *     rule, or a drop shadow. A plain "non-white" scan treats all three as
 *     content. We look only for pixels that are clearly dark or clearly
 *     coloured, so soft grey shadows and hairline frames are ignored.
 *  3. Off-white backgrounds. A 254,254,254 panel is invisible on paper and
 *     glaringly visible on a white card. We flood-fill the background to
 *     transparent from the edges inward — never touching white *inside* a mark,
 *     such as the tooth in Partha's logo or the counters in letterforms.
 *
 * After adding a file here, add a matching entry to `clients` in
 * src/lib/content.ts — that array controls order, display name and sector.
 */

import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, "..", "src", "client logo");
const OUT = join(HERE, "..", "public", "clients");

/** Source filename → published slug. Filenames are rarely descriptive. */
const SLUGS = {
  "Artboard 1 copy.png": "mbrace-kamineni",
  "Fertility.png": "kamineni-fertility",
  "Logo.png": "kamineni-hospitals",
  "PSRI-logo.png": "psri-hospital",
  "PARTHA NEW LOGO PNG.png": "partha-dental",
  "PNG LOGO copy.png": "radiant-dental-care",
  "Ivia Dental logo.png": "ivia-dental",
  "Eledent logo copy.png": "eledent-international",
  "credence-dental-logo.png.webp": "credence-dental",
  "Dental Roots High Res-03.png": "dental-roots",
  "ORACAREPRIME_Logo.png": "oracare-prime",
  "kenia logo_Actual PNG.png": "kenia-eye-dental",
  "NDC.png": "national-dental-care",
};

const MAX_W = 720;
const MAX_H = 360;

/** Clearly dark, or clearly coloured. Soft shadows and near-white fail both. */
function isMark(data, i) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  return Math.min(r, g, b) < 170 || Math.max(r, g, b) - Math.min(r, g, b) > 45;
}

async function contentBox(file) {
  const { data, info } = await sharp(file)
    .flatten({ background: "#ffffff" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;

  let minX = W, minY = H, maxX = -1, maxY = -1;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (isMark(data, (y * W + x) * C)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return null;
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

/** Flood-fill edge-connected near-white to transparent. */
async function clearBackground(buffer) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;

  const near = (i) => data[i] > 238 && data[i + 1] > 238 && data[i + 2] > 238;
  const seen = new Uint8Array(W * H);
  const stack = [];
  for (let x = 0; x < W; x++) stack.push(x, 0, x, H - 1);
  for (let y = 0; y < H; y++) stack.push(0, y, W - 1, y);

  let cleared = 0;
  while (stack.length) {
    const y = stack.pop();
    const x = stack.pop();
    if (x < 0 || y < 0 || x >= W || y >= H) continue;
    const q = y * W + x;
    if (seen[q]) continue;
    const i = q * C;
    if (data[i + 3] < 20) { seen[q] = 1; continue; }
    if (!near(i)) continue;
    seen[q] = 1;
    data[i + 3] = 0;
    cleared++;
    stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
  }

  return {
    buffer: await sharp(data, { raw: { width: W, height: H, channels: C } })
      .png({ compressionLevel: 9, palette: true })
      .toBuffer(),
    cleared,
  };
}

const prune = process.argv.includes("--prune");
const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
const produced = new Set();
let missing = 0;

for (const file of files.sort()) {
  const slug = SLUGS[file];
  if (!slug) {
    console.warn(`SKIP  ${file}\n      → add it to SLUGS in this script, then re-run`);
    missing++;
    continue;
  }

  const src = join(SRC, file);
  const box = await contentBox(src);
  if (!box) {
    console.warn(`SKIP  ${file} — no visible content found`);
    continue;
  }

  const cropped = await sharp(src)
    .extract(box)
    .resize({ width: MAX_W, height: MAX_H, fit: "inside", withoutEnlargement: true })
    .png()
    .toBuffer();

  const { buffer, cleared } = await clearBackground(cropped);
  const dest = join(OUT, `${slug}.png`);
  // Re-encode explicitly: a plain toFile() here loses the palette compression
  // and roughly doubles every file.
  await sharp(buffer).png({ compressionLevel: 9, palette: true }).toFile(dest);
  produced.add(`${slug}.png`);

  const meta = await sharp(dest).metadata();
  const kb = ((await stat(dest)).size / 1024).toFixed(0);
  console.log(
    `${slug.padEnd(24)} ${String(box.width)}x${box.height}`.padEnd(42) +
      `→ ${meta.width}x${meta.height}  ratio ${(meta.width / meta.height).toFixed(2)}  ${kb}KB` +
      (cleared ? `  (bg cleared)` : ""),
  );
}

if (prune && existsSync(OUT)) {
  for (const f of await readdir(OUT)) {
    if (f.endsWith(".png") && !produced.has(f)) {
      await unlink(join(OUT, f));
      console.log(`PRUNED ${f} — no matching source`);
    }
  }
}

console.log(`\n${produced.size} logo(s) written to public/clients/`);
if (missing) {
  console.log(`${missing} file(s) skipped — add them to SLUGS and re-run.`);
  process.exitCode = 1;
}
