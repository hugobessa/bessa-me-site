import { Hero } from 'bessa-me-site';
import { cardClassName, heroMeta, pageClassName } from './_fixtures';

// The masthead band: oversized Exo 2 wordmark with the surname knocked out in
// accent, a lede, a two-cell button pair, and the dotted meta row.
//
// Everything except `meta` is baked into the component — the copy and the
// portrait are Hugo's. The portrait is a site asset (`/imgs/my-pic.png`), which
// only resolves because the next/image shim rewrites site-root paths to the
// deployed origin; see .design-sync/shims/next-image.tsx.
//
// At lg the band splits into copy + a striped portrait column; below that the
// portrait stacks underneath. The card viewport is narrower than lg, so these
// cards show the stacked layout.

export const Masthead = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <Hero meta={heroMeta} />
    </div>
  </div>
);

// `meta` drives the dotted row under the buttons. Passing [] drops the row and
// its top rule entirely — the band just ends after the buttons.
export const WithoutMeta = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <Hero meta={[]} />
    </div>
  </div>
);

// The row takes as many items as it is given and wraps them.
export const SingleMetaItem = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <Hero meta={['available for consulting']} />
    </div>
  </div>
);
