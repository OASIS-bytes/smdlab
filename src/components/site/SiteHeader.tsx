import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SiteNav } from "@/components/site/SiteNav";
import { site } from "@/lib/content";

export function SiteHeader() {
  return (
    // `bg-cream` is fully opaque, so the nav keeps its ink-on-cream contrast
    // even when a dark section scrolls underneath it. The bottom edge is a
    // single hairline: `border-sand` on cream was only 1.18:1, so it read as
    // no edge at all. `ink/15` is the same weight of line you can actually see.
    <header className="sticky top-0 z-40 border-b border-ink/15 bg-cream">
      <div className="mx-auto max-w-shell px-gutter md:px-gutter-wide">
        <div className="flex items-center justify-between gap-4 py-4 md:gap-6 md:py-6">
          <Link href="/" aria-label={`${site.brand.name} — home`} className="min-w-0 shrink-0">
            <Logo eager />
          </Link>

          <div className="flex min-w-0 shrink-0 items-center gap-7 md:gap-9">
            <SiteNav />
          </div>
        </div>
      </div>
    </header>
  );
}