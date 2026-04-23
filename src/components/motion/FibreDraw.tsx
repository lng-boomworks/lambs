import { useEffect, useRef, useState } from "react";

interface FibreDrawProps {
  className?: string;
}

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
      <path
        d="M0 340 Q 200 120 450 240 T 900 160 T 1200 260"
        fill="none"
        stroke="#6CC5EA"
        strokeWidth="2"
        strokeLinecap="round"
        className="fibre-draw__line"
      />
      <circle cx="450" cy="240" r="6" className="fibre-draw__node" />
      <circle cx="780" cy="195" r="6" className="fibre-draw__node" style={{ animationDelay: "0.8s" }} />
      <circle cx="1050" cy="230" r="6" className="fibre-draw__node" style={{ animationDelay: "1.6s" }} />
    </svg>
  );
}
