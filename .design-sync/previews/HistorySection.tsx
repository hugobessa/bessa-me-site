import { HistorySection } from 'bessa-me-site';
import {
  cardClassName,
  education,
  historyEntries,
  organizations,
  pageClassName,
} from './_fixtures';

// The generic timeline band. JobsHistory and EducationHistory are thin adapters
// over this — they map Notion data into `entries` and pass a fixed id/title.
//
// Three behaviours the cards below are built to show:
//   * consecutive entries at the same organization collapse into one row —
//     one logo, one company header, the group's outer span above it, and the
//     roles stacked under dotted rules, each with a small marker of its own on
//     the rail beneath the company's larger one;
//   * with 2+ groups a rail is drawn down the rows, starting and ending on a
//     marker rather than running off the section;
//   * a single entry is a point, not a timeline, so the rail is dropped.
//
// Each row's description is behind a "see more" useState toggle, so the static
// card always shows the collapsed first paint — that is the real first paint,
// not a preview limitation. `organization` is read unguarded (.logo, .name,
// .link), so every entry needs one.

export const Timeline = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <HistorySection id="work" title="job history" entries={historyEntries} />
    </div>
  </div>
);

// One entry: no rail, because there is nothing to connect.
export const SingleEntry = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <HistorySection
        id="work"
        title="job history"
        entries={[historyEntries[0]]}
      />
    </div>
  </div>
);

// The same band reused for a different kind of history — the title is just a
// prop, which is exactly how EducationHistory is built.
export const AsEducation = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <HistorySection
        id="education"
        title="education"
        entries={education.map((item) => ({
          id: item.id,
          date: item.date,
          detail: item.course,
          organization:
            organizations[item.organizationId as keyof typeof organizations],
          description: item.description,
        }))}
      />
    </div>
  </div>
);
