import { JobsHistory } from 'bessa-me-site';
import { cardClassName, jobs, organizations, pageClassName } from './_fixtures';

// A thin adapter over HistorySection: it maps Notion-shaped job data into
// timeline entries and fixes the id ("work") and title ("job history"). Build
// with HistorySection directly if you want a different heading; use this one
// when the data is already in the Notion shape.
//
// organizationsDataHash must contain every organizationId the entries
// reference — the lookup is unguarded, so a missing key throws while resolving
// the row's logo.
//
// Each row's description sits behind a "see more" useState toggle, so a static
// card always shows the collapsed first paint.

export const FullHistory = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <JobsHistory jobsData={jobs} organizationsDataHash={organizations} />
    </div>
  </div>
);

// One role: no timeline rail is drawn, because a single entry is a point.
export const SingleRole = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <JobsHistory
        jobsData={[jobs[0]]}
        organizationsDataHash={organizations}
      />
    </div>
  </div>
);
