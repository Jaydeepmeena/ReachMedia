import type { NextConfig } from "next";

/**
 * WordPress serves featured images from its own domain, which is only known
 * from the environment. Derive the host so next/image will load them without
 * opening the allowlist to every site on the internet.
 */
const wordpressHost = (() => {
  const raw = process.env.WORDPRESS_API_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw).hostname;
  } catch {
    console.warn("[next.config] WORDPRESS_API_URL is not a valid URL — ignoring");
    return null;
  }
})();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Instagram serves media from these hosts; URLs are signed and expire,
    // which is why the feed refetches hourly.
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
      ...(wordpressHost
        ? ([
            { protocol: "https" as const, hostname: wordpressHost },
            // WordPress media is commonly offloaded to these two.
            { protocol: "https" as const, hostname: "**.wp.com" },
            { protocol: "https" as const, hostname: "secure.gravatar.com" },
          ])
        : []),
    ],
  },
};

export default nextConfig;
