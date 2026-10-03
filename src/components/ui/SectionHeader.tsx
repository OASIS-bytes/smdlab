import type { ReactNode } from "react";
import { Accent } from "@/components/ui/Accent";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow: string;
  /** Full heading text, e.g. "Selected work". */
  heading: string;
  /** The one word inside `heading` rendered as italic copper. */
  accent: string;
  /** Tone of the section the heading sits on. */
  tone?: "ink" | "cream" | "sand";
  lede?: string;
  /** Used to wire the section's `aria-labelledby`. */
  headingId?: string;
  className?: string;
};

const EYEBROW = {
  ink: "text-copper-deep",
  cream: "text-copper",
  sand: "text-ink/70",
} as const;

const LEDE = {
  ink: "text-ink/75",
  cream: "text-cream/75",
  sand: "text-ink/75",
} as const;

/**
 * Shared section eyebrow + Fraunces heading. Passing the accent word
 * separately means every heading carries exactly one italic copper word.
 */
export function SectionHeader({
  eyebrow,
  heading,
  accent,
  tone = "ink",
  lede,
  headingId,
  className,
}: SectionHeaderProps) {
  return (
    <div className={className}>
      {/* The one ornament on the site: a short copper rule above the label.
          Copper clears 2.9:1 on cream and 5:1 on ink, so it reads on both. */}
      <span aria-hidden="true" className="mb-5 block h-px w-12 bg-copper" />
      <p className={cn("label-micro", EYEBROW[tone])}>{eyebrow}</p>
      <h2 id={headingId} className="mt-5 max-w-2xl font-display text-title">
        <Highlight heading={heading} accent={accent} tone={tone} />
      </h2>
      {lede ? <p className={cn("mt-5 max-w-xl", LEDE[tone])}>{lede}</p> : null}
    </div>
  );
}

function Highlight({
  heading,
  accent,
  tone,
}: {
  heading: string;
  accent: string;
  tone: "ink" | "cream" | "sand";
}): ReactNode {
  const at = heading.toLowerCase().indexOf(accent.toLowerCase());
  if (at === -1) return heading;

  return (
    <>
      {heading.slice(0, at)}
      <Accent tone={tone}>{accent}</Accent>
      {heading.slice(at + accent.length)}
    </>
  );
}