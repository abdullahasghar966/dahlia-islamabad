"use client";

import { useEffect, useState } from "react";
import { siteSettings } from "@/lib/content/site";
import { formatTime, islamabadDayIndex } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * Highlights today in Islamabad (11-INNER-PAGES.md /visit).
 *
 * The current day is resolved after mount rather than during render: the server
 * renders at ISR time and the visitor may be in any timezone, so computing it
 * in both places would produce a hydration mismatch.
 */
export function HoursTable({ className }: { className?: string }) {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday(islamabadDayIndex());
  }, []);

  return (
    <table className={cn("w-full border-collapse text-small", className)}>
      <caption className="sr-only">Opening hours, Islamabad time</caption>
      <tbody>
        {siteSettings.hours.map((row, index) => {
          const isToday = today === index;
          return (
            <tr
              key={row.day}
              className={cn(
                "border-b border-current/10 transition-colors duration-300",
                isToday && "font-semibold",
              )}
            >
              <th scope="row" className="py-2.5 text-left font-normal">
                <span className={cn("inline-flex items-center gap-2", isToday && "font-semibold")}>
                  {isToday && (
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full bg-current"
                    />
                  )}
                  {row.day}
                  {isToday && <span className="sr-only">(today)</span>}
                </span>
              </th>
              <td className="py-2.5 text-right tabular-nums">
                {row.closed ? (
                  "Closed"
                ) : (
                  <>
                    {formatTime(row.open)} <span className="opacity-50">–</span>{" "}
                    {formatTime(row.close)}
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
