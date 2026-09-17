"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  HeartPulse,
  Eye,
  Toothbrush,
  Hospital,
  Check,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import {
  Container,
  Section,
  SectionHeading,
  ButtonLink,
  SampleBadge,
} from "@/components/ui/primitives";
import { specialities } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  HeartPulse,
  Eye,
  Toothbrush,
  Hospital,
};

export function Specialities() {
  const [activeId, setActiveId] = useState(specialities[0].id);
  const active = specialities.find((s) => s.id === activeId) ?? specialities[0];
  const ActiveIcon = icons[active.icon];

  return (
    <Section id="specialities" className="bg-ink-50">
      <Container>
        <SectionHeading
          eyebrow="Four specialities, four playbooks"
          title="Different specialities need different content logic."
          highlight="content logic"
          lead="A fertility couple, a 62-year-old cataract patient and a parent booking braces are three different people making three different decisions. We do not run one calendar across all of them."
          className="max-w-3xl"
        />

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-8">
          {/* Selector */}
          <div
            role="tablist"
            aria-label="Healthcare specialities"
            className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {specialities.map((s) => {
              const Icon = icons[s.icon];
              const isActive = s.id === activeId;
              return (
                <button
                  key={s.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveId(s.id)}
                  className={cn(
                    "group relative flex min-w-[15rem] shrink-0 items-center gap-3.5 rounded-2xl border p-4 text-left transition-all duration-300 lg:min-w-0 lg:w-full",
                    isActive
                      ? "border-brand-300 bg-white shadow-lift"
                      : "border-ink-200/70 bg-white/60 hover:border-brand-200 hover:bg-white",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="spec-bar"
                      className="absolute inset-y-3 left-0 w-1 rounded-r-full brand-gradient"
                      transition={{ type: "spring", stiffness: 340, damping: 30 }}
                    />
                  ) : null}
                  <span
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-xl transition-colors",
                      isActive
                        ? "brand-gradient text-white"
                        : "bg-ink-100 text-ink-500 group-hover:bg-brand-50 group-hover:text-brand-600",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block font-display text-[15px] font-bold leading-tight",
                        isActive ? "text-ink-900" : "text-ink-700",
                      )}
                    >
                      {s.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-ink-400">
                      {s.focus.length} content tracks
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div className="relative min-h-[26rem] overflow-hidden rounded-4xl border border-ink-200/70 bg-white p-6 shadow-soft sm:p-8 lg:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-[radial-gradient(circle,rgba(86,195,76,0.14),transparent_65%)]"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl brand-gradient text-white shadow-glow">
                    <ActiveIcon className="size-6" strokeWidth={2} />
                  </span>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink-900 sm:text-[1.75rem]">
                    {active.name}
                  </h3>
                </div>

                <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-500 text-pretty sm:text-base">
                  {active.blurb}
                </p>

                <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {active.focus.map((f, i) => (
                    <motion.div
                      key={f}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.06, duration: 0.3 }}
                      className="flex items-center gap-2.5 rounded-xl border border-ink-100 bg-ink-50/70 px-3.5 py-3"
                    >
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-100">
                        <Check className="size-3 text-brand-700" strokeWidth={3} />
                      </span>
                      <span className="text-[13.5px] font-medium text-ink-700">{f}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-ink-100 pt-6">
                  <div>
                    <p className="flex items-center gap-1.5 font-display text-3xl font-extrabold tabular-nums text-brand-700">
                      {active.metric.value}
                      {active.metric.placeholder ? <SampleBadge /> : null}
                    </p>
                    <p className="mt-1 text-[13px] text-ink-400">
                      {active.metric.label} · typical 6-month engagement
                    </p>
                  </div>
                  <ButtonLink href="#audit" variant="secondary" size="md">
                    Audit my {active.name.split(" ")[0].toLowerCase()} presence
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </ButtonLink>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
