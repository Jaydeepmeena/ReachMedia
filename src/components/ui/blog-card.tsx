import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, FileText } from "lucide-react";
import { formatDate, type BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";

/**
 * One post on the blog listing. The whole card is the link, so the target is
 * the card rather than a small "read more".
 */
export function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  return (
    <article className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift",
          featured && "lg:flex-row",
        )}
      >
        <div
          className={cn(
            "relative w-full shrink-0 overflow-hidden bg-ink-100",
            featured ? "aspect-[16/10] lg:aspect-auto lg:w-1/2" : "aspect-[16/10]",
          )}
        >
          {post.image ? (
            <Image
              src={post.image.url}
              alt={post.image.alt}
              fill
              sizes={featured ? "(max-width: 1024px) 92vw, 45vw" : "(max-width: 640px) 92vw, 30vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            // Posts published without a featured image still need a card that
            // looks deliberate rather than broken.
            <div className="grid h-full w-full place-items-center brand-gradient">
              <FileText className="size-10 text-white/70" strokeWidth={1.5} />
            </div>
          )}

          {post.categories[0] ? (
            <span className="absolute left-3 top-3 rounded-full bg-ink-900/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
              {post.categories[0]}
            </span>
          ) : null}
        </div>

        <div className={cn("flex flex-1 flex-col p-5 sm:p-6", featured && "lg:justify-center lg:p-8")}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] font-medium text-ink-400">
            {post.date ? <time dateTime={post.date}>{formatDate(post.date)}</time> : null}
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {post.readingMinutes} min read
            </span>
          </div>

          <h3
            className={cn(
              "mt-2.5 font-display font-extrabold leading-snug tracking-tight text-ink-900 text-balance transition-colors group-hover:text-brand-700",
              featured ? "text-xl sm:text-2xl" : "text-[17px]",
            )}
          >
            {post.title}
          </h3>

          {post.excerpt ? (
            <p
              className={cn(
                "mt-2.5 text-[14px] leading-relaxed text-ink-500 text-pretty",
                featured ? "line-clamp-3" : "line-clamp-2",
              )}
            >
              {post.excerpt}
            </p>
          ) : null}

          <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700">
            Read article
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
