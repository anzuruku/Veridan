// Everything the whole site needs to know about the business lives here.
// To rename the agency, change `name` and `shortName`. Nothing else is hard-coded.

export const site = {
  name: 'Veridan Digital',
  shortName: 'Veridan',
  url: 'https://veridandigital.pages.dev', // the live address, no trailing slash. Update when the domain changes.
  headline: "Websites, AI agents and automation that keep working when the network doesn't.",
  subhead:
    'Veridan Digital is a small remote team. We build, launch and run the online side of your business, from your website to an assistant that answers customers while you are offline.',
  description:
    'Veridan Digital builds websites, AI agents and automation for businesses, and runs the online admin that keeps them moving. Based in Uganda, working worldwide.',
  location: 'Based in Uganda, working worldwide.',
  email: 'jacobanzuruku@gmail.com', // temporary. Replace with a business email once the domain is bought.
  whatsapp: '256764203022', // digits only with country code. Leave empty to hide the button.
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
    { title: 'Brief', text: 'We agree what you need, the price and the timeline in writing.' },
    { title: 'Build', text: 'You see progress at each milestone, not just at the end.' },
    { title: 'Review', text: 'You ask for changes before anything is final.' },
    { title: 'Launch', text: 'We go live and hand over every file and login.' },
  ],
};
