// ============================================================
// Lead form settings - saare forms ka mail yahin se control hota hai.
//
// Mail ID BADALNE ke liye (2 tareeke):
//   1) Sabse aasaan: neeche DEFAULT_LEAD_EMAIL ki value badlo, push karo.
//   2) Code touch kiye bina: Vercel -> Project -> Settings ->
//      Environment Variables -> VITE_LEAD_EMAIL = naya@email.com
//      (phir Redeploy karo, bina build cache ke).
//
// Extra mail ID ADD karne ke liye (sabko same lead milegi):
//   EXTRA_LEAD_EMAILS mein comma se add karo, e.g.
//   ['sales@reachmedia.co.in', 'owner@gmail.com']
//   (ya Vercel env var VITE_LEAD_CC = "a@x.com,b@y.com")
//
// NOTE: Mail ID badalne ke baad naye address par FormSubmit ka ek
// one-time "Activate Form" mail aata hai. Usme button dabana zaroori hai,
// tabhi us ID par leads aana shuru hoti hain.
// ============================================================

export const DEFAULT_LEAD_EMAIL = 'rohityadav@reinventdigital.com'

export const EXTRA_LEAD_EMAILS = []

export const LEAD_EMAIL = import.meta.env.VITE_LEAD_EMAIL || DEFAULT_LEAD_EMAIL

export const LEAD_CC_EMAILS = (import.meta.env.VITE_LEAD_CC
  ? import.meta.env.VITE_LEAD_CC.split(',')
  : EXTRA_LEAD_EMAILS
)
  .map((email) => email.trim())
  .filter(Boolean)
