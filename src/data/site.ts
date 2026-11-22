// Everything the whole site needs to know about the business lives here.
// To rename the business, change `brand` and `shortName`. The descriptions below follow it.

const brand = 'Veridan Consulting';

export const site = {
  name: brand,
  shortName: 'Veridan',
  url: 'https://veridandigital.pages.dev', // the live address, no trailing slash. Update when the domain changes.
  headline: "Websites, AI agents and automation that keep working when the network doesn't.",
  subhead: `${brand} is founder-led. We find what is slowing your work down, then build or arrange the fix, from your website to an assistant that answers customers while you are offline.`,
  description: `${brand} is a founder-led technology consultancy based in Uganda. We help businesses and schools find what is slowing their work down and put practical systems in place: websites, AI agents, automation and online admin.`,
  placeStory:
    'We build from a border town where connections drop and power cuts are normal, so what we make is built to keep working.',
  handover:
    'You own what you pay for. At handover we transfer all accounts, files and logins, and show you how to run it.',
  teamLine:
    'We are founder-led. You deal directly with the founder, and we bring in specialists when a project needs them.',
  location: 'Based in Uganda, working worldwide.',
  email: 'jacobanzuruku@gmail.com', // temporary. Replace with a business email once the domain is bought.
  whatsapp: '256761634749', // digits only with country code. Leave empty to hide the button.
  linkedinUrl: '', // company LinkedIn page address. Leave empty until the page is active.
  googleBusinessUrl: '', // Google Business Profile link. Leave empty until the profile is live.
  bookingUrl: '', // your Cal.com link. Leave empty to send people to the contact section.
  turnstileSiteKey: '', // public site key from Cloudflare Turnstile. Leave empty to hide the bot check.
  replyTime: 'one working day',
  founder: 'Anzuruku Jacob',
  positioning: 'Reliable digital systems for businesses operating with limited connectivity and resources.',
  nav: [
    { label: 'Services', href: '/services/' },
    { label: 'Work', href: '/work/' },
    { label: 'How we work', href: '/how-we-work/' },
    { label: 'About', href: '/about/' },
  ],
  proof: [
    'Live work, built and deployed by our founder',
    'A written scope before you pay',
    'Pay in milestones, as work is delivered',
  ],
  process: [
    { title: 'Diagnose and scope', text: 'We find what is slowing your work down, then agree the scope, price and timeline in writing.' },
    { title: 'Build', text: 'You see progress at each milestone, not just at the end.' },
    { title: 'Review', text: 'You ask for changes before anything is final.' },
    { title: 'Hand over', text: 'We go live. At handover we transfer all accounts, files and logins, and show you how to run it.' },
  ],
};
