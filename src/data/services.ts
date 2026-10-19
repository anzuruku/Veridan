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
      '30 days of support after launch',
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
      'Basic search engine setup',
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
];
