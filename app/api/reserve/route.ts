import { NextResponse } from "next/server";
import { emailShell, sendMail } from "@/lib/mailer";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { reserveSchema } from "@/lib/validation";
import { formatTime } from "@/lib/utils";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Malformed request." }, { status: 400 });
  }

  const parsed = reserveSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: parsed.error.issues[0]?.message ?? "Please check the form.",
        field: parsed.error.issues[0]?.path[0],
      },
      { status: 400 },
    );
  }

  const { company, name, phone, date, time, party, note } = parsed.data;

  // Honeypot: a real person never fills this. Accept silently so bots learn nothing.
  if (company) return NextResponse.json({ ok: true });

  /**
   * Rate limit only what actually costs something — a delivered email.
   * Counting rejected payloads instead would lock a guest out of the form
   * after five ordinary typos, which is a worse failure than the one it guards.
   */
  const limit = await rateLimit(clientKey(request, "reserve"), { limit: 5, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: "That's a lot of requests. Give it a minute." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const result = await sendMail({
    subject: `Table request — ${name}, ${party} on ${date}`,
    html: emailShell(
      "New table request",
      [
        ["Name", name],
        ["Phone", phone],
        ["Date", date],
        ["Time", formatTime(time)],
        ["Party", `${party} ${party === 1 ? "person" : "people"}`],
        ...(note ? ([["Note", note]] as [string, string][]) : []),
      ],
      "Sent from the Dahlia website reservation form.",
    ),
  });

  if (!result.ok && !result.configured) {
    // Nothing is configured to deliver this yet — do not pretend it arrived.
    console.warn("[reserve] RESEND_API_KEY/CONTACT_TO_EMAIL not set; request not delivered:", {
      name,
      phone,
      date,
      time,
      party,
    });
    return NextResponse.json(
      {
        ok: false,
        message: "Online booking isn't switched on yet.",
      },
      { status: 503 },
    );
  }

  if (!result.ok) {
    console.error("[reserve] send failed:", result.error);
    return NextResponse.json(
      { ok: false, message: "We couldn't send that just now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
