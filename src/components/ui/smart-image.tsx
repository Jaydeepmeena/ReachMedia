"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders `src` if the file exists in /public, otherwise falls back to the
 * supplied node. Lets the site ship before real screenshots are dropped in.
 */
export function SmartImage({
  src,
  alt,
  fallback,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: {
  src: string;
  alt: string;
  fallback: ReactNode;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className={cn("h-full w-full", className)}>{fallback}</div>;
  }

  return (
    <div className={cn("relative h-full w-full", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imgClassName)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
