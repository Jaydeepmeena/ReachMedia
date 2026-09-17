"use client";

import {
  Stethoscope,
  Headphones,
  ShieldCheck,
  ChartLine,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import {
  Container,
  Section,
  SectionHeading,
  ButtonLink,
} from "@/components/ui/primitives";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { differentiators, site } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  Stethoscope,
  Headphones,
  ShieldCheck,
  ChartLine,
};

const parentStats = [
  { value: 115, suffix: "+", label: "Clinic locations supported" },
  { value: 15, suffix: "", label: "Agent patient call centre" },
  { value: 8, suffix: " mo", label: "To walk-in growth" },
  { value: 100, suffix: "%", label: "Healthcare-only focus" },
];

export function Why() {
  return (
    <Section className="relative overflow-hidden">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow={`Initiated by ${site.parent}`}
              title="We come from a healthcare growth team, not a generic posting agency."
              highlight="not a generic posting agency"
              lead="Reach Media is the social-media arm of Reinvent Digital — a team that already runs performance marketing and a patient call centre for clinics across the country. We have seen what a booked appointment actually costs."
            />

            <Reveal delay={0.15}>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink-200/70 bg-ink-200/70">
                {parentStats.map((s) => (
                  <div key={s.label} className="bg-white px-5 py-6">
                    <dd className="font-display text-3xl font-extrabold tracking-tight text-ink-900 tabular-nums">
                      <Counter value={s.value} suffix={s.suffix} />
                    </dd>
                    <dt className="mt-2 text-[12.5px] leading-snug text-ink-500">
                      {s.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.25}>
              <ButtonLink href="#audit" size="lg" className="mt-8">
                Start with a free audit
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </ButtonLink>
            </Reveal>
          </div>

          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {differentiators.map((d) => {
              const Icon = icons[d.icon];
              return (
                <RevealItem key={d.title}>
                  <div className="group h-full rounded-3xl border border-ink-200/70 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift sm:p-7">
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:brand-gradient group-hover:text-white">
                      <Icon className="size-5.5" strokeWidth={2} />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-extrabold tracking-tight text-ink-900">
                      {d.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-500 text-pretty">
                      {d.body}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
