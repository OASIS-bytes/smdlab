import type { ReactNode } from "react";
import Link from "next/link";

const navItems = [
  { href: "/demo/dashboard/projects", label: "Projects" },
  { href: "/demo/dashboard/reports", label: "Reports" },
  { href: "/demo/dashboard/invoices", label: "Invoices" },
  { href: "/demo/dashboard/components", label: "Components" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="border-b border-ink/10 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
        <div className="mx-auto flex max-w-shell items-center justify-between px-gutter py-4 md:px-gutter-wide">
          <Link href="/demo/dashboard/projects" className="font-display text-xl tracking-tight">
            SMD Dashboard
          </Link>
          <nav className="flex gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="label-micro hover:text-copper-deep transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-shell px-gutter py-8 md:px-gutter-wide">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <nav className="flex flex-col gap-2 rounded-xl border border-ink/10 bg-white p-4 shadow-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm hover:bg-sand transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
