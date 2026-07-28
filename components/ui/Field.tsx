"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type BaseFieldProps = {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
};

const control = [
  "w-full min-h-11 rounded-pill border border-current/25 bg-transparent px-4 py-2.5",
  "text-body text-current placeholder:text-current/40",
  "transition-[border-color,box-shadow] duration-300",
  "focus:border-current/60 focus:shadow-[0_0_0_4px_color-mix(in_srgb,currentColor_10%,transparent)]",
  "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dahlia",
  "aria-[invalid=true]:border-dahlia",
].join(" ");

/** Label + control + error wired via aria-describedby (13 §3). */
export function Field({
  label,
  error,
  hint,
  className,
  children,
}: BaseFieldProps & { children: (ids: { id: string; describedBy?: string }) => React.ReactNode }) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ");

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="eyebrow opacity-75">
        {label}
      </label>
      {children({ id, describedBy: describedBy || undefined })}
      {hint && !error ? (
        <p id={hintId} className="text-small opacity-60">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-small text-dahlia">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Input({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & { className?: string }) {
  return <input {...props} className={cn(control, className)} />;
}

export function Textarea({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"textarea"> & { className?: string }) {
  return <textarea {...props} className={cn(control, "min-h-24 rounded-card", className)} />;
}

export function Select({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"select"> & { className?: string }) {
  return (
    <select {...props} className={cn(control, "appearance-none pr-10", className)}>
      {children}
    </select>
  );
}
