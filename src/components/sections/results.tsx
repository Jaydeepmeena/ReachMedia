"use client";

import { ChartColumnIncreasing, Info } from "lucide-react";
import { InstagramIcon } from "@/components/ui/platform-icons";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Carousel } from "@/components/ui/carousel";
import { SmartImage } from "@/components/ui/smart-image";
import { ScreenshotFallback, DeltaChip } from "@/components/ui/analytics-mock";
import { kpiCases } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Results() {
  const hasPlaceholder = kpiCases.some((c) => c.placeholder);

  return (
    <Section id="results" className="relative overflow-hidden bg-ink-900">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:70px_70px]" />
        <div className="absolute -left-40 top-10 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(31,148,64,0.4),transparent_65%)] blur-3xl" />
        <div className="absolute -right-32 bottom-0 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(195,217,78,0.22),transparent_65%)] blur-3xl" />
      </div>

      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="Live performance data"
          title="The Numbers Clinic Owners Have Actually Recorded!"
          highlight="Have Actually Recorded!"
          lead="Not screenshots of likes or a highlight reel of engagement. This is the same scoreboard your front desk and your accountant would both recognise: how many people saw it, how many came looking, and how many actually booked."
          className="max-w-3xl"
        />

        <Reveal className="mt-12 lg:mt-14">
          <Carousel
            label="Client results"
            wheel
            tone="dark"
            slideClassName="basis-[88%] sm:basis-[80%] lg:basis-[60%] xl:basis-1/2"
          >
            {kpiCases.map((item) => (
              <article key={item.id} className="group h-full overflow-hidden rounded-4xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-brand-400/40 hover:bg-white/[0.07] sm:p-6">
                {/* The captures are portrait phone screenshots. Stacked above
                    the numbers they made the card ~1040px tall — taller than a
                    laptop viewport. Side by side, the card fits on screen and
                    the shape of the image stops fighting the layout. */}
                <div className="grid gap-5 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:items-start">
                {/* screenshot */}
                <figure className="order-1 overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-lift">
                  <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.06] px-3 py-2">
                    <InstagramIcon className="size-3.5 shrink-0 text-white/70" />
                    <span className="truncate text-[10px] font-medium text-white/60">
                      {item.platform}
                    </span>
                  </div>
                  {/* matches the 702x840 crop of the source captures */}
                  <div className="relative aspect-[5/6] w-full">
                    <SmartImage
                      src={item.image}
                      alt={`${item.platform} analytics for a ${item.speciality} account: ${item.headline} ${item.value}`}
                      sizes="(max-width: 640px) 88vw, 15rem"
                      fallback={
                        <ScreenshotFallback
                          label={item.platform}
                          caption={`${item.headline} over ${item.window} — add the account export to public/proof/`}
                        />
                      }
                    />
                  </div>
                </figure>

                <div className="order-2 flex h-full flex-col">
                {/* header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-9 place-items-center rounded-xl bg-brand-500/15 text-brand-300">
                      <ChartColumnIncreasing className="size-4.5" strokeWidth={2.2} />
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold text-white">
                        {item.speciality}
                      </p>
                      <p className="text-[11px] text-white/55">{item.platform}</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/60">
                    {item.window}
                  </span>
                </div>

                {/* headline number */}
                {/* Pill always sits under the figure: when it wrapped only for long figures (37.25M), that one card grew taller and left the rest with dead space at the bottom. */}
                <div className="mt-5 flex flex-col items-start gap-2">
                  <p className="font-display text-[clamp(2rem,5vw,2.75rem)] font-extrabold leading-none tracking-tight text-white tabular-nums">
                    {item.value}
                  </p>
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold tabular-nums",
                      /^[−-]/.test(item.delta.trim())
                        ? "bg-white/10 text-white/70"
                        : "bg-brand-500/20 text-brand-300",
                    )}
                  >
                    {item.delta}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] font-medium text-white/55">
                  {item.headline}
                </p>

                {/* KPI tiles */}
                {/* phones: one row per metric; sm+: three tiles */}
                <dl className="mt-5 grid gap-2">
                  {item.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-3 py-2.5"
                    >
                      <dt className="text-[10px] font-medium uppercase leading-tight tracking-wide text-white/55">
                        {m.label}
                      </dt>
                      <dd className="flex shrink-0 items-center gap-2">
                        <span className="block font-display text-[15px] font-bold tabular-nums text-white">
                          {m.value}
                        </span>
                        <DeltaChip
                          value={m.delta}
                          className="bg-brand-500/15 text-brand-300"
                        />
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-4 text-[12.5px] leading-relaxed text-white/55">
                  {item.note}
                </p>
                </div>
                </div>
              </article>
            ))}
          </Carousel>
        </Reveal>

        {hasPlaceholder ? (
          <p className="mt-8 flex items-start gap-2 text-[12.5px] leading-relaxed text-white/55">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            <span>
              Figures shown are illustrative samples pending client approval.
              Verified account screenshots and signed-off reporting are shared on
              request during the audit call.
            </span>
          </p>
        ) : null}
      </Container>
    </Section>
  );
}
