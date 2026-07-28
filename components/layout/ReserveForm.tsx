"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { siteSettings } from "@/lib/content/site";
import { reserveSchema, type ReserveInput } from "@/lib/validation";

type Status = { kind: "idle" | "sending" } | { kind: "sent" } | { kind: "error"; message: string };

const TIMES = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
];

export function ReserveForm({ onDone }: { onDone?: () => void }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const { policy } = siteSettings;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReserveInput>({
    resolver: zodResolver(reserveSchema),
    // Defaults to the smallest reservable table, since that is what this form
    // is actually for.
    defaultValues: { party: policy.reservableFromPartySize, time: "13:00", date: todayISO() },
  });

  const party = Number(watch("party")) || 0;
  const reservable = party >= policy.reservableFromPartySize;

  const onSubmit = handleSubmit(async (values) => {
    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !data.ok) {
        setStatus({
          kind: "error",
          message: data.message ?? "We couldn't send that just now.",
        });
        return;
      }
      setStatus({ kind: "sent" });
      onDone?.();
    } catch {
      setStatus({ kind: "error", message: "Network trouble — please try again." });
    }
  });

  if (status.kind === "sent") {
    return (
      <div className="flex flex-col items-start gap-4 py-6">
        <span className="grid h-12 w-12 place-items-center rounded-pill bg-moss text-forest">
          <Check size={22} aria-hidden />
        </span>
        <h3 className="font-display-sm text-h3">Table requested.</h3>
        <p className="text-ink-soft" role="status">
          We&apos;ll confirm by phone shortly. If it&apos;s within the hour, give us a ring on{" "}
          <a className="link-draw font-medium" href={siteSettings.phoneHref}>
            {siteSettings.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <p className="text-small text-ink-soft">
        We run on a walk-in policy. Tables of {policy.reservableFromPartySize} or more can be
        reserved across the week.
      </p>

      {/* Party size leads — it decides whether a booking is possible at all. */}
      <Field label="Party size" error={errors.party?.message}>
        {({ id, describedBy }) => (
          <Select id={id} aria-describedby={describedBy} {...register("party")}>
            {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "person" : "people"}
                {n === policy.reservableFromPartySize ? " — reservable from here" : ""}
              </option>
            ))}
          </Select>
        )}
      </Field>

      {!reservable ? (
        <div className="flex flex-col gap-4 rounded-card border border-ink/15 bg-ink/[0.03] p-5">
          <p className="font-display-sm text-lead leading-snug">
            A table for {party || "that many"} doesn&apos;t need booking.
          </p>
          <p className="text-small text-ink-soft">
            We seat parties under {policy.reservableFromPartySize} on a first-come basis — just
            come by. Weekends are busy, so call ahead if you&apos;d like to know how the room
            looks before you set off.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button href={siteSettings.phoneHref} variant="secondary" size="sm">
              <Phone size={15} aria-hidden />
              {siteSettings.phone}
            </Button>
            <Button href={siteSettings.whatsapp} variant="secondary" size="sm">
              <MessageCircle size={15} aria-hidden />
              WhatsApp
            </Button>
          </div>
        </div>
      ) : null}

      {/* Everything below only applies to a table we can actually hold. */}
      <div hidden={!reservable} className={reservable ? "flex flex-col gap-5" : undefined}>
        <Field label="Name" error={errors.name?.message}>
          {({ id, describedBy }) => (
            <Input
              id={id}
              autoComplete="name"
              placeholder="Your name"
              aria-invalid={!!errors.name}
              aria-describedby={describedBy}
              {...register("name")}
            />
          )}
        </Field>

        <Field label="Phone" error={errors.phone?.message}>
          {({ id, describedBy }) => (
            <Input
              id={id}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="03xx xxxxxxx"
              aria-invalid={!!errors.phone}
              aria-describedby={describedBy}
              {...register("phone")}
            />
          )}
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Date" error={errors.date?.message}>
            {({ id, describedBy }) => (
              <Input
                id={id}
                type="date"
                min={todayISO()}
                aria-invalid={!!errors.date}
                aria-describedby={describedBy}
                {...register("date")}
              />
            )}
          </Field>

          <Field label="Time" error={errors.time?.message}>
            {({ id, describedBy }) => (
              <Select id={id} aria-describedby={describedBy} {...register("time")}>
                {TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            )}
          </Field>
        </div>

        <Field label="Anything we should know?" error={errors.note?.message}>
          {({ id, describedBy }) => (
            <Textarea
              id={id}
              rows={3}
              placeholder="Birthday, high chair, a table near the plants…"
              aria-describedby={describedBy}
              {...register("note")}
            />
          )}
        </Field>

        <ul className="flex flex-col gap-1.5 text-small text-ink-soft">
          <li>We hold the table for {policy.holdMinutes} minutes past your time.</li>
          <li>
            Tables of {policy.reservableFromPartySize}+ have the table for{" "}
            {Math.round(policy.diningMinutes.large / 60)} hours.
          </li>
          {party >= policy.serviceChargeFromPartySize ? (
            <li>
              A discretionary {policy.serviceChargePercent}% service charge applies to tables of{" "}
              {policy.serviceChargeFromPartySize}+.
            </li>
          ) : null}
        </ul>
      </div>

      {/* honeypot — visually and semantically out of the way */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 overflow-hidden opacity-0"
        {...register("company")}
      />

      {status.kind === "error" ? (
        <p role="alert" className="rounded-card bg-dahlia/10 px-4 py-3 text-small text-dahlia">
          {status.message}{" "}
          <a className="link-draw font-medium" href={siteSettings.phoneHref}>
            Call {siteSettings.phone}
          </a>
        </p>
      ) : null}

      {reservable ? (
        <Button
          type="submit"
          variant="dahlia"
          size="lg"
          disabled={status.kind === "sending"}
          className="mt-1 w-full"
        >
          {status.kind === "sending" ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            "Request a table"
          )}
        </Button>
      ) : null}
    </form>
  );
}

function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}
