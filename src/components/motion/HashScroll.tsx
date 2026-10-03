"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/components/motion/SmoothScrollProvider";

/**
 * Inner pages link back to Home sections as `/#section`. The browser resolves
 * that hash when `/` mounts, but Lenis is already driving the scroll position
 * and would snap back to the stale value, so the jump is done explicitly here.
 *
 * Runs on every route change and is a no-op when there is no hash.
 */
export function HashScroll() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.length < 2) return;

    // A hand-edited or malformed hash would make `querySelector` throw, and this
    // runs on every route, so a bad hash is ignored rather than fatal.
    let target: HTMLElement | null = null;
    try {
      target = document.querySelector<HTMLElement>(hash);
    } catch {
      return;
    }
    if (!target) return;

    const header = document.querySelector("header");
    const offset = header ? -Math.ceil(header.getBoundingClientRect().height) - 8 : -8;
    const top = target.getBoundingClientRect().top + window.scrollY + offset;

    // Wait a frame so the smooth-scroll provider has mounted and either path
    // (Lenis or plain scrolling) is available.
    const frame = requestAnimationFrame(() => {
      const instance = lenis.current;
      if (instance) instance.scrollTo(top, { immediate: true });
      else window.scrollTo({ top, behavior: "auto" });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, lenis]);

  return null;
}
