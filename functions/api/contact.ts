// Cloudflare Pages Function: receives the contact form and emails it to you.
// Shared checks and email sending live in functions/_lib/form.ts.
// Secrets are set in Cloudflare Pages, never in this file:
//   RESEND_API_KEY   (required) email delivery key from resend.com
//   TURNSTILE_SECRET (recommended) secret key from Cloudflare Turnstile
//   CONTACT_TO       (optional) where messages go; defaults to site.email
import { clean, guardRequest, notice, recipient, sendEmail, thanks, turnstilePasses, type Context } from '../_lib/form';

const fail = (message: string, status: number) =>
  notice('Message not sent', message, '/contact/', 'Back to the contact form', status);

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  const blocked = guardRequest(request, fail);
  if (blocked) return blocked;

  const form = await request.formData();

  // Honeypot: real visitors leave this field empty, bots often fill it in.
  if (clean(form.get('website'), 200)) return thanks();

  const name = clean(form.get('name'), 100);
  const contact = clean(form.get('contact'), 100);
  const service = clean(form.get('service'), 100) || 'Not stated';
  const source = clean(form.get('source'), 100) || 'Not stated';
  const message = clean(form.get('message'), 2000);

  if (!name || !contact || !message) {
    return fail('Please fill in your name, contact details and message, then try again.', 400);
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
    subject: `New enquiry from ${name}`,
    text: `Name: ${name}\nContact: ${contact}\nService: ${service}\nHeard about us via: ${source}\n\n${message}\n`,
  });
  if (!ok) return fail('We could not send your message. Please reach us on WhatsApp instead.', 502);
  return thanks();
}
