"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { process } from "@/lib/content";

export function Process() {
  const trackRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 72%", "end 62%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <Section id="process" className="overflow-hidden bg-ink-50">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="The Process Behind Every Month, Start to Finish"
          highlight="Start to Finish"
          lead="You spend two hours a month with us. We spend the rest of it making sure that time was worth it."
          className="max-w-3xl"
        />

        <ol ref={trackRef} className="relative mt-12 lg:mt-16">
          {/* rail */}
          <div
            aria-hidden
            className="absolute left-5.5 top-2 hidden h-[calc(100%-2rem)] w-px bg-ink-200 sm:block lg:left-1/2 lg:-translate-x-1/2"
          >
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="h-full w-full brand-gradient"
            />
          </div>

          {process.map((step, i) => (
            <li
              key={step.step}
              className="relative pb-8 last:pb-0 sm:pl-16 lg:grid lg:grid-cols-2 lg:gap-14 lg:pb-12 lg:pl-0"
            >
              {/* node */}
              <span
                aria-hidden
                className="absolute left-0 top-1 hidden size-11 place-items-center rounded-full border-4 border-ink-50 brand-gradient font-display text-xs font-extrabold text-white shadow-glow sm:grid lg:left-1/2 lg:-translate-x-1/2"
              >
                {step.step}
              </span>

              <Reveal
                direction={i % 2 === 0 ? "right" : "left"}
                className={
                  i % 2 === 0
                    ? "lg:col-start-1 lg:pr-4 lg:text-right"
                    : "lg:col-start-2 lg:pl-4"
                }
              >
                <div className="rounded-3xl border border-ink-200/70 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift sm:p-7">
                  <div
                    className={`flex items-center gap-3 ${
                      i % 2 === 0 ? "lg:justify-end" : ""
                    }`}
                  >
                    <span className="grid size-8 place-items-center rounded-lg bg-brand-50 font-display text-[11px] font-extrabold text-brand-700 sm:hidden">
                      {step.step}
                    </span>
                    <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-700">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="mt-3.5 font-display text-xl font-extrabold tracking-tight text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500 text-pretty">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
