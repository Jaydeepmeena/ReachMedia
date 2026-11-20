// Sends a lead to our own backend (api/send-lead.js), which emails it over SMTP.
// The receiver mail ID is set in Vercel (LEAD_TO_EMAIL), not in this code.
export async function submitLead({ source, name, email, message, wantsPlan }) {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), 20000)

  try {
    const response = await fetch('/api/send-lead', {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source,
        name,
        email,
        message,
        wantsPlan,
        page: window.location.href,
      }),
    })

    const result = await response.json().catch(() => ({}))

    if (!response.ok || !result.ok) {
      throw new Error(result.error || `Request failed (${response.status})`)
    }
  } catch (error) {
    console.error('Lead form error:', error)
    throw error.name === 'AbortError' ? new Error('Request timed out') : error
  } finally {
    window.clearTimeout(timeoutId)
  }
}
