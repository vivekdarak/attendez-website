import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container, Section } from "@/components/layout/container";
import { directusAssetUrl, getBlogPosts, getSeoPage, seoPageToMetadata } from "@/lib/directus";

const fallbackMetadata: Metadata = {
  title: "Blog",
  description: "Practical articles from Attendez about AI consulting, automation, websites, SEO, voice agents, and WhatsApp AI.",
};

export async function generateMetadata(): Promise<Metadata> {
  return seoPageToMetadata(await getSeoPage("/blog"), fallbackMetadata);
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <section style={{ background: "var(--gradient-hero)" }}>
        <Container className="py-20 text-center sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Attendez blog</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Practical thinking on AI, automation, websites, and sustainable growth.
          </p>
        </Container>
      </section>
      <Section>
        <Container>
          {posts.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const image = directusAssetUrl(post.featured_image);
                return (
                  <article key={post.id} className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-soft)]">
                    {image ? (
                      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/9] bg-surface-muted">
                        <Image src={image} alt="" fill unoptimized className="object-cover" />
                      </Link>
                    ) : null}
                    <div className="p-6">
                      {post.category ? <p className="text-xs font-semibold uppercase tracking-wide text-primary">{post.category.title}</p> : null}
                      <h2 className="mt-2 text-xl font-semibold text-foreground">
                        <Link href={`/blog/${post.slug}`} className="hover:text-primary">{post.title}</Link>
                      </h2>
                      {post.excerpt ? <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p> : null}
                      <Link href={`/blog/${post.slug}`} className="mt-5 inline-block text-sm font-medium text-primary hover:underline">Read article</Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No articles have been published yet.</p>
          )}
        </Container>
      </Section>
    </>
  );
}
