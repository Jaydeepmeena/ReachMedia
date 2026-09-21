import { NextResponse } from "next/server";
import { refreshInstagramToken } from "@/lib/instagram";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Extends the Instagram long-lived token by another 60 days.
 *
 * Meta hands back a NEW token string; the old one keeps its original expiry.
 * So this endpoint only helps if the returned token is saved back into the
 * INSTAGRAM_ACCESS_TOKEN environment variable. There is no way to write an
 * env var from inside a running deployment, so this is deliberately a
 * surface-and-notify endpoint rather than a silent "it's handled" one.
 *
 * Protected by CRON_SECRET: without it the route refuses to run, so nobody
 * who finds the URL can burn your token or read it back.
 *
 * Call it with:
 *   curl -H "Authorization: Bearer $CRON_SECRET" https://yoursite.com/api/instagram/refresh
 *
 * Vercel Cron sends that same Authorization header automatically — see
 * vercel.json.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "CRON_SECRET is not configured" },
      { status: 503 },
    );
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const result = await refreshInstagramToken();

  if (!result.ok) {
    console.error("[instagram] token refresh FAILED:", result.error);
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 502 },
    );
  }

  if (result.persisted) {
    // Fully automatic path — the token never needs to be shown to anyone.
    console.log(
      `[instagram] token refreshed and saved automatically — valid ~${result.expiresInDays} more days. ` +
        `Redeploy triggered: ${result.redeployTriggered}`,
    );
    return NextResponse.json({
      ok: true,
      expiresInDays: result.expiresInDays,
      persisted: true,
      redeployTriggered: result.redeployTriggered,
      detail: result.redeployTriggered
        ? "Saved to Vercel and a redeploy was triggered — nothing to do."
        : "Saved to Vercel. It takes effect on the next deployment; set " +
          "VERCEL_DEPLOY_HOOK_URL to trigger one automatically.",
    });
  }

  // Fallback path: auto-save is not configured, so the token has to be
  // surfaced for a human to store. Logged in full because this is the only
  // way to retrieve it, and the cron secret is already required to get here.
  console.warn(
    `[instagram] token refreshed but NOT saved (${result.persistDetail}).\n` +
      `ACTION REQUIRED: set INSTAGRAM_ACCESS_TOKEN to:\n${result.accessToken}`,
  );

  return NextResponse.json({
    ok: true,
    expiresInDays: result.expiresInDays,
    persisted: false,
    accessToken: result.accessToken,
    detail: result.persistDetail,
    action:
      "Save this value as INSTAGRAM_ACCESS_TOKEN and redeploy. Configure " +
      "VERCEL_API_TOKEN + VERCEL_PROJECT_ID to automate this.",
  });
}
