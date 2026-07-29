"use client";
import { useEffect, useRef, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { ThemeToggle } from './ThemeToggle';

const navCellClassName =
  "flex items-center font-mono text-xs font-bold uppercase tracking-[.12em] text-ink px-[18px] border-l-2 border-ink transition-hard duration-120 ease-linear hover:bg-accent hover:text-on-accent";

const mobileRowClassName =
  "block w-full text-left font-mono text-xs font-bold uppercase tracking-[.12em] text-ink px-5 py-4 border-b-2 border-ink last:border-b-0 hover:bg-accent hover:text-on-accent";

const NAV_ITEMS = [
  { href: "#work", label: "work" },
  { href: "#content", label: "content" },
  { href: "#contact", label: "contact" },
];

const MOBILE_NAV_ITEMS = [
  { href: "#skills", label: "skills" },
  { href: "#work", label: "job history" },
  { href: "#education", label: "education" },
  { href: "#languages", label: "languages" },
  { href: "#content", label: "content" },
  { href: "#contact", label: "contact" },
];

export const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Section headers park directly under the bar and anchor links stop clear of
  // it, both off --nav-h. Measured rather than hard-coded: the bar's height
  // moves with the display font loading and with the breakpoint.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }
    const publishHeight = () => {
      // a zero reading (mid-remount, or measured before layout) would park the
      // section headers at the top of the viewport, on top of this bar and its
      // controls — keep the stylesheet fallback instead
      if (nav.offsetHeight > 0) {
        document.documentElement.style.setProperty(
          "--nav-h",
          `${nav.offsetHeight}px`
        );
      }
    };

    publishHeight();
    const observer = new ResizeObserver(publishHeight);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-30 flex items-stretch justify-between bg-surface border-b-2 border-ink"
    >
      <a
        href="#hero"
        className="flex items-center font-titles font-black text-[15px] tracking-[.14em] uppercase text-ink px-[18px] py-[14px] border-r-2 border-ink"
      >
        Bessa
      </a>

      {/* one toggle for both layouts: it sits left of the nav cells on desktop
          and left of the menu button on mobile */}
      <div className="flex items-stretch">
        <ThemeToggle className="flex flex-col items-center justify-center px-3 text-ink-muted transition-hard duration-120 ease-linear hover:bg-accent hover:text-on-accent" />

        <div className="hidden sm:flex">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className={navCellClassName}>
              {item.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          className="sm:hidden flex items-center justify-center px-[18px] border-l-2 border-ink text-ink hover:bg-accent hover:text-on-accent"
          aria-controls="mobile-menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {mobileMenuOpen ? (
            <FaTimes className="h-5 w-5" />
          ) : (
            <FaBars className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* full-bleed stacked panel, one item per row */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          // `top-full` lands on the nav's padding box, i.e. above its bottom
          // border, so the panel draws that rule itself. The bottom edge is a
          // hard shadow rather than a border, so the panel reads as sitting on
          // top of the page instead of being part of the card.
          className="sm:hidden absolute z-10 top-full left-0 right-0 bg-surface border-t-2 border-b-2 border-ink shadow-[0_6px_0_var(--ink)]"
        >
          {MOBILE_NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={mobileRowClassName}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
