/**
 * Medical glyphs lucide-react does not ship. Drawn on lucide's 24px grid with
 * a 2px round stroke, so they sit beside lucide icons without looking foreign.
 */
import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { strokeWidth?: number | string };

/** A molar. lucide's only dental option is a toothbrush. */
export function ToothIcon({ strokeWidth = 2, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M7 3C5 3 3 4.6 3 7.5c0 2 .7 3.3 1.3 4.8.6 1.4.7 3 .9 4.7l.4 3.1c.2 1.1 1 1.9 1.9 1.9 1 0 1.6-.8 1.9-1.8l.8-3.2c.2-.8.9-1.4 1.8-1.4s1.6.6 1.8 1.4l.8 3.2c.3 1 .9 1.8 1.9 1.8.9 0 1.7-.8 1.9-1.9l.4-3.1c.2-1.7.3-3.3.9-4.7.6-1.5 1.3-2.8 1.3-4.8C21 4.6 19 3 17 3c-1.6 0-2.8 1-5 1S8.6 3 7 3Z" />
    </svg>
  );
}

/**
 * A 4-cell embryo — the IVF-lab mark. lucide's nearest options read wrong at
 * icon size (test tube as a pencil, heart-pulse as cardiology), and an egg
 * with a sperm reads as a key or a magnifier: any ring with a line off it
 * does. Four cells inside a membrane has no such lookalike.
 */
export function FertilityIcon({ strokeWidth = 2, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {/* membrane */}
      <circle cx="12" cy="12" r="9.5" />
      {/* four blastomeres */}
      <circle cx="8.8" cy="8.8" r="2.3" />
      <circle cx="15.2" cy="8.8" r="2.3" />
      <circle cx="8.8" cy="15.2" r="2.3" />
      <circle cx="15.2" cy="15.2" r="2.3" />
    </svg>
  );
}
