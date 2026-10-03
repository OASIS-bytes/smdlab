import { SectionReveal } from "@/components/motion/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials } from "@/lib/content";

/**
 * Three clearly-marked placeholder quotes on cream. Everything is flat: a
 * copper top rule and text, no cards with shadows or gradients.
 */
export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-24 md:py-32"
    >
      <div className="mx-auto max-w-shell px-gutter md:px-gutter-wide">
        <SectionReveal>
          <SectionHeader
            eyebrow={testimonials.eyebrow}
            heading={testimonials.heading}
            accent={testimonials.accent}
            lede={testimonials.lede}
            headingId="testimonials-heading"
          />

          {testimonials.notice ? (
            <p className="mt-6 text-sm text-ink/75">{testimonials.notice}</p>
          ) : null}

          <ul data-reveal-children className="mt-12 grid gap-8 md:grid-cols-3 md:gap-8">
            {testimonials.items.map((item, index) => (
              <li key={index}>
                <figure className="flex h-full flex-col border-t-2 border-copper pt-6">
                  <p className="label-micro text-copper-deep">{testimonials.badge}</p>
                  <blockquote className="mt-4 font-display text-lede leading-snug">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="font-display text-[1.125rem]">{item.name}</p>
                    <p className="mt-1 text-sm text-ink/65">
                      {item.role} · {item.company}
                    </p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}
