import nodemailer from 'nodemailer'

// Vercel serverless function: website form -> email over SMTP.
// Settings come from Vercel Environment Variables (never from the code):
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS  - mail account used to send
//   SMTP_FROM      - optional, defaults to SMTP_USER
//
// Leads kis-kis mail par jayengi: neeche LEAD_RECIPIENTS list mein hai.
// Mail ADD karne ke liye nayi line jodo, REMOVE karne ke liye line hata do,
// phir push karo (Vercel apne aap deploy kar deta hai).
const LEAD_RECIPIENTS = [
  'rohityadav@reinventdigital.com',
  'contact@reachmedia.co.in',
  'rupal@reinventdigital.com',
]

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const clean = (value, max) => String(value ?? '').trim().slice(0, max)

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !LEAD_RECIPIENTS.length) {
    console.error('send-lead: SMTP environment variables are missing')
    return res.status(500).json({ ok: false, error: 'Mail is not configured' })
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {}

  // Honeypot: real visitors never fill this hidden field.
  if (body.website) return res.status(200).json({ ok: true })

  const lead = {
    source: clean(body.source, 80) || 'Website form',
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    message: clean(body.message, 3000),
    wantsPlan: body.wantsPlan ? 'Yes' : 'No',
    page: clean(body.page, 300),
  }

  if (!isEmail(lead.email)) {
    return res.status(400).json({ ok: false, error: 'Please enter a valid email' })
  }

  const port = Number(SMTP_PORT) || 465

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS.replace(/\s+/g, '') },
  })

  const rows = [
    ['Source', lead.source],
    ['Name', lead.name || '-'],
    ['Email', lead.email],
    ['Message', lead.message || '-'],
    ['Wants 30-day content plan', lead.wantsPlan],
    ['Page', lead.page || '-'],
  ]

  const html = `<table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="border:1px solid #ddd;background:#f6f6f6"><b>${escapeHtml(label)}</b></td><td style="border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join('')}</table>`

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n')

  try {
    await transporter.sendMail({
      from: `"Reach Media Website" <${SMTP_FROM || SMTP_USER}>`,
      to: LEAD_RECIPIENTS,
      replyTo: lead.email,
      subject: `New lead from Reach Media website (${lead.source})`,
      text,
      html,
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('send-lead: sending failed', error.code || '', error.message)
    return res.status(502).json({ ok: false, error: 'Could not send the mail' })
  }
}

function safeParse(value) {
  try {
    return JSON.parse(value)
  } catch {
    return {}
  }
}
