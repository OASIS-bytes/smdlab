import { useEffect, useLayoutEffect } from "react";

/**
 * `useLayoutEffect` warns during server rendering, but GSAP reveal animations
 * must run before paint or the elements visibly flash at their start state.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;