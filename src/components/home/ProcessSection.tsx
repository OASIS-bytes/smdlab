import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { process } from "@/lib/content";

export function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="py-24 md:py-32"
    >
      <div className="mx-auto max-w-shell px-gutter md:px-gutter-wide">
        <SectionReveal>
          <SectionHeader
            eyebrow={process.eyebrow}
            heading={process.heading}
            accent={process.accent}
            lede={process.lede}
            headingId="process-heading"
          />

          <ProcessTimeline steps={process.steps} />
        </SectionReveal>
      </div>
    </section>
  );
}