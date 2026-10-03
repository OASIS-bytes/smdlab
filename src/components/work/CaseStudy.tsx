import Link from "next/link";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { CopperArrow } from "@/components/ui/CopperArrow";
import { Placeholder } from "@/components/ui/Placeholder";
import { ProjectMedia } from "@/components/work/ProjectMedia";
import { projects } from "@/lib/content";
import { cn } from "@/lib/cn";

type CaseStudyProps = {
  slug: string;
};

/**
 * Full case study. Every band is a flat brand fill, and each media slot shows a
 * real asset when the content folder defines one and a labelled placeholder
 * when it does not, so the page reads as finished artwork rather than as broken
 * embeds.
 */
export function CaseStudy({ slug }: CaseStudyProps) {
  const study = projects.projects.find((project) => project.slug === slug);
  if (!study) return null;

  const { labels } = projects;
  const index = projects.projects.findIndex((project) => project.slug === slug);
  const last = index === projects.projects.length - 1;
  const next = projects.projects[(index + 1) % projects.projects.length];

  return (
    <article>
      {/* Back link sits above the title so it is the first thing reached when
          tabbing into the page. */}
      <div className="mx-auto max-w-shell px-gutter pt-10 md:px-gutter-wide md:pt-14">
        <Link
          href="/#work"
          className="label-micro inline-flex items-center gap-2 text-copper-deep transition-colors hover:text-ink"
        >
          <BackArrow />
          {labels.backToWork}
        </Link>
      </div>

      <header className="mx-auto max-w-shell px-gutter pt-12 pb-14 md:px-gutter-wide md:pt-16 md:pb-20">
        <p className="label-micro text-copper-deep">{study.category}</p>
        <h1 className="mt-5 max-w-3xl font-display text-display">{study.title}</h1>
        <p className="mt-7 max-w-2xl text-lede text-ink/75">{study.summary}</p>
      </header>

      <div className="mx-auto max-w-shell px-gutter md:px-gutter-wide">
        {/* Same media slot as the work card, so the two can never disagree
            about which asset represents this project. */}
        <ProjectMedia
          project={study}
          aspect="aspect-[16/9]"
          /* Full shell width, which the container caps at 100rem. */
          sizes="(min-width: 1600px) 1600px, 100vw"
        />
      </div>

      {/* Overview + the two metadata columns. Stacks on 360, pairs at md. */}
      <section
        aria-labelledby="case-overview"
        className="mx-auto max-w-shell px-gutter py-14 md:px-gutter-wide md:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <SectionReveal className="lg:col-span-7">
            <h2
              id="case-overview"
              className="font-display text-title"
            >
              {labels.overview}
            </h2>
            <div className="mt-6 max-w-prose space-y-4 text-ink/80">
              {study.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </SectionReveal>

          <div className="space-y-10 lg:col-span-5">
            <Meta label={labels.role}>{study.role}</Meta>

            <div>
              <h3 className="label-micro border-b border-ink/20 pb-3 text-copper-deep">
                {labels.services}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {study.services.map((service) => (
                  <li
                    key={service}
                    className="border border-ink/25 px-3 py-1.5 text-sm text-ink/80"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery. One column at 360, two from md, with wide items spanning. */}
      <section
        aria-labelledby="case-gallery"
        className="bg-sand py-14 text-ink md:py-20"
      >
        <div className="mx-auto max-w-shell px-gutter md:px-gutter-wide">
          <SectionReveal>
            <h2 id="case-gallery" className="font-display text-title">
              {labels.gallery}
            </h2>

            <div data-reveal-children className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
              {study.gallery.map((image) => (
                <Placeholder
                  key={image.label}
                  label={image.label}
                  /* The gallery band is already sand, so a sand fill would be
                     invisible: it steps up to ink to keep the rhythm. */
                  fill={image.fill === "sand" ? "ink" : image.fill}
                  aspect={image.wide ? "aspect-[16/10]" : "aspect-[4/3]"}
                  className={cn(image.wide && "md:col-span-2")}
                />
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Results. Flat ink band so the numbers land with weight. */}
      <section
        aria-labelledby="case-results"
        className="on-ink bg-ink py-14 text-cream md:py-20"
      >
        <div className="mx-auto max-w-shell px-gutter md:px-gutter-wide">
          <SectionReveal>
            <h2 id="case-results" className="font-display text-title">
              {labels.results}
            </h2>
            <p className="mt-4 max-w-xl text-cream/70">{labels.resultsNote}</p>

            <dl className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
              {study.results.map((result) => (
                <div key={result.label} className="border-t-2 border-copper pt-5">
                  <dt className="sr-only">{result.label}</dt>
                  <dd>
                    <span className="block font-display text-title text-copper">
                      {result.value}
                    </span>
                    <span className="mt-2 block text-cream/75">{result.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </SectionReveal>
        </div>
      </section>

      <NextProject
        title={next.title}
        category={next.category}
        href={`/work/${next.slug}`}
        label={labels.nextProject}
        wraps={last}
      />
    </article>
  );
}

function Meta({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <h3 className="label-micro border-b border-ink/20 pb-3 text-copper-deep">
        {label}
      </h3>
      <p className="mt-4 text-ink/80">{children}</p>
    </div>
  );
}

function NextProject({
  title,
  category,
  href,
  label,
  wraps,
}: {
  title: string;
  category: string;
  href: string;
  label: string;
  wraps: boolean;
}) {
  return (
    <section aria-labelledby="next-project" className="py-14 md:py-20">
      <div className="mx-auto max-w-shell px-gutter md:px-gutter-wide">
        <SectionReveal>
          <Link href={href} className="group block">
            <p className="label-micro text-copper-deep">{label}</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
              <div>
                <h2
                  id="next-project"
                  className="font-display text-title transition-colors group-hover:text-copper-deep"
                >
                  {title}
                </h2>
                <p className="label-micro mt-3 text-ink/65">{category}</p>
              </div>
              <span className="flex items-center gap-2 text-copper-deep">
                <span className="label-micro whitespace-nowrap">
                  {wraps ? "Back to the start" : "View project"}
                </span>
                <CopperArrow />
              </span>
            </div>
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}

/** Mirrors CopperArrow so the back link reads as returning, not advancing. */
function BackArrow() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="12"
      viewBox="0 0 16 12"
      className="shrink-0 text-copper-deep"
    >
      <path
        d="M16 6H3M7 2L3 6l4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
