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
 * `bg-orange-500` shipped but `bg-orange-600` did not, and the spacing scale
 * stopped at `p-6`. That is correct for the site and wrong for a design system:
 * the claude.ai/design agent writes its own layout glue around these
 * components, and any class missing from this file renders as nothing.
 *
 * This invents no design — every value comes from the repo's own Tailwind
 * theme. It just exposes the whole scale instead of the used subset. Colour
 * families are limited to the ones the site's design language actually uses
 * (orange accent, gray/slate neutrals, plus red/green/blue for status), which
 * keeps the output around 200KB rather than several MB.
 */
const SHADES = '(50|100|200|300|400|500|600|700|800|900|950)';
const PALETTE = '(orange|gray|red|green|blue)';
const SPACE = '(0|px|0\\.5|1|1\\.5|2|2\\.5|3|3\\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|40|48|56|64)';

const safelist = [
  // Colour: fill, text, border, ring, divide — with the interaction and
  // dark-mode variants the site itself styles with.
  {
    pattern: new RegExp(`^(bg|text|border|divide)-${PALETTE}-${SHADES}$`),
    variants: ['hover', 'focus', 'dark', 'dark:hover'],
  },
  {
    pattern: /^(bg|text|border|ring|divide)-(white|black|transparent|current|inherit)$/,
    variants: ['hover', 'focus', 'dark', 'dark:hover'],
  },
  // Spacing: padding, margin, gap and the flow-spacing helpers.
  {
    pattern: new RegExp(`^(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y|space-x|space-y)-${SPACE}$`),
    variants: ['sm', 'md', 'lg'],
  },
  // Typography.
  {
    pattern: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)$/,
    variants: ['sm', 'md', 'lg'],
  },
  { pattern: /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/ },
  { pattern: /^(leading|tracking)-(none|tight|snug|normal|relaxed|loose|wide|wider|widest|tighter)$/ },
  { pattern: /^text-(left|center|right|justify)$/, variants: ['sm', 'md', 'lg'] },
  { pattern: /^(underline|line-through|no-underline|italic|not-italic|uppercase|lowercase|capitalize|truncate)$/ },
  // Layout.
  {
    pattern: /^(flex|inline-flex|grid|inline-grid|block|inline-block|inline|hidden|contents)$/,
    variants: ['sm', 'md', 'lg'],
  },
  { pattern: /^(flex-row|flex-col|flex-wrap|flex-nowrap|flex-1|flex-auto|flex-none|flex-initial)$/, variants: ['sm', 'md', 'lg'] },
  { pattern: /^grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12|none)$/, variants: ['sm', 'md', 'lg'] },
  { pattern: /^col-span-(1|2|3|4|5|6|7|8|9|10|11|12|full)$/, variants: ['sm', 'md', 'lg'] },
  { pattern: /^(items|justify|self|content)-(start|end|center|between|around|evenly|stretch|baseline|auto)$/, variants: ['sm', 'md', 'lg'] },
  { pattern: /^(relative|absolute|fixed|sticky|static)$/ },
  { pattern: /^(top|bottom|left|right|inset|inset-x|inset-y)-(0|1|2|3|4|6|8|auto|full)$/ },
  { pattern: /^z-(0|10|20|30|40|50|auto)$/ },
  // Sizing.
  { pattern: /^w-(auto|full|screen|min|max|fit|1\/2|1\/3|2\/3|1\/4|3\/4)$/, variants: ['sm', 'md', 'lg'] },
  { pattern: /^h-(auto|full|screen|min|max|fit)$/, variants: ['sm', 'md', 'lg'] },
  { pattern: /^max-w-(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|full|prose|none)$/, variants: ['sm', 'md', 'lg'] },
  // Borders, corners, elevation — the card look the site leans on.
  { pattern: /^rounded(-none|-sm|-md|-lg|-xl|-2xl|-3xl|-full)?$/ },
  { pattern: /^border(-0|-2|-4|-8)?$/ },
  { pattern: /^shadow(-sm|-md|-lg|-xl|-2xl|-inner|-none)?$/, variants: ['hover', 'dark'] },
  { pattern: /^(overflow|overflow-x|overflow-y)-(auto|hidden|visible|scroll)$/ },
  { pattern: /^(opacity)-(0|5|10|20|25|30|40|50|60|70|75|80|90|95|100)$/, variants: ['hover'] },
  { pattern: /^(cursor)-(pointer|default|not-allowed|wait|text|move)$/ },
  { pattern: /^transition(-all|-colors|-opacity|-shadow|-transform)?$/ },
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
