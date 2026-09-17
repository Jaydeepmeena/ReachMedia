"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Play,
  Check,
  MessageSquareQuote,
  Film,
  LayoutGrid,
  CalendarCheck,
  PhoneCall,
} from "lucide-react";
import { Container, ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { Counter } from "@/components/ui/counter";
import { platformIcons } from "@/components/ui/platform-icons";
import { hero, heroStats } from "@/lib/content";

const platforms = (
  ["Instagram", "Facebook", "YouTube", "LinkedIn"] as const
).map((label) => ({ label, icon: platformIcons[label] }));

const pipeline = [
  { icon: Film, label: "Doctor reel", tint: "bg-brand-600" },
  { icon: LayoutGrid, label: "Carousel", tint: "bg-brand-500" },
  { icon: MessageSquareQuote, label: "Caption + CTA", tint: "bg-brand-400" },
  { icon: CalendarCheck, label: "Story set", tint: "bg-lime-accent" },
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      {/* ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,#000_20%,transparent_75%)]" />
        <div className="absolute -top-40 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(86,195,76,0.22),transparent_62%)] blur-2xl" />
        <div className="absolute -right-32 top-24 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(195,217,78,0.24),transparent_65%)] blur-3xl" />
        <div className="absolute -left-40 top-72 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(31,148,64,0.16),transparent_65%)] blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-20">
          {/* ── Copy ─────────────────────────────────────────────── */}
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-6 font-display text-[clamp(2.25rem,6.2vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink-900 text-balance"
            >
              {hero.titleLead}{" "}
              <span className="relative inline-block">
                <span className="brand-text">{hero.titleHighlight}</span>
                <motion.svg
                  viewBox="0 0 320 14"
                  fill="none"
                  aria-hidden
                  className="absolute -bottom-1.5 left-0 h-3 w-full text-brand-400"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M3 9.5C64 4 150 2.5 317 6.5"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: reduced ? 0 : 1, delay: 0.7, ease: "easeOut" }}
                  />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-ink-500 text-pretty sm:text-lg"
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26 }}
              className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
            >
              <ButtonLink href={hero.primaryCta.href} size="lg" className="w-full sm:w-auto">
                {hero.primaryCta.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink
                href={hero.secondaryCta.href}
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <Play className="size-3.5 fill-current" />
                {hero.secondaryCta.label}
              </ButtonLink>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.36 }}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5"
            >
              {hero.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm font-medium text-ink-700">
                  <span className="grid size-4.5 shrink-0 place-items-center rounded-full bg-brand-100">
                    <Check className="size-3 text-brand-700" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ── Visual: one patient question → a month of content ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none xl:px-12"
          >
            <div className="relative rounded-4xl border border-ink-200/80 bg-white/85 p-5 shadow-lift backdrop-blur-sm sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-400">
                  The weekly content system
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-700">
                  <span className="size-1.5 animate-pulse rounded-full bg-brand-500" />
                  Live
                </span>
              </div>

              {/* the question */}
              <div className="mt-5 rounded-2xl border border-ink-100 bg-ink-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                  One real patient question
                </p>
                <p className="mt-1.5 font-display text-lg font-bold leading-snug text-ink-900">
                  &ldquo;Is IVF painful, and how long does it take?&rdquo;
                </p>
              </div>

              <div className="relative my-4 flex justify-center">
                <div className="h-6 w-px bg-gradient-to-b from-ink-200 to-brand-400" />
              </div>

              {/* becomes four assets */}
              <div className="grid grid-cols-2 gap-2.5">
                {pipeline.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75 + i * 0.1, duration: 0.45 }}
                    className="flex items-center gap-2.5 rounded-2xl border border-ink-100 bg-white p-3 shadow-soft"
                  >
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-xl ${item.tint} text-white`}
                    >
                      <item.icon className="size-4" strokeWidth={2.2} />
                    </span>
                    <span className="min-w-0 text-[13px] font-semibold leading-tight text-ink-800">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* outcome */}
              <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl brand-gradient p-4 text-white">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/70">
                    Patient outcome
                  </p>
                  <p className="mt-0.5 font-display text-base font-bold">Clarity → enquiry</p>
                </div>
                <PhoneCall className="size-7 shrink-0 opacity-90" strokeWidth={1.7} />
              </div>

              {/* platform rail */}
              <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
                <span className="text-[11px] font-semibold text-ink-400">Published across</span>
                <div className="flex items-center gap-1.5">
                  {platforms.map((p) => (
                    <span
                      key={p.label}
                      title={p.label}
                      className="grid size-7 place-items-center rounded-lg bg-ink-50 text-ink-500 transition-colors hover:bg-brand-50 hover:text-brand-700"
                    >
                      <p.icon className="size-3.5" />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* floating accents */}
            <motion.div
              aria-hidden
              animate={reduced ? {} : { y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 top-24 hidden rounded-2xl border border-ink-200/70 bg-white p-3 shadow-lift xl:block"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                Reach this month
              </p>
              <p className="mt-0.5 font-display text-xl font-extrabold tabular-nums text-ink-900">
                <Counter value={412} suffix="K" />
              </p>
            </motion.div>

            <motion.div
              aria-hidden
              animate={reduced ? {} : { y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute right-0 bottom-24 hidden rounded-2xl border border-ink-200/70 bg-white p-3 shadow-lift xl:block"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                Enquiry DMs
              </p>
              <p className="mt-0.5 font-display text-xl font-extrabold tabular-nums text-brand-700">
                +<Counter value={214} suffix="%" />
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── KPI strip ──────────────────────────────────────────── */}
        <motion.dl
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink-200/70 bg-ink-200/70 sm:mt-20 lg:grid-cols-4"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="bg-white px-5 py-6 text-center sm:px-6 sm:py-7">
              <dd className="font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-extrabold leading-none tracking-tight text-ink-900 tabular-nums">
                <Counter
                  value={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                />
              </dd>
              <dt className="mt-2.5 text-[12.5px] font-medium leading-snug text-ink-500">
                {stat.label}
                {stat.placeholder ? (
                  <span
                    title="Illustrative figure — replace with verified reporting"
                    className="ml-1 align-middle text-[9px] font-semibold uppercase tracking-wider text-ink-400"
                  >
                    *
                  </span>
                ) : null}
              </dt>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
