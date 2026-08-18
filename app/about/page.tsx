import type { Metadata } from "next";
import Link from "next/link";

import { Container, Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Vivek Darak - Founder of Attendez",
  description:
    "Vivek Darak founded Attendez to bring discovery-first AI consulting to B2B teams. Builder of automations, voice agents, and WhatsApp AI on n8n, Postgres, and modern LLMs.",
};

export default function AboutPage() {
  return (
    <>
      <section style={{ background: "var(--gradient-hero)" }}>
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Hi, I'm Vivek Darak.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              I started <span className="font-semibold text-foreground">Attendez</span>{" "}
              because too many AI projects start with a tool and end with a demo. I help
              B2B teams do it the other way around - start with the problem, find the
              real AI fit, then build something that actually ships.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div>
                <h2 className="text-2xl font-bold text-foreground">My approach</h2>
                <p className="mt-3 text-muted-foreground">
                  In B2B, the hardest part isn't building with AI - it's{" "}
                  <em>knowing where to build with it</em>. I spend the first part of
                  every engagement understanding your workflows, your team, and your
                  data. That's the only way to avoid expensive AI projects that never
                  reach production.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground">What I build</h2>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  <li>AI-powered websites with SSR for SEO/AEO/GEO</li>
                  <li>n8n workflow automations for sales, ops, and support</li>
                  <li>AI voice agents for inbound and outbound calls</li>
                  <li>WhatsApp AI experiences on the official Business API</li>
                  <li>SEO, AEO, and GEO strategies for AI-native search</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground">How I work</h2>
                <p className="mt-3 text-muted-foreground">
                  Short discovery sprints. Clear scope. Production-grade builds. You
                  keep the code, the data, and the operational knowledge. No black
                  boxes, no vendor lock-in.
                </p>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)]">
                <h3 className="text-base font-semibold text-foreground">
                  Stack
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
                  <li>n8n</li>
                  <li>WhatsApp Business API</li>
                  <li>Postgres</li>
                  <li>ChatGPT (OpenAI)</li>
                  <li>Claude (Anthropic)</li>
                  <li>GitHub</li>
                  <li>Google Cloud APIs</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-[image:var(--gradient-primary)] p-6 text-primary-foreground">
                <h3 className="text-base font-semibold">Let's talk</h3>
                <p className="mt-2 text-sm text-primary-foreground/85">
                  30 minutes, no pitch. We'll map an AI opportunity together.
                </p>
                <Button asChild variant="secondary" className="mt-4 w-full">
                  <Link href="/contact">Book a call</Link>
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
