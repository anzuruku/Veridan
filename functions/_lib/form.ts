// Shared helpers for the two form handlers (contact.ts and audit.ts).
// Fix a bug or add a protection here once and both forms get it.
import { site } from '../../src/data/site';

export type Env = { RESEND_API_KEY?: string; TURNSTILE_SECRET?: string; CONTACT_TO?: string };
export type Context = { request: Request; env: Env };

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Real form posts are well under 10 KB. Anything bigger is not a person.
const MAX_BODY_BYTES = 20_000;

export function clean(value: FormDataEntryValue | null, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export function notice(title: string, message: string, backHref: string, backLabel: string, status: number): Response {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title></head><body style="font-family:system-ui,sans-serif;max-width:560px;margin:4rem auto;padding:0 16px;line-height:1.5"><h1>${title}</h1><p>${message}</p><p><a href="${backHref}">${backLabel}</a></p></body></html>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

export function thanks(): Response {
  return new Response(null, { status: 303, headers: { Location: '/thanks' } });
}

// Cheap bot and abuse checks that run before any email is sent.
// Returns a Response to stop the request, or null to carry on.
// Note: this is not rate limiting. Add a Cloudflare rate limiting rule for /api/* in the dashboard.
export function guardRequest(request: Request, fail: (message: string, status: number) => Response): Response | null {
  // Forms are posted from our own pages, so the Origin (or Referer) must be our own host.
  const source = request.headers.get('Origin') ?? request.headers.get('Referer');
  if (source) {
    try {
      if (new URL(source).host !== new URL(request.url).host) {
        return fail('This request did not come from our website.', 403);
      }
    } catch {
      return fail('This request could not be checked.', 400);
    }
  }

  const length = Number(request.headers.get('Content-Length') ?? '0');
  if (length > MAX_BODY_BYTES) {
    return fail('That submission is too large.', 413);
  }
  return null;
}

// Returns true when the Turnstile check passes, or when Turnstile is not switched on.
export async function turnstilePasses(request: Request, env: Env, form: FormData): Promise<boolean> {
  if (!env.TURNSTILE_SECRET) return true;
  const token = clean(form.get('cf-turnstile-response'), 2048);
  try {
    const check = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET,
        response: token,
        remoteip: request.headers.get('CF-Connecting-IP') ?? '',
      }),
    });
    const result = (await check.json()) as { success: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

export function recipient(env: Env): string {
  return env.CONTACT_TO || site.email;
}

// Sends one email through Resend. Returns true when Resend accepted it.
export async function sendEmail(
  env: Env,
  mail: { to: string; subject: string; text: string; replyTo: string },
): Promise<boolean> {
  try {
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Until a domain is verified in Resend, this sender only delivers to the account owner's address.
        from: `${site.name} <onboarding@resend.dev>`,
        to: [mail.to],
        reply_to: EMAIL_PATTERN.test(mail.replyTo) ? mail.replyTo : undefined,
        subject: mail.subject,
        text: mail.text,
      }),
    });
    return sent.ok;
  } catch {
    return false;
  }
}
