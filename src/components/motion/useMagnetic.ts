"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** Only a device with a genuinely hovering cursor gets the effect. */
const HOVERING = "(hover: hover) and (pointer: fine)";

/** Cap the travel so the pull reads as weight, never as a chase. */
const PULL_X = 7;
const PULL_Y = 4;

/**
 * Draws the element a few pixels toward the pointer while it is hovered and
 * releases it on leave. `quickTo` keeps the movement on GSAP's ticker, so a
 * moving pointer never triggers a React render, and the listener is bound
 * natively so the component's own output stays free of handlers.
 *
 * Touch, reduced motion and any device without a fine pointer get no movement
 * at all, and the transform is cleared on unmount.
 */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia(HOVERING).matches) return;

    const xTo = gsap.quickTo(node, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const box = node.getBoundingClientRect();
      // The pointer is always inside the box here, so both ratios stay in -1..1.
      const across = (event.clientX - (box.left + box.width / 2)) / (box.width / 2);
      const down = (event.clientY - (box.top + box.height / 2)) / (box.height / 2);
      xTo(gsap.utils.clamp(-1, 1, across) * PULL_X);
      yTo(gsap.utils.clamp(-1, 1, down) * PULL_Y);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);

    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(node);
      gsap.set(node, { clearProps: "transform" });
    };
  }, []);

  return ref;
}
