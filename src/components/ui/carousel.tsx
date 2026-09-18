"use client";

import { Children, useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The site's one horizontal scroller: swipe / drag the track, with
 * prev · dots · next underneath. Slide widths come from `slideClassName`
 * (the track has a 1.25rem gap — subtract it in `calc()` basis values).
 */
export function Carousel({
  label,
  children,
  slideClassName,
  tone = "light",
  loop = false,
  autoplay = false,
  className,
}: {
  label: string;
  children: ReactNode;
  slideClassName: string;
  tone?: "light" | "dark";
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop, align: "start" },
    autoplay
      ? [
          Autoplay({
            delay: 5200,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
            active: !reduced,
          }),
        ]
      : [],
  );
  const [snaps, setSnaps] = useState<number[]>([]);
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    setSelected(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    sync();
    emblaApi.on("select", sync).on("reInit", sync);
    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi, sync]);

  const slides = Children.toArray(children);
  const dark = tone === "dark";
  const arrow = cn(
    "grid size-11 place-items-center rounded-full border transition-colors disabled:pointer-events-none disabled:opacity-35",
    dark
      ? "border-white/15 bg-white/5 text-white hover:border-brand-400/50 hover:bg-white/10"
      : "border-ink-200 bg-white text-ink-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700",
  );

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className={className}>
      {/* -my/py pair: room for card shadows without changing layout */}
      <div ref={emblaRef} className="-my-6 overflow-hidden py-6">
        <div className="flex touch-pan-y gap-5">
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              className={cn("min-w-0 shrink-0 grow-0", slideClassName)}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* nothing to scroll (e.g. every slide already fits) → no controls */}
      {snaps.length > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Previous"
            className={arrow}
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex">
            {snaps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={selected === i}
                className="group grid h-11 min-w-6 place-items-center px-1"
              >
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    selected === i
                      ? "w-7 brand-gradient"
                      : dark
                        ? "w-1.5 bg-white/25 group-hover:bg-white/50"
                        : "w-1.5 bg-ink-200 group-hover:bg-ink-400",
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label="Next"
            className={arrow}
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
