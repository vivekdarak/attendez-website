"use client";

import { useEffect, useState } from "react";

const services = [
  "WhatsApp Automation",
  "Website Development",
  "SEO / AEO Services",
  "Business Automation",
  "Voice Agents",
];

export function TypewriterServiceText() {
  const [serviceIndex, setServiceIndex] = useState(0);
  const [displayText, setDisplayText] = useState(services[0]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      return;
    }

    const currentService = services[serviceIndex];
    const nextIndex = (serviceIndex + 1) % services.length;
    const nextService = services[nextIndex];
    const pauseBeforeDeleting = 1600;
    const deleteSpeed = 34;
    const typeSpeed = 52;
    let timeoutId = 0;

    const deleteText = (length: number) => {
      if (length <= 0) {
        typeText(1);
        return;
      }

      timeoutId = window.setTimeout(() => {
        setDisplayText(currentService.slice(0, length - 1));
        deleteText(length - 1);
      }, deleteSpeed);
    };

    const typeText = (length: number) => {
      timeoutId = window.setTimeout(() => {
        setDisplayText(nextService.slice(0, length));

        if (length < nextService.length) {
          typeText(length + 1);
          return;
        }

        setServiceIndex(nextIndex);
      }, typeSpeed);
    };

    timeoutId = window.setTimeout(() => deleteText(currentService.length), pauseBeforeDeleting);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [serviceIndex]);

  return (
    <span
      aria-hidden="true"
      className="inline-block min-w-[min(19ch,100%)] whitespace-nowrap pb-1 text-[clamp(1.75rem,7.7vw,2.25rem)] leading-[1.18] bg-[image:var(--gradient-primary)] bg-clip-text text-transparent sm:text-inherit sm:leading-[1.14]"
    >
      {displayText || <span className="invisible">A</span>}
    </span>
  );
}
