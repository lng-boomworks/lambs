import { useEffect, useRef, useState } from "react";

interface StratPeelProps {
  className?: string;
}

// Build-up order: bottom of the build (subgrade) appears first, then each
// layer is laid on top as a real road would be constructed. Heights are
// roughly proportional to real highway construction depths.
const layers = [
  { label: "Wearing course", depth: "40 mm",  fill: "#264A88", heightPct: 14 },
  { label: "Binder course",  depth: "60 mm",  fill: "#3F63A8", heightPct: 16 },
  { label: "Type 1 sub-base", depth: "150 mm", fill: "#6F8EB8", heightPct: 32 },
  { label: "Subgrade",        depth: "Compacted", fill: "#B8CBDE", heightPct: 38 },
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
      {layers.map((layer, i) => {
        // Delay lowest layer first (it's laid first in real construction)
        const stepsFromBottom = layers.length - 1 - i;
        const transitionDelayMs = stepsFromBottom * 220;
        // Settle flash fires just as the slide finishes
        const settleDelayMs = transitionDelayMs + 760;
        return (
          <div
            key={layer.label}
            className="strat-peel__layer"
            style={{
              backgroundColor: layer.fill,
              height: `${layer.heightPct}%`,
              transitionDelay: `${transitionDelayMs}ms`,
              animationDelay: `${settleDelayMs}ms`,
            }}
          >
            <span className="strat-peel__label">{layer.label}</span>
            <span className="strat-peel__depth">{layer.depth}</span>
          </div>
        );
      })}

      <div className="strat-peel__roller" aria-hidden="true">
        <svg viewBox="0 0 120 60" width="80" height="40" preserveAspectRatio="xMidYMid meet">
          <rect x="38" y="6" width="44" height="16" rx="3" fill="#ffffff" />
          <rect x="44" y="10" width="12" height="9" fill="#6CC5EA" />
          <rect x="62" y="10" width="14" height="9" fill="#6CC5EA" />
          <rect x="18" y="20" width="84" height="22" rx="4" fill="#ffffff" />
          <line x1="30" y1="42" x2="90" y2="42" stroke="#264A88" strokeWidth="2" />
          <g className="strat-peel__roller-drum">
            <circle cx="22" cy="46" r="12" fill="#ffffff" stroke="#264A88" strokeWidth="2" />
            <circle cx="22" cy="46" r="5" fill="#264A88" />
            <line x1="22" y1="46" x2="22" y2="36" stroke="#6CC5EA" strokeWidth="2" strokeLinecap="round" />
          </g>
          <g className="strat-peel__roller-drum strat-peel__roller-drum--rear">
            <circle cx="98" cy="46" r="12" fill="#ffffff" stroke="#264A88" strokeWidth="2" />
            <circle cx="98" cy="46" r="5" fill="#264A88" />
            <line x1="98" y1="46" x2="98" y2="36" stroke="#6CC5EA" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      <div className="strat-peel__tick" />
    </div>
  );
}
