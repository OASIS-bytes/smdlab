"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { useAnchorScroll } from "@/components/motion/useAnchorScroll";
import { useLenis } from "@/components/motion/SmoothScrollProvider";
import { Button } from "@/components/ui/Button";
import { navigation, site, type NavLink } from "@/lib/content";
import { cn } from "@/lib/cn";

export function SiteNav() {
  const pathname = usePathname();
  const lenis = useLenis();
  const onAnchorClick = useAnchorScroll();
  const panelId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const onHome = pathname === "/";

  // Deriving `open` from the pathname closes the menu on navigation without an
  // effect that has to set state.
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const open = menu.open && menu.path === pathname;
  const setOpen = (value: boolean) => setMenu({ open: value, path: pathname });

  useEffect(() => {
    if (!open) return;

    const instance = lenis.current;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu({ open: false, path: pathname });
    };

    document.addEventListener("keydown", onKeyDown);
    instance?.stop();
    firstLinkRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      instance?.start();
    };
  }, [open, lenis, pathname]);

  /**
   * On `/` a section link scrolls in place. On an inner page the same link has
   * to leave the page, so it becomes `/#section` and the browser's own hash
   * handling lands on the section once `/` mounts.
   */
  const resolve = (item: NavLink) =>
    onHome && item.section ? `#${item.section}` : item.href;

  /**
   * Active means "you are on this page". On `/` every section link is part of
   * the page you are already on, so nothing is marked current there.
   */
  const isActive = (item: NavLink) =>
    !onHome && Boolean(item.match) && pathname.startsWith(item.match as string);

  return (
    <>
      {/* Links appear from lg so the five links plus the CTA never crowd the
          logo at the 768px tablet width. */}
      <nav aria-label="Primary" className="hidden lg:block">
        <ul className="flex items-center gap-7 xl:gap-8">
          {navigation.primary.map((item) => (
            <li key={item.href}>
              <NavItem
                item={item}
                href={resolve(item)}
                active={isActive(item)}
                onAnchorClick={onAnchorClick}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden shrink-0 lg:block">
        <Button
          href={resolve(navigation.cta)}
          variant="filled"
          onAnchorClick={onAnchorClick}
        >
          {navigation.cta.label}
        </Button>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className="label-micro flex shrink-0 items-center gap-3 py-2 text-ink transition-colors hover:text-copper-deep lg:hidden"
      >
        {open ? navigation.closeMenu : navigation.openMenu}
        <MenuGlyph open={open} />
      </button>

      {open ? (
        <div
          id={panelId}
          // Below the sticky header's z-40: the panel reserves `pt-24` for the
          // header, so the header has to keep painting on top or the close
          // button ends up hidden behind the overlay.
          className="on-ink fixed inset-x-0 top-0 z-30 min-h-dvh overflow-y-auto bg-ink px-gutter pb-10 pt-24 lg:hidden"
        >
          <nav aria-label="Primary mobile">
            <ul>
              {navigation.primary.map((item, index) => (
                <li key={item.href} className="border-b border-cream/15">
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={resolve(item)}
                    onClick={(event) => {
                      onAnchorClick(event, resolve(item));
                      setOpen(false);
                    }}
                    aria-current={isActive(item) ? "page" : undefined}
                    className="flex items-center justify-between gap-4 py-4 font-display text-2xl text-cream"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full",
                        isActive(item) ? "bg-copper" : "bg-cream/30",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8">
            <Button
              href={resolve(navigation.cta)}
              variant="filled"
              className="w-full"
              onAnchorClick={onAnchorClick}
            >
              {navigation.cta.label}
            </Button>
          </div>

          <p className="label-micro mt-10 text-cream/60">{site.brand.tagline}</p>
          <a
            href={`mailto:${site.contact.email}`}
            className="mt-3 block font-display text-lede text-copper"
          >
            {site.contact.email}
          </a>
        </div>
      ) : null}
    </>
  );
}

function NavItem({
  item,
  href,
  active,
  onAnchorClick,
}: {
  item: NavLink;
  href: string;
  active: boolean;
  onAnchorClick: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const isHash = href.startsWith("#");

  return (
    <Link
      href={href}
      onClick={isHash ? (event) => onAnchorClick(event, href) : undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-2 whitespace-nowrap py-1 text-[0.9375rem] transition-colors",
        active ? "text-copper-deep" : "text-ink/80 hover:text-ink",
      )}
    >
      {item.label}
      <span
        aria-hidden="true"
        className={cn(
          "h-1 w-1 rounded-full bg-copper transition-opacity",
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
      />
    </Link>
  );
}

/** Flat two-stroke glyph, drawn with borders so it stays a single flat color. */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-3 w-6">
      <span
        className={cn(
          "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-200",
          open && "translate-y-[5.5px] rotate-45",
        )}
      />
      <span
        className={cn(
          "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-200",
          open && "-translate-y-[5.5px] -rotate-45",
        )}
      />
    </span>
  );
}
