# bessa.me — how to build with this design system

The real components from Hugo Bessa's personal site (a Next.js app), compiled for
design use. All fourteen are exported on `window.BessaMeSite`.

The look is **Terminal Grid**: hard corners everywhere, 2px ink borders, offset shadows
with no blur, and a mono uppercase voice for anything that reads as metadata.

## Setup

**No provider or wrapper is required.** These components read no React context — render
them directly. What you must get right is the stylesheet and the card frame.

- Load `styles.css`. It `@import`s the brand `@font-face` rules and the component CSS;
  nothing is styled without it.
- Body copy is **Inter**; headings and the wordmark are **Exo 2**, bound to
  `--font-titles` on `:root` so every `h1`–`h6` picks it up automatically — don't set a
  font on headings yourself. `font-titles` puts any other element in the display face.
- The metadata voice is `font-mono`, which resolves to the platform mono stack. No mono
  webfont ships, by design.

### Sections live inside a card

`Section`, `Hero`, `SkillsSection`, `LanguagesSection`, `HistorySection`, `Portfolio`
and `ContactSection` are horizontal **bands of one card**, not standalone blocks. Each
draws the rule *between* itself and the next band and expects the card to supply the
outer border. Rendered bare they lose the frame that makes the language read. Wrap them:

```jsx
<main className="bg-page p-5">
  <div className="max-w-[1180px] mx-auto bg-surface border-2 border-frame shadow-card">
    {/* bands go here, in order */}
  </div>
</main>
```

### Theme

Dark mode is **not** written with `dark:` variants — there are none, and adding them
does nothing. The twelve colour tokens are CSS custom properties that re-point
themselves under `prefers-color-scheme: dark` and under `:root[data-theme="dark"]`, so
one class is correct in both themes. `ThemeToggle` flips `data-theme` on `<html>`.

### `--nav-h`

`NavBar` measures itself on mount and publishes its height as `--nav-h`; every `Section`
header parks itself under the bar with it. Build a page without `NavBar` and the
stylesheet's 47px fallback applies — nothing breaks.

## Styling idiom: Tailwind utilities over semantic tokens

Style your own layout glue with utility classes; the components style themselves. The
vocabulary is **semantic, not a palette** — there are no numeric shades, and
`bg-orange-500` or `text-gray-700` are not in this stylesheet and render as nothing.

| Role | Token classes |
|---|---|
| Page behind the card | `bg-page` |
| Card / band surface | `bg-surface`, `bg-surface-2` (header bars, wells) |
| Input surface | `bg-field` |
| Text | `text-ink` (primary), `text-ink-body` (copy), `text-ink-muted` (metadata) |
| Accent | `bg-accent`, `text-accent`, `border-accent`, with `text-on-accent` for anything sitting on it |
| Borders / rules | `border-ink` (solid), `border-rule` (dotted inner rules), `border-frame` (card edge) |
| Logo tiles | `bg-logo-tile` — deliberately does **not** flip in dark mode |

Each of those works with `bg|text|border|divide|ring` and with `hover:`, `focus:`,
`active:`, `disabled:` and `group-hover:`.

**Structure and elevation**

- Borders are the load-bearing element: `border-2` plus a side (`border-b-2`,
  `border-r-2`…), `border-dotted` for inner rules. `rounded` is `0` in this theme —
  corners are hard on purpose, so don't reach for `rounded-lg`.
- Shadows are hard offsets, no blur: `shadow-hard-sm`, `shadow-hard`, `shadow-hard-lg`,
  `shadow-card` (the card's own 6px drop), and `shadow-field-focus` (the inset accent
  underline a focused field draws instead of a ring).
- `bg-stripes` and `bg-stripes-45` are the vertical and 45° hatches used behind the
  portrait and generated thumbnails.
- Motion is `transition-hard duration-120 ease-linear` — the pair the components use to
  slide a pressed control onto its own shadow.

**The three recurring text treatments**

```jsx
{/* metadata: dates, counts, tags, labels, button captions */}
<span className="font-mono text-xs font-bold uppercase tracking-[.12em] text-ink-muted">…</span>
{/* or the shorthand for exactly that: */}
<span className="meta">…</span>

{/* section header */}
<h2 className="font-mono text-xs font-extrabold uppercase tracking-[.2em] text-ink">…</h2>

{/* display heading — Exo 2 comes from the h-tag, the rest is the idiom */}
<h1 className="font-titles font-black text-[40px] leading-[.94] tracking-[-.02em] uppercase text-ink">…</h1>
```

Small controls (filter buttons, `see more`) are mono uppercase in a `border-2 border-ink`
box on `bg-surface`, inverting to `bg-accent text-on-accent` on hover. Chips are the same
at `text-[10px]`, filled with accent when selected. Beyond these, the stylesheet ships
the standard Tailwind scales for spacing, type, flex/grid, sizing and borders — compose
freely within them; classes outside the set render as nothing.

## Where the truth lives

- **The stylesheet** — `styles.css` and its imports (`fonts/fonts.css`, `_ds_bundle.css`).
  Read it before inventing a class.
- **Per component** — `components/general/<Name>/<Name>.d.ts` for the exact props and
  `<Name>.prompt.md` for usage. Read these; several take non-obvious data.

## Data-shaped components

Several are page sections driven by Notion-shaped data rather than generic primitives:

- `Section` is the reusable band primitive — header bar, optional `actions` and
  `subheader`, then `children`. Reach for it first when composing something new.
- `HistorySection` is the generic timeline; `JobsHistory` and `EducationHistory` are thin
  adapters over it that take Notion `Job[]` / `Education[]` plus an
  `organizationsDataHash`. **Every `organizationId` must resolve in that hash** — the
  lookup is unguarded and a miss throws while rendering the logo.
- `NotionRichText` renders only items with `type: "text"`. It maps the Notion colour name
  straight to CSS `color`, so named colours land as literal CSS colours and every
  `*_background` value renders unhighlighted.
- `Hero` and `NavBar` carry Hugo's own copy and links; `Hero`'s only prop is the `meta`
  row. `NavBar` takes no props at all.

Interactive state is real and unavailable statically: the `see more` toggles, Portfolio's
search and tag filtering, and the mobile menu are all `useState`.

## An idiomatic composition

```jsx
const { NavBar, Section, SkillsSection, ContactForm } = window.BessaMeSite;

<main className="bg-page p-5">
  <div className="max-w-[1180px] mx-auto bg-surface border-2 border-frame shadow-card">
    <NavBar />
    <SkillsSection skills={skills} />
    <Section
      id="contact"
      title="get in touch"
      actions={<span className="meta text-ink-muted">replies in ~2 days</span>}
    >
      <div className="p-6">
        <ContactForm RECAPTCHA_SITE_KEY="" NODE_ENV="development" />
      </div>
    </Section>
  </div>
</main>
```

Library components carry their own look; the wrapper markup is plain Tailwind in the
token vocabulary above. Note `NODE_ENV="development"` — the reCAPTCHA widget mounts only
on the exact string `"production"` and needs a live key.
