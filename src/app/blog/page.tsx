import type { Metadata } from "next";
import { PenLine } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { BlogCard } from "@/components/ui/blog-card";
import { getPosts, isBlogConfigured } from "@/lib/blog";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Healthcare marketing notes from Reach Media — what works on social for IVF, eye, dental and multi-speciality clinics.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const posts = await getPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <Navbar />
      <main>
        <Section className="pt-28 sm:pt-32 lg:pt-36">
          <Container>
            <SectionHeading
              eyebrow="Blog"
              title="Notes on healthcare marketing that actually moves patients."
              highlight="actually moves patients"
              lead={`Written by the team that runs the calendars. ${site.name} publishes what we learn from clinic accounts — what patients click, what they ignore, and what turns a view into an appointment.`}
              className="max-w-3xl"
            />

            {posts.length > 0 ? (
              <>
                {/* Newest post gets the wide card; the rest sit in a grid. */}
                <div className="mt-9 lg:mt-10">
                  <BlogCard post={lead} featured />
                </div>

                {rest.length > 0 ? (
                  <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {rest.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <div className="mt-12 rounded-4xl border border-dashed border-ink-200 bg-ink-50 px-6 py-16 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white text-brand-600 shadow-soft">
                  <PenLine className="size-6" strokeWidth={1.8} />
                </span>
                <h2 className="mt-5 font-display text-xl font-extrabold text-ink-900">
                  No articles yet
                </h2>
                <p className="mx-auto mt-2 max-w-md text-[14.5px] leading-relaxed text-ink-500">
                  {isBlogConfigured()
                    ? "The first post will appear here as soon as it is published in WordPress."
                    : "Set WORDPRESS_API_URL to the WordPress site address and published posts will appear here automatically."}
                </p>
              </div>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
