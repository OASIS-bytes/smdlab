"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/components/motion/useIsomorphicLayoutEffect";

/**
 * Subtle scroll reveal for the blocks inside one section: each direct child
 * eases up and fades in once, just as the section reaches the viewport.
 *
 * The from-state is applied by GSAP rather than in CSS, so with JavaScript
 * disabled, or under `prefers-reduced-motion`, the section simply renders as
 * finished. Mark a child with `data-reveal-children` to stagger its own
 * children instead, which is what card and list grids use.
 */
export function SectionReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const node = root.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const blocks = Array.from(node.children) as HTMLElement[];
      if (!blocks.length) return;

      const timeline = gsap.timeline({
        scrollTrigger: { trigger: node, start: "top 82%", once: true },
      });

      blocks.forEach((block, index) => {
        // A block that drives its own animation opts out, so two timelines
        // never animate the same subtree.
        if (block.hasAttribute("data-no-reveal")) return;

        const at = index * 0.06;

        const staggered = block.hasAttribute("data-reveal-children")
          ? (Array.from(block.children) as HTMLElement[])
          : [];

        if (staggered.length) {
          timeline.from(
            staggered,
            {
              autoAlpha: 0,
              y: 18,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.07,
            },
            at,
          );
          return;
        }

        timeline.from(
          block,
          { autoAlpha: 0, y: 20, duration: 0.65, ease: "power2.out" },
          at,
        );
      });
    }, node);

    return () => context.revert();
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
