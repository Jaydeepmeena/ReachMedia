"use client";

import { ChartColumnIncreasing, Info } from "lucide-react";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SmartImage } from "@/components/ui/smart-image";
import { ScreenshotFallback, DeltaChip } from "@/components/ui/analytics-mock";
import { kpiCases } from "@/lib/content";

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
          eyebrow="KPI indicators"
          title="Reach, enquiries and bookings — straight from the dashboards."
          highlight="straight from the dashboards"
          lead="Not screenshots of likes. These are the numbers clinic owners ask about: how many people saw it, how many came looking, and how many actually booked."
          className="max-w-3xl"
        />

        <RevealGroup className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-6">
          {kpiCases.map((item) => (
            <RevealItem key={item.id}>
              <article className="group h-full overflow-hidden rounded-4xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-brand-400/40 hover:bg-white/[0.07] sm:p-6">
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
                      <p className="text-[11px] text-white/45">{item.platform}</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/60">
                    {item.window}
                  </span>
                </div>

                {/* headline number */}
                <div className="mt-5 flex items-end gap-3">
                  <p className="font-display text-[clamp(2rem,5vw,2.75rem)] font-extrabold leading-none tracking-tight text-white tabular-nums">
                    {item.value}
                  </p>
                  <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-brand-500/20 px-2.5 py-1 text-xs font-bold text-brand-300 tabular-nums">
                    {item.delta}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] font-medium text-white/55">
                  {item.headline}
                </p>

                {/* the screenshot */}
                <figure className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-lift">
                  {/* browser chrome */}
                  <div className="flex items-center gap-1.5 border-b border-ink-100 bg-ink-50 px-3 py-2">
                    <span className="size-2 rounded-full bg-[#ff5f57]" />
                    <span className="size-2 rounded-full bg-[#febc2e]" />
                    <span className="size-2 rounded-full bg-[#28c840]" />
                    <span className="ml-2 truncate text-[10px] font-medium text-ink-400">
                      {item.platform}
                    </span>
                  </div>
                  <div className="relative aspect-[16/10] w-full">
                    <SmartImage
                      src={item.image}
                      alt={`${item.platform} analytics for a ${item.speciality} account: ${item.headline} ${item.value}`}
                      sizes="(max-width: 1024px) 92vw, 44vw"
                      fallback={
                        <ScreenshotFallback
                          label={item.platform}
                          caption={`${item.headline} over ${item.window} — add the account export to public/proof/`}
                        />
                      }
                    />
                  </div>
                </figure>

                {/* KPI tiles */}
                <dl className="mt-4 grid grid-cols-3 gap-2">
                  {item.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="min-w-0 rounded-2xl border border-white/8 bg-white/[0.04] px-3 py-3"
                    >
                      <dt className="truncate text-[10px] font-medium uppercase tracking-wide text-white/40">
                        {m.label}
                      </dt>
                      <dd className="mt-1 truncate font-display text-[15px] font-bold tabular-nums text-white">
                        {m.value}
                      </dd>
                      <DeltaChip
                        value={m.delta}
                        className="mt-1.5 bg-brand-500/15 text-brand-300"
                      />
                    </div>
                  ))}
                </dl>

                <p className="mt-4 text-[12.5px] leading-relaxed text-white/45">
                  {item.note}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        {hasPlaceholder ? (
          <p className="mt-8 flex items-start gap-2 text-[12.5px] leading-relaxed text-white/40">
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
