"use client";

import { useCallback, type MouseEvent } from "react";
import { useLenis } from "@/components/motion/SmoothScrollProvider";

/**
 * Turns `#hash` links into smooth scrolls through Lenis. Falls back to an
 * instant scroll when Lenis is not running (for example under reduced motion),
 * so nothing depends on smooth behavior to reach the target.
 */
export function useAnchorScroll() {
  const lenis = useLenis();

  return useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      event.preventDefault();

      const header = document.querySelector("header");
      const offset = header ? -Math.ceil(header.getBoundingClientRect().height) - 8 : -8;
      const instance = lenis.current;

      // Sections carry no `scroll-mt`, so the header height above is the only
      // offset and Lenis must not also read a scroll margin.
      const top =
        target.getBoundingClientRect().top + window.scrollY + offset;

      // While Lenis is stopped (the mobile menu stops it) a `scrollTo` animation
      // would be cancelled by the `reset()` that closing the menu triggers. A
      // native jump lands straight away and `start()` syncs to it.
      if (instance && !instance.isStopped) {
        instance.scrollTo(top, { immediate: false });
      } else {
        window.scrollTo({ top, behavior: "auto" });
      }
    },
    [lenis],
  );
}
