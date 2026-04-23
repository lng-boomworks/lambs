interface LogoProps {
  variant?: "colour" | "white";
  className?: string;
  width?: number;
}

export function Logo({ variant = "colour", className = "", width = 140 }: LogoProps) {
  const src =
    variant === "white"
      ? "/images/logo-lambs-group-white.svg"
      : "/images/logo-lambs-group-colour.svg";

  return (
    <img
      src={src}
      alt="Lambs Group"
      className={className}
      width={width}
      height={width * (48 / 280)}
      style={{ display: "block" }}
    />
  );
}
