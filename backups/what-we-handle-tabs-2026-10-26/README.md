# WHAT WE HANDLE: Original Tabbed Design

Saved before the scroll-strip redesign on 2026-10-26.

- `WhatWeDoSection.jsx`: exact original component, including all six services and their copy.
- `style.css`: exact global stylesheet snapshot for reference.

The original component's CSS remains in the live global stylesheet. The redesigned component imports a separate, scoped stylesheet, so restoring the original does not require replacing unrelated site CSS.

## Restore When Requested

Run from the project root:

```sh
cp backups/what-we-handle-tabs-2026-10-26/WhatWeDoSection.jsx src/components/WhatWeDoSection.jsx
```

Reload the page after restoring. Do not copy the archived global `style.css` over the live stylesheet unless all intervening site-wide CSS changes are intentionally being reverted.

## Original SHA-256

Component: `3f3209df7ca16a3d9111331a46ee12ac453ae88ad398a8e2abfbbd3b72b33d9c`

Global stylesheet: `02163a3155880a88d32f5b63873d53f14a69d992c8bc6ddc0e995262070815e5`
