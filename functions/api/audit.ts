// Cloudflare Pages Function: receives the free website review form and emails it to you.
// Uses the same secrets as contact.ts.
// Secrets are set in Cloudflare Pages, never in this file:
//   RESEND_API_KEY   (required) email delivery key from resend.com
//   TURNSTILE_SECRET (recommended) secret key from Cloudflare Turnstile
//   CONTACT_TO       (optional) where messages go; defaults to site.email
import { site } from '../../src/data/site';

type Env = { RESEND_API_KEY?: string; TURNSTILE_SECRET?: string; CONTACT_TO?: string };
type Context = { request: Request; env: Env };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: FormDataEntryValue | null, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function notice(message: string, status: number): Response {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Request not sent</title></head><body style="font-family:system-ui,sans-serif;max-width:560px;margin:4rem auto;padding:0 16px;line-height:1.5"><h1>Request not sent</h1><p>${message}</p><p><a href="/free-audit/">Back to the review form</a></p></body></html>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

function thanks(): Response {
  return new Response(null, { status: 303, headers: { Location: '/thanks' } });
}

export async function onRequestPost({ request, env }: Context): Promise<Response> {
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
    return notice('Please fill in your name and contact details, then try again.', 400);
  }
  if (!siteUrl) {
    return notice('Please enter a website address such as yourbusiness.com, then try again.', 400);
  }
  if (!env.RESEND_API_KEY) {
    return notice('The contact form is not set up yet. Please reach us on WhatsApp instead.', 500);
  }

  if (env.TURNSTILE_SECRET) {
    const token = clean(form.get('cf-turnstile-response'), 2048);
    const check = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET,
        response: token,
        remoteip: request.headers.get('CF-Connecting-IP') ?? '',
      }),
    });
    const result = (await check.json()) as { success: boolean };
    if (!result.success) {
      return notice('The security check did not pass. Please go back and try again.', 400);
    }
  }

  const to = env.CONTACT_TO || site.email;
  if (!to) {
    return notice('The contact form is not set up yet. Please reach us on WhatsApp instead.', 500);
  }

  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // Until a domain is verified in Resend, this sender only delivers to the account owner's address.
      from: 'Veridan Digital <onboarding@resend.dev>',
      to: [to],
      reply_to: EMAIL_PATTERN.test(contact) ? contact : undefined,
      subject: `Free website review request: ${siteUrl}`,
      text: `Free website review request\n\nName: ${name}\nContact: ${contact}\nWebsite: ${siteUrl}\nMain concern: ${concern}\n\nNotes: ${message}\n`,
    }),
  });

  if (!sent.ok) {
    return notice('We could not send your request. Please reach us on WhatsApp instead.', 502);
  }
  return thanks();
}
