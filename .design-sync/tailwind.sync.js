/* Tailwind config for the design-system build.
 *
 * Identical to the site's tailwind.config.js except for `content`: the sync
 * build also has to generate utilities used by the authored preview files in
 * .design-sync/previews/, which the site config has no reason to scan. Without
 * them the preview cards render with half their classes missing.
 *
 * Run from the repo root (content globs are CWD-relative) — see cfg.buildCmd.
 */
const base = require('../tailwind.config.js');

/* The safelist below exists because of who consumes this stylesheet.
 *
 * Content scanning alone emits ONLY the utilities this site happens to use, so
 * a token the site never paints on a border (`border-accent`) or a spacing step
 * it never reaches simply would not exist. That is correct for the site and
 * wrong for a design system: the claude.ai/design agent writes its own layout
 * glue around these components, and any class missing from this file renders as
 * nothing.
 *
 * This invents no design. Every colour below is one of the twelve semantic
 * tokens declared in the repo's own tailwind.config.js, and every shadow,
 * background and transition is one of its own `extend` entries — the safelist
 * just exposes each of them on every utility that can carry it, instead of the
 * used subset.
 *
 * TERMINAL GRID NOTE — there are no colour *shades* in this system, and no
 * `dark:` variants. Colours are semantic CSS custom properties that re-point
 * themselves under `prefers-color-scheme` and `[data-theme]` (see
 * app/globals.css), so one class is correct in both themes. Safelisting a
 * `dark:` variant here would emit rules that never match and teach the design
 * agent an idiom this system does not have.
 */

/** The full semantic palette from tailwind.config.js `extend.colors`. */
const TOKENS =
  '(page|surface|surface-2|field|ink|ink-body|ink-muted|accent|on-accent|logo-tile|frame|rule)';
const SPACE =
  '(0|px|0\\.5|1|1\\.5|2|2\\.5|3|3\\.5|4|5|6|7|8|9|10|11|12|13|14|16|20|24|28|32|40|48|56|64)';

/* The interaction variants the components themselves style with — hover is by
 * far the most used, and the button in ContactForm reaches for enabled:/
 * disabled:/active: on the same utilities. */
const STATES = ['hover', 'focus', 'active', 'disabled', 'enabled:hover', 'enabled:active', 'group-hover'];
const BREAKPOINTS = ['sm', 'md', 'lg'];

const safelist = [
  // ── Colour ────────────────────────────────────────────────────────────────
  // Every semantic token on every utility that can carry one. `divide-*` and
  // `ring-*` are included because grid glue reaches for them even though the
  // site draws its own rules with explicit borders.
  {
    pattern: new RegExp(`^(bg|text|border|divide|ring|outline|decoration|caret|accent)-${TOKENS}$`),
    variants: STATES,
  },
  { pattern: /^(bg|text|border|ring|divide)-(white|black|transparent|current|inherit)$/, variants: STATES },
  // Structural backgrounds from `extend.backgroundImage`.
  { pattern: /^bg-(stripes|stripes-45|none)$/ },
  { pattern: /^(bg|border|text)-opacity-(0|5|10|20|25|50|75|90|95|100)$/ },

  // ── Borders: the load-bearing part of this design language ────────────────
  // Every side at every width the theme uses, plus the two styles the system
  // draws rules in (solid ink, dotted rule).
  { pattern: /^border(-x|-y|-t|-r|-b|-l)?(-0|-2|-4|-8)?$/, variants: [...BREAKPOINTS, 'last', 'first', 'odd', 'even'] },
  { pattern: /^border-(solid|dashed|dotted|none)$/, variants: ['last', 'first', 'disabled'] },
  // `rounded` is 0 in this theme (borderRadius.DEFAULT) — the corners are hard
  // on purpose. Only the explicit escape hatches are exposed.
  { pattern: /^rounded(-none|-full)?$/ },

  // ── Elevation: the hard offset shadows, no blur ───────────────────────────
  {
    pattern: /^shadow-(hard-sm|hard|hard-lg|field-focus|card|none)$/,
    variants: ['hover', 'focus', 'active', 'enabled:hover', 'enabled:active', 'disabled'],
  },

  // ── Typography ────────────────────────────────────────────────────────────
  // `font-titles` is Exo 2 (the display face); `font-mono` carries the entire
  // metadata voice of this system, so both must survive.
  // No `font-serif`: this system ships no serif face, and safelisting it drags
  // Cambria/Georgia into the stylesheet as families nothing can satisfy
  // (validate flags it as [FONT_MISSING]).
  { pattern: /^font-(titles|mono|sans)$/ },
  { pattern: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)$/, variants: BREAKPOINTS },
  { pattern: /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/ },
  { pattern: /^(leading|tracking)-(none|tight|snug|normal|relaxed|loose|wide|wider|widest|tighter)$/ },
  { pattern: /^text-(left|center|right|justify)$/, variants: BREAKPOINTS },
  { pattern: /^(underline|line-through|no-underline|italic|not-italic|uppercase|lowercase|normal-case|capitalize|truncate)$/ },
  { pattern: /^(whitespace)-(normal|nowrap|pre|pre-line|pre-wrap)$/ },
  { pattern: /^align-(baseline|top|middle|bottom)$/ },

  // ── Spacing ───────────────────────────────────────────────────────────────
  {
    pattern: new RegExp(`^(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y|space-x|space-y)-${SPACE}$`),
    variants: BREAKPOINTS,
  },

  // ── Layout ────────────────────────────────────────────────────────────────
  {
    pattern: /^(flex|inline-flex|grid|inline-grid|block|inline-block|inline|hidden|contents|table)$/,
    variants: BREAKPOINTS,
  },
  { pattern: /^(flex-row|flex-row-reverse|flex-col|flex-col-reverse|flex-wrap|flex-nowrap|flex-1|flex-auto|flex-none|flex-initial|grow|grow-0|shrink|shrink-0)$/, variants: BREAKPOINTS },
  { pattern: /^grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12|none)$/, variants: BREAKPOINTS },
  { pattern: /^col-span-(1|2|3|4|5|6|7|8|9|10|11|12|full)$/, variants: BREAKPOINTS },
  { pattern: /^(items|justify|self|content|place-items|place-content)-(start|end|center|between|around|evenly|stretch|baseline|auto)$/, variants: BREAKPOINTS },
  { pattern: /^(relative|absolute|fixed|sticky|static)$/, variants: BREAKPOINTS },
  { pattern: /^(top|bottom|left|right|inset|inset-x|inset-y)-(0|1|2|3|4|6|8|auto|full)$/ },
  { pattern: /^z-(0|10|20|30|40|50|auto)$/ },
  { pattern: /^order-(first|last|none|1|2|3|4|5|6)$/, variants: BREAKPOINTS },

  // ── Sizing ────────────────────────────────────────────────────────────────
  { pattern: new RegExp(`^(w|h|min-w|min-h)-${SPACE}$`), variants: BREAKPOINTS },
  { pattern: /^w-(auto|full|screen|min|max|fit|1\/2|1\/3|2\/3|1\/4|3\/4)$/, variants: BREAKPOINTS },
  { pattern: /^h-(auto|full|screen|min|max|fit)$/, variants: BREAKPOINTS },
  { pattern: /^(min-w|min-h|max-h)-(0|full|screen|min|max|fit)$/, variants: BREAKPOINTS },
  { pattern: /^max-w-(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|full|prose|none)$/, variants: BREAKPOINTS },
  { pattern: /^aspect-(auto|square|video)$/ },
  { pattern: /^object-(contain|cover|fill|none|scale-down|top|bottom|center|left|right)$/ },

  // ── Motion: `transition-hard` + `duration-120` are the system's own pair ──
  { pattern: /^transition(-none|-all|-colors|-opacity|-shadow|-transform|-hard)?$/ },
  { pattern: /^duration-(0|75|100|120|150|200|300|500|700|1000)$/ },
  { pattern: /^ease-(linear|in|out|in-out)$/ },
  { pattern: /^(translate-x|translate-y)-(0|0\.5|1|1\.5|2|px|full)$/, variants: ['hover', 'active', 'enabled:hover', 'enabled:active', 'group-hover'] },

  // ── Misc ──────────────────────────────────────────────────────────────────
  { pattern: /^(overflow|overflow-x|overflow-y)-(auto|hidden|visible|scroll)$/ },
  { pattern: /^(opacity)-(0|5|10|20|25|30|40|50|60|70|75|80|90|95|100)$/, variants: ['hover', 'disabled', 'group-hover'] },
  { pattern: /^(cursor)-(pointer|default|not-allowed|wait|text|move)$/ },
  { pattern: /^(pointer-events)-(none|auto)$/ },
  { pattern: /^(list)-(none|disc|decimal|inside|outside)$/ },
  { pattern: /^(sr-only|not-sr-only)$/ },
  // The `.meta` component class from app/globals.css (@layer components) — the
  // metadata voice used across dates, counts, tags and button captions.
  'meta',
];

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...base,
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './.design-sync/previews/**/*.{js,ts,jsx,tsx}',
    './.design-sync/shims/**/*.{js,ts,jsx,tsx}',
  ],
  safelist,
};
