"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  ArrowRight,
  Mail,
  Phone,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Container, Button, Eyebrow } from "@/components/ui/primitives";
import { audit, site } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The form hands off to the clinic's own mail client, so it works the moment
 * this site is deployed — no backend, no silent drop-off.
 *
 * To collect submissions server-side instead, replace `handleSubmit` with a
 * POST to your endpoint (Formspree, Resend, an /api route, your CRM):
 *
 *   await fetch("https://formspree.io/f/XXXXXXX", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(payload),
 *   });
 */

const fieldClass =
  "h-12 w-full rounded-2xl border border-white/15 bg-white/8 px-4 text-[15px] text-white placeholder:text-white/35 transition-colors focus:border-brand-400 focus:bg-white/12 focus:outline-none";

export function Audit() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "").trim();

    const body = [
      `Clinic: ${get("clinic")}`,
      `Speciality: ${get("speciality")}`,
      `Name: ${get("name")}`,
      `Phone: ${get("phone")}`,
      `Instagram / website: ${get("handle")}`,
      "",
      get("message") || "(no additional notes)",
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Free audit request — ${get("clinic") || "clinic"}`,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  return (
    <section id="audit" className="relative scroll-mt-24 overflow-hidden bg-ink-900 py-20 sm:py-24 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute -left-24 top-0 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(31,148,64,0.45),transparent_62%)] blur-3xl" />
        <div className="absolute -right-24 bottom-0 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(195,217,78,0.26),transparent_62%)] blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <Eyebrow tone="dark">{audit.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.8vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white text-balance">
              {audit.title}
            </h2>
            <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-white/60 text-pretty">
              {audit.body}
            </p>

            <ul className="mt-8 space-y-3">
              {audit.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-[15px] text-white/85">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full brand-gradient">
                    <Check className="size-3.5 text-white" strokeWidth={3} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-7">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-brand-300"
              >
                <Mail className="size-4" />
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-brand-300"
              >
                <Phone className="size-4" />
                {site.phone}
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="relative rounded-4xl border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md sm:p-8">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                >
                  <span className="grid size-16 place-items-center rounded-full brand-gradient shadow-glow">
                    <Check className="size-8 text-white" strokeWidth={3} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-extrabold text-white">
                    Almost there
                  </h3>
                  <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-white/60">
                    Your email app should have opened with the details filled in.
                    Hit send and we will come back within three working days.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 text-sm font-semibold text-brand-300 underline-offset-4 hover:underline"
                  >
                    Edit my details
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="grid gap-4"
                >
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-300">
                    <Sparkles className="size-3.5" />
                    Request your audit
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5">
                      <span className="text-[12.5px] font-semibold text-white/70">
                        Clinic / hospital name
                      </span>
                      <input
                        name="clinic"
                        required
                        placeholder="e.g. Sunrise Fertility Centre"
                        className={fieldClass}
                      />
                    </label>
                    <label className="grid gap-1.5">
                      <span className="text-[12.5px] font-semibold text-white/70">
                        Speciality
                      </span>
                      <div className="relative">
                        <select
                          name="speciality"
                          required
                          defaultValue=""
                          className={cn(
                            fieldClass,
                            "appearance-none pr-11 [&>option]:bg-ink-800 [&>option]:text-white",
                          )}
                        >
                          <option value="" disabled>
                            Select one
                          </option>
                          {audit.specialityOptions.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          aria-hidden
                          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/45"
                        />
                      </div>
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5">
                      <span className="text-[12.5px] font-semibold text-white/70">
                        Your name
                      </span>
                      <input name="name" required placeholder="Dr. / Mr. / Ms." className={fieldClass} />
                    </label>
                    <label className="grid gap-1.5">
                      <span className="text-[12.5px] font-semibold text-white/70">
                        Phone / WhatsApp
                      </span>
                      <input
                        name="phone"
                        type="tel"
                        required
                        inputMode="tel"
                        placeholder="+91"
                        className={fieldClass}
                      />
                    </label>
                  </div>

                  <label className="grid gap-1.5">
                    <span className="text-[12.5px] font-semibold text-white/70">
                      Instagram handle or website
                    </span>
                    <input name="handle" placeholder="@yourclinic" className={fieldClass} />
                  </label>

                  <label className="grid gap-1.5">
                    <span className="text-[12.5px] font-semibold text-white/70">
                      Anything specific you want reviewed?
                    </span>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Optional"
                      className={cn(fieldClass, "h-auto resize-none py-3 leading-relaxed")}
                    />
                  </label>

                  <Button type="submit" size="lg" className="mt-1 w-full">
                    Send audit request
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Button>

                  <p className="text-center text-[11.5px] leading-relaxed text-white/40">
                    No cost, no obligation. We reply within three working days.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
