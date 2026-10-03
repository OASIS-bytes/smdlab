import { cn } from "@/lib/cn";

type CopperArrowProps = {
  className?: string;
};

/** Flat single-colour arrow. Nudges right when its parent group is hovered. */
export function CopperArrow({ className }: CopperArrowProps) {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="12"
      viewBox="0 0 16 12"
      className={cn(
        "shrink-0 text-copper transition-transform duration-200 group-hover:translate-x-1",
        className,
      )}
    >
      <path
        d="M0 6h13M9 2l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}