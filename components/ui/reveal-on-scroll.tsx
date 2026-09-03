"use client";

import { type HTMLAttributes, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type RevealOnScrollProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
};

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  style,
  ...props
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setIsVisible(true);
      return;
    }

    setIsReady(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.unobserve(entry.target);
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out will-change-transform",
        isReady && !isVisible ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100",
        className,
      )}
      style={{
        ...style,
        transitionDelay: isReady ? `${delay}ms` : undefined,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
