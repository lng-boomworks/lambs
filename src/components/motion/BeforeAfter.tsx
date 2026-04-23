import { useEffect, useRef, useState } from "react";
import { withBase } from "../../utils/paths";

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  className = "",
}: BeforeAfterProps) {
  const [pos, setPos] = useState(0);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const autoSwept = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPos(50);
      autoSwept.current = true;
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !autoSwept.current) {
          autoSwept.current = true;
          const start = performance.now();
          const duration = 1600;
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setPos(eased * 50 + 20);
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const updateFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(p);
  };

  return (
    <div
      ref={ref}
      className={`before-after ${className}`}
      onMouseMove={(e) => { if (dragging) updateFromClientX(e.clientX); }}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={(e) => { if (e.touches[0]) updateFromClientX(e.touches[0].clientX); }}
    >
      <img src={withBase(afterSrc)} alt={afterAlt} className="before-after__img" />
      <div className="before-after__before" style={{ width: `${pos}%` }}>
        <img src={withBase(beforeSrc)} alt={beforeAlt} className="before-after__img" />
      </div>
      <div
        className="before-after__handle"
        style={{ left: `${pos}%` }}
        onMouseDown={() => setDragging(true)}
        onTouchStart={() => setDragging(true)}
        role="slider"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Before/after comparison"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
        }}
      >
        <span className="before-after__handle-knob">◄▸</span>
      </div>
    </div>
  );
}
