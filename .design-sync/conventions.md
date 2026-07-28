# bessa.me — how to build with this design system

These are the real components from Hugo Bessa's personal site (a Next.js app), compiled
for design use. All seven are exported on `window.BessaMeSite`.

## Setup

**No provider or wrapper is required.** These components read no React context — render
them directly. What you must get right is the stylesheet:

- Load `styles.css`. It `@import`s the brand `@font-face` rules and the component CSS;
  nothing is styled without it.
- **Headings pick up the display face automatically.** `styles.css` binds
  `--font-titles` on `:root`, and every `h1`–`h6` inherits it. Don't set a font on
  headings yourself.
- Body copy is **Inter**; headings and the wordmark are **Exo 2**. To put a non-heading
  element in the display face, use `ds-font-exo2`; `ds-font-inter` forces the body face.

```jsx
const { NavBar, Portfolio } = window.BessaMeSite;
```

## Styling idiom: Tailwind utility classes

This system has **no custom token names and no CSS-in-JS** — it is stock Tailwind v3
with the default theme. Style your own layout glue with utility classes; the components
style themselves.

The brand vocabulary, as the site actually uses it:

| Role | Classes |
|---|---|
| Accent (links, wordmark) | `text-orange-600`, `text-orange-500`, `hover:text-orange-500` |
| Accent surface (buttons) | `bg-orange-500`, `bg-orange-200` |
| Body / muted text | `text-gray-700`, `text-gray-600`, `text-gray-500`, `text-gray-400` |
| Surfaces | `bg-white`, `bg-gray-50`, `bg-gray-100` |
| Card shell | `rounded`, `shadow-lg`, `overflow-hidden` |
| Dark mode | `dark:bg-gray-800`, `dark:bg-gray-900`, `dark:text-gray-300`, `dark:text-orange-500` |

**Dark mode is `prefers-color-scheme` (Tailwind's `media` strategy)** — write `dark:`
variants; there is no `.dark` class to toggle.

Beyond the table, the stylesheet ships the full scale, so you can compose freely within
it: `bg|text|border|divide` × `orange|gray|red|green|blue` × shades `50`–`950`, each with
`hover:`, `focus:`, `dark:` and `dark:hover:`; spacing (`p*`/`m*`/`gap*`) on the standard
`0`–`64` steps; `text-xs`–`text-7xl`; flex/grid, `grid-cols-1`–`12`, `max-w-*`,
`rounded-*`, `shadow-*`; and `sm:`/`md:`/`lg:` on layout, spacing and type. Classes
outside that set are not in the stylesheet and will render as nothing.

## Where the truth lives

- **The stylesheet** — `styles.css` and its imports (`fonts/fonts.css`, `_ds_bundle.css`).
  Read it before inventing a class.
- **Per component** — `components/general/<Name>/<Name>.d.ts` for the exact props, and
  `<Name>.prompt.md` for usage. Read these; several components take non-obvious data.

## Data-shaped components

`JobsHistory`, `EducationHistory` and `Portfolio` are **page sections driven by
Notion-shaped data**, not generic primitives. Two things to respect:

- `JobsHistory` / `EducationHistory` need `organizationsDataHash` to contain **every**
  `organizationId` referenced by their entries — a missing key throws while rendering
  the logo.
- `NotionRichText` renders only items with `type: "text"`, and it maps the Notion colour
  name straight to CSS `color`, so `*_background` values render unhighlighted.

`NavBar`'s `<nav>` is `position: fixed`, so page content passed as `children` needs its
own top padding (the site uses `pt-24`). Its section links are baked in.

## An idiomatic composition

```jsx
const { NavBar, ContactForm } = window.BessaMeSite;

<NavBar>
  <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
    <section className="mx-auto max-w-3xl px-6">
      <h2 className="text-3xl font-semibold mb-6">Get in touch</h2>
      <div className="rounded shadow-lg overflow-hidden bg-white dark:bg-gray-800 p-6">
        <ContactForm RECAPTCHA_SITE_KEY="" NODE_ENV="development" />
      </div>
    </section>
  </div>
</NavBar>
```

Library components carry their own look; the wrapper markup is plain Tailwind in the
vocabulary above. Note `NODE_ENV="development"` — the reCAPTCHA widget renders only on
the exact string `"production"` and needs a live key.
