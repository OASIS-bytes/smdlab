import Image from "next/image";
import { Placeholder } from "@/components/ui/Placeholder";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/cn";

type ProjectMediaProps = {
  /**
   * Only the three fields a media slot reads, so both a card and a full case
   * study can pass their own project straight through.
   */
  project: Pick<Project, "image" | "placeholder" | "fill">;
  /** Fixed aspect box, passed through to whichever branch renders. */
  aspect: string;
  /** Rendered width per breakpoint, so Next.js serves a source that fits. */
  sizes: string;
  /**
   * Set only on the one image that is a page's largest paint. Everything else
   * stays lazy, which is the default and needs no prop.
   */
  eager?: boolean;
  className?: string;
};

/**
 * A project's media slot: the real asset once one is defined in the content
 * folder, otherwise the labelled placeholder. Both branches take the same
 * `aspect` and `className`, so swapping an asset in never moves the layout.
 *
 * Screenshots are cropped from the top rather than the centre, because the top
 * of a page is the part that identifies it — a header and a first screen beat
 * a crop that lands halfway down a scroll.
 */
export function ProjectMedia({
  project,
  aspect,
  sizes,
  eager = false,
  className,
}: ProjectMediaProps) {
  if (!project.image) {
    return (
      <Placeholder
        label={project.placeholder}
        fill={project.fill}
        aspect={aspect}
        className={className}
      />
    );
  }

  return (
    <div className={cn("relative overflow-hidden", aspect, className)}>
      <Image
        src={project.image.src}
        alt={project.image.alt}
        fill
        sizes={sizes}
        className="object-cover object-top"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
      />
    </div>
  );
}