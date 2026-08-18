import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Service } from "@/data/services";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex min-h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[var(--shadow-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground ring-1 ring-primary/10">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
      <div className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
