import { NextResponse } from "next/server";
import { emailShell, sendMail } from "@/lib/mailer";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { subscribeSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Malformed request." }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message ?? "Please check that email." },
      { status: 400 },
    );
  }

  const { email, company } = parsed.data;
  if (company) return NextResponse.json({ ok: true });

  // Limit deliveries, not rejected payloads — see the note in /api/reserve.
  const limit = await rateLimit(clientKey(request, "subscribe"), { limit: 4, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: "Slow down a moment." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  /**
   * TODO: Phase 4 — double opt-in. Right now this notifies the café that someone
   * asked to join. Before this becomes a real mailing list it needs a confirmation
   * email with a signed token, and a list provider to store the subscription.
   */
  const result = await sendMail({
    subject: `Newsletter signup — ${email}`,
    html: emailShell("New newsletter signup", [["Email", email]], "Awaiting double opt-in."),
    replyTo: email,
  });

  if (!result.ok && !result.configured) {
    console.warn("[subscribe] mail not configured; signup not recorded:", email);
    return NextResponse.json(
      { ok: false, message: "The list isn't switched on yet — follow us on Instagram meanwhile." },
      { status: 503 },
    );
  }

  if (!result.ok) {
    console.error("[subscribe] send failed:", result.error);
    return NextResponse.json({ ok: false, message: "That didn't go through." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
