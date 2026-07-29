import { SkillsSection } from 'bessa-me-site';
import { cardClassName, pageClassName, skills } from './_fixtures';

// A two-column mono grid of gauge rows. Cells rule right in solid ink and down
// in dotted rule; the bottom row drops its rule so the section's own border
// closes the block. Below `sm` it collapses to one column.
//
// The gauge is the design decision worth seeing: the bar is a fixed-width
// ink-bordered box, and `percentage` fills it in accent — except at 100, where
// it fills in ink instead, so a maxed-out skill reads as solid rather than as
// "almost full". The numeral repeats the value on the right.
//
// Names take the slack and wrap: real entries run as long as "Software
// Engineering Teams Leadership", which no fixed column holds without an
// ellipsis. The bar and numeral stay aligned regardless.

export const Gauges = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <SkillsSection skills={skills} />
    </div>
  </div>
);

// An odd count leaves the last cell spanning its row — the last-row rule test
// differs between the one- and two-column layouts, and this is the odd case.
export const OddCount = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <SkillsSection skills={skills.slice(0, 5)} />
    </div>
  </div>
);

// The full range, so the accent fill and the ink-at-100 rule sit side by side.
export const FullRange = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <SkillsSection
        skills={[
          { id: 'r-1', name: 'Maxed out', percentage: 100 },
          { id: 'r-2', name: 'Strong', percentage: 80 },
          { id: 'r-3', name: 'Working knowledge', percentage: 55 },
          { id: 'r-4', name: 'Learning', percentage: 25 },
        ]}
      />
    </div>
  </div>
);
