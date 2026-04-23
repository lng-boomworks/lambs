import { useEffect, useState } from "react";

interface SectorIndexProps {
  label: string;
}

export function SectorIndex({ label }: SectorIndexProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <aside className="sector-index" aria-hidden="true">
      <span className="sector-index__label">{label}</span>
      <div className="sector-index__rail">
        <span
          className="sector-index__dot"
          style={{ top: `${progress * 100}%` }}
        />
      </div>
    </aside>
  );
}
