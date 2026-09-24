import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Container, ButtonLink } from "@/components/ui/primitives";
import { BlogCard } from "@/components/ui/blog-card";
import { formatDate, getPost, getPosts, getPostSlugs } from "@/lib/blog";
import { site } from "@/lib/content";

/**
 * A page per post, created from whatever is published in WordPress. Slugs are
 * prerendered at build; anything published afterwards renders on first request
 * and is then cached, so a new post needs no deploy.
 */
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date || undefined,
      images: post.image ? [{ url: post.image.url, alt: post.image.alt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image.url] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const more = (await getPosts(4)).filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date || undefined,
    image: post.image?.url,
    author: { "@type": post.author ? "Person" : "Organization", name: post.author ?? site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <Navbar />
      <main>
        <article className="pt-28 pb-20 sm:pt-32 lg:pt-36">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-500 transition-colors hover:text-brand-700"
              >
                <ArrowLeft className="size-4" />
                All articles
              </Link>

              {post.categories.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.categories.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-700"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              ) : null}

              <h1 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink-900 text-balance">
                {post.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-ink-200/70 pb-6 text-[13px] font-medium text-ink-400">
                {post.date ? <time dateTime={post.date}>{formatDate(post.date)}</time> : null}
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {post.readingMinutes} min read
                </span>
                {post.author ? (
                  <span className="flex items-center gap-1.5">
                    <User className="size-3.5" />
                    {post.author}
                  </span>
                ) : null}
              </div>
            </div>

            {post.image ? (
              <figure className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-4xl border border-ink-200/70 bg-ink-100 shadow-soft">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={post.image.url}
                    alt={post.image.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 56rem"
                    className="object-cover"
                  />
                </div>
              </figure>
            ) : null}

            {/* Body comes from WordPress and is sanitised in lib/blog.ts. */}
            <div
              className="prose-post mx-auto mt-10 max-w-3xl"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            <div className="mx-auto mt-14 max-w-3xl rounded-4xl brand-gradient p-7 text-center sm:p-9">
              <h2 className="font-display text-xl font-extrabold text-white sm:text-2xl">
                Want this working for your clinic?
              </h2>
              <p className="mx-auto mt-2.5 max-w-lg text-[14.5px] leading-relaxed text-white/85">
                We will review your profiles and send a 30-day content plan. No cost,
                no obligation.
              </p>
              <ButtonLink href="/#audit" variant="light" size="lg" className="mt-6">
                Get a free audit
              </ButtonLink>
            </div>

            {more.length > 0 ? (
              <section className="mx-auto mt-16 max-w-6xl">
                <h2 className="font-display text-xl font-extrabold tracking-tight text-ink-900">
                  More from the blog
                </h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {more.map((p) => (
                    <BlogCard key={p.id} post={p} />
                  ))}
                </div>
              </section>
            ) : null}
          </Container>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
