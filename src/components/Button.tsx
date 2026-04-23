import type React from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";

type Variant = "primary" | "accent" | "ghost" | "outline-white" | "white";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  external?: boolean;
  arrow?: "right" | "up-right" | "none";
  size?: "md" | "lg";
}

/**
 * Button — four variants tuned for the Lambs brand:
 *  - primary:  ink background, white text (default dark CTA)
 *  - accent:   hi-vis yellow background, ink text (standout CTA)
 *  - ghost:    transparent with ink border
 *  - outline-white: transparent with white border (on dark)
 *  - white:    solid white background, ink text (on dark)
 *
 * All variants animate the trailing arrow on hover via the .btn-arrow class
 * defined in global.css.
 */
export function Button({
  variant = "primary",
  href,
  external,
  className = "",
  children,
  arrow = "right",
  size = "md",
  ...props
}: ButtonProps) {
  const sizeClass =
    size === "lg"
      ? "px-8 py-4 text-[15px]"
      : "px-6 py-3.5 text-[14px]";

  const base =
    `group btn inline-flex items-center justify-center gap-2.5 rounded-none font-medium tracking-tight ` +
    `transition-all duration-300 ease-out border relative overflow-hidden ${sizeClass}`;

  const variants: Record<Variant, string> = {
    primary:
      "bg-[var(--color-ink)] text-white border-[var(--color-ink)] hover:bg-[var(--color-ink-soft)]",
    accent:
      "bg-[var(--color-hivis)] text-[var(--color-ink)] border-[var(--color-hivis)] hover:bg-[var(--color-hivis-dim)]",
    ghost:
      "bg-transparent text-[var(--color-ink)] border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white",
    "outline-white":
      "bg-transparent text-white border-white/70 hover:bg-white hover:text-[var(--color-ink)]",
    white:
      "bg-white text-[var(--color-ink)] border-white hover:bg-[var(--color-cream)]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  const ArrowIcon = arrow === "up-right" ? ArrowUpRight : ArrowRight;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow !== "none" && (
        <ArrowIcon
          className="btn-arrow relative z-10 w-4 h-4"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
