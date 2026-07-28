import { JobsHistory } from 'bessa-me-site';
import { jobs, organizations } from './_fixtures';

// The per-row description is behind a "See more" button (useState), so the
// static card always shows the collapsed state — that is the real first paint.
// organizationsDataHash must contain every organizationId referenced by
// jobsData; a missing key throws while resolving the logo.

export const FullHistory = () => (
  <div className="p-6 bg-gray-50">
    <JobsHistory jobsData={jobs} organizationsDataHash={organizations} />
  </div>
);

export const SingleRole = () => (
  <div className="p-6 bg-gray-50">
    <JobsHistory jobsData={[jobs[0]]} organizationsDataHash={organizations} />
  </div>
);
