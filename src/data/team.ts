// Add team members here as they join. List a partner once they have agreed.

export type Member = {
  name: string;
  role: string;
  bio: string;
  links?: { label: string; url: string }[]; // only active accounts, and only with the person's permission
};

export const team: Member[] = [
  {
    name: 'Anzuruku Jacob',
    role: 'Founder and developer',
    bio: 'Full-stack developer. He uses modern tools to build faster, and designs, builds and deploys every system he works on himself. He built and launched Sudd Library and SokoNort.',
    links: [
      { label: 'GitHub', url: 'https://github.com/anzuruku' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/anzuruku-jacob' },
    ],
  },
];
