import { LanguagesSection } from 'bessa-me-site';
import { cardClassName, languages, pageClassName } from './_fixtures';

// The same two-column grid as SkillsSection, from the same source file, but
// carrying prose instead of a gauge.
//
// Note the deliberate split in voice: the language name is mono uppercase
// metadata in a fixed column (names here are short, so a fixed column keeps the
// levels aligned), while the level is body copy — levels read as sentences
// ("Full professional proficiency"), and mono uppercase would shout them.

export const Levels = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <LanguagesSection languages={languages} />
    </div>
  </div>
);

// Two entries fill a single row of the two-column grid.
export const TwoLanguages = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <LanguagesSection languages={languages.slice(0, 2)} />
    </div>
  </div>
);

// Long levels wrap inside their cell without disturbing the name column.
export const LongLevels = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <LanguagesSection
        languages={[
          {
            id: 'll-1',
            name: 'English',
            level: 'Full professional proficiency — daily working language',
            order: 1,
          },
          {
            id: 'll-2',
            name: 'Spanish',
            level: 'Limited working proficiency, reading well above speaking',
            order: 2,
          },
        ]}
      />
    </div>
  </div>
);
