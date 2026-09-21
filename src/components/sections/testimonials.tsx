"use client";

import { Quote } from "lucide-react";
import {
  Container,
  Section,
  SectionHeading,
  SampleBadge,
} from "@/components/ui/primitives";
import { Carousel } from "@/components/ui/carousel";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <Section className="overflow-hidden bg-ink-50">
      <Container>
        <SectionHeading
          eyebrow="Word from our clients"
          title="What They’ve Actually Felt, Seen & Received!"
          highlight="Felt, Seen & Received!"
          className="max-w-2xl"
        />

        <Carousel
          label="Client testimonials"
          wheel
          loop
          autoplay
          className="mt-12"
          slideClassName="basis-full sm:basis-[calc(50%-0.625rem)] lg:basis-[calc(33.333%-0.834rem)]"
        >
          {testimonials.map((t) => (
            <figure
              key={t.name + t.role}
              className="flex h-full flex-col rounded-4xl border border-ink-200/70 bg-white p-7 shadow-soft sm:p-8"
            >
              <Quote className="size-8 shrink-0 text-brand-200" fill="currentColor" />
              <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-ink-700 text-pretty">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-100 pt-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full brand-gradient font-display text-sm font-extrabold text-white">
                  {t.speciality.slice(0, 2).toUpperCase()}
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-display text-[14px] font-bold leading-snug text-ink-900">
                    {t.name}
                    {t.placeholder ? <SampleBadge /> : null}
                  </span>
                  <span className="mt-0.5 block text-xs text-ink-400">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </Container>
    </Section>
  );
}
