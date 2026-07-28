import { NextResponse } from "next/server";
import { emailShell, sendMail } from "@/lib/mailer";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Malformed request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message ?? "Please check the form." },
      { status: 400 },
    );
  }

  const { name, email, message, company } = parsed.data;
  if (company) return NextResponse.json({ ok: true });

  // Limit deliveries, not rejected payloads — see the note in /api/reserve.
  const limit = await rateLimit(clientKey(request, "contact"), { limit: 4, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: "Slow down a moment." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const result = await sendMail({
    subject: `Website message — ${name}`,
    html: emailShell("New message", [
      ["Name", name],
      ["Email", email],
      ["Message", message],
    ]),
    replyTo: email,
  });

  if (!result.ok && !result.configured) {
    console.warn("[contact] mail not configured; message not delivered:", { name, email });
    return NextResponse.json(
      { ok: false, message: "Messaging isn't switched on yet — please call or WhatsApp us." },
      { status: 503 },
    );
  }

  if (!result.ok) {
    console.error("[contact] send failed:", result.error);
    return NextResponse.json({ ok: false, message: "That didn't send." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
