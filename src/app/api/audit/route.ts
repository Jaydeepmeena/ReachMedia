import { NextResponse } from "next/server";
import {
  createAuditContact,
  createAuditOpportunity,
  isGhlConfigured,
  type AuditLead,
} from "@/lib/ghl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Receives the free-audit form, creates the contact in Go High Level and puts
 * it on the sales pipeline as an open opportunity.
 *
 * The form posts here rather than calling GHL from the browser, so the private
 * integration token stays on the server. A visitor never sees it, and it is
 * not in the JavaScript bundle.
 */

/** Crude per-IP throttle. In-memory, so it resets on deploy — enough to stop
 *  a bot hammering the form without adding a database for it. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  if (!isGhlConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Form is not connected yet." },
      { status: 503 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again shortly." },
      { status: 429 },
    );
  }

  let data: Partial<AuditLead> & { company?: string };
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: a real person leaves this hidden field empty. Accept quietly so
  // a bot cannot tell it was rejected.
  if (data.company) return NextResponse.json({ ok: true });

  const name = data.name?.trim() ?? "";
  const phone = data.phone?.trim() ?? "";
  const email = data.email?.trim() ?? "";
  const speciality = data.speciality?.trim() ?? "";

  if (!name || !phone || !email || !speciality) {
    return NextResponse.json(
      { ok: false, error: "Please fill in every field." },
      { status: 422 },
    );
  }
  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { ok: false, error: "That phone number looks incomplete." },
      { status: 422 },
    );
  }
  // Deliberately loose: the point is to catch a typo, not to police addresses.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address looks incomplete." },
      { status: 422 },
    );
  }

  const lead = { name, phone, email, speciality };
  const result = await createAuditContact(lead);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "We could not submit that. Please try again." },
      { status: 502 },
    );
  }

  // The contact is saved, so the lead is not lost whatever happens next. A
  // failure to raise the opportunity is logged for us and kept away from the
  // visitor — asking them to fill the form again would not fix a misconfigured
  // pipeline, and would risk them giving up instead.
  let opportunityId: string | null = null;
  if (result.contactId) {
    const opp = await createAuditOpportunity(result.contactId, lead);
    if (opp.ok) opportunityId = opp.opportunityId;
  } else {
    console.error("[audit] no contact id returned; skipped the opportunity");
  }

  return NextResponse.json({
    ok: true,
    duplicate: result.duplicate,
    opportunity: Boolean(opportunityId),
  });
}
