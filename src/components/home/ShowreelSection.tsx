import { existsSync } from "node:fs";
import path from "node:path";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ShowreelPlayer } from "@/components/home/ShowreelPlayer";
import { showreel } from "@/lib/content";

export function ShowreelSection() {
  const hasVideo = existsSync(
    path.join(process.cwd(), "public", "video", "showreel.mp4"),
  );

  return (
    // Flat #0B1F17. No gradient, no glow.
    <section
      id="showreel"
      aria-labelledby="showreel-heading"
      className="on-ink bg-ink py-24 text-cream md:py-32"
    >
      <div className="mx-auto max-w-shell px-gutter md:px-gutter-wide">
        <SectionReveal>
          <SectionHeader
            eyebrow={showreel.eyebrow}
            heading={showreel.heading}
            accent={showreel.accent}
            tone="cream"
            lede={showreel.lede}
            headingId="showreel-heading"
          />

          <div className="mt-12">
            <ShowreelPlayer
              hasVideo={hasVideo}
              src={showreel.videoSrc}
              poster={showreel.videoPoster}
              label={showreel.placeholderLabel}
              note={showreel.placeholderNote}
              help={showreel.placeholderHelp}
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
