#!/usr/bin/env node
/**
 * Compresses the raw client videos in `src/client video/` into web-ready files
 * in `public/videos/`, and extracts a poster frame for each.
 *
 *   node scripts/process-client-videos.mjs
 *   node scripts/process-client-videos.mjs --force   # re-encode even if up to date
 *
 * Why this exists: the source files are camera/export masters — `eye.mp4` alone
 * is 147MB. GitHub refuses any file over 100MB, and shipping hundreds of
 * megabytes of video to a phone is worse than not shipping video at all. These
 * are 9:16 reels shown in a card a few hundred pixels wide, so 720p is already
 * more than the card can display.
 *
 * Posters matter as much as the encode: with a poster the card paints
 * immediately and the video itself is only fetched when it scrolls into view.
 *
 * Needs ffmpeg. It is found on PATH, or under the winget install location.
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readdir, stat, mkdir, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { homedir } from "node:os";

const run = promisify(execFile);
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, "..", "src", "client video");
const OUT = join(HERE, "..", "public", "videos");

/** Source filename → published slug. */
const SLUGS = {
  "dental 1.mp4": "dental-one-click",
  "dental 2.mp4": "dental-oral-cancer",
  "eye.mp4": "eye-examination",
  "IVF.mp4": "ivf-next-step",
  // Despite the filename, this one closes on an Oracare Prime "Redefining
  // Dentistry Digitally" card — it is a dental reel, not a hospital one.
  "multi speciality 1.mp4": "dental-smile-confidence",
  "Multi speciality.mp4": "hospital-fatty-liver",
  "Does IVF Cause Birth Defects.mp4": "ivf-birth-defects",
  "03_Partha Implant plus Crown Ad.mp4": "partha-implant-crown",
  "04_Patha Braces-2.mp4": "partha-braces",
  "05_Partha Full Mouth Implant.mp4": "partha-full-mouth-implant",
  "Kamineni_01.mp4": "kamineni-01",
  "Kamineni_02.mp4": "kamineni-02",
};

/** The card is a few hundred px wide; 720p vertical is already generous. */
const MAX_H = 1280;
const CRF = 27;
const AUDIO_KBPS = 96;

async function findBinary(name) {
  try {
    await run(name, ["-version"]);
    return name;
  } catch {
    /* not on PATH — winget adds it only for new shells */
  }
  const root = join(homedir(), "AppData", "Local", "Microsoft", "WinGet", "Packages");
  if (!existsSync(root)) throw new Error(`${name} not found`);

  const stack = [root];
  while (stack.length) {
    const dir = stack.pop();
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      const full = join(dir, e.name);
      if (e.isDirectory()) stack.push(full);
      else if (e.name.toLowerCase() === `${name}.exe`) return full;
    }
  }
  throw new Error(
    `${name} not found. Install it with:  winget install Gyan.FFmpeg`,
  );
}

const force = process.argv.includes("--force");
const prune = process.argv.includes("--prune");
const ffmpeg = await findBinary("ffmpeg");
const ffprobe = await findBinary("ffprobe");
await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => /\.(mp4|mov|m4v|webm)$/i.test(f));
const produced = new Set();
let totalBefore = 0;
let totalAfter = 0;
let missing = 0;

for (const file of files.sort()) {
  const slug = SLUGS[file];
  if (!slug) {
    console.warn(`SKIP  ${file}\n      → add it to SLUGS in this script, then re-run`);
    missing++;
    continue;
  }

  const src = join(SRC, file);
  const mp4 = join(OUT, `${slug}.mp4`);
  const poster = join(OUT, `${slug}.jpg`);
  const srcStat = await stat(src);
  totalBefore += srcStat.size;

  if (!force && existsSync(mp4) && (await stat(mp4)).mtimeMs > srcStat.mtimeMs) {
    const kept = (await stat(mp4)).size;
    totalAfter += kept;
    produced.add(`${slug}.mp4`);
    produced.add(`${slug}.jpg`);
    console.log(`${slug.padEnd(30)} up to date  ${(kept / 1e6).toFixed(1)}MB`);
    continue;
  }

  const probe = JSON.parse(
    (await run(ffprobe, ["-v", "quiet", "-print_format", "json", "-show_format", "-show_streams", src])).stdout,
  );
  const v = probe.streams.find((s) => s.codec_type === "video");
  const hasAudio = probe.streams.some((s) => s.codec_type === "audio");
  const duration = Number(probe.format.duration);

  // Even height is required by H.264; -2 keeps the aspect and rounds safely.
  const scale = v.height > MAX_H ? `scale=-2:${MAX_H}` : "scale=trunc(iw/2)*2:trunc(ih/2)*2";

  await run(ffmpeg, [
    "-y", "-i", src,
    "-vf", scale,
    "-c:v", "libx264",
    "-profile:v", "high",
    "-preset", "slow",
    "-crf", String(CRF),
    "-pix_fmt", "yuv420p",
    // Keyframe every 2s so seeking and in-view starts are snappy.
    "-g", "60", "-keyint_min", "60",
    ...(hasAudio ? ["-c:a", "aac", "-b:a", `${AUDIO_KBPS}k`, "-ac", "2"] : ["-an"]),
    // Move the index to the front so playback can start before the full download.
    "-movflags", "+faststart",
    mp4,
  ], { maxBuffer: 1024 * 1024 * 64 });

  // Poster: a frame ~1s in, since frame 0 is often black or a fade-up.
  await run(ffmpeg, [
    "-y", "-ss", String(Math.min(1, duration / 4)), "-i", src,
    "-vframes", "1",
    "-vf", `scale=-2:${Math.min(MAX_H, v.height)}`,
    "-q:v", "4",
    poster,
  ], { maxBuffer: 1024 * 1024 * 32 });

  // Some sources are already small and low-res (360x640, heavily compressed).
  // Re-encoding those makes them BIGGER for no gain, so keep the original and
  // just remux it — no quality loss, and it still gains the faststart index.
  let outSize = (await stat(mp4)).size;
  if (outSize >= srcStat.size) {
    await run(ffmpeg, [
      "-y", "-i", src, "-c", "copy", "-movflags", "+faststart", mp4,
    ], { maxBuffer: 1024 * 1024 * 64 });
    outSize = (await stat(mp4)).size;
    console.log(`${slug.padEnd(30)} re-encode was larger — kept original, remuxed`);
  }

  produced.add(`${slug}.mp4`);
  produced.add(`${slug}.jpg`);
  const posterSize = (await stat(poster)).size;
  totalAfter += outSize;

  console.log(
    `${slug.padEnd(30)}${(srcStat.size / 1e6).toFixed(1).padStart(7)}MB → ` +
      `${(outSize / 1e6).toFixed(1).padStart(5)}MB  ` +
      `(−${(100 - (outSize / srcStat.size) * 100).toFixed(0)}%)  ` +
      `${duration.toFixed(0)}s  poster ${(posterSize / 1024).toFixed(0)}KB`,
  );
}

if (prune) {
  for (const f of await readdir(OUT)) {
    if (/[.](mp4|jpg)$/i.test(f) && !produced.has(f)) {
      await unlink(join(OUT, f));
      console.log(`PRUNED ${f} — no matching source`);
    }
  }
}

console.log(
  `\n${(totalBefore / 1e6).toFixed(0)}MB → ${(totalAfter / 1e6).toFixed(1)}MB ` +
    `(−${(100 - (totalAfter / totalBefore) * 100).toFixed(0)}%)`,
);
if (missing) {
  console.log(`${missing} file(s) skipped — add them to SLUGS and re-run.`);
  process.exitCode = 1;
}
