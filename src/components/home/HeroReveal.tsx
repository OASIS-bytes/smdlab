"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useIsomorphicLayoutEffect } from "@/components/motion/useIsomorphicLayoutEffect";

/**
 * Entrance animation for the hero. Targets are opt-in via `data-reveal`, and
 * the from-state is applied by GSAP rather than CSS so that without JavaScript
 * (or with reduced motion) the content simply renders as-is.
 */
export function HeroReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const node = root.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const eyebrow = gsap.utils.toArray<HTMLElement>('[data-reveal="eyebrow"]');
      const lines = gsap.utils.toArray<HTMLElement>('[data-reveal="line"]');
      const body = gsap.utils.toArray<HTMLElement>('[data-reveal="body"]');
      const tiles = gsap.utils.toArray<HTMLElement>('[data-reveal="tile"]');

      gsap.from(eyebrow, {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(lines, {
        yPercent: 115,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.12,
      });

      gsap.from(body, {
        autoAlpha: 0,
        y: 18,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.5,
      });

      gsap.from(tiles, {
        autoAlpha: 0,
        y: 26,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.14,
        delay: 0.4,
      });
    }, node);

    return () => context.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}