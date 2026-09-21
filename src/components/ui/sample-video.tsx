"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A work-sample reel.
 *
 * Behaviour, in order of how much it matters:
 *
 *  - Muted always, until asked otherwise. Sound that starts on its own is the
 *    fastest way to make someone close a tab, and browsers block it anyway.
 *  - Only one reel may have sound. The parent owns `audioOn`, so unmuting one
 *    card mutes every other by construction rather than by cleanup.
 *  - Plays only while on screen. Six reels are ~32MB in total; `preload="none"`
 *    plus an IntersectionObserver means a visitor downloads the one or two they
 *    actually look at, not all of them.
 *  - Leaving the screen with sound on hands the audio back, so nothing is left
 *    talking somewhere off-screen.
 */
export function SampleVideo({
  src,
  poster,
  title,
  audioOn,
  onRequestAudio,
  onReleaseAudio,
  className,
}: {
  src: string;
  poster: string;
  title: string;
  audioOn: boolean;
  onRequestAudio: () => void;
  onReleaseAudio: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  // Play while visible, pause when not.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.4),
      { threshold: [0, 0.4, 0.75] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (inView && !paused) {
      // A muted play() is allowed without a gesture; it can still reject if the
      // element is torn down mid-promise, which is not worth surfacing.
      void el.play().catch(() => {});
    } else {
      el.pause();
      // Do not keep the floor while off screen.
      if (!inView && audioOn) onReleaseAudio();
    }
  }, [inView, paused, audioOn, onReleaseAudio]);

  // The parent is the single source of truth for which reel has sound.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = !audioOn;
    if (audioOn) el.volume = 1;
  }, [audioOn]);

  const toggleAudio = () => {
    const el = ref.current;
    if (audioOn) {
      onReleaseAudio();
      return;
    }
    onRequestAudio();
    // Unmuting is the gesture, so make sure it is actually running.
    setPaused(false);
    void el?.play().catch(() => {});
  };

  return (
    <div className={cn("group/v relative h-full w-full overflow-hidden bg-ink-900", className)}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={title}
        onClick={() => setPaused((p) => !p)}
        className="h-full w-full cursor-pointer object-cover"
      />

      {/* Paused state — only shown when the visitor paused it themselves. */}
      {paused ? (
        <button
          type="button"
          onClick={() => setPaused(false)}
          aria-label={`Play ${title}`}
          className="absolute inset-0 grid place-items-center bg-ink-900/35"
        >
          <span className="grid size-14 place-items-center rounded-full bg-white/90 text-ink-900 shadow-lift">
            <Play className="size-6 translate-x-0.5 fill-current" />
          </span>
        </button>
      ) : null}

      {/* Sound toggle. Always visible — a control nobody can find is not a
          control, and on touch there is no hover to reveal it. */}
      <button
        type="button"
        onClick={toggleAudio}
        aria-pressed={audioOn}
        aria-label={audioOn ? `Mute ${title}` : `Unmute ${title}`}
        className={cn(
          "absolute bottom-3 right-3 z-10 grid size-10 place-items-center rounded-full backdrop-blur-sm transition-colors",
          audioOn
            ? "bg-brand-500 text-white hover:bg-brand-600"
            : "bg-ink-900/55 text-white hover:bg-ink-900/75",
        )}
      >
        {audioOn ? <Volume2 className="size-4.5" /> : <VolumeX className="size-4.5" />}
      </button>

      {/* Pause affordance for pointer devices, so the click target is discoverable. */}
      {!paused ? (
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 left-3 hidden items-center gap-1.5 rounded-full bg-ink-900/55 px-2.5 py-1.5 text-[10px] font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity group-hover/v:opacity-100 [@media(hover:hover)]:flex"
        >
          <Pause className="size-3 fill-current" />
          Tap to pause
        </span>
      ) : null}
    </div>
  );
}
