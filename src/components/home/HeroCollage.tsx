import Image from "next/image";
import { cn } from "@/lib/cn";

type TileSpec = {
  /** Path under `public/`. Alphabetical order matches the 01/02/03 badges. */
  src: string;
  alt: string;
  /**
   * Rendered width per breakpoint, matching the tile's own classes. The collage
   * is 5 of 12 grid columns at `lg`, so the desktop figure is the tile's
   * percentage of that column rather than of the viewport.
   */
  sizes: string;
  /**
   * Explicit stacking order. Each frame needs its own z-index so it forms a
   * stacking context and its badge cannot paint over the frame in front of it.
   */
  stack: string;
  /** Vertical stack below `lg`, where the tiles never overlap. */
  mobile: string;
  /** Even-width fan with one consistent overlap, from `lg` up. */
  desktop: string;
};

const TILES: TileSpec[] = [
  {
    src: "/projects/project-1.png",
    alt: "Delight Kitchen, a website for a Nigerian kitchen serving freshly prepared meals",
    sizes: "(min-width: 1024px) 26vw, 90vw",
    stack: "z-10",
    mobile: "w-full",
    desktop: "lg:ml-0 lg:w-[70%]",
  },
  {
    src: "/projects/project-2.png",
    alt: "Vector Ops, an internal dispatch dashboard for a logistics team",
    sizes: "(min-width: 1024px) 26vw, 85vw",
    stack: "z-20",
    mobile: "w-full",
    desktop: "lg:-mt-[10%] lg:ml-[12%] lg:w-[70%]",
  },
  {
    src: "/projects/project-3.png",
    alt: "Ink Explainer, stickman explainer videos for a YouTube channel",
    sizes: "(min-width: 1024px) 26vw, 80vw",
    stack: "z-30",
    mobile: "w-full",
    desktop: "lg:-mt-[10%] lg:ml-[24%] lg:w-[70%]",
  },
];

/**
 * Project imagery for the hero collage, framed as browser windows.
 *
 * Every tile is the same shape: a slim chrome bar over a 16/10 screenshot well,
 * so the three read as one system rather than three separate pictures. The bar
 * is what identifies a tile once the one in front covers the rest of it, which
 * is why the overlap is measured from the tile's own top and never grows.
 *
 * Below `lg` the tiles simply stack in one column, so a 360px viewport gets no
 * overlap and no overflow. From `lg` up they share one width and step right by
 * a fixed fraction, overlapping by `lg:-mt-[10%]` — a percentage of the
 * collage's width, so the overlap scales with the tiles instead of drifting out
 * of proportion as the shell grows. Each frame keeps ~75% of itself visible,
 * which always includes the bar and the top of the page inside it.
 */
export function HeroCollage() {
  return (
    <div className="flex flex-col gap-6 px-4 md:px-0 lg:gap-0">
      {TILES.map((tile, index) => (
        <div
          key={tile.src}
          data-reveal="tile"
          className={cn(
            "relative flex flex-col overflow-hidden",
            "aspect-[16/10] rounded-xl",
            "border border-ink/10 bg-sand shadow-lg shadow-ink/15",
            "mx-auto w-full max-w-full",
            tile.stack,
            tile.mobile,
            "md:mx-0",
            tile.desktop,
          )}
        >
          {/* Chrome bar. Decorative, so it stays out of the accessibility
              tree — the alt text on the screenshot already carries the
              meaning. */}
          <div
            aria-hidden="true"
            className="flex shrink-0 items-center gap-1.5 border-b border-ink/10 bg-cream px-3 py-2"
          >
            <span className="size-1.5 rounded-full bg-ink/20" />
            <span className="size-1.5 rounded-full bg-ink/20" />
            <span className="size-1.5 rounded-full bg-ink/20" />
          </div>

          <div className="relative min-h-0 flex-1">
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes={tile.sizes}
              className="object-cover object-top"
              loading="eager"
              fetchPriority="high"
            />
            <span
              className={cn(
                "label-micro absolute right-2.5 top-2.5 z-10 rounded-full bg-cream px-2 py-1",
                "text-ink shadow-sm ring-1 ring-ink/10",
                "md:px-2 md:py-1 md:text-xs",
                "px-1.5 py-0.5 text-[10px]",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
