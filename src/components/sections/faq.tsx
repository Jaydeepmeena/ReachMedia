"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus, CircleQuestionMark } from "lucide-react";
import {
  Container,
  Section,
  SectionHeading,
  ButtonLink,
} from "@/components/ui/primitives";
import { faqs, site } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faqs">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="FAQs"
              title="The questions clinic owners ask us first."
              highlight="ask us first"
              lead="Still unsure? The audit call answers everything else, and costs nothing."
            />
            <div className="mt-8 rounded-3xl border border-ink-200/70 bg-ink-50 p-6">
              <CircleQuestionMark className="size-7 text-brand-600" strokeWidth={1.8} />
              <p className="mt-4 font-display text-lg font-bold text-ink-900">
                Something specific to your speciality?
              </p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">
                Email us the question — a strategist replies, not a bot.
              </p>
              <ButtonLink
                href={`mailto:${site.email}`}
                variant="secondary"
                size="md"
                className="mt-5"
              >
                {site.email}
              </ButtonLink>
            </div>
          </div>

          <div className="divide-y divide-ink-200/70 border-y border-ink-200/70">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="group flex w-full items-start justify-between gap-5 py-5 text-left transition-colors hover:text-brand-700 sm:py-6"
                    >
                      <span
                        className={cn(
                          "font-display text-[16.5px] font-bold leading-snug tracking-tight transition-colors sm:text-lg",
                          isOpen ? "text-brand-700" : "text-ink-900",
                        )}
                      >
                        {faq.q}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-300",
                          isOpen
                            ? "rotate-45 border-brand-500 bg-brand-500 text-white"
                            : "border-ink-200 text-ink-500 group-hover:border-brand-300 group-hover:text-brand-600",
                        )}
                      >
                        <Plus className="size-4" strokeWidth={2.5} />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`faq-panel-${i}`}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-12 text-[14.5px] leading-relaxed text-ink-500 text-pretty">
                          {faq.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
