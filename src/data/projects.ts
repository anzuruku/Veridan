// Only describe what is true today. Change `status` wording when a project changes.

export type Project = {
  slug: string;
  name: string;
  live: boolean; // only live projects appear on the homepage
  status: string;
  summary: string;
  facts: string[];
  failover?: { label: string; steps: string[] };
  url?: string;
};

export const projects: Project[] = [
  {
    slug: 'sudd-library',
    name: 'Sudd Library',
    live: true,
    status: 'Live',
    summary:
      'A free, open-source library of 80+ curriculum resources for South Sudanese schools, built to work offline and on weak connections.',
    facts: [
      'Offline-first progressive web app',
      'Meets WCAG AA accessibility standards',
      'Open source, running on Cloudflare at no recurring cost',
      'Content managed through a browser-based editor with direct uploads',
    ],
    url: 'https://sudd-library.anznexus.workers.dev/',
  },
  {
    slug: 'sokonort',
    name: 'SokoNort',
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
    failover: {
      label: 'If a photo upload fails, the next layer takes over.',
      steps: ['Cloudflare R2', 'Firebase Storage', 'Stored in the database'],
    },
  },
];
