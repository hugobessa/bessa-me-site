// Bundle entry for the design-system build (cfg --entry).
//
// This repo is a Next.js app, not a published package: there is no dist/ and
// no types field for the converter to discover exports from. This barrel is
// the explicit stand-in — every component that should land in
// window.BessaMeSite is re-exported here, and .design-sync/config.json's
// componentSrcMap names the same ones so discovery matches the bundle.
//
// Adding a component to the design system = add it in both places.

// Layout primitives — the Terminal Grid shell everything else sits in.
export { Section } from '../components/Section';
export { Hero } from '../components/Hero';
export { NavBar } from '../components/NavBar';
export { ThemeToggle } from '../components/ThemeToggle';

// Content sections.
export { HistorySection } from '../components/HistorySection';
export { JobsHistory } from '../components/JobsHistory';
export { EducationHistory } from '../components/EducationHistory';
export { SkillsSection, LanguagesSection } from '../components/SkillsSection';
export { Portfolio } from '../components/Portfolio';
export { ContactSection } from '../components/ContactSection';

// Leaf pieces.
export { ContactForm } from '../components/ContactForm';
export { DynamicBrandedIcon } from '../components/DynamicBrandedIcon';
export { NotionRichText } from '../components/NotionRichText';
