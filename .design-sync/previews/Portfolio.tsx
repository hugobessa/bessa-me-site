import { Portfolio } from 'bessa-me-site';
import {
  cardClassName,
  pageClassName,
  portfolio,
  portfolioTags,
} from './_fixtures';

// A whole Section subclass rather than a bare grid: Portfolio supplies its own
// header (with a live item count), a search field and tag chips as `actions`,
// the overflow tag band as `subheader`, and the card grid as the body.
//
// `tags` is the full chip vocabulary and is independent of the tags the items
// themselves carry — the first 4 sit in the header, the rest collapse behind a
// dashed `+n more` control that opens the subheader band. Beyond 6 items the
// grid folds behind a `show n more` bar.
//
// Search, tag selection, the tag overflow and the fold are all useState, so a
// static card always shows the unfiltered, unfolded first paint. Selected chips
// fill with accent; that state is reachable only by clicking.
//
// The fold itself has no cell: every card carries a 16/10 cover, so the eight
// items needed to trigger it stand four rows tall and the `show n more` bar
// lands below any card viewport. It is real behaviour — past 6 items the grid
// truncates and grows that bar — just not one a preview card can frame.

export const Grid = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <Portfolio portfolioData={portfolio} tags={portfolioTags} />
    </div>
  </div>
);

// Items with neither `image` nor `embed` get DefaultThumb instead of cover art:
// the 45° hatch carrying a bordered tile, in the same idiom as the history
// logos. The 4x4 block mark inside it is a pure function of the title —
// mirrored down the middle, stable across renders, and different per item —
// which is how a list of untitled-by-artwork entries stays scannable.
export const GeneratedThumbnails = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <Portfolio
        portfolioData={[
          {
            id: 'gt-1',
            title: 'A small CLI for Notion exports',
            link: 'https://example.com/notion-cli',
            tags: ['Open Source', 'TypeScript'],
          },
          {
            id: 'gt-2',
            title: 'Rewriting a build pipeline in Rust',
            link: 'https://example.com/writing/rust-pipeline',
            tags: ['Architecture'],
          },
        ]}
        tags={['Open Source', 'TypeScript', 'Architecture']}
      />
    </div>
  </div>
);

// A short vocabulary — four or fewer tags all fit in the header, so no `+n
// more` control is drawn and the subheader band never appears.
export const FewTags = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <Portfolio
        portfolioData={portfolio.slice(0, 2)}
        tags={['React', 'TypeScript', 'Writing']}
      />
    </div>
  </div>
);

// An item without `link` renders as a plain card instead of an anchor — the
// last fixture item is the unlinked one.
export const UnlinkedItem = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <Portfolio
        portfolioData={[portfolio[3]]}
        tags={['Open Source', 'TypeScript']}
      />
    </div>
  </div>
);

// The empty state: the count in the header reads 0 and the body says so, in the
// same muted mono voice the rest of the metadata uses.
export const NoItems = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <Portfolio portfolioData={[]} tags={portfolioTags} />
    </div>
  </div>
);
