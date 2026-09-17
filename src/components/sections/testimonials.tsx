"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Container,
  Section,
  SectionHeading,
  SampleBadge,
} from "@/components/ui/primitives";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 5200, stopOnInteraction: true, stopOnMouseEnter: true })],
  );
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <Section className="overflow-hidden bg-ink-50">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="From the clinics"
            title="What changes once the calendar starts running."
            highlight="once the calendar starts running"
            className="max-w-2xl"
          />

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous testimonial"
              className="grid size-11 place-items-center rounded-full border border-ink-200 bg-white text-ink-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next testimonial"
              className="grid size-11 place-items-center rounded-full border border-ink-200 bg-white text-ink-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y gap-5">
            {testimonials.map((t) => (
              <figure
                key={t.name + t.role}
                className="flex min-w-0 shrink-0 grow-0 basis-full flex-col rounded-4xl border border-ink-200/70 bg-white p-7 shadow-soft sm:basis-[calc(50%-0.625rem)] sm:p-8 lg:basis-[calc(33.333%-0.834rem)]"
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
                    <span className="flex items-center gap-1.5 font-display text-[14px] font-bold text-ink-900">
                      <span className="truncate">{t.name}</span>
                      {t.placeholder ? <SampleBadge /> : null}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-ink-400">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* dots */}
        <div className="mt-8 flex justify-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                selected === i
                  ? "w-7 brand-gradient"
                  : "w-1.5 bg-ink-200 hover:bg-ink-400",
              )}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
