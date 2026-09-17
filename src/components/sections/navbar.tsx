"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/primitives";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Scroll-spy for the active nav item.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 transition-all duration-300 sm:px-8 lg:h-18 lg:px-10",
            scrolled &&
              "mt-2 h-14 max-w-6xl rounded-full border border-ink-200/70 glass shadow-soft lg:h-16",
          )}
        >
          <a href="#top" aria-label="Reach Media — home" className="shrink-0">
            <Logo className={cn("transition-all", scrolled && "h-8 sm:h-9")} />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition-colors",
                  active === item.href
                    ? "text-brand-700"
                    : "text-ink-500 hover:text-ink-900",
                )}
              >
                {active === item.href ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-brand-50"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              href="#audit"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Free audit
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid size-10 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 transition-colors hover:bg-ink-50 lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-60 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink-900/45 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 36 }}
              className="absolute inset-y-0 right-0 flex w-[min(21rem,88vw)] flex-col bg-white shadow-lift"
            >
              <div className="flex h-16 items-center justify-between border-b border-ink-100 px-5">
                <Logo className="h-8" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-10 place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                {nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 22 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.3 }}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold text-ink-800 transition-colors hover:bg-brand-50 hover:text-brand-800"
                  >
                    {item.label}
                    <ArrowRight className="size-4 text-ink-400" />
                  </motion.a>
                ))}
              </nav>

              <div className="border-t border-ink-100 p-4">
                <ButtonLink
                  href="#audit"
                  size="lg"
                  onClick={() => setOpen(false)}
                  className="w-full"
                >
                  Get a free audit
                  <ArrowRight className="size-4" />
                </ButtonLink>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
