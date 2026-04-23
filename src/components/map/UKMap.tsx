import { useState } from "react";
import liveWorks from "../../data/live-works.json";

type Sector = "All" | "Telecoms" | "Civil Works" | "Utilities" | "Private Works";

const sectorColour: Record<string, string> = {
  Telecoms: "#6CC5EA",
  "Civil Works": "#7DA0C3",
  Utilities: "#264A88",
  "Private Works": "#B8CBDE",
};

const MAP_W = 885.546;
const MAP_H = 1368.581;
const BOUNDS = { north: 61.0, south: 49.0, west: -11.0, east: 2.2 };

function project(lat: number, lng: number) {
  const x = ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * MAP_W;
  const y = ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * MAP_H;
  return { x, y };
}

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
        <svg
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          className="w-full h-auto block"
          role="img"
          aria-label="UK live works map"
        >
          <image
            href="/images/map/uk-outline.svg"
            x="0"
            y="0"
            width={MAP_W}
            height={MAP_H}
            preserveAspectRatio="xMidYMid meet"
          />
          {dots.map((d) => {
            const { x, y } = project(d.lat, d.lng);
            const colour = sectorColour[d.sector] || "#6CC5EA";
            return (
              <g key={d.id} onClick={() => setSelectedId(d.id)} style={{ cursor: "pointer" }}>
                <circle cx={x} cy={y} r="22" fill={colour} opacity="0.18" className="uk-map__pulse" style={{ animationDelay: `${((x + y) | 0) % 3}s` }} />
                <circle cx={x} cy={y} r="8" fill={colour} stroke="#ffffff" strokeWidth="2" />
              </g>
            );
          })}
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
          Last updated {liveWorks.lastUpdated} · Regions approximate · NDA-redacted where applicable · Outline: Wikimedia Commons / NordNordWest (CC-BY-SA 3.0)
        </p>
      )}
    </div>
  );
}
