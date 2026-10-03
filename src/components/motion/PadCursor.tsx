"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/** A pad cursor only makes sense where there is a pointer to replace. */
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/**
 * A small flat copper pad that trails the pointer, echoing the copper accent
 * rule above each section label. It sits over the native cursor rather than
 * hiding it, so nothing about pointer precision or system cursor settings is
 * taken away.
 *
 * It expands over anything interactive, renders only on a fine pointer, and
 * never appears for a visitor who has asked for reduced motion.
 */
export function PadCursor() {
  const pad = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia(FINE_POINTER).matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const node = pad.current;
    if (!node) return;

    setEnabled(true);

    const xTo = gsap.quickTo(node, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.2, ease: "power3.out" });
    let placed = false;

    const onMove = (event: PointerEvent) => {
      if (!placed) {
        placed = true;
        gsap.set(node, { autoAlpha: 1 });
      }

      xTo(event.clientX);
      yTo(event.clientY);

      const target = event.target as Element | null;
      const interactive = target?.closest("a, button, select, textarea, summary");
      gsap.to(node, {
        scale: interactive ? 2.2 : 1,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onLeave = () => gsap.to(node, { autoAlpha: 0, duration: 0.2 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(node);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={pad}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] -ml-[5px] -mt-[5px] h-2.5 w-2.5 rounded-[2px] bg-copper opacity-0"
    />
  );
}
