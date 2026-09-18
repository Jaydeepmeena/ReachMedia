"use client";

import {
  Stethoscope,
  Megaphone,
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
  Megaphone,
  ShieldCheck,
  ChartLine,
};

const parentStats = [
  { value: 100, suffix: "%", label: "Healthcare-Only Focus" },
  { value: 120, suffix: "+", label: "Clinic Locations Supported" },
];

export function Why() {
  return (
    <Section className="relative overflow-hidden">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow={`A social initiative by ${site.parent}`}
              title="A Hardcore Healthcare Marketing Team Not Just A Generic Posting Agency!"
              highlight="Not Just A Generic Posting Agency!"
              lead="Reach Media is the social media arm of Reinvent Digital, a team that already runs SEO, paid ads and patient-acquisition reporting for clinics and hospitals across India. We plan content the same way we plan a paid campaign: around what actually turns into an inquiry, not around what gets a like."
            />

            <Reveal delay={0.15}>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink-200/70 bg-ink-200/70">
                {parentStats.map((s) => (
                  <div key={s.label} className="flex flex-col-reverse bg-white px-5 py-6">
                    <dt className="mt-2 text-[12.5px] leading-snug text-ink-500">
                      {s.label}
                    </dt>
                    <dd className="font-display text-3xl font-extrabold tracking-tight text-ink-900 tabular-nums">
                      <Counter value={s.value} suffix={s.suffix} />
                    </dd>
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
