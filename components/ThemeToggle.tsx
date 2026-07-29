"use client";

import { FaMoon, FaSun } from "react-icons/fa";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/**
 * Applied by an inline script before first paint (see app/layout.tsx) and by
 * this control afterwards, so both agree on where the choice lives.
 */
const getCurrentTheme = (): Theme => {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") {
    return chosen;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const contentClassName = "flex-col items-center gap-1";
const labelClassName =
  "font-mono text-[8px] font-bold uppercase tracking-[.14em] leading-none";

export const ThemeToggle = ({ className }: { className: string }) => {
  const handleToggle = () => {
    const next: Theme = getCurrentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // private mode — the choice just won't survive the session
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Switch colour theme"
      className={className}
    >
      {/* one of these is hidden by CSS — see globals.css */}
      <span className={`theme-when-light ${contentClassName}`}>
        <FaMoon aria-hidden className="h-3.5 w-3.5" />
        <span className={labelClassName}>dark</span>
      </span>
      <span className={`theme-when-dark ${contentClassName}`}>
        <FaSun aria-hidden className="h-3.5 w-3.5" />
        <span className={labelClassName}>light</span>
      </span>
    </button>
  );
};
