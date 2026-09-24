import "server-only";
import sanitizeHtml from "sanitize-html";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  BLOG — powered by the WordPress REST API
 * ─────────────────────────────────────────────────────────────────────────────
 *  Set WORDPRESS_API_URL to the WordPress site root, e.g.
 *      WORDPRESS_API_URL=https://blog.reachmedia.co.in
 *  The REST path (/wp-json/wp/v2) is appended here.
 *
 *  Publishing a post in WordPress is all that is needed — the listing page and
 *  that post's own page appear on their own, within the revalidate window.
 *
 *  Nothing here throws. With no URL configured, or WordPress unreachable, the
 *  blog renders an empty state instead of breaking the site.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** WordPress is a separate system; refetch often enough that new posts show up. */
const REVALIDATE_SECONDS = 60 * 10;

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  /** Sanitised HTML, safe to render. Empty on the listing page. */
  html: string;
  date: string;
  readingMinutes: number;
  author: string | null;
  categories: string[];
  image: { url: string; alt: string; width?: number; height?: number } | null;
};

type WpRendered = { rendered?: string };
type WpPost = {
  id: number;
  slug: string;
  date?: string;
  title?: WpRendered;
  excerpt?: WpRendered;
  content?: WpRendered;
  _embedded?: {
    author?: { name?: string }[];
    "wp:featuredmedia"?: {
      source_url?: string;
      alt_text?: string;
      media_details?: { width?: number; height?: number };
    }[];
    "wp:term"?: { taxonomy?: string; name?: string }[][];
  };
};

function apiBase(): string | null {
  const raw = process.env.WORDPRESS_API_URL?.trim();
  if (!raw) return null;
  return `${raw.replace(/\/+$/, "")}/wp-json/wp/v2`;
}

/** WordPress titles and excerpts arrive with entities like &#8217; and tags. */
function toText(html = ""): string {
  const stripped = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} });
  return stripped
    .replace(/&#(\d+);/g, (_, d: string) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Post bodies are authored in WordPress, but a compromised or careless CMS can
 * still emit <script>. Strip anything executable before it reaches the page.
 */
function toSafeHtml(html = ""): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "h2", "h3", "h4", "h5", "h6", "p", "a", "ul", "ol", "li", "blockquote",
      "strong", "em", "b", "i", "u", "s", "code", "pre", "hr", "br",
      "img", "figure", "figcaption", "table", "thead", "tbody", "tr", "th", "td",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      "*": ["class"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      // Outbound links from post bodies open away from the site safely.
      a: (tagName, attribs) => ({
        tagName,
        attribs: attribs.href?.startsWith("http")
          ? { ...attribs, target: "_blank", rel: "noopener noreferrer" }
          : attribs,
      }),
    },
  });
}

function readingMinutes(html: string): number {
  const words = toText(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function normalise(post: WpPost, withBody: boolean): BlogPost {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const categories = (post._embedded?.["wp:term"] ?? [])
    .flat()
    .filter((t) => t?.taxonomy === "category" && t.name && t.name !== "Uncategorized")
    .map((t) => toText(t.name));

  const body = post.content?.rendered ?? "";

  return {
    id: post.id,
    slug: post.slug,
    title: toText(post.title?.rendered) || "Untitled",
    excerpt: toText(post.excerpt?.rendered).slice(0, 200),
    html: withBody ? toSafeHtml(body) : "",
    date: post.date ?? "",
    readingMinutes: readingMinutes(body || post.excerpt?.rendered || ""),
    author: post._embedded?.author?.[0]?.name
      ? toText(post._embedded.author[0].name)
      : null,
    categories,
    image: media?.source_url
      ? {
          url: media.source_url,
          alt: toText(media.alt_text) || toText(post.title?.rendered),
          width: media.media_details?.width,
          height: media.media_details?.height,
        }
      : null,
  };
}

async function wpFetch(path: string): Promise<unknown | null> {
  const base = apiBase();
  if (!base) return null;
  try {
    const res = await fetch(`${base}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["blog"] },
    });
    if (!res.ok) {
      console.error(`[blog] ${res.status} ${res.statusText} for ${path}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error("[blog] request failed:", err);
    return null;
  }
}

/** Newest first. Returns [] when unconfigured or unreachable — never throws. */
export async function getPosts(limit = 24): Promise<BlogPost[]> {
  const data = await wpFetch(`/posts?per_page=${limit}&_embed=1&status=publish`);
  if (!Array.isArray(data)) return [];
  return (data as WpPost[]).map((p) => normalise(p, false));
}

/** One post by slug, body included. `null` when missing or unreachable. */
export async function getPost(slug: string): Promise<BlogPost | null> {
  const data = await wpFetch(`/posts?slug=${encodeURIComponent(slug)}&_embed=1`);
  if (!Array.isArray(data) || data.length === 0) return null;
  return normalise(data[0] as WpPost, true);
}

/** Slugs to prerender. Empty is fine: pages then render on first request. */
export async function getPostSlugs(): Promise<string[]> {
  const data = await wpFetch("/posts?per_page=100&_fields=slug&status=publish");
  if (!Array.isArray(data)) return [];
  return (data as { slug?: string }[]).map((p) => p.slug).filter((s): s is string => !!s);
}

export function isBlogConfigured(): boolean {
  return apiBase() !== null;
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
