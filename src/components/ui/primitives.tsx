import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ── Layout ─────────────────────────────────────────────────────────────── */

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("relative py-10 sm:py-12 lg:py-14", className)}
    >
      {children}
    </section>
  );
}

/* ── Type ───────────────────────────────────────────────────────────────── */

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]",
        tone === "light"
          ? "border-brand-200 bg-brand-50 text-brand-700"
          : "border-white/15 bg-white/10 text-brand-200",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  lead,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const parts = highlight ? title.split(highlight) : [title];

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "max-w-3xl font-display text-[clamp(1.85rem,4.4vw,3.05rem)] font-extrabold leading-[1.1] tracking-[-0.025em] text-balance",
          tone === "dark" ? "text-white" : "text-ink-900",
        )}
      >
        {parts[0]}
        {highlight ? (
          <span className={tone === "dark" ? "text-brand-300" : "brand-text"}>
            {highlight}
          </span>
        ) : null}
        {parts[1] ?? ""}
      </h2>
      {lead ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-pretty sm:text-[1.0625rem]",
            tone === "dark" ? "text-white/65" : "text-ink-500",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/* ── Controls ───────────────────────────────────────────────────────────── */

type ButtonVariant = "primary" | "secondary" | "ghost" | "light";
type ButtonSize = "sm" | "md" | "lg";

// min-h + py (not a fixed h + nowrap) so a label too long for a narrow screen
// wraps inside the pill instead of spilling out of it. Single-line size is unchanged.
const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98] [&_svg]:shrink-0";

const variants: Record<ButtonVariant, string> = {
  primary:
    "brand-gradient text-white shadow-glow hover:shadow-[0_22px_60px_-16px_rgb(31_148_64/0.7)] hover:brightness-[1.06]",
  secondary:
    "border border-ink-200 bg-white text-ink-900 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800 shadow-soft",
  ghost: "text-ink-700 hover:bg-ink-100 hover:text-ink-900",
  light:
    "bg-white text-ink-900 hover:bg-brand-50 shadow-[0_18px_40px_-16px_rgb(0_0_0/0.45)]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 py-1.5 text-[13px]",
  md: "min-h-11 px-5 py-2 text-sm",
  lg: "min-h-13 px-7 py-2.5 text-[15px]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<"a"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <a
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </a>
  );
}

/* ── Surfaces ───────────────────────────────────────────────────────────── */

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-soft transition-all duration-300",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SampleBadge({ className }: { className?: string }) {
  return (
    <span
      title="Illustrative figure — replace with verified reporting before launch"
      className={cn(
        "inline-flex items-center rounded-full border border-dashed border-ink-200 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider text-ink-400",
        className,
      )}
    >
      Sample
    </span>
  );
}
