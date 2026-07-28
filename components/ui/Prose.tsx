import { cn } from "@/lib/utils";

/**
 * Readable typographic column for legal and editorial pages.
 * Styled here rather than via a plugin so it themes with the color journey.
 */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        "[&_p]:mt-5 [&_p]:text-body [&_p]:leading-relaxed [&_p]:opacity-80",
        "[&_h2]:mt-12 [&_h2]:text-h3 [&_h2]:leading-tight [&_h2:first-child]:mt-0",
        "[&_h3]:mt-9 [&_h3]:text-lead [&_h3]:font-semibold",
        "[&_ul]:mt-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2.5 [&_ul]:opacity-80",
        "[&_li]:relative [&_li]:pl-5",
        "[&_li]:before:absolute [&_li]:before:top-[0.7em] [&_li]:before:left-0",
        "[&_li]:before:h-1 [&_li]:before:w-1 [&_li]:before:rounded-full [&_li]:before:bg-current",
        "[&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4",
        "[&_strong]:font-semibold [&_strong]:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
