/** Shared Terminal Grid class strings — see docs/design/terminal-grid/. */

/** Field shell without width or padding, so callers size their own control. */
export const fieldBaseClassName =
  "bg-field border-2 border-ink text-sm font-medium text-ink outline-none placeholder:text-ink-muted focus:shadow-field-focus";

/** Text input / textarea at form size. */
export const fieldClassName = `${fieldBaseClassName} w-full px-3 py-[11px]`;

/** Mono uppercase label sitting above a field. */
export const fieldLabelClassName =
  "flex flex-col gap-[5px] font-mono text-[11px] font-bold uppercase tracking-[.12em] leading-none text-ink";

/** Small mono control: `see more →`, filter buttons. */
export const smallButtonClassName =
  "self-start font-mono text-[11px] font-extrabold uppercase tracking-[.12em] px-3 py-2 border-2 border-ink bg-surface text-ink transition-hard duration-120 ease-linear hover:bg-accent hover:text-on-accent";

/** Square tag chip. Selected chips fill with accent. */
export const chipClassName = (isSelected: boolean) =>
  `font-mono text-[10px] font-bold uppercase tracking-[.12em] px-2 py-1.5 border-2 border-ink transition-hard duration-120 ease-linear ${
    isSelected ? "bg-accent text-on-accent" : "bg-surface text-ink"
  }`;
