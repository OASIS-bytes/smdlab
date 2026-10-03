"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/components/motion/useIsomorphicLayoutEffect";
import type { ProcessStep } from "@/lib/content";

/**
 * Seven steps along a thin trace line with copper pads. The line draws itself
 * in as the section scrolls into view. Below `lg` the same data renders as a
 * vertical timeline; both are animated but only one is visible at a time.
 */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const node = root.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const horizontal = gsap.utils.toArray<HTMLElement>("[data-process='line-h']");
      const vertical = gsap.utils.toArray<HTMLElement>("[data-process='line-v']");
      const pads = gsap.utils.toArray<HTMLElement>("[data-process='pad']");
      const bodies = gsap.utils.toArray<HTMLElement>("[data-process='body']");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: node,
          start: "top 72%",
          once: true,
        },
      });

      timeline
        .from(horizontal, { scaleX: 0, duration: 1.5, ease: "power2.inOut" }, 0)
        .from(vertical, { scaleY: 0, duration: 1.5, ease: "power2.inOut" }, 0)
        .from(
          pads,
          { autoAlpha: 0, scale: 0.4, duration: 0.45, ease: "back.out(2)", stagger: 0.16 },
          0.15,
        )
        .from(
          bodies,
          { autoAlpha: 0, y: 12, duration: 0.5, ease: "power2.out", stagger: 0.09 },
          0.4,
        );
    }, node);

    return () => {
      context.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div ref={root} data-no-reveal className="mt-14">
      {/* Desktop: horizontal trace line with pads */}
      <div data-process="track-h" className="relative hidden lg:block">
        <div
          aria-hidden="true"
          className="absolute left-[7.14%] right-[7.14%] top-[5px] h-px bg-ink/20"
        />
        <div
          data-process="line-h"
          aria-hidden="true"
          className="absolute left-[7.14%] right-[7.14%] top-[5px] h-px origin-left bg-ink"
        />
        <ol className="relative flex justify-between">
          {steps.map((step, index) => (
            <li key={step.title} className="w-[14.2857%] text-center">
              <span
                data-process="pad"
                aria-hidden="true"
                className="mx-auto block h-[11px] w-[11px] rounded-full bg-copper"
              />
              <span data-process="body" className="label-micro mt-5 block text-ink/65">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-[1.25rem] leading-tight">
                {step.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[15ch] text-sm text-ink/75">
                {step.summary}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile and tablet: vertical timeline */}
      <div data-process="track-v" className="relative lg:hidden">
        <div
          aria-hidden="true"
          className="absolute left-[5px] top-2 bottom-2 w-px bg-ink/20"
        />
        <div
          data-process="line-v"
          aria-hidden="true"
          className="absolute left-[5px] top-2 bottom-2 w-px origin-top bg-ink"
        />
        <ol className="space-y-8">
          {steps.map((step, index) => (
            <li key={step.title} className="relative pl-8">
              <span
                data-process="pad"
                aria-hidden="true"
                className="absolute left-0 top-[5px] h-[11px] w-[11px] rounded-full bg-copper"
              />
              <div data-process="body">
                <span className="label-micro text-ink/65">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-[1.375rem] leading-tight">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-sm text-ink/75">{step.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}