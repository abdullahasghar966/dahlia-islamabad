import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn("font-display-sm leading-none tracking-[0.24em] uppercase", className)}
      style={{ fontVariationSettings: '"opsz" 60, "SOFT" 24, "WONK" 0', fontWeight: 500 }}
    >
      Dahlia
    </span>
  );
}
