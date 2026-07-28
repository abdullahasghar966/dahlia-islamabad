import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow opacity-70", className)}>
      <span className="inline-flex items-center gap-2">
        <span aria-hidden className="inline-block h-px w-6 bg-current opacity-60" />
        {children}
      </span>
    </p>
  );
}
