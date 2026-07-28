import { EducationHistory } from 'bessa-me-site';
import { education, organizations } from './_fixtures';

// Same shape as JobsHistory but keyed on `course` rather than `title`, and the
// description is again behind a "See more" toggle, so the static card shows the
// collapsed state.

export const FullHistory = () => (
  <div className="p-6 bg-gray-50">
    <EducationHistory educationHistoryData={education} organizationsDataHash={organizations} />
  </div>
);

export const SingleDegree = () => (
  <div className="p-6 bg-gray-50">
    <EducationHistory
      educationHistoryData={[education[0]]}
      organizationsDataHash={organizations}
    />
  </div>
);
