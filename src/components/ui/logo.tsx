import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/lib/content";

/** Full lockup — for light surfaces (header). */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo-full-alpha.png"
      alt={`${site.name} — ${site.tagline}`}
      width={961}
      height={395}
      priority
      className={cn("h-9 w-auto sm:h-10", className)}
    />
  );
}

/** Mark + typeset wordmark — for dark surfaces (footer, CTA band). */
export function LogoLockupDark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src="/logo-mark-alpha.png"
        alt=""
        width={353}
        height={395}
        className="h-10 w-auto"
        aria-hidden
      />
      <span className="leading-none">
        <span className="block font-display text-xl font-extrabold tracking-tight text-white">
          Reach
          <span className="text-brand-300"> Media</span>
        </span>
        <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-white/50">
          {site.tagline}
        </span>
      </span>
    </div>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo-mark-alpha.png"
      alt={site.name}
      width={353}
      height={395}
      className={cn("h-8 w-auto", className)}
    />
  );
}
