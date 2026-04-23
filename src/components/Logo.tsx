import { withBase } from "../utils/paths";

interface LogoProps {
  variant?: "colour" | "white";
  className?: string;
  width?: number;
}

export function Logo({ variant = "colour", className = "", width = 140 }: LogoProps) {
  return (
    <img
      src={withBase("/images/lambs-logo-v2.webp")}
      alt="Lambs Group"
      className={className}
      width={width}
      height={width * (241 / 1400)}
      style={{
        display: "block",
        filter: variant === "white" ? "brightness(0) invert(1)" : undefined,
      }}
    />
  );
}
