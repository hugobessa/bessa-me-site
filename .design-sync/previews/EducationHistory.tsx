import { EducationHistory } from 'bessa-me-site';
import {
  cardClassName,
  education,
  organizations,
  pageClassName,
} from './_fixtures';

// The education twin of JobsHistory — same HistorySection underneath, with the
// id fixed to "education" and the title to "education". Its entries carry
// `course` where jobs carry `title`.
//
// Same constraint as JobsHistory: every organizationId must resolve in
// organizationsDataHash, or the row throws while rendering the logo. And the
// description is behind the row's own "see more" toggle, so cards show the
// collapsed state.

export const FullHistory = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <EducationHistory
        educationHistoryData={education}
        organizationsDataHash={organizations}
      />
    </div>
  </div>
);

export const SingleCourse = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <EducationHistory
        educationHistoryData={[education[0]]}
        organizationsDataHash={organizations}
      />
    </div>
  </div>
);
