import { ThemeToggle } from 'bessa-me-site';
import { cardClassName, pageClassName } from './_fixtures';

// The theme switch. It ships no styling of its own beyond its two labels, so
// `className` is required — it is what places and sizes the control.
//
// It labels itself with the theme it switches TO, and which of its two labels
// shows is decided in CSS (`.theme-when-light` / `.theme-when-dark` in
// globals.css), not in React state. That is deliberate: the control is correct
// in the very first painted frame, with nothing to mismatch during hydration.
// These cards render in the light pair, so the label reads "dark".
//
// Clicking writes `data-theme` on <html> and stores the choice in
// localStorage — in a card that flips the whole preview, which is the real
// behaviour rather than a preview artefact.

export const InNavBar = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <div className="flex items-stretch justify-between bg-surface border-b-2 border-ink">
        <span className="flex items-center font-titles font-black text-[15px] tracking-[.14em] uppercase text-ink px-[18px] py-[14px] border-r-2 border-ink">
          Bessa
        </span>
        <ThemeToggle className="flex flex-col items-center justify-center px-3 text-ink-muted transition-hard duration-120 ease-linear hover:bg-accent hover:text-on-accent" />
      </div>
    </div>
  </div>
);

// Standalone, boxed like any other small control in this system.
export const Boxed = () => (
  <div className={pageClassName}>
    <div className={`${cardClassName} p-6`}>
      <ThemeToggle className="flex flex-col items-center justify-center gap-1 w-16 h-16 border-2 border-ink bg-surface text-ink transition-hard duration-120 ease-linear hover:bg-accent hover:text-on-accent" />
    </div>
  </div>
);

// The control is only as big as the classes make it — here on a stripe of
// surface-2, sized down to sit inline with metadata.
export const Compact = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <div className="flex items-center justify-between gap-3 px-5 py-3 bg-surface-2 border-b-2 border-ink">
        <span className="font-mono text-xs font-extrabold uppercase tracking-[.2em] text-ink">
          appearance
        </span>
        <ThemeToggle className="flex flex-col items-center justify-center px-2 py-1 border-2 border-ink bg-surface text-ink hover:bg-accent hover:text-on-accent" />
      </div>
    </div>
  </div>
);
