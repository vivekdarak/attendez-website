import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/layout/container";
import { ServiceCard } from "@/components/sections/service-card";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services - AI Consulting, Automation & Websites",
  description:
    "Five focused services from Attendez: AI websites, SEO/AEO/GEO, B2B workflow automation with n8n, AI voice agents, and WhatsApp AI as a tech provider.",
};

export default function ServicesPage() {
  return (
    <>
      <section style={{ background: "var(--gradient-hero)" }}>
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              AI services for B2B teams that ship.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Discovery-first engagements that turn into production-grade websites,
              automations, and agents. Pick a starting point - or let's talk.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">
                  Start with a discovery call <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
