"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Sparkles, Film, LayoutGrid } from "lucide-react";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { Carousel } from "@/components/ui/carousel";
import { SampleVideo } from "@/components/ui/sample-video";
import { creatives, workSamples } from "@/lib/content";
import { PortfolioCta } from "@/components/ui/portfolio-cta";
import { cn } from "@/lib/utils";

/**
 * Speciality filter row. Options come from whatever is in the set it filters,
 * so adding work with a new speciality cannot leave it unreachable.
 */
function Filters({
  options,
  value,
  onChange,
  layoutId,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  layoutId: string;
}) {
  return (
    <div
      role="tablist"
      aria-label="Filter by speciality"
      className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0"
    >
      {options.map((f) => (
        <button
          key={f}
          type="button"
          role="tab"
          aria-selected={value === f}
          onClick={() => onChange(f)}
          className={cn(
            "relative shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors",
            value === f
              ? "text-white"
              : "border border-ink-200 text-ink-500 hover:border-brand-300 hover:text-brand-700",
          )}
        >
          {value === f ? (
            <motion.span
              layoutId={layoutId}
              className="absolute inset-0 rounded-full brand-gradient"
              transition={{ type: "spring", stiffness: 360, damping: 32 }}
            />
          ) : null}
          <span className="relative">{f}</span>
        </button>
      ))}
    </div>
  );
}

function GroupHeading({
  icon: Icon,
  title,
  count,
}: {
  icon: typeof Film;
  title: string;
  count: number;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-8 place-items-center rounded-xl bg-brand-50 text-brand-700">
        <Icon className="size-4" />
      </span>
      <h3 className="font-display text-lg font-extrabold tracking-tight text-ink-900">
        {title}
      </h3>
      <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[11px] font-semibold text-ink-500 tabular-nums">
        {count}
      </span>
    </div>
  );
}

export function Work() {
  const [reelFilter, setReelFilter] = useState("All");
  const [creativeFilter, setCreativeFilter] = useState("All");

  /**
   * Which reel currently owns the sound — at most one, ever. Holding it here
   * rather than in each card means unmuting one mutes the rest by
   * construction, with no cross-card messaging to get wrong.
   */
  const [audioId, setAudioId] = useState<string | null>(null);
  const releaseAudio = useCallback(() => setAudioId(null), []);

  const reelOptions = useMemo(
    () => ["All", ...new Set(workSamples.map((s) => s.speciality))],
    [],
  );
  const creativeOptions = useMemo(
    () => ["All", ...new Set(creatives.map((c) => c.speciality))],
    [],
  );

  const visibleReels =
    reelFilter === "All"
      ? workSamples
      : workSamples.filter((s) => s.speciality === reelFilter);
  const visibleCreatives =
    creativeFilter === "All"
      ? creatives
      : creatives.filter((c) => c.speciality === creativeFilter);

  return (
    <Section id="work" className="relative overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="Work samples"
          title="Reels, Carousels & Campaigns We’ve Actually Posted!"
          highlight="We’ve Actually Posted!"
          lead="Every piece starts from a question a patient actually asked at the front desk."
          className="max-w-2xl"
        />

        {/* ── Reels ──────────────────────────────────────────────────────── */}
        <div className="mt-9 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <GroupHeading icon={Film} title="Reels" count={visibleReels.length} />
          <Filters
            options={reelOptions}
            value={reelFilter}
            onChange={setReelFilter}
            layoutId="reel-filter"
          />
        </div>

        <motion.div
          key={`reels-${reelFilter}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <Carousel
            label="Reels"
            wheel
            slideClassName="basis-[78%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            {visibleReels.map((sample) => (
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

        {/* ── Creatives ──────────────────────────────────────────────────── */}
        <div className="mt-12 flex flex-col gap-5 border-t border-ink-200/70 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <GroupHeading
            icon={LayoutGrid}
            title="Creatives"
            count={visibleCreatives.length}
          />
          <Filters
            options={creativeOptions}
            value={creativeFilter}
            onChange={setCreativeFilter}
            layoutId="creative-filter"
          />
        </div>

        <motion.div
          key={`creatives-${creativeFilter}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <Carousel
            label="Creatives"
            wheel
            slideClassName="basis-[78%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            {visibleCreatives.map((c) => (
              <figure
                key={c.id}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-soft transition-shadow duration-300 hover:shadow-lift"
              >
                {/* 4:5 — the shape these were designed in for Instagram. */}
                <a
                  href={c.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-[4/5] w-full overflow-hidden bg-ink-100"
                  aria-label={`Open full size: ${c.title}`}
                >
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink-900/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    <LayoutGrid className="size-3" />
                    {c.speciality}
                  </span>
                </a>

                <figcaption className="flex flex-1 flex-col p-4">
                  <p className="font-display text-[14.5px] font-bold leading-snug text-ink-900 text-balance">
                    {c.title}
                  </p>
                  <p className="mt-1.5 text-[11.5px] font-medium text-ink-400">
                    {c.client}
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
