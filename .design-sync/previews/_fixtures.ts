// Shared sample data for the authored preview cards.
//
// NOT Hugo's real CV — these are realistic-shaped fixtures. The site's real
// content comes from Notion at build time; the design system ships the
// components, so previews need data of the right SHAPE with believable text.
//
// Images are inline SVG data URIs on purpose: the render check and the grading
// captures run in headless chromium, and any remote logo/screenshot URL would
// make those runs network-dependent and intermittently blank.
//
// Filename starts with `_` and is .ts (not .tsx) so the converter's
// preview scan never mistakes it for a component preview.

type Color =
  | 'default' | 'gray' | 'brown' | 'orange' | 'yellow' | 'green' | 'blue'
  | 'purple' | 'pink' | 'red' | 'gray_background' | 'brown_background'
  | 'orange_background' | 'yellow_background' | 'green_background'
  | 'blue_background' | 'purple_background' | 'pink_background' | 'red_background';

export interface RichTextItem {
  id: string;
  type: 'text' | 'mention' | 'equation';
  text?: { content: string; link?: { url?: string } };
  equation?: string;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: Color;
  };
}

const plain = {
  bold: false,
  italic: false,
  strikethrough: false,
  underline: false,
  code: false,
  color: 'default' as Color,
};

/** Build one Notion rich-text run. */
export const rt = (
  id: string,
  content: string,
  annotations: Partial<RichTextItem['annotations']> = {},
  link?: string,
): RichTextItem => ({
  id,
  type: 'text',
  text: { content, ...(link ? { link: { url: link } } : {}) },
  annotations: { ...plain, ...annotations },
});

/** Rounded-square monogram logo, sized for the 64x64 slot the history rows use. */
export const logo = (letter: string, bg: string): string =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
      `<rect width="64" height="64" rx="14" fill="${bg}"/>` +
      `<text x="32" y="43" font-family="Helvetica,Arial,sans-serif" font-size="30" ` +
      `font-weight="700" fill="#ffffff" text-anchor="middle">${letter}</text></svg>`,
  );

/** 4:3 cover art for portfolio cards. */
export const cover = (title: string, from: string, to: string): string =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">` +
      `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
      `<stop offset="0%" stop-color="${from}"/><stop offset="100%" stop-color="${to}"/>` +
      `</linearGradient></defs><rect width="400" height="300" fill="url(#g)"/>` +
      `<text x="28" y="264" font-family="Helvetica,Arial,sans-serif" font-size="26" ` +
      `font-weight="700" fill="#ffffff" opacity="0.95">${title}</text></svg>`,
  );

export const organizations = {
  'org-vinta': {
    id: 'org-vinta',
    name: 'Vinta Software',
    logo: logo('V', '#ea580c'),
    link: 'https://www.vinta.com.br',
  },
  'org-northloop': {
    id: 'org-northloop',
    name: 'North Loop',
    logo: logo('N', '#0f172a'),
    link: 'https://example.com/north-loop',
  },
  'org-ufpe': {
    id: 'org-ufpe',
    name: 'Universidade Federal de Pernambuco',
    logo: logo('U', '#1d4ed8'),
    link: 'https://www.ufpe.br',
  },
  'org-rocketseat': {
    id: 'org-rocketseat',
    name: 'Rocketseat',
    logo: logo('R', '#7c3aed'),
    link: 'https://example.com/rocketseat',
  },
};

export const jobs = [
  {
    id: 'job-1',
    title: 'Engineering Manager',
    organizationId: 'org-vinta',
    date: 'Mar 2021 - Present',
    description: [
      rt('job-1-a', 'Leads a team of eight engineers across three product squads, '),
      rt('job-1-b', 'owning delivery end to end', { bold: true }),
      rt('job-1-c', ' — from discovery through production support. Introduced the '),
      rt('job-1-d', 'RFC process', { code: true }),
      rt('job-1-e', ' that now precedes every architectural change.'),
    ],
  },
  {
    id: 'job-2',
    title: 'Senior Software Engineer',
    organizationId: 'org-northloop',
    date: 'Jun 2018 - Feb 2021',
    description: [
      rt('job-2-a', 'Rebuilt the customer dashboard in React and TypeScript, cutting median '),
      rt('job-2-b', 'time to first byte by 60%', { bold: true }),
      rt('job-2-c', '. Owned the design system that the rest of the product later adopted.'),
    ],
  },
  {
    id: 'job-3',
    title: 'Full Stack Developer',
    organizationId: 'org-rocketseat',
    date: 'Jan 2016 - May 2018',
    description: [
      rt('job-3-a', 'Built and maintained Django and React applications for education clients, '),
      rt('job-3-b', 'and mentored six junior developers through their first year.'),
    ],
  },
];

export const education = [
  {
    id: 'edu-1',
    course: 'BSc in Computer Engineering',
    organizationId: 'org-ufpe',
    date: 'Feb 2011 - Dec 2015',
    description: [
      rt('edu-1-a', 'Focus on distributed systems and human-computer interaction. '),
      rt('edu-1-b', 'Graduated with honours', { bold: true }),
      rt('edu-1-c', '; final project on real-time collaborative editing.'),
    ],
  },
  {
    id: 'edu-2',
    course: 'Postgraduate Certificate, Product Management',
    organizationId: 'org-rocketseat',
    date: 'Mar 2019 - Nov 2019',
    description: [
      rt('edu-2-a', 'Evening programme covering discovery, roadmapping and metrics for '),
      rt('edu-2-b', 'engineer-led product teams.'),
    ],
  },
];

export const portfolio = [
  {
    id: 'pf-1',
    title: 'Design system for a fintech dashboard',
    link: 'https://example.com/case/fintech-design-system',
    tags: ['React', 'TypeScript', 'Design Systems'],
    image: cover('Fintech DS', '#ea580c', '#f59e0b'),
  },
  {
    id: 'pf-2',
    title: 'Scaling a Django monolith to 2M requests a day',
    link: 'https://example.com/writing/scaling-django',
    tags: ['Python', 'Django', 'Architecture'],
    image: cover('Scaling Django', '#0f172a', '#334155'),
  },
  {
    id: 'pf-3',
    title: 'What I learned managing my first engineering team',
    link: 'https://example.com/writing/first-team',
    tags: ['Leadership', 'Writing'],
    image: cover('First Team', '#7c3aed', '#c084fc'),
  },
  {
    id: 'pf-4',
    title: 'Open source: notion-to-markdown exporter',
    tags: ['Open Source', 'TypeScript'],
    image: cover('notion-md', '#1d4ed8', '#38bdf8'),
  },
];

export const portfolioTags = [
  'React',
  'TypeScript',
  'Python',
  'Django',
  'Design Systems',
  'Architecture',
  'Leadership',
  'Writing',
  'Open Source',
];
