// To add a service, add one entry here. The homepage and the Services page update by themselves.
// tier: 'core' services are the main offer and are shown first. 'supporting' services are shown below them.
// status: 'live' shows normally. 'coming-soon' shows a dashed row with a badge.
// price / timeline: leave price empty to show "Ask for a quote".

export type Service = {
  slug: string;
  name: string;
  tier: 'core' | 'supporting';
  tagline: string;
  bestFor: string;
  includes: string[];
  price: string;
  timeline: string;
  status: 'live' | 'coming-soon';
};

export const services: Service[] = [
  {
    slug: 'ai-automation',
    name: 'Starter automation',
    tier: 'core',
    tagline: 'One AI assistant or automated workflow, set up and handed over to you.',
    bestFor: 'Best for: businesses that get the same questions and tasks every day.',
    includes: [
      'One customer-care assistant or one workflow, your choice',
      'Setup, testing and handover, with all logins and files passed to you',
      '30 days of support after launch, including fixes',
    ],
    price: '',
    timeline: 'Typically 1 to 2 weeks',
    status: 'live',
  },
  {
    slug: 'startup-launch',
    name: 'Starter website',
    tier: 'core',
    tagline: 'A logo, a brand look and a mobile website, delivered together.',
    bestFor: 'Best for: new businesses and brands that need a credible online presence fast.',
    includes: [
      'A 3 to 5 page website built for mobile',
      'Logo and a simple brand guide',
      'Contact form and business email setup',
      'Basic search setup (SEO)',
      'Two rounds of revisions',
    ],
    price: '',
    timeline: 'Typically 2 to 3 weeks, once we have your content',
    status: 'live',
  },
  {
    slug: 'online-admin',
    name: 'Monthly admin plan',
    tier: 'supporting',
    tagline: 'We handle your online accounts and paperwork every month, on an agreed plan.',
    bestFor: 'Best for: owners and busy teams who need paperwork and accounts handled.',
    includes: [
      'A fixed number of tasks or hours each month, agreed in writing',
      'Managing profiles and accounts on the platforms you use',
      'Forms, applications and registrations',
      'Document preparation: letters, CVs, scans and formatting',
      'Email drafting and deadline reminders',
      'Updating your details, including payment information, with your written approval',
    ],
    price: '',
    timeline: 'Monthly, agreed in writing',
    status: 'live',
  },
  {
    slug: 'website-improvement',
    name: 'Improve your existing website',
    tier: 'core',
    tagline: 'A written review of your current site, followed by fixes to the pages that matter most.',
    bestFor: 'Best for: businesses that already have a website that is slow, hard to use on a phone, or not bringing in enquiries.',
    includes: [
      'A plain-language audit, with fixes ranked by priority',
      'Mobile layout, speed and contact form fixes',
      'Basic search setup (SEO), including page titles and descriptions',
      'A redesign of key pages, if the audit shows it is needed',
    ],
    price: '',
    timeline: 'Agreed in writing after the audit',
    status: 'live',
  },
  {
    slug: 'website-care',
    name: 'Website care contract',
    tier: 'supporting',
    tagline: 'We keep your website updated, backed up and secure, on an annual contract.',
    bestFor: 'Best for: businesses that want their website kept running without managing it themselves.',
    includes: [
      'Updates to the website software and regular security checks',
      'Regular backups of your website',
      'A set number of small text or photo changes each month, agreed in writing',
      'Replies within one working day',
    ],
    price: '',
    timeline: 'Annual contract, agreed in writing',
    status: 'live',
  },
];
