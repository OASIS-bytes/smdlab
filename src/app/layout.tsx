import type { Metadata } from "next";
import { HashScroll } from "@/components/motion/HashScroll";
import { PadCursor } from "@/components/motion/PadCursor";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PaperGrain } from "@/components/ui/PaperGrain";
import { navigation, site } from "@/lib/content";
import { dmSans, fraunces } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.brand.url),
  title: {
    default: `${site.brand.name} — ${site.brand.tagline}`,
    template: `%s — ${site.brand.name}`,
  },
  description: site.brand.description,
  applicationName: site.brand.name,
  authors: [{ name: site.brand.founder }],
  creator: site.brand.founder,
  publisher: site.brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en",
    url: site.brand.url,
    siteName: site.brand.name,
    title: `${site.brand.name} — ${site.brand.tagline}`,
    description: site.brand.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand.name} — ${site.brand.tagline}`,
    description: site.brand.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SmoothScrollProvider>
          <a
            href="#main"
            className="label-micro sr-only focus:not-sr-only focus:absolute focus:left-gutter focus:top-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-3 focus:text-cream"
          >
            {navigation.skipToContent}
          </a>

          <SiteHeader />

          {/* `/#section` links from inner pages land here rather than relying on
              the browser, which Lenis would immediately undo. */}
          <HashScroll />

          {/* `tabIndex` lets the skip link hand focus to main in browsers that
              do not move it to a fragment target on their own. */}
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>

          <SiteFooter />
        </SmoothScrollProvider>

        <PaperGrain />
        <PadCursor />
      </body>
    </html>
  );
}
