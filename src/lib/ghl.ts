import "server-only";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  GO HIGH LEVEL — audit form → CRM contact
 * ─────────────────────────────────────────────────────────────────────────────
 *  Needs two environment variables, never committed:
 *      GHL_API_TOKEN    private integration token (pit-…)
 *      GHL_LOCATION_ID  the sub-account the contact belongs to
 *
 *  Server-only: the token is read here and never reaches the browser. The
 *  build fails if this module is ever imported from client code.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const API = "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";

export type AuditLead = {
  clinic: string;
  speciality: string;
  name: string;
  phone: string;
  email?: string;
  handle?: string;
  message?: string;
};

export type GhlResult =
  | { ok: true; contactId: string | null; duplicate: boolean }
  | { ok: false; error: string; status?: number };

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    Version: VERSION,
  };
}

/** "Dr. Anita Rao" → first "Dr. Anita", last "Rao". A single word has no last. */
function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts[parts.length - 1],
  };
}

/**
 * Indian mobiles are typed as 10 digits far more often than in E.164. GHL
 * matches and dials on the full number, so normalise before sending.
 */
export function normalisePhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  const bare = digits.replace(/\D/g, "");
  if (bare.length === 10) return `+91${bare}`;
  if (bare.length === 12 && bare.startsWith("91")) return `+${bare}`;
  return bare ? `+${bare}` : "";
}

export function isGhlConfigured(): boolean {
  return Boolean(process.env.GHL_API_TOKEN && process.env.GHL_LOCATION_ID);
}

/**
 * Creates the contact. The speciality, Instagram handle and free-text message
 * have no matching contact field, so they go on a note attached to the contact
 * — that keeps them with the lead instead of being dropped.
 */
export async function createAuditContact(lead: AuditLead): Promise<GhlResult> {
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    return { ok: false, error: "GHL is not configured" };
  }

  const { firstName, lastName } = splitName(lead.name);
  const phone = normalisePhone(lead.phone);

  const body: Record<string, unknown> = {
    firstName,
    lastName,
    name: lead.name.trim(),
    locationId,
    phone,
    companyName: lead.clinic.trim(),
    source: "Website — free audit form",
    tags: ["Website Audit Request", lead.speciality].filter(Boolean),
  };
  if (lead.email?.trim()) body.email = lead.email.trim();
  if (lead.handle?.trim()) body.website = lead.handle.trim();

  let res: Response;
  try {
    res = await fetch(`${API}/contacts/`, {
      method: "POST",
      headers: headers(token),
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch (err) {
    console.error("[ghl] request failed:", err);
    return { ok: false, error: "Could not reach the CRM" };
  }

  const payload = (await res.json().catch(() => ({}))) as {
    contact?: { id?: string };
    meta?: { contactId?: string };
    message?: string | string[];
  };

  // 400 with a duplicate message means the person already exists — that is a
  // successful submission from the visitor's point of view, not an error.
  const duplicate =
    res.status === 400 &&
    JSON.stringify(payload.message ?? "").toLowerCase().includes("duplicate");

  if (!res.ok && !duplicate) {
    const message = Array.isArray(payload.message)
      ? payload.message.join("; ")
      : payload.message ?? `${res.status} ${res.statusText}`;
    console.error(`[ghl] create contact failed: ${res.status}`, message);
    return { ok: false, error: message, status: res.status };
  }

  const contactId = payload.contact?.id ?? payload.meta?.contactId ?? null;

  if (contactId) {
    await addNote(token, contactId, lead).catch((err) =>
      console.error("[ghl] note failed (contact was still created):", err),
    );
  }

  return { ok: true, contactId, duplicate };
}

async function addNote(token: string, contactId: string, lead: AuditLead) {
  const lines = [
    `Clinic: ${lead.clinic}`,
    `Speciality: ${lead.speciality}`,
    `Phone: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : null,
    lead.handle ? `Instagram / website: ${lead.handle}` : null,
    "",
    lead.message?.trim() || "(no additional notes)",
  ].filter(Boolean);

  await fetch(`${API}/contacts/${contactId}/notes`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ body: lines.join("\n") }),
    cache: "no-store",
  });
}

/** Used only to clean up a test contact. */
export async function deleteContact(contactId: string): Promise<boolean> {
  const token = process.env.GHL_API_TOKEN;
  if (!token) return false;
  const res = await fetch(`${API}/contacts/${contactId}`, {
    method: "DELETE",
    headers: headers(token),
    cache: "no-store",
  });
  return res.ok;
}
