import { Fragment } from "react";

import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { cn } from "@/lib/utils";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  items: FaqItem[];
  title?: string;
  align?: "left" | "center";
  animated?: boolean;
  className?: string;
};

export function FaqSection({
  items,
  title = "Frequently asked questions",
  align = "left",
  animated = false,
  className,
}: FaqSectionProps) {
  if (!items.length) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const heading = (
    <h2
      className={cn(
        "font-bold tracking-tight text-foreground",
        align === "center" ? "text-3xl sm:text-4xl" : "text-2xl",
      )}
    >
      {title}
    </h2>
  );

  return (
    <div className={className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      {animated ? (
        <RevealOnScroll className={cn(align === "center" && "text-center")}>
          {heading}
        </RevealOnScroll>
      ) : (
        <div className={cn(align === "center" && "text-center")}>{heading}</div>
      )}

      <div className="mt-6 space-y-4">
        {items.map((item, index) => {
          const faq = (
            <details className="group rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-soft)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-foreground">
                {item.question}
                <span aria-hidden="true" className="text-primary transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
            </details>
          );

          return animated ? (
            <RevealOnScroll key={item.question} delay={index * 70}>
              {faq}
            </RevealOnScroll>
          ) : (
            <Fragment key={item.question}>{faq}</Fragment>
          );
        })}
      </div>
    </div>
  );
}
