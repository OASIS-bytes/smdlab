import Link from "next/link";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CopperArrow } from "@/components/ui/CopperArrow";
import { ProjectMedia } from "@/components/work/ProjectMedia";
import { getProject, toProject, work, type Project } from "@/lib/content";
import { cn } from "@/lib/cn";

export function WorkSection() {
  const { linkLabel } = work;

  // Cards are derived from the case studies themselves, so a card can never
  // link to a slug the `/work/[slug]` route does not serve.
  const featured = getProject(work.featuredSlug);
  const rest = work.slugs
    .map((slug) => getProject(slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  if (!featured) return null;

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-sand py-24 md:py-32"
    >
      <div className="mx-auto max-w-shell px-gutter md:px-gutter-wide">
        <SectionReveal>
          <SectionHeader
            eyebrow={work.eyebrow}
            heading={work.heading}
            accent={work.accent}
            headingId="work-heading"
          />

          <div className="mt-12 grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
            <ProjectCard project={toProject(featured)} linkLabel={linkLabel} featured className="lg:col-span-7" />

            <div
              data-reveal-children
              className="grid items-start gap-6 sm:grid-cols-2 lg:col-span-5 lg:content-start"
            >
              {rest.map((study) => (
                <ProjectCard
                  key={study.slug}
                  project={toProject(study)}
                  linkLabel={linkLabel}
                />
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/**
 * One surface treatment for all five tiles — the featured tile and the four
 * cards run through this same component, so the edge can never drift between
 * them. Tiles whose artwork is white or cream (the dashboard, the logo sheet)
 * need it most: `border-ink/25` is the darkest palette tone at a strength that
 * still reads clearly on the cream page instead of dissolving into it.
 *
 * `overflow-hidden` already comes from `ProjectMedia`, so the image is clipped
 * to the radius and sits inside the border rather than over it. The transition
 * lists transform, box-shadow and border-color together, because a second
 * `transition-*` class would override the first and kill the existing lift.
 */
const TILE_SURFACE =
  "rounded-xl border border-ink/25 shadow-md transition-[transform,box-shadow,border-color] duration-300 ease-out group-hover:-translate-y-1 hover:border-copper hover:shadow-lg";

/**
 * Hover lifts the tile, warms its border to copper and deepens the shadow,
 * while the copper arrow nudges across.
 *
 * The featured card is the page's largest paint, so it is the one card that
 * asks for an eager image. `ProjectMedia` only spends that on a project that
 * actually has an asset, and the rest fall through to the placeholder.
 */
function ProjectCard({
  project,
  linkLabel,
  featured = false,
  className,
}: {
  project: Project;
  linkLabel: string;
  featured?: boolean;
  className?: string;
}) {
  return (
    <article className={cn("group", className)}>
      <Link href={project.href} className="block">
        <ProjectMedia
          project={project}
          aspect={featured ? "aspect-[16/10] lg:aspect-[4/3]" : "aspect-[4/3]"}
          /* The featured card is 7 of 12 columns; the small cards are half of 5.
             Both are full width below their own breakpoint. */
          sizes={
            featured
              ? "(min-width: 1024px) 55vw, 100vw"
              : "(min-width: 1024px) 19vw, (min-width: 640px) 45vw, 90vw"
          }
          eager={featured}
          className={TILE_SURFACE}
        />

        <div className="mt-4">
          <h3
            className={cn(
              "font-display leading-snug",
              featured ? "text-lede" : "text-[1.25rem]",
            )}
          >
            {project.title}
          </h3>
          <p className="label-micro mt-2 text-ink/65">{project.category}</p>
          {featured ? (
            <p className="mt-3 max-w-md text-ink/75">{project.summary}</p>
          ) : null}

          {/* Its own line so the label can never collide with the title or
              category, however long either of them gets. */}
          <span className="mt-4 flex items-center gap-2">
            <span className="label-micro whitespace-nowrap text-copper-deep">
              {linkLabel}
            </span>
            <CopperArrow />
          </span>
        </div>
      </Link>
    </article>
  );
}
