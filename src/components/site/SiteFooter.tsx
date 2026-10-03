import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Accent } from "@/components/ui/Accent";
import { footer, joinWithAnd, site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="on-ink bg-ink text-cream">
      <div className="mx-auto max-w-shell px-gutter md:px-gutter-wide">
        <div className="grid gap-12 py-16 md:grid-cols-12 md:gap-8 md:py-24">
          <div className="md:col-span-6">
            <p className="font-display text-title">
              Small parts. <Accent tone="cream">Big</Accent> systems.
            </p>
            <p className="mt-5 max-w-sm text-cream/75">
              A creative technology studio working across {joinWithAnd(site.disciplines)},
              led by {site.brand.founder}.
            </p>
            <ContactEmail className="mt-7 inline-block" />
          </div>

          <div className="grid gap-10 sm:grid-cols-3 md:col-span-6">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <h2 className="label-micro text-cream/60">{column.title}</h2>
                <ul className="mt-4 space-y-2">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.href}-${link.label}`}>
                      <FooterLink {...link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* The copyright bar below carries the footer's only hairline. */}
        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" aria-label={`${site.brand.name} — home`}>
            <Logo tone="cream" />
          </Link>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.elsewhere.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label-micro text-cream/60 transition-colors hover:text-copper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 border-t border-cream/15 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-cream/60">{footer.copyright}</p>
          <div className="flex items-center gap-5">
            <p className="text-sm text-cream/60">{footer.founderCredit}</p>
            <ul className="flex gap-4">
              {footer.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 transition-colors hover:text-copper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const className = "text-cream/80 transition-colors hover:text-copper";

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

function ContactEmail({ className }: { className?: string }) {
  return (
    <a
      href={`mailto:${site.contact.email}`}
      className={`${className ?? ""} border-b border-copper pb-0.5 text-lede text-copper transition-colors hover:border-cream hover:text-cream`}
    >
      {site.contact.email}
    </a>
  );
}