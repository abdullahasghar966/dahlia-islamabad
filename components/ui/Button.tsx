import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { Magnetic } from "@/components/motion/Magnetic";
import { cn } from "@/lib/utils";

/**
 * 04-DESIGN-SYSTEM.md §5. Everything is a pill; focus-visible is a 2px dahlia
 * ring; min touch target is 44px on every size.
 */
const button = cva(
  [
    "relative inline-flex items-center justify-center gap-2 rounded-pill",
    "font-sans font-medium tracking-tight whitespace-nowrap",
    "min-h-11 transition-[transform,background-color,color,border-color,box-shadow]",
    "duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dahlia",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        /** Solid ink on light, inverted to the page ink on dark bands. */
        primary: [
          "bg-[var(--page-fg)] text-[color:var(--page-bg)]",
          "hover:scale-[1.03] active:scale-[0.99]",
          "shadow-[0_10px_30px_-12px_rgb(23_19_14/0.45)]",
        ],
        secondary: [
          "border border-current/35 text-[color:var(--page-fg)]",
          "hover:bg-[var(--page-fg)] hover:text-[color:var(--page-bg)]",
        ],
        ghost: ["text-[color:var(--page-fg)] hover:opacity-70 px-0"],
        dahlia: [
          "bg-dahlia text-cream hover:scale-[1.03] active:scale-[0.99]",
          "shadow-[0_10px_30px_-12px_rgb(23_19_14/0.45)]",
        ],
      },
      size: {
        sm: "px-4 text-small",
        md: "px-6 text-body",
        lg: "px-8 py-4 text-lead",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type BaseProps = VariantProps<typeof button> & {
  children: React.ReactNode;
  className?: string;
  /** Wrap in the pointer-follow effect (desktop, motion-safe only). */
  magnetic?: boolean;
};

type AnchorProps = BaseProps &
  Omit<React.ComponentPropsWithoutRef<"a">, "className" | "children"> & {
    href: string;
  };

type ButtonProps = BaseProps &
  Omit<React.ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: never;
  };

export function Button(props: AnchorProps | ButtonProps) {
  const { children, className, variant, size, magnetic = false, ...rest } = props;
  const classes = cn(button({ variant, size }), className);

  const inner =
    "href" in rest && rest.href ? (
      isExternal(rest.href) ? (
        <a
          {...(rest as React.ComponentPropsWithoutRef<"a">)}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ) : (
        <Link {...(rest as React.ComponentPropsWithoutRef<"a"> & { href: string })} className={classes}>
          {children}
        </Link>
      )
    ) : (
      <button
        type="button"
        {...(rest as React.ComponentPropsWithoutRef<"button">)}
        className={classes}
      >
        {children}
      </button>
    );

  return magnetic ? <Magnetic strength={0.28}>{inner}</Magnetic> : inner;
}

function isExternal(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith("tel:") || href.startsWith("mailto:");
}
