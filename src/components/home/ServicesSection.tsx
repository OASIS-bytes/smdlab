import { SectionReveal } from "@/components/motion/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/lib/content";

export function ServicesSection() {
  return (
    // Flat #0B1F17. No gradient, no glow.
    <section
      id="services"
      aria-labelledby="services-heading"
      className="on-ink bg-ink py-24 text-cream md:py-32"
    >
      <div className="mx-auto max-w-shell px-gutter md:px-gutter-wide">
        <SectionReveal>
          <SectionHeader
            eyebrow={services.eyebrow}
            heading={services.heading}
            accent={services.accent}
            tone="cream"
            lede={services.lede}
            headingId="services-heading"
          />

          <div
            data-reveal-children
            className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          >
            {services.columns.map((column, index) => (
              <div key={column.title}>
                <div className="flex items-baseline gap-3 border-b border-cream/20 pb-4">
                  <span className="label-micro text-copper" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[1.375rem] leading-tight">
                    {column.title}
                  </h3>
                </div>

                <p className="mt-4 text-cream/75">{column.description}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}