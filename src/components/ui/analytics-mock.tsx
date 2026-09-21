"use client";

import { ArrowUpRight, ArrowDownRight, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Deterministic stand-in for a real analytics screenshot.
 * Single-series area chart: one hue, no legend needed (the title names the
 * series), recessive grid, one direct label on the final point.
 * Swap it out by dropping the real export into public/proof/.
 */

const SERIES = [8, 12, 10, 18, 22, 19, 28, 34, 31, 44, 52, 49, 64, 78, 92];

function buildPath(values: number[], w: number, h: number, pad: number) {
  const max = Math.max(...values);
  const min = 0;
  const stepX = (w - pad * 2) / (values.length - 1);
  const scaleY = (v: number) =>
    h - pad - ((v - min) / (max - min)) * (h - pad * 2);

  const pts = values.map((v, i) => [pad + i * stepX, scaleY(v)] as const);

  // Smooth cubic through the points (Catmull-Rom → Bezier).
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? 0 : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return { line: d, pts };
}

export function MiniAreaChart({
  className,
  height = 150,
}: {
  className?: string;
  height?: number;
}) {
  const W = 420;
  const H = height;
  const PAD = 14;
  const { line, pts } = buildPath(SERIES, W, H, PAD);
  const area = `${line} L ${pts[pts.length - 1][0]},${H - PAD} L ${pts[0][0]},${H - PAD} Z`;
  const last = pts[pts.length - 1];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Illustrative upward trend in monthly reach"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="rm-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f9440" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#1f9440" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* recessive gridlines */}
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={PAD}
          x2={W - PAD}
          y1={PAD + t * (H - PAD * 2)}
          y2={PAD + t * (H - PAD * 2)}
          stroke="#14181a"
          strokeOpacity="0.07"
          strokeWidth="1"
        />
      ))}

      <path d={area} fill="url(#rm-area)" />
      <path
        d={line}
        fill="none"
        stroke="#1f9440"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {/* direct label on the final point only */}
      <circle cx={last[0]} cy={last[1]} r="4.5" fill="#fff" stroke="#1f9440" strokeWidth="2" />
    </svg>
  );
}

export function DeltaChip({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const trimmed = value.trim();
  const negative = /^[−-]/.test(trimmed);
  // Only a signed value is a trend. Plain labels like "30 days" or "unique"
  // get no arrow — an up-arrow beside them states a direction that is not
  // in the data.
  const isDelta = negative || /^\+/.test(trimmed);
  const Icon = negative ? ArrowDownRight : ArrowUpRight;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700 tabular-nums",
        className,
      )}
    >
      {isDelta ? <Icon className="size-3" aria-hidden /> : null}
      {value}
    </span>
  );
}

/** Shown when a real screenshot has not been dropped in yet. */
export function ScreenshotFallback({
  label,
  caption,
}: {
  label: string;
  caption: string;
}) {
  return (
    <div className="flex h-full w-full flex-col bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-ink-500">
          <ImageIcon className="size-3.5 shrink-0" aria-hidden />
          <span className="truncate">{label}</span>
        </div>
        <span className="shrink-0 rounded-full border border-dashed border-ink-200 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-ink-400">
          Sample
        </span>
      </div>

      <div className="mt-3 min-h-16 flex-1">
        <MiniAreaChart />
      </div>

      <p className="mt-3 border-t border-ink-100 pt-3 text-[11px] leading-snug text-ink-400">
        {caption}
      </p>
    </div>
  );
}
