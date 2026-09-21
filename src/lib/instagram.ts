import "server-only";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  INSTAGRAM LIVE FEED
 * ─────────────────────────────────────────────────────────────────────────────
 *  Uses the "Instagram API with Instagram Login" flow (graph.instagram.com).
 *  The old Basic Display API was shut down in Dec 2024 and no longer works.
 *
 *  Requirements:
 *    - The account must be a Business or Creator account (not Personal).
 *    - A linked Facebook Page is NOT required with this flow.
 *    - Scope: instagram_business_basic
 *
 *  This module is server-only — `import "server-only"` makes the build fail
 *  if it is ever pulled into a Client Component, so the access token can never
 *  be shipped to the browser.
 *
 *  Setup lives in README.md under "Instagram live feed".
 * ─────────────────────────────────────────────────────────────────────────────
 */

import tokenStore from "../../data/instagram-token.json";

const GRAPH = "https://graph.instagram.com";
const VERSION = "v25.0";

/**
 * The token can live in either place:
 *
 *   1. INSTAGRAM_ACCESS_TOKEN env var — takes precedence. Use this for local
 *      development, and on any host where the repo is not private.
 *   2. data/instagram-token.json — committed to the repo and rotated monthly
 *      by the GitHub Action. Only safe while this repository stays PRIVATE.
 *
 * The JSON value is inlined at build time, which is fine: the Action commits
 * the new token, and that push triggers a fresh deployment.
 */
function readToken(): string | null {
  const fromEnv = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  if (fromEnv) return fromEnv;

  const fromFile = tokenStore.accessToken?.trim();
  return fromFile ? fromFile : null;
}

/** Days until the stored token expires, or null if unknown. */
export function tokenDaysRemaining(): number | null {
  if (!tokenStore.expiresAt) return null;
  const ms = new Date(tokenStore.expiresAt).getTime() - Date.now();
  return Number.isFinite(ms) ? Math.round(ms / 86_400_000) : null;
}

/** Instagram CDN URLs expire, so we refetch hourly to keep them valid. */
const REVALIDATE_SECONDS = 60 * 60;

export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export type InstagramPost = {
  id: string;
  caption: string;
  mediaType: InstagramMediaType;
  /** Already resolved to a still image — videos use their thumbnail. */
  imageUrl: string;
  permalink: string;
  timestamp: string;
  username: string;
};

type RawMedia = {
  id: string;
  caption?: string;
  media_type: InstagramMediaType;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  username?: string;
};

const FIELDS = [
  "id",
  "caption",
  "media_type",
  "media_url",
  "thumbnail_url",
  "permalink",
  "timestamp",
  "username",
].join(",");

/**
 * Fetches recent posts. Returns `null` — never throws — when the integration
 * is not configured or the API is unhappy, so the page can fall back to
 * curated samples instead of erroring out in front of a visitor.
 */
export async function getInstagramPosts(
  limit = 8,
): Promise<InstagramPost[] | null> {
  const token = readToken();
  if (!token) return null;

  const url = new URL(`${GRAPH}/${VERSION}/me/media`);
  url.searchParams.set("fields", FIELDS);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", token);

  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["instagram"] },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      // Log without the token — the URL contains it.
      console.error(
        `[instagram] ${res.status} ${res.statusText}`,
        body.slice(0, 400),
      );
      return null;
    }

    const json = (await res.json()) as { data?: RawMedia[] };
    if (!Array.isArray(json.data)) return null;

    return json.data
      .map(normalise)
      .filter((p): p is InstagramPost => p !== null);
  } catch (err) {
    console.error("[instagram] request failed:", err);
    return null;
  }
}

function normalise(m: RawMedia): InstagramPost | null {
  // A VIDEO has no usable still in media_url, so prefer its thumbnail.
  const imageUrl = m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url;
  if (!imageUrl) return null;

  return {
    id: m.id,
    caption: m.caption?.trim() ?? "",
    mediaType: m.media_type,
    imageUrl,
    permalink: m.permalink,
    timestamp: m.timestamp,
    username: m.username ?? "",
  };
}

/**
 * Writes the refreshed token back into the Vercel project's environment
 * variable, so renewal is genuinely hands-off rather than a monthly chore.
 *
 * Needs three env vars, all set in Vercel:
 *   VERCEL_API_TOKEN  — an account token with access to this project
 *   VERCEL_PROJECT_ID — from Project Settings → General
 *   VERCEL_TEAM_ID    — only if the project lives under a team
 *
 * Returns a human-readable status; never throws.
 */
async function persistTokenToVercel(
  newToken: string,
): Promise<{ persisted: boolean; detail: string }> {
  const apiToken = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!apiToken || !projectId) {
    return {
      persisted: false,
      detail:
        "VERCEL_API_TOKEN / VERCEL_PROJECT_ID not set — save the token manually",
    };
  }

  const team = teamId ? `?teamId=${encodeURIComponent(teamId)}` : "";
  const headers = {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type": "application/json",
  };

  try {
    // Find the existing INSTAGRAM_ACCESS_TOKEN variable so we can PATCH it.
    const listRes = await fetch(
      `https://api.vercel.com/v9/projects/${projectId}/env${team}`,
      { headers, cache: "no-store" },
    );
    if (!listRes.ok) {
      return { persisted: false, detail: `Vercel list failed: ${listRes.status}` };
    }

    const list = (await listRes.json()) as {
      envs?: { id: string; key: string; target?: string[] }[];
    };
    const existing = list.envs?.find((e) => e.key === "INSTAGRAM_ACCESS_TOKEN");
    if (!existing) {
      return {
        persisted: false,
        detail: "INSTAGRAM_ACCESS_TOKEN not found on the Vercel project",
      };
    }

    const patchRes = await fetch(
      `https://api.vercel.com/v9/projects/${projectId}/env/${existing.id}${team}`,
      {
        method: "PATCH",
        headers,
        cache: "no-store",
        body: JSON.stringify({ value: newToken }),
      },
    );

    if (!patchRes.ok) {
      const body = await patchRes.text().catch(() => "");
      return {
        persisted: false,
        detail: `Vercel update failed: ${patchRes.status} ${body.slice(0, 200)}`,
      };
    }

    return { persisted: true, detail: "Saved to the Vercel project" };
  } catch (err) {
    return { persisted: false, detail: `Vercel request failed: ${err}` };
  }
}

/** Kicks a fresh deployment so the new token is actually picked up. */
async function triggerRedeploy(): Promise<boolean> {
  const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!hook) return false;
  try {
    const res = await fetch(hook, { method: "POST", cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Long-lived tokens last 60 days and must be refreshed while still valid
 * (and at least 24h old). Called by the cron route in
 * src/app/api/instagram/refresh/route.ts.
 */
export async function refreshInstagramToken(): Promise<{
  ok: boolean;
  /** The NEW token. It must be saved, or the refresh achieved nothing. */
  accessToken?: string;
  expiresInDays?: number;
  /** True when the new token was written back automatically. */
  persisted?: boolean;
  persistDetail?: string;
  redeployTriggered?: boolean;
  error?: string;
}> {
  const token = readToken();
  if (!token) {
    return {
      ok: false,
      error:
        "No token found — set the env var or fill in data/instagram-token.json",
    };
  }

  const url = new URL(`${GRAPH}/refresh_access_token`);
  url.searchParams.set("grant_type", "ig_refresh_token");
  url.searchParams.set("access_token", token);

  try {
    const res = await fetch(url, { cache: "no-store" });
    const json = (await res.json()) as {
      access_token?: string;
      expires_in?: number;
      error?: { message?: string };
    };

    if (!res.ok || !json.access_token) {
      return { ok: false, error: json.error?.message ?? `HTTP ${res.status}` };
    }

    // Meta issues a NEW token string; the old one keeps its original expiry.
    // Refreshing only helps if this value is saved back into
    // INSTAGRAM_ACCESS_TOKEN, so do that automatically where we can.
    const { persisted, detail } = await persistTokenToVercel(json.access_token);
    const redeployTriggered = persisted ? await triggerRedeploy() : false;

    return {
      ok: true,
      accessToken: json.access_token,
      expiresInDays: json.expires_in
        ? Math.round(json.expires_in / 86400)
        : undefined,
      persisted,
      persistDetail: detail,
      redeployTriggered,
    };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}
