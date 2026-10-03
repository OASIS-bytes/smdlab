import type { ReactNode } from "react";
import { HeroCollage } from "@/components/home/HeroCollage";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="pb-14 md:pb-20">
      <div className="mx-auto max-w-shell px-gutter md:px-gutter-wide">
        <div className="grid gap-14 pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-24">
          <div className="lg:col-span-7 lg:pr-10">
            <p data-reveal="eyebrow" className="label-micro text-copper-deep">
              Creative Technology Studio
            </p>

            <h1 className="mt-6 font-display text-display">
              <HeadlineLine>Digital products.</HeadlineLine>
              <HeadlineLine>Visual stories.</HeadlineLine>
              <HeadlineLine>
                <Accent>Serious craft.</Accent>
              </HeadlineLine>
            </h1>

            <p data-reveal="body" className="mt-8 max-w-xl text-lede text-ink/75">
              We design and build websites, software, video, and visual identities for
              ambitious businesses.
            </p>

            <div data-reveal="body" className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="#work" variant="filled">
                View Our Work
              </Button>
              <Button href="#contact" variant="outline">
                Start a Project
              </Button>
            </div>

            <div data-reveal="body" className="mt-16 flex items-center gap-4">
              <span className="label-micro text-ink/80">Scroll</span>
              <span aria-hidden="true" className="h-px w-20 bg-ink/25" />
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <HeroCollage />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * A headline line clipped by an overflow box so GSAP can slide it up from
 * behind. The padding/negative-margin pair keeps descenders and italic tails
 * visible without loosening the display leading.
 */
function HeadlineLine({ children }: { children: ReactNode }) {
  return (
    <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
      <span data-reveal="line" className="block will-change-transform">
        {children}
      </span>
    </span>
  );
}