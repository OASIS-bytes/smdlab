import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type AccentProps = {
  children: ReactNode;
  /** Match to the enclosing section: `ink`, `cream`, or the sand sections. */
  tone?: "ink" | "cream" | "sand";
  className?: string;
};

const TONE = {
  ink: "text-copper-deep",
  cream: "text-copper",
  sand: "text-copper-deep",
} as const;

/**
 * The single italic copper word that every Fraunces headline carries.
 */
export function Accent({ children, tone = "ink", className }: AccentProps) {
  return (
    <em className={cn("font-display italic font-normal", TONE[tone], className)}>
      {children}
    </em>
  );
}