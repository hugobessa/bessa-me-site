# design-sync notes — bessa-me-site

Repo-specific gotchas for future syncs. Read this before re-running anything.

## What this repo is

- **A Next.js app, not a component library.** `package.json` is `private`, there is
  no `dist/`, no `types` field, and no Storybook. Everything below follows from that.
- The fourteen synced components are the site's real page sections and the pieces they
  are built from, so several take Notion-shaped data props rather than being reusable
  primitives.

## The Terminal Grid redesign (July 2026)

The site was reworked from a stock-Tailwind orange/gray look into **Terminal Grid**:
hard corners, 2px ink borders, offset shadows with no blur, mono uppercase metadata.
The sync inputs were rewritten to match, and several older notes were wrong afterwards.
If you are diffing against an older sync, expect all of this to have moved:

- **Colour is semantic, not a palette.** `tailwind.config.js` declares twelve tokens
  (`page`, `surface`, `surface-2`, `field`, `ink`, `ink-body`, `ink-muted`, `accent`,
  `on-accent`, `logo-tile`, `frame`, `rule`) backed by CSS custom properties. There are
  **no numeric shades** and **no `dark:` variants anywhere** — the tokens re-point
  themselves under `prefers-color-scheme` and `:root[data-theme]`, so one class is
  correct in both themes. Don't reintroduce `dark:` to the safelist; it emits rules that
  can never match.
- **Sections are bands of one card.** `Section`, `Hero`, `SkillsSection`,
  `LanguagesSection`, `HistorySection`, `Portfolio` and `ContactSection` each draw the
  rule *between* themselves and the next band and rely on an enclosing
  `bg-surface border-2 border-frame shadow-card` card for the outer border (see
  `app/page.tsx`). **Every preview wraps in that frame** via `pageClassName` /
  `cardClassName` in `previews/_fixtures.ts` — without it the cards look unstyled-ish
  even though the CSS is fine.
- `components/styles.ts` holds shared class strings (`fieldClassName`,
  `chipClassName`, `smallButtonClassName`…). It is **not** exported through
  `.design-sync/entry.ts` and is not on `window.BessaMeSite`, so the design agent cannot
  import it — `conventions.md` teaches those patterns as classes instead. Its docstring
  points at `docs/design/terminal-grid/`, **a directory that does not exist in this
  repo**; don't go looking for it.

## Build shape

- **`--entry .design-sync/entry.ts` is mandatory.** Without it the converter resolves
  the package as `node_modules/bessa-me-site`, which does not exist (npm won't
  self-install), and dies with `ENOENT … /node_modules/bessa-me-site/package.json`.
  With `--entry`, it walks up from the entry to the repo's own `package.json`.
- Because an explicit entry disables synth-entry mode, component discovery does NOT
  fall back to scanning `src/`. **`componentSrcMap` must name all fourteen explicitly** —
  otherwise the run ends in `[ZERO_MATCH]` / "tokens-only DS" with zero components.
  **Adding a component to the design system means editing BOTH `.design-sync/entry.ts`
  and `componentSrcMap`.**
- `SkillsSection` and `LanguagesSection` are two exports of the same file, so
  `componentSrcMap` maps both names to `components/SkillsSection.tsx`. That works fine;
  don't "fix" the duplicate path.
- Full command:
  ```sh
  node .ds-sync/package-build.mjs --config .design-sync/config.json \
    --node-modules ./node_modules --entry .design-sync/entry.ts --out ./ds-bundle
  ```

## Next-only bindings (the shims)

The components import things that only exist inside a Next build. All are redirected by
`paths` in `.design-sync/tsconfig.sync.json` — the converter has a tsconfig-paths plugin
that applies to bare specifiers, so no lib fork was needed.

- `next/image` → `.design-sync/shims/next-image.tsx` (plain `<img>`).
- `@/app/fonts` → `.design-sync/shims/next-font.ts`. The real module calls
  `next/font/google`, which **throws if imported directly** — it is a build-time SWC
  transform, and its class names (`__Exo_2_b72f86`) exist only in a Next build.
  The shim returns `.ds-font-inter` / `.ds-font-exo2`, defined in
  `.design-sync/styles/entry.css`.
- `.design-sync/tsconfig.sync.json` also sets `jsx: "react-jsx"`; the repo tsconfig
  says `preserve` (correct for Next, but esbuild would then emit raw JSX).

### The next-image shim rewrites site-root asset paths

`Hero` is the only component that references a site asset by root-relative path
(`/imgs/my-pic.png`). Nothing serves the site's `public/` inside a preview card **or
inside a design the claude.ai/design agent builds**, so that path 404s in both and the
masthead renders a broken image.

The shim therefore rewrites bare `/…` sources to `https://bessa.me/…` (`SITE_ORIGIN`),
which serves the identical file. Absolute URLs and `//host/…` pass through untouched, so
the Notion-hosted logos and covers are unaffected. Inlining the bytes was the
alternative and was rejected: the portrait alone is 768 KB, over a third of the bundle.

**Consequences to keep in mind:** the Hero card is network-dependent (verified working —
the capture loads it), and if the deployed origin ever moves, update `SITE_ORIGIN`.
If another component starts referencing a site asset, it is covered automatically.

## Fonts

- Inter and Exo 2 woff2 (latin + latin-ext) were **harvested from `.next/static/media/`**,
  where `next/font/google` cached them, and committed to `.design-sync/styles/fonts/`.
  `@font-face` rules live in `.design-sync/styles/fonts.css` (wired via `extraFonts`)
  under stable family names instead of Next's hashed ones.
- `entry.css` binds `--font-titles` on `:root`. In the app, `layout.tsx` puts it on
  `<body>` via `exo2.variable`; nothing mounts `<body>` in a preview card or a
  generated design, so **without the `:root` binding every heading silently loses
  Exo 2.** Don't remove it.
- **The mono voice ships no webfont on purpose.** `font-mono` resolves to Tailwind's
  platform stack, same as on the site. Don't add a mono family to "fix" it.
- **Never safelist `font-serif`.** It drags Georgia/Cambria into the stylesheet as
  families nothing ships, and validate correctly fires `[FONT_MISSING] "Cambria"`. This
  system has no serif face. (This exact warning was self-inflicted once already.)

## Stylesheet

- `cfg.buildCmd` is the Tailwind compile, and it **must run before the converter** —
  `.design-sync/tailwind.sync.js` adds `.design-sync/previews/**` to `content` so
  utilities used only by preview files get generated. Skip it after editing a preview
  and the card renders with missing classes.
- The site's own `app/globals.css` is `@import`ed by `entry.css`, so the synced CSS
  stays the site's real stylesheet plus the two font classes.
- `styles/compiled.css` is generated output but is **committed on purpose**: if it is
  missing, `cfg.cssEntry` doesn't resolve and the build falls back to a self-styling
  `styles.css` (`[CSS_RUNTIME]`) — an unstyled design system that still exits 0.
  It is regenerated by `buildCmd`, so expect it in the diff whenever styling changes.
- **The safelist in `tailwind.sync.js` is load-bearing — don't delete it as bloat.**
  Content scanning alone emits only the utilities *this site* uses, which is fine for the
  site and broken for a design system: the design agent writes its own layout glue and
  any class absent from `styles.css` renders as nothing. The safelist exposes the repo's
  own theme at full scale — it invents no design. Current cost: 270 KB raw, 38 KB
  gzipped (was 261 KB under the old palette, so the rewrite was roughly cost-neutral).
  **`conventions.md` enumerates a vocabulary this safelist must keep valid** — widen the
  doc and the safelist together, and re-run the validation pass below.

## Prop contracts are hand-written

With no shipped `.d.ts` tree, extraction produced `[key: string]: unknown` for every
component — actively harmful, since it tells the design agent any prop is valid. All
fourteen bodies are hand-written in `cfg.dtsPropsFor`, with the Notion domain types
inlined structurally so each `.d.ts` is self-contained. **If a component's props change
in source, `dtsPropsFor` will NOT follow — update it by hand.** This bit already:
`NavBar` lost its `children` prop in the redesign and the old contract still advertised
it until this sync.

## Component behaviours found while previewing (real, not preview bugs)

Do not "fix" these in previews — they are how the shipped components behave.

- `NotionRichText` assigns the Notion colour name straight to CSS `color`, guarded so
  `"default"` is skipped. Plain names (`blue`, `red`) therefore land as **literal CSS
  colours rather than design tokens**, and every `*_background` value is not a colour
  keyword at all, so it is dropped and the run renders **unhighlighted**. Notion's
  highlight annotations have no effect. The `Colors` cell documents this deliberately.
- **Fixed since the last sync:** `code` annotations used to set the invalid
  `fontFamily: "monospaced"`. They now render as a proper boxed mono chip
  (`font-mono text-[.9em] bg-surface-2 border-2 border-ink`). The old note claiming
  inline code keeps the body font is obsolete.
- `JobsHistory` / `EducationHistory` / `HistorySection` **throw** if an entry's
  organization is missing (unguarded `.logo` / `.name` / `.link` read). For the two
  adapters that means every `organizationId` must resolve in `organizationsDataHash`.
- `Portfolio` renders `DefaultThumb` for items with neither `image` nor `embed`: a 45°
  hatch behind a bordered tile whose 4x4 block mark is a pure function of the title.
  Worth knowing because it means **no portfolio item is ever coverless**.

## States that cannot render statically (skipped by design)

- `HistorySection` (and both adapters): the description is behind a "see more" `useState`
  toggle — cards show the collapsed first paint.
- `Portfolio`: search, tag filtering and the tag overflow are interaction-driven — cards
  show the unfiltered, unexpanded state.
- **`Portfolio`'s fold has no cell at all.** Every card carries a 16/10 cover, so the
  seven-plus items needed to trigger `show n more` stand four rows tall and the bar lands
  below any card viewport. Widening `cfg.overrides.Portfolio.viewport` to `820x920` was
  enough to fit a full two-row grid, not the fold. Documented in the preview comment
  instead; don't burn time retrying it.
- `NavBar`: the hamburger / mobile panel is `useState` — closed state only.
- `ContactForm`: submit POSTs to `/api/contact` and raises a react-toastify toast;
  neither exists in a card. Previews pass `NODE_ENV="development"` so the **live
  reCAPTCHA widget is not rendered** — with `"production"` it needs a real key and a
  network round-trip to Google and would render blank or error.
- `ThemeToggle`: clicking it really does flip `data-theme` on `<html>`, so it would
  restyle the whole card. Cards show the light pair, where the label reads "dark".

## Known render warns

- `[GRID_OVERFLOW] … (wide)` on **Hero, SkillsSection, LanguagesSection** — resolved with
  `cfg.overrides.<Name> = {"cardMode": "column"}`. Expect it back if those are dropped.
- `[RENDER_SKIPPED] render check did not run (--no-render-check)` on a **no-change
  re-sync** is expected, not a regression. The driver scopes the render check by what
  ships. If you want the full check on an unchanged tree, re-run with `--render-sample 0`.
- `[DOCS_UNMAPPED]` for all fourteen is expected — there is no docs tree, so every
  `.prompt.md` is synthesized from the `.d.ts` plus the preview file. **This is why the
  header comments in `previews/*.tsx` matter**: they are the usage prose the design agent
  actually reads. Keep them accurate.

Resolved rather than outstanding:

- `[GRID_OVERFLOW] NavBar … (fixed/portal)` from the previous sync is **gone**. The nav
  is now `sticky top-0` inside the card rather than `fixed` to the viewport, so it no
  longer escapes its cell. The old
  `overrides.NavBar = {cardMode: "single", primaryStory: "WithPageContent"}` was deleted;
  `WithPageContent` no longer exists as a story, since `NavBar` takes no props.

## Validating conventions.md

`.design-sync/conventions.md` is prepended to the generated README and inlined into the
design agent's system prompt. Every class it names must exist in the shipped CSS, or the
agent writes vocabulary that resolves to nothing. After any rebuild, in **zsh**:

```sh
# note: zsh does not word-split unquoted vars — use an array, not a plain string
classes=(bg-page bg-surface bg-surface-2 bg-field text-ink text-ink-body text-ink-muted
         bg-accent text-on-accent border-ink border-rule border-frame bg-logo-tile
         shadow-hard shadow-card shadow-field-focus bg-stripes transition-hard
         duration-120 font-titles font-mono meta)
for c in $classes; do
  esc=".$(printf '%s' "$c" | sed 's/:/\\:/g')"
  grep -qF "$esc" ds-bundle/_ds_bundle.css || echo "MISSING $c"
done
# CSS custom properties need -e, or grep parses them as options:
for v in --ink --accent --font-titles --nav-h; do
  grep -qF -e "$v" ds-bundle/_ds_bundle.css || echo "MISSING var $v"
done
```

Also worth re-checking the **negative** claims, since they are what stops the agent
reaching for the old vocabulary: `bg-orange-500`, `text-gray-700`, `bg-gray-50`,
`rounded-lg` and `dark:bg-gray-800` must all be **absent**, and `.rounded` must compile
to `border-radius:0`. All 39 classes, 14 CSS vars, 14 component names and 5 negative
claims verified against `ds-bundle/` on the last run.

## Re-sync risks

- **`dtsPropsFor` is a hand-maintained copy of the props** and will rot silently — it is
  not derived from source. Same for the Notion types inlined into it. The `NavBar`
  `children` rot is the worked example.
- **Preview header comments are the `.prompt.md` source** (no docs tree). A comment that
  describes old behaviour ships to the design agent as fact — the `NotionRichText` `code`
  note was exactly that and had to be corrected mid-sync. Re-read them when a component
  changes.
- **`SITE_ORIGIN` in the next-image shim is an external dependency.** If `bessa.me` moves
  or the asset is renamed, `Hero` renders a broken portrait in every design built with
  it, and nothing in the build will catch it (the render check passes on a broken `<img>`
  as long as the root is non-empty). Re-verify with a HEAD request when in doubt.
- **Fonts are the fragile part.** The woff2 files are committed, so a normal re-sync is
  fine. But they came from a `.next/` build cache: if they ever need refreshing, the
  filenames in `.next/static/media/` are **content hashes that change on every build** —
  re-run `npm run build` and re-derive the mapping from the `@font-face` rules in
  `.next/static/css/*.css`, don't assume the old names.
- **The shims can silently drift.** If a component starts using a `next/image` prop the
  shim drops (`fill`, `placeholder`, a custom `loader`) or imports another Next-only
  module (`next/link`, `next/navigation`), the bundle will either lose behaviour or fail
  to resolve. Re-read the shims when components change.
- **Preview fixtures are invented data**, not Hugo's real CV
  (`.design-sync/previews/_fixtures.ts`). Fine for cards; don't mistake them for content.
  The org logos are generated monograms, hard-cornered to match the language.
- The `.design-sync/entry.ts` + `componentSrcMap` pair is the component list. A component
  added to `components/` and to neither is simply absent, with no warning.
- Only partially verified: nothing. All 14 components, 42 cells, were captured and graded
  `good`, and the render check passed 14/14.
- Build assumed: Node 24 locally (repo `engines` says `>=18 <19`, which the sync path
  does not honour and does not need — the converter never runs `next build`). TypeScript
  pinned to 5.x in `.ds-sync/` (7.x breaks `package-validate.mjs`'s `.d.ts` parse check
  and the failure is swallowed as "skipped"); playwright 1.62 against cached
  chromium-1234.
