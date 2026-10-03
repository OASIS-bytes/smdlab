"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { useAnchorScroll } from "@/components/motion/useAnchorScroll";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href: string;
  children: ReactNode;
  /** `filled` is the copper primary; `outline` is the ink secondary. */
  variant?: "filled" | "outline";
  className?: string;
  /**
   * Lets a parent run its own handler alongside the scroll (the mobile menu
   * also closes itself). Ignored when it is not supplied.
   */
  onAnchorClick?: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.9375rem] leading-none font-medium transition-colors duration-150";

const VARIANT = {
  filled: "bg-copper text-ink hover:bg-copper-deep hover:text-cream",
  outline: "border border-ink text-ink hover:bg-ink hover:text-cream",
} as const;

export function Button({
  href,
  children,
  variant = "filled",
  className,
  onAnchorClick,
}: ButtonProps) {
  const fallback = useAnchorScroll();
  const handle = onAnchorClick ?? fallback;
  const classes = cn(BASE, VARIANT[variant], className);
  const magnetic = useMagnetic<HTMLAnchorElement>();

  if (href.startsWith("/")) {
    return (
      <Link href={href} ref={magnetic} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      ref={magnetic}
      onClick={href.startsWith("#") ? (event) => handle(event, href) : undefined}
      className={classes}
    >
      {children}
    </a>
  );
}
