import "server-only";
import { Resend } from "resend";

/**
 * Server-only email. The key never reaches the client (15 · guardrails).
 *
 * If RESEND_API_KEY is absent the send reports `configured: false` rather than
 * throwing, and the route turns that into an honest message pointing the
 * visitor at the phone — a reservation that silently evaporates is worse than
 * one that admits it failed.
 */

const apiKey = process.env.RESEND_API_KEY;
const to = process.env.CONTACT_TO_EMAIL;

// TODO: replace with a verified sending domain (12-ASSETS-CHECKLIST.md §4).
const FROM = process.env.RESEND_FROM ?? "Dahlia Website <onboarding@resend.dev>";

const resend = apiKey ? new Resend(apiKey) : null;

export type SendResult =
  | { ok: true }
  | { ok: false; configured: false }
  | { ok: false; configured: true; error: string };

export async function sendMail({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendResult> {
  if (!resend || !to) {
    return { ok: false, configured: false };
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: [to],
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });

    if (error) return { ok: false, configured: true, error: error.message };
    return { ok: true };
  } catch (cause) {
    return {
      ok: false,
      configured: true,
      error: cause instanceof Error ? cause.message : "Unknown send failure",
    };
  }
}

/** Escape anything that came from a form before it goes into an HTML email. */
export function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function emailShell(title: string, rows: [string, string][], note?: string) {
  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#4A4335;font-size:13px;white-space:nowrap">${esc(
          label,
        )}</td><td style="padding:6px 0;color:#17130E;font-size:15px">${esc(value)}</td></tr>`,
    )
    .join("");

  return `<div style="font-family:ui-sans-serif,system-ui,sans-serif;background:#F6F1E4;padding:32px">
  <div style="max-width:520px;margin:0 auto;background:#FBF6EA;border-radius:16px;padding:28px">
    <p style="margin:0 0 4px;letter-spacing:.08em;text-transform:uppercase;font-size:11px;color:#4A4335">Dahlia Islamabad</p>
    <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:24px;color:#17130E;font-weight:400">${esc(title)}</h1>
    <table style="border-collapse:collapse">${body}</table>
    ${note ? `<p style="margin:20px 0 0;font-size:13px;color:#4A4335">${esc(note)}</p>` : ""}
  </div>
</div>`;
}
