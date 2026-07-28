// design-sync shim for app/fonts.ts.
//
// The real module calls next/font/google, which is a build-time-only Next
// transform: imported directly it throws, and its generated class names
// (`__Exo_2_b72f86`) only exist inside a Next build. This shim exposes the same
// three surfaces the components use — `.className`, `.variable`, `.style` —
// backed by real classes defined in .design-sync/styles/entry.css against the
// @font-face families shipped in fonts/. NavBar reads `exo2.className`.
// Wired in via `paths` in .design-sync/tsconfig.sync.json.

export const inter = {
  className: 'ds-font-inter',
  variable: '--font-body',
  style: { fontFamily: 'Inter' },
};

export const exo2 = {
  className: 'ds-font-exo2',
  variable: '--font-titles',
  style: { fontFamily: '"Exo 2"' },
};
