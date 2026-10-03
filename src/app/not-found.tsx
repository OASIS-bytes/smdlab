import Link from "next/link";
import { SectionReveal } from "@/components/motion/SectionReveal";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-shell px-gutter py-24 md:px-gutter-wide md:py-32">
      <SectionReveal>
        <p className="label-micro text-copper-deep">Error 404</p>
        <h1 className="mt-5 max-w-2xl font-display text-display">
          That page is not here
        </h1>
        <p className="mt-7 max-w-xl text-lede text-ink/75">
          The link may be old, or the project may have been renamed. Everything
          current is one click away.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/#work"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-copper px-6 text-base font-medium text-ink transition-colors hover:bg-copper-deep hover:text-cream"
          >
            See the work
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink px-6 text-base font-medium text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Back to home
          </Link>
        </div>
      </SectionReveal>
    </section>
  );
}
