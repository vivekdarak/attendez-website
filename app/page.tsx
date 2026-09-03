import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Network, Route, ShieldCheck } from "lucide-react";

import { Container, Section } from "@/components/layout/container";
import { TypewriterServiceText } from "@/components/sections/typewriter-service-text";
import { ServiceCard } from "@/components/sections/service-card";
import { ToolLogos } from "@/components/sections/tool-logos";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { openinaryUrl } from "@/lib/openinary";

const faq = [
  {
    q: "Why discovery before implementation?",
    a: "Most AI projects fail because they start with a tool, not a problem. We begin by mapping your real workflows and bottlenecks, then identify the moments where AI genuinely changes the economics. That's how you avoid expensive demos that never reach production.",
  },
  {
    q: "Which tools do you build with?",
    a: "n8n for orchestration, Postgres for data, the WhatsApp Business API for messaging, Google APIs for infrastructure, and frontier models from OpenAI (ChatGPT) and Anthropic (Claude). Code lives in GitHub. We pick boring, reliable pieces that you can own.",
  },
  {
    q: "Do you only work with large companies?",
    a: "No. We work with founders, SMBs, and B2B teams. Engagements range from a focused 2-week discovery sprint to multi-month build-and-operate retainers.",
  },
  {
    q: "How quickly can we see results?",
    a: "A discovery sprint typically delivers a prioritized AI opportunity map within 2 weeks. First production automations or a launched website usually ship in 3-6 weeks after that.",
  },
];

const websiteWorkExamples = services.find(
  (service) => service.slug === "ai-website-design-development",
)?.pageContent?.workExamples;

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <Container className="relative py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="text-4xl font-bold leading-[1.18] tracking-tight text-foreground sm:text-5xl sm:leading-[1.14] lg:text-6xl"
              aria-label="Transforming Business with AI-based WhatsApp Automation, Website Development, SEO / AEO Services, and Voice Agents"
            >
              Transforming Business with{" "}
              <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                AI-based
              </span>
              <span className="block sm:inline">
                <span className="hidden sm:inline"> </span>
                <TypewriterServiceText />
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              In B2B, discovering <em>where</em> AI can actually fit your business is more
              critical than implementing AI just because you can. We start with that
              discovery - then design, build, and operate the right solution.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">
                  Book a discovery call <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">Explore services</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border/60 bg-surface-muted/50">
        <Container className="py-8">
          <ToolLogos />
        </Container>
      </section>

      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Discovery first. Then build what matters.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We don't show up with a hammer looking for nails. We sit with your team, map
              the real workflows, and find the moments where AI changes outcomes.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Route,
                title: "1. Discover",
                body: "Workshops and process mapping to find the highest-leverage AI opportunities - not the loudest.",
              },
              {
                icon: Network,
                title: "2. Design",
                body: "Solution architecture, data flow, guardrails, and a clear plan you can sign off on before we build.",
              },
              {
                icon: ShieldCheck,
                title: "3. Deploy & operate",
                body: "Production-grade build with n8n, Postgres, and modern LLMs. Documentation, handover, ongoing support.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)]"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface-muted/40">
        <Container>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Five services. One discovery-first mindset.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Practical AI. Owned by you. Built to last.
              </h2>
              <p className="mt-4 text-muted-foreground">
                We're not selling magic. We're engineers and consultants who pick the
                right tool for the job - sometimes that's a frontier LLM, often it's a
                well-designed n8n workflow with a Postgres table behind it.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Discovery-led - no AI-for-AI's-sake projects",
                  "Boring, reliable stack - you keep the keys",
                  "Documented handover, not vendor lock-in",
                  "Hands-on with WhatsApp API as a tech provider",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-sm text-foreground/80">{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/about">More about Vivek</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div
                className="rounded-3xl border border-border bg-surface p-8 shadow-[var(--shadow-card)]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 0%, color-mix(in oklab, var(--primary-glow) 15%, transparent), transparent 60%)",
                }}
              >
                <blockquote className="text-lg font-medium leading-relaxed text-foreground">
                  "The cheapest AI project is the one you don't build because it wasn't
                  the right problem to solve in the first place."
                </blockquote>
                <p className="mt-6 text-sm text-muted-foreground">Vivek Darak, Attendez</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {websiteWorkExamples ? (
        <Section className="bg-surface-muted/40">
          <Container>
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Websites we have built
                </h2>
                <p className="mt-4 text-muted-foreground">
                  A few live examples of business websites delivered with fast pages, clean presentation, and practical ownership in mind.
                </p>
              </div>
              <Link
                href="/services/ai-website-design-development"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View website service <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {websiteWorkExamples.map((example) => (
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

      <Section className="bg-surface-muted/40">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Questions, answered
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-soft)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-foreground">
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
                  Let's discover where AI fits your business.
                </h2>
                <p className="mt-3 max-w-xl text-primary-foreground/85">
                  A 30-minute call. No pitch. We'll talk through your workflows and
                  flag the highest-leverage AI opportunities.
                </p>
              </div>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Book a discovery call</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
