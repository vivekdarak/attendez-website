"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type TransitionPhase = "idle" | "enter" | "cover" | "exit";

export function PageTransition() {
  const pathname = usePathname();
  const hasMounted = useRef(false);
  const cleanupTimeout = useRef(0);
  const revealTimeout = useRef(0);
  const frameId = useRef(0);
  const [phase, setPhase] = useState<TransitionPhase>("idle");

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      return;
    }

    window.clearTimeout(cleanupTimeout.current);
    window.clearTimeout(revealTimeout.current);

    setPhase((currentPhase) => (currentPhase === "idle" ? "cover" : currentPhase));

    revealTimeout.current = window.setTimeout(() => {
      setPhase("exit");
    }, 160);

    cleanupTimeout.current = window.setTimeout(() => {
      setPhase("idle");
    }, 760);

    return () => {
      window.clearTimeout(cleanupTimeout.current);
      window.clearTimeout(revealTimeout.current);
    };
  }, [pathname]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = (event.target as Element | null)?.closest("a[href]");

      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }

      const url = new URL(link.href);
      const currentUrl = new URL(window.location.href);

      if (
        url.origin !== currentUrl.origin ||
        link.target && link.target !== "_self" ||
        link.hasAttribute("download") ||
        url.pathname + url.search === currentUrl.pathname + currentUrl.search
      ) {
        return;
      }

      window.clearTimeout(cleanupTimeout.current);
      window.clearTimeout(revealTimeout.current);
      window.cancelAnimationFrame(frameId.current);

      setPhase("enter");

      frameId.current = window.requestAnimationFrame(() => {
        setPhase("cover");
      });

      cleanupTimeout.current = window.setTimeout(() => {
        setPhase("idle");
      }, 1400);
    };

    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      window.clearTimeout(cleanupTimeout.current);
      window.clearTimeout(revealTimeout.current);
      window.cancelAnimationFrame(frameId.current);
    };
  }, []);

  if (phase === "idle") {
    return null;
  }

  const translateClass =
    phase === "enter"
      ? "-translate-x-full"
      : phase === "exit"
        ? "translate-x-full"
        : "translate-x-0";

  return (
    <div
      aria-hidden="true"
      className={
        "pointer-events-none fixed inset-y-0 left-0 z-[100] w-[calc(100vw+42vh)] rounded-r-[50vh] bg-[image:var(--gradient-primary)] transition-transform duration-[560ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform " +
        translateClass
      }
    />
  );
}
