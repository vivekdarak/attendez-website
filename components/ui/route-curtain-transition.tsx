"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

type TransitionPhase = "idle" | "enter" | "cover" | "exit";

type RouteCurtainTransitionProps = {
  className?: string;
  closeDelay?: number;
  revealDelay?: number;
  duration?: number;
  fallbackDelay?: number;
};

export function RouteCurtainTransition({
  className,
  closeDelay = 480,
  revealDelay = 120,
  duration = 560,
  fallbackDelay = 1600,
}: RouteCurtainTransitionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const hasMounted = useRef(false);
  const closeTimeout = useRef(0);
  const revealTimeout = useRef(0);
  const cleanupTimeout = useRef(0);
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

    window.clearTimeout(revealTimeout.current);
    window.clearTimeout(cleanupTimeout.current);

    setPhase((currentPhase) => (currentPhase === "idle" ? "cover" : currentPhase));

    revealTimeout.current = window.setTimeout(() => {
      setPhase("exit");
    }, revealDelay);

    cleanupTimeout.current = window.setTimeout(() => {
      setPhase("idle");
    }, revealDelay + duration + 80);
  }, [duration, pathname, revealDelay]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      return;
    }

    const resetTimers = () => {
      window.clearTimeout(closeTimeout.current);
      window.clearTimeout(revealTimeout.current);
      window.clearTimeout(cleanupTimeout.current);
      window.cancelAnimationFrame(frameId.current);
    };

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
      const isModifiedTarget = link.target && link.target !== "_self";
      const isSamePage = url.pathname + url.search === currentUrl.pathname + currentUrl.search;

      if (
        url.origin !== currentUrl.origin ||
        isModifiedTarget ||
        link.hasAttribute("download") ||
        link.dataset.routeTransition === "off" ||
        isSamePage
      ) {
        return;
      }

      event.preventDefault();
      resetTimers();

      setPhase("enter");

      frameId.current = window.requestAnimationFrame(() => {
        setPhase("cover");
      });

      closeTimeout.current = window.setTimeout(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`);
      }, closeDelay);

      cleanupTimeout.current = window.setTimeout(() => {
        setPhase("idle");
      }, fallbackDelay);
    };

    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      resetTimers();
    };
  }, [closeDelay, fallbackDelay, router]);

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
      className={cn(
        "fixed inset-y-0 left-0 z-[100] w-[calc(100vw+42vh)] rounded-r-[50vh] transition-transform ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform",
        translateClass,
        className,
      )}
      style={{ transitionDuration: `${duration}ms` }}
    />
  );
}
