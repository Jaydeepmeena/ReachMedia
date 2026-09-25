#!/usr/bin/env node
/**
 * Resizes and compresses the static creatives in `src/client creatives/`
 * into `public/creatives/`.
 *
 *   node scripts/process-client-creatives.mjs
 *   node scripts/process-client-creatives.mjs --prune   # also delete published
 *                                                       # files with no source
 *
 * Source files are 250–800KB exports at 1080x1350. That is the right size for
 * the card, so this only re-encodes them: roughly a quarter of the bytes with
 * no visible difference at the size they are displayed.
 *
 * After adding a file here, add a matching entry to `creatives` in
 * src/lib/content.ts — that array controls order, title, client and
 * speciality.
 */

import sharp from "sharp";
import { readdir, stat, unlink, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, "..", "src", "client creatives");
const OUT = join(HERE, "..", "public", "creatives");

/** Source filename → published slug. Filenames are rarely descriptive. */
const SLUGS = {
  "Artboard 1 (6).jpg": "partha-plaque",
  "Artboard 1 (7).jpg": "partha-heart-under-40",
  "Post 01.jpg": "eledent-dry-mouth",
  "Post 2_3 (2).jpg": "credence-sinus-effects",
  "Post 4_5 (1).jpg": "credence-medical-emergency",
  "MBrace-Deck-01.jpg": "mbrace-fact-behind-advice",
  "MBrace-Deck-Oct-01.jpg": "mbrace-her-journey",
  "MBrace-Deck-Oct-06.jpg": "mbrace-pregnancy-normal",
  "MBrace-Deck-Oct-10_01.jpg": "mbrace-found-a-lump",
  "MBrace-Deck-Oct-10_03.jpg": "mbrace-doesnt-hurt",
  "PSARI 01 Carousal S2.jpg": "psri-acidity",
  "PSARI 01 Carousal S4.jpg": "psri-period-pain",
  "PSRI Post 02 S1.jpg": "psri-kabhi-socha",
  "PSRI Post 04.jpg": "psri-papa-ne-kaha",
  "PSRI Post 06 S2.jpg": "psri-pacemaker",
  "PSRI Post 08.jpg": "psri-heart-attack-signs",
};

const MAX_W = 1080;
const MAX_H = 1350;

const prune = process.argv.includes("--prune");
await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
const produced = new Set();
let before = 0;
let after = 0;
let missing = 0;

for (const file of files.sort()) {
  const slug = SLUGS[file];
  if (!slug) {
    console.warn(`SKIP  ${file}\n      → add it to SLUGS in this script, then re-run`);
    missing++;
    continue;
  }

  const src = join(SRC, file);
  const dest = join(OUT, `${slug}.jpg`);
  before += (await stat(src)).size;

  await sharp(src)
    .resize({ width: MAX_W, height: MAX_H, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);

  produced.add(`${slug}.jpg`);
  const size = (await stat(dest)).size;
  after += size;
  const meta = await sharp(dest).metadata();
  console.log(
    `${slug.padEnd(28)}${meta.width}x${meta.height}  ${(size / 1024).toFixed(0).padStart(4)}KB`,
  );
}

if (prune && existsSync(OUT)) {
  for (const f of await readdir(OUT)) {
    if (/\.(jpg|png)$/i.test(f) && !produced.has(f)) {
      await unlink(join(OUT, f));
      console.log(`PRUNED ${f} — no matching source`);
    }
  }
}

console.log(
  `\n${produced.size} creative(s): ${(before / 1e6).toFixed(1)}MB → ${(after / 1e6).toFixed(1)}MB`,
);
if (missing) {
  console.log(`${missing} file(s) skipped — add them to SLUGS and re-run.`);
  process.exitCode = 1;
}
