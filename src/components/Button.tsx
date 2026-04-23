import type { ReactNode } from "react";
import { ArrowUpRight, ArrowRight, Calendar, Phone, Mail } from "lucide-react";

type Variant = "primary" | "secondary" | "tertiary" | "outline-white" | "accent" | "ghost";
type Size = "sm" | "md" | "lg";
type Arrow = "right" | "up-right" | "none";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: Variant;
  size?: Size;
  arrow?: Arrow;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--color-cyan)] text-[var(--color-dark-blue)] hover:bg-[color-mix(in_srgb,var(--color-cyan)_85%,var(--color-dark-blue))]",
  accent:
    "bg-[var(--color-cyan)] text-[var(--color-dark-blue)] hover:bg-[color-mix(in_srgb,var(--color-cyan)_85%,var(--color-dark-blue))]",
  secondary:
    "border border-[var(--color-dark-blue)] text-[var(--color-dark-blue)] hover:bg-[var(--color-cyan)] hover:text-[var(--color-dark-blue)]",
  tertiary:
    "text-[var(--color-dark-blue)] underline underline-offset-4 decoration-transparent decoration-2 hover:decoration-[var(--color-cyan)]",
  "outline-white":
    "border border-white text-white hover:bg-white hover:text-[var(--color-dark-blue)]",
  ghost:
    "text-[var(--color-dark-blue)] hover:bg-[var(--color-light-grey)]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-14 px-8 text-[15px]",
};

function resolveArrow(href?: string, arrow?: Arrow) {
  if (arrow === "none") return null;
  if (href?.startsWith("tel:")) return <Phone className="w-4 h-4 btn-arrow" />;
  if (href?.startsWith("mailto:")) return <Mail className="w-4 h-4 btn-arrow" />;
  if (href?.includes("calendly")) return <Calendar className="w-4 h-4 btn-arrow" />;
  if (arrow === "up-right") return <ArrowUpRight className="w-4 h-4 btn-arrow" />;
  return <ArrowRight className="w-4 h-4 btn-arrow" />;
}

export function Button(props: ButtonProps) {
  const {
    href,
    onClick,
    type = "button",
    variant = "primary",
    size = "md",
    arrow,
    className = "",
    children,
  } = props;

  const base =
    "group inline-flex items-center justify-center gap-2.5 font-medium tracking-tight transition-all duration-400 ease-out";
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  const icon = resolveArrow(href, arrow);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
        {icon}
      </a>
    );
  }
  return (
    <button onClick={onClick} type={type} className={classes}>
      {children}
      {icon}
    </button>
  );
}
