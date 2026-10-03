import type { Metadata } from "next";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { about, site } from "@/lib/content";

const DESCRIPTION = `About ${site.brand.name}: ${about.lede}`;

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${site.brand.name}`,
    description: DESCRIPTION,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <article>
      <header className="mx-auto max-w-shell px-gutter pt-16 pb-14 md:px-gutter-wide md:pt-24 md:pb-20">
        <p className="label-micro text-copper-deep">{about.eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-display text-display">
          Built with <Accent>purpose</Accent>. Designed to last.
        </h1>
        <p className="mt-7 max-w-2xl text-lede text-ink/75">{about.lede}</p>
      </header>

      {/* Story. Two columns from lg, stacked below. */}
      <section
        aria-labelledby="about-story"
        className="mx-auto max-w-shell px-gutter pb-14 md:px-gutter-wide md:pb-20"
      >
        <SectionReveal>
          <h2 id="about-story" className="font-display text-title">
            {about.storyLabel}
          </h2>

          <div data-reveal-children className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-8">
            {about.story.map((block) => (
              <div key={block.heading}>
                <h3 className="font-display text-[1.375rem] leading-tight">
                  {block.heading}
                </h3>
                {block.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="mt-4 max-w-prose text-ink/80">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* The idea, on flat ink so it reads as the centrepiece. */}
      <section
        aria-labelledby="about-idea"
        className="on-ink bg-ink py-24 text-cream md:py-32"
      >
        <div className="mx-auto max-w-shell px-gutter md:px-gutter-wide">
          <SectionReveal>
            <span aria-hidden="true" className="mb-5 block h-px w-12 bg-copper" />
            <p className="label-micro text-copper">{about.idea.label}</p>
            <h2 id="about-idea" className="mt-5 max-w-2xl font-display text-title">
              Small parts. <Accent tone="cream">{about.idea.accent}</Accent> systems.
            </h2>

            <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-8">
              <p className="max-w-prose text-cream/80 lg:col-span-6">{about.idea.body}</p>
              <p className="max-w-prose border-l-2 border-copper pl-6 font-display text-lede leading-snug text-cream lg:col-span-6">
                {about.idea.pull}
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Values. Flat copper top rules, no cards or shadows. */}
      <section aria-labelledby="about-values" className="py-24 md:py-32">
        <div className="mx-auto max-w-shell px-gutter md:px-gutter-wide">
          <SectionReveal>
            <span aria-hidden="true" className="mb-5 block h-px w-12 bg-copper" />
            <p className="label-micro text-copper-deep">{about.valuesLabel}</p>
            <h2 id="about-values" className="mt-5 max-w-2xl font-display text-title">
              {about.valuesHeading}
            </h2>

            <ol data-reveal-children className="mt-12 grid gap-8 md:grid-cols-3 md:gap-8">
              {about.values.map((value, index) => (
                <li key={value.title} className="border-t-2 border-copper pt-6">
                  <span aria-hidden="true" className="label-micro text-copper-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-[1.375rem] leading-tight">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-ink/75">{value.body}</p>
                </li>
              ))}
            </ol>
          </SectionReveal>
        </div>
      </section>

      {/* Contact call to action, on sand so it separates from the ink footer. */}
      <section
        aria-labelledby="about-cta"
        className="bg-sand py-24 text-ink md:py-32"
      >
        <div className="mx-auto max-w-shell px-gutter md:px-gutter-wide">
          <SectionReveal>
            <h2 id="about-cta" className="font-display text-title">
              {about.cta.heading}
            </h2>
            <p className="mt-5 max-w-xl text-ink/75">{about.cta.body}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="filled">
                {about.cta.label}
              </Button>
              <Button href="/#work" variant="outline">
                {about.cta.secondaryLabel}
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </article>
  );
}
