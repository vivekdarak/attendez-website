import type { Metadata } from "next";
import { Clock, Mail, MessageCircle } from "lucide-react";

import { Container, Section } from "@/components/layout/container";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact Attendez - Book a Discovery Call",
  description:
    "Tell us about your project. We'll get back within 1 business day. AI consulting, automations, voice agents, and WhatsApp AI for B2B teams.",
};

export default function ContactPage() {
  return (
    <>
      <section style={{ background: "var(--gradient-hero)" }}>
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Let's discover where AI fits.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Tell us a bit about your project. We'll reply within 1 business day.
            </p>
          </div>
        </Container>
      </section>

      <Section className="pt-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <ContactForm />

            <aside className="space-y-5">
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)]">
                <h3 className="text-base font-semibold text-foreground">What happens next</h3>
                <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">1.</span> We read your
                    message within 1 business day.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">2.</span> Quick reply
                    with 2-3 time options for a 30-min discovery call.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">3.</span> Call: we map
                    the problem and outline next steps. No pitch.
                  </li>
                </ol>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)]">
                <h3 className="text-base font-semibold text-foreground">Other ways</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 flex-none text-primary" />
                    <a href="mailto:vivek@attendez.in" className="text-foreground hover:text-primary">
                      vivek@attendez.in
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageCircle className="mt-0.5 h-4 w-4 flex-none text-primary" />
                    <span className="text-muted-foreground">
                      WhatsApp - share number on request
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 flex-none text-primary" />
                    <span className="text-muted-foreground">Mon-Fri. IST business hours</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
