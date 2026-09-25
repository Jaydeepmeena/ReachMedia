import { Phone } from "lucide-react";
import { site } from "@/lib/content";

/**
 * Sticky call button, bottom-right on every page.
 *
 * Uses the Sales line. It sits above the phone's home-indicator area via the
 * safe-area inset, so it is not half-hidden on an iPhone, and it collapses to
 * a circle on small screens where a labelled pill would crowd the content.
 */
export function CallButton() {
  const sales = site.contacts.find((c) => c.icon === "phone") ?? site.contacts[0];
  if (!sales) return null;

  return (
    <a
      href={sales.href}
      aria-label={`Call ${sales.label} on ${sales.value}`}
      className="group fixed right-5 z-50 flex items-center gap-2.5 rounded-full brand-gradient p-4 text-white shadow-glow transition-transform duration-300 hover:scale-105 active:scale-95 sm:gap-3 sm:py-3.5 sm:pl-4 sm:pr-5"
      style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
    >
      {/* A quiet pulse so the button is noticed without animating forever in
          the corner of someone's eye. */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand-500/40 [animation-duration:3s]"
      />
      <Phone className="size-5 shrink-0" strokeWidth={2.2} />
      <span className="hidden text-sm font-semibold sm:block">Call us</span>
    </a>
  );
}
