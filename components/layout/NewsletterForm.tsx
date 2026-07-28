"use client";

import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap-setup";
import { subscribeSchema } from "@/lib/validation";
import { cn } from "@/lib/utils";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

/**
 * S9 · newsletter capture. On success a few petals scatter from the button
 * (06 S9) — skipped entirely under reduced motion.
 */
export function NewsletterForm({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const confetti = useRef<HTMLDivElement>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = subscribeSchema.safeParse({
      email: String(form.get("email") ?? ""),
      company: String(form.get("company") ?? ""),
    });

    if (!parsed.success) {
      setStatus({
        kind: "error",
        message: parsed.error.issues[0]?.message ?? "Please check that email address.",
      });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !data.ok) {
        setStatus({ kind: "error", message: data.message ?? "That didn't go through." });
        return;
      }
      setStatus({ kind: "sent" });
      petals(confetti.current);
    } catch {
      setStatus({ kind: "error", message: "Network trouble — please try again." });
    }
  };

  if (status.kind === "sent") {
    return (
      <p role="status" className={cn("text-lead", className)}>
        You&apos;re on the list. We&apos;ll bring snacks.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("relative", className)}>
      <div ref={confetti} className="pointer-events-none absolute inset-0 overflow-visible" />

      <div
        className={cn(
          "flex flex-col gap-2 sm:flex-row",
          "rounded-card sm:rounded-pill sm:border sm:p-1.5",
          tone === "dark" ? "sm:border-cream/25" : "sm:border-current/25",
        )}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          aria-invalid={status.kind === "error"}
          aria-describedby={status.kind === "error" ? "newsletter-error" : undefined}
          className={cn(
            "min-h-11 flex-1 rounded-pill bg-transparent px-5 text-body",
            "placeholder:text-current/45 focus:outline-none",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dahlia",
            "border border-current/25 sm:border-0",
          )}
        />
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute h-0 w-0 overflow-hidden opacity-0"
        />
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className={cn(
            "inline-flex min-h-11 items-center justify-center gap-2 rounded-pill px-6",
            "text-small font-medium transition-transform duration-300",
            "hover:scale-[1.03] active:scale-[0.99] disabled:opacity-60",
            "motion-reduce:transition-none motion-reduce:hover:scale-100",
            tone === "dark" ? "bg-cream text-forest" : "bg-[var(--page-fg)] text-[color:var(--page-bg)]",
          )}
        >
          {status.kind === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden />
              Joining
            </>
          ) : (
            "Keep me posted"
          )}
        </button>
      </div>

      {status.kind === "error" ? (
        <p id="newsletter-error" role="alert" className="mt-2 px-2 text-small opacity-80">
          {status.message}
        </p>
      ) : null}
    </form>
  );
}

/** A short burst of petals from the middle of the field. */
function petals(host: HTMLDivElement | null) {
  if (!host || prefersReducedMotion()) return;

  const colors = ["#D24E63", "#F0C9C1", "#AFC98A", "#F2C14E"];
  const nodes = Array.from({ length: 14 }).map(() => {
    const petal = document.createElement("span");
    petal.setAttribute("aria-hidden", "true");
    petal.style.cssText = `position:absolute;left:50%;top:50%;width:10px;height:14px;border-radius:60% 60% 60% 60%/70% 70% 40% 40%;background:${
      colors[Math.floor(Math.random() * colors.length)]
    };will-change:transform,opacity;`;
    host.appendChild(petal);
    return petal;
  });

  gsap.to(nodes, {
    x: () => gsap.utils.random(-160, 160),
    y: () => gsap.utils.random(-120, 60),
    rotation: () => gsap.utils.random(-220, 220),
    opacity: 0,
    scale: () => gsap.utils.random(0.6, 1.3),
    duration: 1.5,
    ease: "power2.out",
    stagger: 0.02,
    onComplete: () => nodes.forEach((n) => n.remove()),
  });
}
