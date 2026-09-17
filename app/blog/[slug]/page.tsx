import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Container, Section } from "@/components/layout/container";
import { ContactForm } from "@/components/sections/contact-form";
import { FaqSection } from "@/components/sections/faq-section";
import { directusAssetUrl, getBlogPost, getBlogPosts } from "@/lib/directus";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getBlogPosts()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Article not found" };
  const image = directusAssetUrl(post.featured_image);
  const canonical = post.canonical_url || `https://attendez.in/blog/${post.slug}`;
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || undefined,
      publishedTime: post.published_at || undefined,
      authors: post.author ? [post.author.name] : undefined,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const image = directusAssetUrl(post.featured_image);
  const canonical = post.canonical_url || `https://attendez.in/blog/${post.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": post.schema_type || "BlogPosting",
    headline: post.title,
    description: post.meta_description || post.excerpt || undefined,
    datePublished: post.published_at || undefined,
    image: image || undefined,
    author: post.author ? { "@type": "Person", name: post.author.name } : undefined,
    mainEntityOfPage: canonical,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <section style={{ background: "var(--gradient-hero)" }}>
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{post.title}</h1>
            <div className="mt-5 text-sm text-muted-foreground">
              {post.author ? <span>By {post.author.name}</span> : null}
              {post.author && post.published_at ? <span> · </span> : null}
              {post.published_at ? <time dateTime={post.published_at}>{new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date(post.published_at))}</time> : null}
            </div>
          </div>
        </Container>
      </section>
      <Section>
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(18rem,3fr)]">
            <div className="min-w-0">
              {image ? (
                <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-surface-muted shadow-[var(--shadow-soft)]">
                  <Image src={image} alt={post.title} fill priority unoptimized className="object-cover" />
                </div>
              ) : null}

              <div
                className={`prose prose-slate max-w-none ${image ? "mt-10" : ""}`}
                dangerouslySetInnerHTML={{ __html: post.content_html || "" }}
              />

              {post.faq_items?.length ? (
                <FaqSection
                  items={post.faq_items}
                  className="mt-14 border-t border-border pt-10"
                />
              ) : null}
            </div>

            <aside className="lg:sticky lg:top-24">
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-foreground">Let&apos;s talk</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Have a project or an AI opportunity in mind? Tell us what you are working on.
                </p>
              </div>
              <ContactForm compact />
            </aside>
          </div>
        </Container>
      </Section>
    </article>
  );
}
