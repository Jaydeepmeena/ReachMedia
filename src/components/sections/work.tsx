"use client";

import { useCallback, useState } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { Carousel } from "@/components/ui/carousel";
import { SampleVideo } from "@/components/ui/sample-video";
import { workSamples } from "@/lib/content";
import { PortfolioCta } from "@/components/ui/portfolio-cta";
import { cn } from "@/lib/utils";

/**
 * Derived from the samples rather than hardcoded: a speciality added in
 * content.ts used to have no tab, so its reels were unreachable.
 */
const filters = ["All", ...new Set(workSamples.map((s) => s.speciality))];

export function Work() {
  const [filter, setFilter] = useState<string>("All");

  /**
   * Which reel currently owns the sound — at most one, ever. Holding it here
   * rather than in each card means unmuting one mutes the rest by
   * construction, with no cross-card messaging to get wrong.
   */
  const [audioId, setAudioId] = useState<string | null>(null);
  const releaseAudio = useCallback(() => setAudioId(null), []);

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
            title="Reels, Carousels & Campaigns We’ve Actually Posted!"
            highlight="We’ve Actually Posted!"
            lead="Every clip starts from a question a patient actually asked at the front desk."
            className="max-w-2xl"
          />

          <div
            role="tablist"
            aria-label="Filter work by speciality"
            className="no-scrollbar -mx-5 flex shrink-0 gap-2 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0"
          >
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => {
                  setFilter(f);
                  // Cards unmount on filter change; drop the sound with them.
                  releaseAudio();
                }}
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
          key={filter}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-9"
        >
          <Carousel
            label="Work samples"
            wheel
            slideClassName="basis-[78%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            {visible.map((sample) => (
              <figure
                key={sample.id}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-soft transition-shadow duration-300 hover:shadow-lift"
              >
                {/* Reels are shot 9:16 — show them at their own shape rather
                    than cropping the captions off the top. */}
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-ink-100">
                  <SampleVideo
                    src={sample.video}
                    poster={sample.poster}
                    title={sample.title}
                    audioOn={audioId === sample.id}
                    onRequestAudio={() => setAudioId(sample.id)}
                    onReleaseAudio={releaseAudio}
                  />

                  <span className="pointer-events-none absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink-900/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    <Sparkles className="size-3" />
                    {sample.type}
                  </span>
                </div>

                <figcaption className="flex flex-1 flex-col p-4">
                  <p className="font-display text-[14.5px] font-bold leading-snug text-ink-900 text-balance">
                    {sample.title}
                  </p>
                  <p className="mt-1.5 text-[11.5px] font-medium text-ink-400">
                    {sample.meta}
                  </p>
                </figcaption>
              </figure>
            ))}
          </Carousel>
        </motion.div>

        <PortfolioCta />
      </Container>
    </Section>
  );
}
