import { Portfolio } from 'bessa-me-site';
import { portfolio, portfolioTags } from './_fixtures';

// Portfolio owns its own search box and tag filter state. Filtering is
// interaction-driven, so a static card always shows the unfiltered grid —
// `tags` is the full chip vocabulary and is independent of the items' own tags.

// Three items = one complete row of the 3-column grid. A 4th would wrap to a
// second row and be clipped by the card viewport, which reads as broken rather
// than as "there are more items".
export const Grid = () => (
  <div className="p-6 bg-gray-50">
    <Portfolio portfolioData={portfolio.slice(0, 3)} tags={portfolioTags} />
  </div>
);

export const FewItems = () => (
  <div className="p-6 bg-gray-50">
    <Portfolio portfolioData={portfolio.slice(0, 2)} tags={['React', 'TypeScript', 'Writing']} />
  </div>
);

// An item without `link` renders as a plain card instead of an anchor.
export const UnlinkedItem = () => (
  <div className="p-6 bg-gray-50">
    <Portfolio portfolioData={[portfolio[3]]} tags={['Open Source', 'TypeScript']} />
  </div>
);
