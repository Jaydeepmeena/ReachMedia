import Image from "next/image";
import { Play, Images, ArrowUpRight } from "lucide-react";
import {
  Container,
  Section,
  SectionHeading,
  ButtonLink,
} from "@/components/ui/primitives";
import { InstagramIcon } from "@/components/ui/platform-icons";
import { getInstagramPosts, type InstagramPost } from "@/lib/instagram";
import { site } from "@/lib/content";

/**
 * Live Instagram feed. Server Component — the access token is read on the
 * server and never reaches the browser.
 *
 * If the integration is not configured (or Meta is down, or the token has
 * expired) `getInstagramPosts` returns null and this section renders nothing
 * at all, rather than showing a broken grid to a visitor.
 */
export async function InstagramFeed() {
  const posts = await getInstagramPosts(8);

  if (!posts || posts.length === 0) return null;

  const handle = posts[0].username
    ? `@${posts[0].username}`
    : site.socials.find((s) => s.label === "Instagram")?.href ?? "";

  const profileUrl =
    site.socials.find((s) => s.label === "Instagram")?.href ??
    (posts[0].username
      ? `https://instagram.com/${posts[0].username}`
      : "https://instagram.com/");

  return (
    <Section id="instagram" className="relative overflow-hidden bg-ink-50">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Straight from the feed"
            title="What we are posting right now."
            highlight="right now"
            lead="Pulled live from our Instagram — the same cadence we run for every clinic we work with."
            className="max-w-2xl"
          />

          <ButtonLink
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="md"
            className="shrink-0"
          >
            <InstagramIcon className="size-4" />
            Follow {handle}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </ButtonLink>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function PostCard({ post }: { post: InstagramPost }) {
  const caption = post.caption.split("\n")[0].slice(0, 90);

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-soft transition-shadow duration-300 hover:shadow-lift"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-ink-100">
        <Image
          src={post.imageUrl}
          alt={caption || "Instagram post"}
          fill
          sizes="(max-width: 640px) 48vw, (max-width: 1024px) 31vw, 23vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />

        {post.mediaType !== "IMAGE" ? (
          <span
            className="absolute right-2.5 top-2.5 grid size-7 place-items-center rounded-lg bg-ink-900/60 text-white backdrop-blur-sm"
            aria-hidden
          >
            {post.mediaType === "VIDEO" ? (
              <Play className="size-3.5 fill-current" />
            ) : (
              <Images className="size-3.5" />
            )}
          </span>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink-900/95 to-transparent p-3 pt-10 transition-transform duration-500 group-hover:translate-y-0">
          <p className="line-clamp-2 text-[11.5px] leading-snug text-white">
            {caption}
          </p>
        </div>
      </div>
    </a>
  );
}
