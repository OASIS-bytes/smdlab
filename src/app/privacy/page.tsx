import type { Metadata } from "next";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { Accent } from "@/components/ui/Accent";
import { privacy, site } from "@/lib/content";

const DESCRIPTION =
  "What SMD Lab's contact form collects, how it is used, how long it is kept, and how to ask for it to be deleted.";

export const metadata: Metadata = {
  title: "Privacy",
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy — ${site.brand.name}`,
    description: DESCRIPTION,
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <article>
      <header className="mx-auto max-w-shell px-gutter pt-16 pb-14 md:px-gutter-wide md:pt-24 md:pb-20">
        <p className="label-micro text-copper-deep">{privacy.eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-display text-display">
          What this site <Accent>collects</Accent>
        </h1>
        <p className="mt-7 max-w-2xl text-lede text-ink/75">{privacy.lede}</p>
        <p className="label-micro mt-8 text-ink/65">{privacy.updated}</p>
      </header>

      <section
        aria-labelledby="privacy-notice"
        className="mx-auto max-w-shell px-gutter pb-14 md:px-gutter-wide md:pb-20"
      >
        <h2 id="privacy-notice" className="sr-only">
          Privacy notice
        </h2>

        <SectionReveal>
          {privacy.sections.map((section) => (
            <div key={section.heading} className="mt-12 max-w-prose first:mt-0">
              <h3 className="border-t-2 border-copper pt-6 font-display text-[1.375rem] leading-tight">
                {section.heading}
              </h3>
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="mt-4 text-ink/80">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          <div className="mt-12 max-w-prose">
            <h3 className="font-display text-[1.125rem] leading-tight">
              {privacy.changesNote}
            </h3>
          </div>
        </SectionReveal>
      </section>

      {/* Contact route for privacy questions, on ink so it reads as the last word. */}
      <section
        aria-labelledby="privacy-contact"
        className="on-ink bg-ink py-24 text-cream md:py-32"
      >
        <div className="mx-auto max-w-shell px-gutter md:px-gutter-wide">
          <SectionReveal>
            <span aria-hidden="true" className="mb-5 block h-px w-12 bg-copper" />
            <p className="label-micro text-copper">{site.brand.name}</p>
            <h2 id="privacy-contact" className="mt-5 max-w-2xl font-display text-title">
              {privacy.contactHeading}
            </h2>
            <p className="mt-5 max-w-xl text-cream/80">{privacy.contactBody}</p>

            <p className="mt-8">
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-block border-b border-copper pb-0.5 font-display text-lede text-copper transition-colors hover:border-cream hover:text-cream"
              >
                {site.contact.email}
              </a>
            </p>
          </SectionReveal>
        </div>
      </section>
    </article>
  );
}
