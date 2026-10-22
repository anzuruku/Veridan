// Only describe what is true today. Change `status` wording when a project changes.

export type Project = {
  slug: string;
  name: string;
  type: string; // label shown above the project, e.g. 'Open-source product' or 'Client project'
  live: boolean; // only live projects appear on the homepage
  status: string;
  summary: string;
  facts: string[];
  failover?: { label: string; steps: string[] };
  url?: string;
  repoUrl?: string; // source code, shown as a second link when set
  caseStudyUrl?: string; // on-site case study page, e.g. '/work/sokonort/'
};

export const projects: Project[] = [
  {
    slug: 'sudd-library',
    name: 'Sudd Library',
    type: 'Open-source product',
    live: true,
    status: 'Live',
    summary:
      'A free, open-source library of 80+ curriculum resources for South Sudanese schools, built to work offline and on weak connections.',
    facts: [
      'Offline-first progressive web app',
      'Built to the WCAG AA accessibility standard; not yet formally tested against it',
      'Open source, running on Cloudflare at no recurring cost',
      'Content managed through a browser-based editor with direct uploads',
    ],
    url: 'https://sudd-library.pages.dev/',
    repoUrl: 'https://github.com/anzuruku/Sudd-Library',
    caseStudyUrl: '/work/sudd-library/',
  },
  {
    slug: 'sokonort',
    name: 'SokoNort',
    type: 'Own product',
    live: true,
    status: 'Live, onboarding its first customers',
    summary:
      'A local marketplace and delivery app for Adjumani, Uganda, with Mobile Money payments and an AI customer-care assistant.',
    facts: [
      'Mobile Money and cash on delivery, with payment confirmed by webhook',
      'AI customer-care assistant that falls back to a built-in engine if the AI service is down',
      'Push notifications and SMS sent together, so every phone is reached',
      'Four user roles with database-level access rules',
    ],
    url: 'https://sokonort.web.app/',
    caseStudyUrl: '/work/sokonort/',
    failover: {
      label: 'If a photo upload fails, the next layer takes over.',
      steps: ['Cloudflare R2', 'Firebase Storage', 'Stored in the database'],
    },
  },
];
