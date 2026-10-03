import Image from "next/image";
import { cn } from "@/lib/cn";
import { site } from "@/lib/content";

type LogoProps = {
  /** `cream` knocks the mark back to a single flat light for ink sections. */
  tone?: "ink" | "cream";
  /**
   * Set on the header mark, which is above the fold. Next 16 deprecates
   * `priority` in favour of these two, and everything else stays lazy.
   */
  eager?: boolean;
  className?: string;
};

export function Logo({ tone = "ink", eager = false, className }: LogoProps) {
  return (
    <Image
      src={site.logo.src}
      alt={site.logo.alt}
      width={244}
      height={48}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      className={cn(
        "h-7 w-auto sm:h-8",
        tone === "cream" && "brightness-0 invert opacity-90",
        className,
      )}
    />
  );
}
