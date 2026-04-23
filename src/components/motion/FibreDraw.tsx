import { useEffect, useRef, useState } from "react";

interface FibreDrawProps {
  className?: string;
}

const FIBRE_PATH = "M0 340 Q 200 120 450 240 T 900 160 T 1200 260";

// Stagger negative begin times so photons are already in-flight on first render
const photons = [
  { radius: 5, begin: 0, duration: 5 },
  { radius: 4.2, begin: -1.25, duration: 5 },
  { radius: 3.6, begin: -2.5, duration: 5 },
  { radius: 3, begin: -3.75, duration: 5 },
];

export function FibreDraw({ className = "" }: FibreDrawProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<SVGSVGElement | null>(null);

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
    <svg
      ref={ref}
      className={`fibre-draw ${visible ? "is-visible" : ""} ${className}`}
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="fibre-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        id="fibre-path"
        d={FIBRE_PATH}
        fill="none"
        stroke="#6CC5EA"
        strokeWidth="2"
        strokeLinecap="round"
        className="fibre-draw__line"
      />

      {photons.map((p, i) => (
        <circle
          key={i}
          r={p.radius}
          fill="#6CC5EA"
          filter="url(#fibre-glow)"
          className="fibre-draw__photon"
        >
          <animateMotion
            dur={`${p.duration}s`}
            begin={`${p.begin}s`}
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#fibre-path" />
          </animateMotion>
        </circle>
      ))}
    </svg>
  );
}
