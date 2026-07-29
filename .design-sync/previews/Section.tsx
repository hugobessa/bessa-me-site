import { Section } from 'bessa-me-site';
import { cardClassName, pageClassName } from './_fixtures';

// Section is the band primitive every content block in this system is built
// from: a mono uppercase header bar on surface-2, a solid 2px rule under it,
// then the body. The header is sticky (it parks under the nav via --nav-h),
// and the section drops its own bottom rule when it is the last one in a card.
//
// The wrapper below is the card frame from app/page.tsx — sections draw the
// rules *between* themselves and rely on the card for the outer border.

export const Basic = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <Section title="skills">
        <p className="px-5 sm:px-6 py-4 text-base font-medium leading-[1.55] text-ink-body">
          The body is whatever you put in it — the section only owns the header
          bar and the rule beneath it.
        </p>
      </Section>
    </div>
  </div>
);

// `actions` sits at the right end of the header row. The site uses it for
// filter controls and counts; anything mono and small belongs here.
export const WithActions = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <Section
        title="content"
        actions={
          <span className="font-mono text-[11px] font-bold uppercase tracking-[.12em] text-ink-muted">
            24 items
          </span>
        }
      >
        <p className="px-5 sm:px-6 py-4 text-base font-medium leading-[1.55] text-ink-body">
          Writing, talks and open source.
        </p>
      </Section>
    </div>
  </div>
);

// `subheader` renders inside the sticky block, under the header row — that is
// the difference that matters. Anything the header opens (a filter drawer, a
// search field) has to go here; left in `children` it would scroll away above
// a pinned header and be unreachable.
export const WithSubheader = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <Section
        title="portfolio"
        actions={
          <button
            type="button"
            className="self-start font-mono text-[11px] font-extrabold uppercase tracking-[.12em] px-3 py-2 border-2 border-ink bg-surface text-ink hover:bg-accent hover:text-on-accent"
          >
            filters
          </button>
        }
        subheader={
          <div className="flex flex-wrap gap-2 px-5 sm:px-6 py-3 border-b-2 border-ink bg-surface">
            {['React', 'TypeScript', 'Writing'].map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] font-bold uppercase tracking-[.12em] px-2 py-1.5 border-2 border-ink bg-surface text-ink"
              >
                {tag}
              </span>
            ))}
          </div>
        }
      >
        <p className="px-5 sm:px-6 py-4 text-base font-medium leading-[1.55] text-ink-body">
          Body content sits below the whole sticky block.
        </p>
      </Section>
    </div>
  </div>
);

// Stacked sections show the rule that separates them — and that the last one
// in the card drops it, so the card's own border closes the stack.
export const Stacked = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <Section title="languages">
        <p className="px-5 sm:px-6 py-4 text-base font-medium leading-[1.55] text-ink-body">
          Portuguese — Native
        </p>
      </Section>
      <Section title="education">
        <p className="px-5 sm:px-6 py-4 text-base font-medium leading-[1.55] text-ink-body">
          BSc in Computer Engineering
        </p>
      </Section>
    </div>
  </div>
);
