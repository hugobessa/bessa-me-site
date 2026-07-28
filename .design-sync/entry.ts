// Bundle entry for the design-system build (cfg --entry).
//
// This repo is a Next.js app, not a published package: there is no dist/ and
// no types field for the converter to discover exports from. This barrel is
// the explicit stand-in — every component that should land in
// window.BessaMeSite is re-exported here, and .design-sync/config.json's
// componentSrcMap names the same seven so discovery matches the bundle.
//
// Adding a component to the design system = add it in both places.

export { ContactForm } from '../components/ContactForm';
export { DynamicBrandedIcon } from '../components/DynamicBrandedIcon';
export { EducationHistory } from '../components/EducationHistory';
export { JobsHistory } from '../components/JobsHistory';
export { NavBar } from '../components/NavBar';
export { NotionRichText } from '../components/NotionRichText';
export { Portfolio } from '../components/Portfolio';
