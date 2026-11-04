import Link from "next/link";

import { Container, Section } from "@/components/layout/container";

type LegalPageProps = {
  title: string;
  subtitle: string;
  document: {
    lastUpdated: string;
    html: string;
    headings: { id: string; title: string }[];
  };
};

export function LegalPage({ title, subtitle, document }: LegalPageProps) {
  return (
    <>
      <section style={{ background: "var(--gradient-hero)" }}>
        <Container className="py-16 sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">{title}</li>
            </ol>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            Last Updated: <time dateTime="2026-05-09">{document.lastUpdated}</time>
          </p>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <article className="order-2 min-w-0 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-10 lg:order-1">
              <div
                className="blog-content break-words [&_h2]:scroll-mt-28 [&_h2]:text-2xl"
                dangerouslySetInnerHTML={{ __html: document.html }}
              />
            </article>
            <aside className="order-1 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)] lg:order-2 lg:sticky lg:top-28">
              <h2 className="text-sm font-semibold text-foreground">On this page</h2>
              <nav aria-label={`${title} table of contents`} className="mt-4">
                <ul className="space-y-3">
                  {document.headings.map((heading) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`} className="text-sm leading-relaxed text-muted-foreground hover:text-primary">
                        {heading.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
                <Link href="/terms-of-service" className="block font-medium text-primary hover:underline">Terms of Service</Link>
                <Link href="/privacy-policy" className="block font-medium text-primary hover:underline">Privacy Policy</Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
