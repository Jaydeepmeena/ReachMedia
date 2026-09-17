"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Images, Sparkles, TrendingUp } from "lucide-react";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { SmartImage } from "@/components/ui/smart-image";
import { workSamples } from "@/lib/content";
import { cn } from "@/lib/utils";

const filters = ["All", "IVF", "Eye", "Dental", "Hospital"] as const;

const ratioClass: Record<string, string> = {
  portrait: "aspect-[9/14]",
  square: "aspect-square",
  landscape: "aspect-[16/11]",
};

function SampleFallback({
  type,
  title,
  speciality,
}: {
  type: string;
  title: string;
  speciality: string;
}) {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden brand-gradient p-6 text-center">
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:28px_28px]"
      />
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          {type === "Doctor Reel" || type === "Facility Film" ? (
            <Play className="size-3 fill-current" />
          ) : (
            <Images className="size-3" />
          )}
          {speciality}
        </span>
        <p className="mt-4 font-display text-[15px] font-bold leading-snug text-white text-balance sm:text-base">
          {title}
        </p>
        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/60">
          Drop artwork in /public/samples
        </p>
      </div>
    </div>
  );
}

export function Work() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible =
    filter === "All"
      ? workSamples
      : workSamples.filter((s) => s.speciality === filter);

  return (
    <Section id="work" className="relative overflow-hidden">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Work samples"
            title="The kind of content we put on your feed."
            highlight="on your feed"
            lead="Every asset starts from a question a patient actually asked at your front desk."
            className="max-w-2xl"
          />

          {/* filters — one row above the grid */}
          <div
            role="tablist"
            aria-label="Filter work by speciality"
            className="no-scrollbar -mx-5 flex shrink-0 gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0"
          >
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors",
                  filter === f
                    ? "text-white"
                    : "border border-ink-200 text-ink-500 hover:border-brand-300 hover:text-brand-700",
                )}
              >
                {filter === f ? (
                  <motion.span
                    layoutId="work-filter"
                    className="absolute inset-0 rounded-full brand-gradient"
                    transition={{ type: "spring", stiffness: 360, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((sample) => (
              <motion.figure
                key={sample.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-soft transition-shadow duration-300 hover:shadow-lift"
              >
                <div
                  className={cn(
                    "relative w-full overflow-hidden bg-ink-100",
                    ratioClass[sample.ratio] ?? "aspect-square",
                  )}
                >
                  <SmartImage
                    src={sample.image}
                    alt={sample.title}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                    imgClassName="transition-transform duration-700 group-hover:scale-[1.06]"
                    fallback={
                      <SampleFallback
                        type={sample.type}
                        title={sample.title}
                        speciality={sample.speciality}
                      />
                    }
                  />

                  {/* type chip */}
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink-900/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    <Sparkles className="size-3" />
                    {sample.type}
                  </span>

                  {/* stat on hover */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink-900/95 to-transparent p-4 pt-10 transition-transform duration-500 group-hover:translate-y-0">
                    <p className="flex items-center gap-1.5 text-xs font-bold text-brand-300 tabular-nums">
                      <TrendingUp className="size-3.5" />
                      {sample.stat}
                    </p>
                  </div>
                </div>

                <figcaption className="p-4">
                  <p className="font-display text-[14.5px] font-bold leading-snug text-ink-900 text-balance">
                    {sample.title}
                  </p>
                  <p className="mt-1.5 text-[11.5px] font-medium text-ink-400">
                    {sample.meta}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}
