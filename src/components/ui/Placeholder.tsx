import { cn } from "@/lib/cn";
import type { Fill } from "@/lib/content";

type PlaceholderProps = {
  /** Omitted once a real asset lands, which leaves a plain brand-fill tile. */
  label?: string;
  fill: Fill;
  className?: string;
  /** Fixed aspect box, passed through so the parent controls sizing. */
  aspect?: string;
};

const FILL = {
  sand: "bg-sand text-ink",
  moss: "bg-moss text-cream",
  ink: "bg-ink text-cream",
} as const;

/**
 * Flat brand fill standing in for imagery that has not landed yet. No gradient.
 *
 * `justify-end` keeps the caption against the bottom edge now that the tile
 * carries one label instead of two, which is where it sat before.
 */
export function Placeholder({ label, fill, className, aspect }: PlaceholderProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-end overflow-hidden",
        aspect,
        FILL[fill],
        className,
      )}
    >
      {label ? <span className="text-sm leading-snug">{label}</span> : null}
    </div>
  );
}