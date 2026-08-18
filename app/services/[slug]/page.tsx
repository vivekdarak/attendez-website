import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import { Container, Section } from "@/components/layout/container";
import { ServiceCard } from "@/components/sections/service-card";
import { Button } from "@/components/ui/button";
import { getService, services } from "@/data/services";
import { openinaryUrl } from "@/lib/openinary";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {
      title: "Service not found",
    };
  }

  return {
    title: service.title,
    description: service.short,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const page = service.pageContent;
  const heroImage = page?.heroImage;

  return (
    <>
      <section style={{ background: "var(--gradient-hero)" }}>
        <Container className="py-16 sm:py-20 lg:py-24">
          <div
            className={
              heroImage
                ? "grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-[auto_1fr] lg:items-center lg:gap-x-12 lg:gap-y-5"
                : "mx-auto max-w-3xl"
            }
          >
            <div className={heroImage ? "max-w-2xl lg:col-start-1 lg:row-start-1" : undefined}>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {service.title}
              </h1>
            </div>

            {heroImage ? (
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)] lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <Image
                  src={openinaryUrl(heroImage.image, {
                    width: 1100,
                    height: 619,
                    crop: "fill",
                    quality: 78,
                    format: "webp",
                  })}
                  alt={heroImage.alt}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) calc(100vw - 32px), 620px"
                  className="object-cover"
                />
              </div>
            ) : null}

            <div className={heroImage ? "max-w-2xl lg:col-start-1 lg:row-start-2" : undefined}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Book a discovery call <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">Discuss your website requirements</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {page ? (
        <>
          <Section>
            <Container>
              <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
                <div className="lg:sticky lg:top-24">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Most websites are not ready for real marketing.
                  </h2>
                </div>
                <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                  {page.problem.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </Container>
          </Section>

          <Section className="bg-surface-muted/40">
            <Container>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Built to perform from day one.
                </h2>
                <div className="mt-5 space-y-4 text-muted-foreground">
                  {page.promise.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </Container>
          </Section>

          <Section>
            <Container>
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  What you get
                </h2>
                <p className="mt-4 text-muted-foreground">
                  A complete website setup for visibility, campaigns, tracking, ownership, and future iteration.
                </p>
              </div>
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {page.deliverables.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)]"
                  >
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </article>
                ))}
              </div>
            </Container>
          </Section>

          <Section className="bg-surface-muted/40">
            <Container>
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    How we work
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    Discovery, build, tracking, launch, and ongoing changes handled as one practical workflow.
                  </p>
                </div>
                <ol className="space-y-4">
                  {page.process.map((item, index) => (
                    <li
                      key={item.title}
                      className="grid gap-4 rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:grid-cols-[44px_1fr]"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Container>
          </Section>

          <Section>
            <Container>
              <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
                <div className="rounded-2xl border border-border bg-surface p-7 shadow-[var(--shadow-card)]">
                  <h2 className="text-2xl font-bold text-foreground">Why it matters</h2>
                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                    {page.whyItMatters.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-7 shadow-[var(--shadow-card)]">
                  <h2 className="text-2xl font-bold text-foreground">Ideal for</h2>
                  <ul className="mt-5 space-y-3">
                    {page.idealFor.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-sm text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Container>
          </Section>

          {page.workExamples ? (
            <Section className="bg-surface-muted/40">
              <Container>
                <div className="max-w-2xl">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Websites we have built
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    A few live examples of business websites delivered with fast pages, clean presentation, and practical ownership in mind.
                  </p>
                </div>
                <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {page.workExamples.map((example) => (
                    <a
                      key={example.domain}
                      href={example.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[var(--shadow-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
                        <Image
                          src={openinaryUrl(example.image, {
                            width: 720,
                            height: 540,
                            crop: "fill",
                            quality: 75,
                            format: "webp",
                          })}
                          alt={example.alt}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) calc(100vw - 32px), (max-width: 1024px) calc((100vw - 56px) / 2), 360px"
                          className="object-cover transition duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-foreground">{example.name}</h3>
                        <p className="mt-1 text-sm font-medium text-primary">{example.domain}</p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {example.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </Container>
            </Section>
          ) : null}
          <Section>
            <Container>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Questions, answered
                </h2>
              </div>
              <div className="mx-auto mt-10 max-w-3xl space-y-4">
                {page.faqs.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-soft)]"
                  >
                    <summary className="flex list-none items-center justify-between gap-4 text-base font-semibold text-foreground">
                      {item.q}
                      <span className="text-primary transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                  </details>
                ))}
              </div>
            </Container>
          </Section>

          <Section className="pb-24">
            <Container>
              <div className="relative overflow-hidden rounded-3xl border border-border bg-[image:var(--gradient-primary)] p-10 text-primary-foreground sm:p-14">
                <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                      {page.finalCta.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-primary-foreground/85">
                      {page.finalCta.description}
                    </p>
                  </div>
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/contact">{page.finalCta.cta}</Link>
                  </Button>
                </div>
              </div>
            </Container>
          </Section>
        </>
      ) : (
        <Section>
          <Container>
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="space-y-10 lg:col-span-2">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">What you get</h2>
                  <ul className="mt-5 space-y-3">
                    {service.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-foreground/80">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">How we work</h2>
                  <ol className="mt-5 space-y-4 text-muted-foreground">
                    <li>
                      <span className="font-semibold text-foreground">Discovery.</span>{" "}
                      We map your current process and identify the highest-leverage AI fit.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Design.</span>{" "}
                      Solution architecture and a scoped plan you can approve before any code is written.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Build & deploy.</span>{" "}
                      Production-grade implementation with documentation and handover.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Operate.</span>{" "}
                      Optional ongoing support, observability, and iteration.
                    </li>
                  </ol>
                </div>
              </div>

              <aside className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)]">
                <h3 className="text-base font-semibold text-foreground">Ideal for</h3>
                <p className="mt-3 text-foreground/80">{service.ideal}</p>
                <div className="mt-6 border-t border-border pt-6">
                  <h4 className="text-sm font-semibold text-foreground">Stack we use</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    n8n. Postgres. WhatsApp API. ChatGPT. Claude. Google APIs. GitHub
                  </p>
                </div>
                <Button asChild className="mt-6 w-full">
                  <Link href="/contact">Book a discovery call</Link>
                </Button>
              </aside>
            </div>
          </Container>
        </Section>
      )}

      <Section className="bg-surface-muted/40">
        <Container>
          <h2 className="text-2xl font-bold text-foreground">Other services</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <ServiceCard key={item.slug} service={item} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}