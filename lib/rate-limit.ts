/**
 * Fixed-window rate limiter for the form endpoints (13-SEO-PERF-A11Y.md §4).
 *
 * LIMITATION: this counts in the memory of a single server instance. On Vercel
 * that means each lambda has its own window, so the effective limit is per
 * instance rather than global — enough to stop a naive script, not a determined
 * one. Before launch, back this with Upstash Redis (or Vercel KV) so the count
 * is shared. The call signature below is deliberately async so that swap needs
 * no changes at the call sites.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Stop the map growing without bound on a long-lived instance. */
function sweep(now: number) {
  if (buckets.size < 5000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export async function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 } = {},
): Promise<{ ok: boolean; retryAfter: number }> {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  existing.count += 1;

  if (existing.count > limit) {
    return { ok: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }

  return { ok: true, retryAfter: 0 };
}

/** Best-effort client identity from proxy headers. */
export function clientKey(request: Request, scope: string) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  return `${scope}:${ip}`;
}
