import { LEAD_CC_EMAILS, LEAD_EMAIL } from '../config/leadConfig'

// Sends a lead to the configured mail ID through FormSubmit (no backend needed).
export async function submitLead({ source, name, email, message, wantsPlan }) {
  const payload = {
    _subject: `New lead from Reach Media website (${source})`,
    _template: 'table',
    _captcha: 'false',
    _replyto: email,
    Source: source,
    Name: name || '-',
    Email: email,
    Message: message || '-',
    'Wants 30-day content plan': wantsPlan ? 'Yes' : 'No',
    Page: window.location.href,
  }

  if (LEAD_CC_EMAILS.length) payload._cc = LEAD_CC_EMAILS.join(',')

  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(LEAD_EMAIL)}`,
      {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      },
    )

    const result = await response.json().catch(() => ({}))

    if (!response.ok || String(result.success) === 'false') {
      throw new Error(result.message || `Request failed (${response.status})`)
    }
  } catch (error) {
    console.error('Lead form error:', error)
    throw error.name === 'AbortError' ? new Error('Request timed out') : error
  } finally {
    window.clearTimeout(timeoutId)
  }
}
