import { useEffect, useRef, useState } from "react";

interface StratPeelProps {
  className?: string;
}

const layers = [
  { label: "Wearing course · 40mm", fill: "#242A38" },
  { label: "Binder course", fill: "#3B435A" },
  { label: "Type 1 sub-base", fill: "#7DA0C3" },
  { label: "Subgrade", fill: "#B8CBDE" },
];

export function StratPeel({ className = "" }: StratPeelProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`strat-peel ${visible ? "is-visible" : ""} ${className}`} aria-hidden="true">
      {layers.map((layer, i) => (
        <div
          key={layer.label}
          className="strat-peel__layer"
          style={{ backgroundColor: layer.fill, transitionDelay: `${i * 140}ms` }}
        >
          <span className="strat-peel__label">{layer.label}</span>
        </div>
      ))}
      <div className="strat-peel__tick" />
    </div>
  );
}
