#!/usr/bin/env node
/**
 * Renews the Instagram long-lived access token and writes it back into
 * data/instagram-token.json.
 *
 * Run by .github/workflows/refresh-instagram-token.yml once a month. The
 * workflow commits the result; that push triggers a Vercel deployment, so the
 * new token goes live without anyone touching it.
 *
 * Run locally with:  node scripts/refresh-instagram-token.mjs
 * Add --dry-run to call the API without writing the file.
 *
 * Exit codes:  0 = renewed (or skipped, nothing to do)   1 = failed
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const STORE = join(HERE, "..", "data", "instagram-token.json");

const DRY_RUN = process.argv.includes("--dry-run");

/** Renew when fewer than this many days remain. Tokens last 60. */
const RENEW_WITHIN_DAYS = 25;

/** Meta rejects a refresh on a token younger than 24 hours. */
const MIN_AGE_HOURS = 24;

function mask(token) {
  if (!token) return "(empty)";
  return `${token.slice(0, 6)}…${token.slice(-4)} (${token.length} chars)`;
}

function fail(message) {
  console.error(`::error::${message}`);
  process.exit(1);
}

const raw = await readFile(STORE, "utf8").catch(() => null);
if (raw === null) fail(`Cannot read ${STORE}`);

let store;
try {
  store = JSON.parse(raw);
} catch {
  fail(`${STORE} is not valid JSON`);
}

// The env var wins if present, so CI can inject a token without committing one.
const current = (process.env.IG_TOKEN || store.accessToken || "").trim();

if (!current) {
  fail(
    "No token to renew. Put one in data/instagram-token.json (or set IG_TOKEN) first.",
  );
}

console.log(`Current token: ${mask(current)}`);

// ── Skip if it was refreshed too recently for Meta to accept ────────────────
if (store.refreshedAt) {
  const ageHours = (Date.now() - new Date(store.refreshedAt).getTime()) / 3_600_000;
  if (ageHours < MIN_AGE_HOURS) {
    console.log(
      `Refreshed ${ageHours.toFixed(1)}h ago; Meta requires ${MIN_AGE_HOURS}h. Nothing to do.`,
    );
    process.exit(0);
  }
}

// ── Skip if there is still plenty of life left ──────────────────────────────
if (store.expiresAt && !process.env.FORCE_REFRESH) {
  const daysLeft = (new Date(store.expiresAt).getTime() - Date.now()) / 86_400_000;
  if (daysLeft > RENEW_WITHIN_DAYS) {
    console.log(
      `${daysLeft.toFixed(0)} days remaining (renew under ${RENEW_WITHIN_DAYS}). Nothing to do.`,
    );
    process.exit(0);
  }
  console.log(`${daysLeft.toFixed(0)} days remaining — renewing.`);
}

// ── Renew ───────────────────────────────────────────────────────────────────
const url = new URL("https://graph.instagram.com/refresh_access_token");
url.searchParams.set("grant_type", "ig_refresh_token");
url.searchParams.set("access_token", current);

let payload;
try {
  const res = await fetch(url);
  payload = await res.json();
  if (!res.ok) {
    fail(
      `Meta returned ${res.status}: ${payload?.error?.message ?? JSON.stringify(payload)}`,
    );
  }
} catch (err) {
  fail(`Request to Meta failed: ${err}`);
}

if (!payload.access_token) {
  fail(`No access_token in response: ${JSON.stringify(payload)}`);
}

const expiresInDays = Math.round((payload.expires_in ?? 0) / 86_400);
console.log(`Renewed: ${mask(payload.access_token)} — valid ${expiresInDays} days`);

if (payload.access_token === current) {
  console.log("Meta returned the same token; file unchanged.");
  process.exit(0);
}

if (DRY_RUN) {
  console.log("--dry-run: not writing the file.");
  process.exit(0);
}

const next = {
  ...store,
  accessToken: payload.access_token,
  expiresAt: new Date(Date.now() + (payload.expires_in ?? 0) * 1000).toISOString(),
  refreshedAt: new Date().toISOString(),
};

await writeFile(STORE, `${JSON.stringify(next, null, 2)}\n`, "utf8");
console.log(`Wrote ${STORE}`);

// Surface a summary in the Actions run without printing the secret.
if (process.env.GITHUB_STEP_SUMMARY) {
  await writeFile(
    process.env.GITHUB_STEP_SUMMARY,
    `### Instagram token renewed\n\n- Valid for **${expiresInDays} days** (until ${next.expiresAt.slice(0, 10)})\n- Token: \`${mask(payload.access_token)}\`\n`,
    { flag: "a" },
  );
}
