"use client";

import {
  Share2,
  PenTool,
  Video,
  TrendingUp,
  Check,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import {
  Container,
  Section,
  SectionHeading,
  Card,
} from "@/components/ui/primitives";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { services } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  Share2,
  PenTool,
  Video,
  TrendingUp,
};

export function Services() {
  return (
    <Section id="services" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(195,217,78,0.13),transparent_70%)]"
      />
      <Container>
        <SectionHeading
          eyebrow="What we handle"
          title="Everything from the idea to the appointment."
          highlight="the appointment"
          lead="Social media handling, graphics and video production under one retainer — with performance reporting so you can see what the content actually returned."
          align="center"
          className="mx-auto"
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-6 lg:gap-6">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            const featured = i === 0;
            return (
              <RevealItem
                key={service.id}
                className={featured ? "sm:col-span-6" : "sm:col-span-3 lg:col-span-2"}
              >
                <Card className="group h-full p-6 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift sm:p-8">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-brand-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div
                    className={
                      featured
                        ? "relative grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start"
                        : "relative"
                    }
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <span className="grid size-13 place-items-center rounded-2xl brand-gradient text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
                          <Icon className="size-6" strokeWidth={2} />
                        </span>
                        <span className="rounded-full border border-ink-200 bg-ink-50 px-3 py-1 text-[11px] font-semibold text-ink-500">
                          {service.deliverable}
                        </span>
                      </div>

                      <h3 className="mt-5 font-display text-xl font-extrabold tracking-tight text-ink-900 sm:text-[1.4rem]">
                        {service.title}
                      </h3>
                      <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-500 text-pretty">
                        {service.summary}
                      </p>
                    </div>

                    <ul
                      className={
                        featured
                          ? "grid gap-2 sm:grid-cols-2 lg:mt-0"
                          : "mt-5 grid gap-2"
                      }
                    >
                      {service.points.map((point, j) => (
                        <motion.li
                          key={point}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: j * 0.05, duration: 0.35 }}
                          className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ink-700"
                        >
                          <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-brand-100">
                            <Check className="size-2.5 text-brand-700" strokeWidth={3.5} />
                          </span>
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
