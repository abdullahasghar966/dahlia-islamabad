"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: forward to a real error reporter once one is configured.
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-[100svh] place-items-center bg-bone px-6 text-ink">
      <div className="flex max-w-lg flex-col items-center text-center">
        <p className="eyebrow opacity-55">Something wilted</p>

        <h1 className="font-display-lg mt-4 text-h1 leading-[1.0]">
          That didn&apos;t load.
        </h1>

        <p className="mt-6 text-lead opacity-70">
          Our fault, not yours. Try again — and if it keeps happening, give us a ring on{" "}
          <a className="font-medium underline underline-offset-4" href="tel:+923275000969">
            0327 5000969
          </a>
          .
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center rounded-pill bg-ink px-6 text-small font-medium text-bone"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-pill border border-ink/25 px-6 text-small"
          >
            Go home
          </Link>
        </div>

        {error.digest ? (
          <p className="mt-8 text-small opacity-40">Reference: {error.digest}</p>
        ) : null}
      </div>
    </main>
  );
}
