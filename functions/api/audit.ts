// Cloudflare Pages Function: receives the free website review form and emails it to you.
// Shared checks and email sending live in functions/_lib/form.ts. Uses the same secrets as contact.ts.
// Secrets are set in Cloudflare Pages, never in this file:
//   RESEND_API_KEY   (required) email delivery key from resend.com
//   TURNSTILE_SECRET (recommended) secret key from Cloudflare Turnstile
//   CONTACT_TO       (optional) where messages go; defaults to site.email
import { clean, guardRequest, notice, recipient, sendEmail, thanks, turnstilePasses, type Context } from '../_lib/form';

const fail = (message: string, status: number) =>
  notice('Request not sent', message, '/free-audit/', 'Back to the review form', status);

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  const blocked = guardRequest(request, fail);
  if (blocked) return blocked;

  const form = await request.formData();

  // Honeypot: real visitors leave this field empty, bots often fill it in.
  if (clean(form.get('website'), 200)) return thanks();

  const name = clean(form.get('name'), 100);
  const contact = clean(form.get('contact'), 100);
  const concern = clean(form.get('concern'), 100) || 'Not stated';
  const message = clean(form.get('message'), 2000) || 'None';

  // Accept "example.com" as well as "https://example.com".
  let address = clean(form.get('site'), 200);
  if (address && !/^https?:\/\//i.test(address)) address = `https://${address}`;
  let siteUrl = '';
  try {
    const parsed = new URL(address);
    if (parsed.hostname.includes('.')) siteUrl = parsed.toString();
  } catch {
    siteUrl = '';
  }

  if (!name || !contact) {
    return fail('Please fill in your name and contact details, then try again.', 400);
  }
  if (!siteUrl) {
    return fail('Please enter a website address such as yourbusiness.com, then try again.', 400);
  }
  if (!env.RESEND_API_KEY) {
    return fail('The contact form is not set up yet. Please reach us on WhatsApp instead.', 500);
  }
  if (!(await turnstilePasses(request, env, form))) {
    return fail('The security check did not pass. Please go back and try again.', 400);
  }

  const to = recipient(env);
  if (!to) {
    return fail('The contact form is not set up yet. Please reach us on WhatsApp instead.', 500);
  }

  const ok = await sendEmail(env, {
    to,
    replyTo: contact,
    subject: `Free website review request: ${siteUrl}`,
    text: `Free website review request\n\nName: ${name}\nContact: ${contact}\nWebsite: ${siteUrl}\nMain concern: ${concern}\n\nNotes: ${message}\n`,
  });
  if (!ok) return fail('We could not send your request. Please reach us on WhatsApp instead.', 502);
  return thanks();
}
