import { NotionRichText } from 'bessa-me-site';
import { cardClassName, pageClassName, rt } from './_fixtures';

// Renders a Notion rich-text array as inline runs. Only items with
// type "text" render at all — "mention" and "equation" are skipped, so an array
// of those produces nothing.
//
// Links get an accent bottom rule and open in a new tab. Everything else is
// annotation-driven, and two of those annotations behave in ways worth knowing
// before you build with them (see the Colors and Code cells).

const Body = ({ children }: { children: React.ReactNode }) => (
  <div className={pageClassName}>
    <div className={`${cardClassName} p-6`}>
      <p className="text-base font-medium leading-[1.55] text-ink-body">
        {children}
      </p>
    </div>
  </div>
);

export const Paragraph = () => (
  <Body>
    <NotionRichText
      richText={[
        rt('p-1', 'Leads a team of eight engineers across three product squads, '),
        rt('p-2', 'owning delivery end to end', { bold: true }),
        rt('p-3', ' — from discovery through production support, and introduced the RFC process that now precedes every architectural change.'),
      ]}
    />
  </Body>
);

export const Annotations = () => (
  <Body>
    <NotionRichText
      richText={[
        rt('a-1', 'bold', { bold: true }),
        rt('a-2', ' · '),
        rt('a-3', 'italic', { italic: true }),
        rt('a-4', ' · '),
        rt('a-5', 'underline', { underline: true }),
        rt('a-6', ' · '),
        rt('a-7', 'strikethrough', { strikethrough: true }),
        rt('a-8', ' · '),
        rt('a-9', 'bold italic', { bold: true, italic: true }),
      ]}
    />
  </Body>
);

export const WithLink = () => (
  <Body>
    <NotionRichText
      richText={[
        rt('l-1', 'Full write-up on '),
        rt('l-2', 'the design system rebuild', {}, 'https://example.com/case/design-system'),
        rt('l-3', ', including the migration path and what it cost.'),
      ]}
    />
  </Body>
);

// The component assigns the Notion colour name straight to CSS `color`, with
// one guard: `"default"` is skipped, so those runs inherit the body colour.
//
// The consequence worth knowing is that the plain colour names happen to be
// valid CSS keywords and so render as literal CSS colours — not as this
// system's tokens — while every `*_background` value is not a colour keyword at
// all, so it is dropped and the run renders unhighlighted. Notion's highlight
// annotations have no effect here. Real component behaviour, shown rather than
// papered over.
export const Colors = () => (
  <Body>
    <NotionRichText
      richText={[
        rt('c-1', 'blue', { color: 'blue' }),
        rt('c-2', ' · '),
        rt('c-3', 'red', { color: 'red' }),
        rt('c-4', ' · '),
        rt('c-5', 'green', { color: 'green' }),
        rt('c-6', ' · '),
        rt('c-7', 'default (inherits)', { color: 'default' }),
        rt('c-8', ' · '),
        rt('c-9', 'yellow_background (renders unhighlighted)', {
          color: 'yellow_background',
        }),
      ]}
    />
  </Body>
);

// `code` runs render as a boxed mono chip: font-mono at .9em on surface-2,
// inside a 2px ink border. It is the same square-bordered treatment the rest of
// the system uses for small controls, at text scale.
export const Code = () => (
  <Body>
    <NotionRichText
      richText={[
        rt('k-1', 'Introduced the '),
        rt('k-2', 'RFC process', { code: true }),
        rt('k-3', ' that now precedes every architectural change.'),
      ]}
    />
  </Body>
);
