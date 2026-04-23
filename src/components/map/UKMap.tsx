import { useState } from "react";
import liveWorks from "../../data/live-works.json";

type Sector = "All" | "Telecoms" | "Civil Works" | "Utilities" | "Private Works";

const sectorColour: Record<string, string> = {
  Telecoms: "#6CC5EA",
  "Civil Works": "#7DA0C3",
  Utilities: "#264A88",
  "Private Works": "#B8CBDE",
};

const ukPath = "M420 80 L 470 100 L 500 150 L 540 200 L 560 260 L 560 320 L 540 360 L 500 400 L 480 440 L 470 480 L 490 520 L 530 550 L 560 600 L 570 660 L 550 700 L 520 720 L 480 720 L 440 700 L 400 680 L 360 660 L 330 640 L 310 600 L 300 550 L 290 500 L 290 450 L 310 420 L 340 390 L 350 350 L 350 300 L 340 250 L 350 200 L 370 150 L 400 110 Z";

interface UKMapProps {
  variant?: "full" | "embed";
}

export function UKMap({ variant = "full" }: UKMapProps) {
  const [filter, setFilter] = useState<Sector>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const dots = filter === "All" ? liveWorks.dots : liveWorks.dots.filter((d) => d.sector === filter);
  const counts: Record<Sector, number> = {
    All: liveWorks.dots.length,
    Telecoms: liveWorks.dots.filter((d) => d.sector === "Telecoms").length,
    "Civil Works": liveWorks.dots.filter((d) => d.sector === "Civil Works").length,
    Utilities: liveWorks.dots.filter((d) => d.sector === "Utilities").length,
    "Private Works": liveWorks.dots.filter((d) => d.sector === "Private Works").length,
  };
  const sectors: Sector[] = ["All", "Telecoms", "Civil Works", "Utilities", "Private Works"];
  const selected = selectedId ? liveWorks.dots.find((d) => d.id === selectedId) : null;

  return (
    <div className="uk-map">
      <div className="flex flex-wrap gap-2 mb-8">
        {sectors.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 text-[12px] uppercase tracking-[0.14em] font-medium transition-colors duration-300 flex items-center gap-2 ${
              filter === s ? "bg-[var(--color-cyan)] text-[var(--color-dark-blue)]" : "border border-[var(--color-border-strong)] text-[var(--color-dark-blue)] hover:border-[var(--color-dark-blue)]"
            }`}
          >
            {s}
            <span className="text-[10px] opacity-70">{counts[s]}</span>
          </button>
        ))}
      </div>

      <div className="relative bg-[var(--color-light-grey)] border border-[var(--color-border)]">
        <svg viewBox="0 0 800 800" className="w-full h-auto" role="img" aria-label="UK live works map">
          <path d={ukPath} fill="none" stroke="#264A88" strokeWidth="1.5" opacity="0.7" />
          {dots.map((d) => (
            <g key={d.id} onClick={() => setSelectedId(d.id)} style={{ cursor: "pointer" }}>
              <circle cx={d.x} cy={d.y} r="14" fill={sectorColour[d.sector] || "#6CC5EA"} opacity="0.18" className="uk-map__pulse" style={{ animationDelay: `${(d.x + d.y) % 3}s` }} />
              <circle cx={d.x} cy={d.y} r="5" fill={sectorColour[d.sector] || "#6CC5EA"} />
            </g>
          ))}
        </svg>

        {selected && (
          <div className="absolute top-4 right-4 bg-white border border-[var(--color-border-strong)] p-5 max-w-xs shadow-md">
            <div className="text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium mb-2">
              {selected.sector} · {selected.status}
            </div>
            <h4 className="text-[var(--color-dark-blue)] font-semibold text-[16px] mb-2">{selected.region}</h4>
            <p className="text-[var(--color-charcoal)] text-[13px] leading-relaxed mb-4">{selected.note}</p>
            <div className="flex gap-3">
              <a href="/contact" className="text-[12px] uppercase tracking-widest text-[var(--color-dark-blue)] font-semibold nav-link">Discuss a similar programme →</a>
              <button onClick={() => setSelectedId(null)} className="text-[12px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">Close</button>
            </div>
          </div>
        )}
      </div>

      {variant === "full" && (
        <p className="text-[var(--color-mid-blue)] text-[11px] uppercase tracking-widest mt-4 font-medium">
          Last updated {liveWorks.lastUpdated} · Regions approximate · NDA-redacted where applicable
        </p>
      )}
    </div>
  );
}
