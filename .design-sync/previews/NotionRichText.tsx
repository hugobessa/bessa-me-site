import { NotionRichText } from 'bessa-me-site';
import { rt } from './_fixtures';

// NotionRichText renders a bare fragment of <span>s — no block wrapper, no
// spacing of its own. Every cell supplies the paragraph context the site gives
// it, which is also how a design agent should use it.

export const Paragraph = () => (
  <p className="p-6 text-sm text-gray-700 max-w-prose">
    <NotionRichText
      richText={[
        rt('p-1', 'Engineering manager based in Recife, working mostly on '),
        rt('p-2', 'developer tooling', { bold: true }),
        rt('p-3', ' and design systems. Previously a full stack developer for '),
        rt('p-4', 'eight years', { italic: true }),
        rt('p-5', '.'),
      ]}
    />
  </p>
);

export const Annotations = () => (
  <div className="p-6 space-y-2 text-sm text-gray-700">
    <p><NotionRichText richText={[rt('a-1', 'Bold text', { bold: true })]} /></p>
    <p><NotionRichText richText={[rt('a-2', 'Italic text', { italic: true })]} /></p>
    <p><NotionRichText richText={[rt('a-3', 'Underlined text', { underline: true })]} /></p>
    <p><NotionRichText richText={[rt('a-4', 'Struck through text', { strikethrough: true })]} /></p>
    <p><NotionRichText richText={[rt('a-5', 'inline code', { code: true })]} /></p>
    <p>
      <NotionRichText
        richText={[rt('a-6', 'Bold and italic together', { bold: true, italic: true })]}
      />
    </p>
  </div>
);

export const Colors = () => (
  <div className="p-6 space-y-2 text-sm">
    {(['red', 'orange', 'green', 'blue', 'purple', 'gray'] as const).map((color) => (
      <p key={color}>
        <NotionRichText richText={[rt(`c-${color}`, `Notion "${color}" text`, { color })]} />
      </p>
    ))}
    {/* Notion's colour name is assigned straight to CSS `color`, so the
        `*_background` values are not valid CSS and render as plain text.
        Shown deliberately — background highlights are not supported. */}
    <p>
      <NotionRichText
        richText={[
          rt('c-bg', 'yellow_background renders unhighlighted — no background support', {
            color: 'yellow_background',
          }),
        ]}
      />
    </p>
  </div>
);

export const WithLinks = () => (
  <p className="p-6 text-sm text-gray-700 max-w-prose">
    <NotionRichText
      richText={[
        rt('l-1', 'Most of my open source lives on '),
        rt('l-2', 'GitHub', {}, 'https://github.com'),
        rt('l-3', ', and I write occasionally at '),
        rt('l-4', 'bessa.me', { bold: true }, 'https://bessa.me'),
        rt('l-5', '.'),
      ]}
    />
  </p>
);
