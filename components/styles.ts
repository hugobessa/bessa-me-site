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

/**
 * Cell rules for a band that stacks on mobile and splits into `n` columns at
 * `sm`: cells rule right (solid ink) between columns and down (dotted) when
 * stacked, and the bottom row drops its rule so the section's own border closes
 * the block. The last-row test differs between the 1-column and n-column
 * layouts, so each cell emits at most one base rule plus at most one `sm:`
 * override — never two competing declarations of the same property.
 *
 * The `sm:` right rule is written per column count rather than with `odd:` so a
 * band whose cell count isn't a multiple of `columns` still rules correctly.
 */
export const gridCellRuleClassName = (
  index: number,
  count: number,
  columns: number
) => {
  const isLast = index === count - 1;
  const isLastInRow = index % columns === columns - 1;
  const remainder = count % columns;
  const isInLastRow = index >= count - (remainder === 0 ? columns : remainder);

  return [
    isLast ? "" : "[border-bottom:2px_dotted_var(--rule)]",
    isInLastRow && !isLast ? "sm:[border-bottom:0]" : "",
    isLastInRow ? "" : "sm:[border-right:2px_solid_var(--ink)]",
  ]
    .filter(Boolean)
    .join(" ");
};

/** Square tag chip. Selected chips fill with accent. */
export const chipClassName = (isSelected: boolean) =>
  `font-mono text-[10px] font-bold uppercase tracking-[.12em] px-2 py-1.5 border-2 border-ink transition-hard duration-120 ease-linear ${
    isSelected ? "bg-accent text-on-accent" : "bg-surface text-ink"
  }`;
