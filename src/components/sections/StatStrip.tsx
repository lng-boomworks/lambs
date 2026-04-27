import { FadeIn } from "../FadeIn";
import { NumberTicker } from "../NumberTicker";

interface StatStripProps {
  stats?: { value: number; suffix?: string; label: string }[];
  onDark?: boolean;
}

const defaultStats = [
  { value: 75, suffix: "+", label: "Directly employed" },
  { value: 55, suffix: "", label: "Van audits / month" },
  { value: 2500, suffix: "+", label: "Motif jobs / week" },
  { value: 37, suffix: " yrs", label: "Est. 1988" },
];

export function StatStrip({ stats = defaultStats, onDark = false }: StatStripProps) {
  return (
    <section
      className={`py-16 border-y ${onDark ? "bg-[var(--color-dark-blue)] border-white/10" : "bg-[var(--color-light-grey)] border-[var(--color-border)]"}`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 100}>
              <div className={`text-[48px] lg:text-[64px] leading-none font-semibold ${onDark ? "text-white" : "text-[var(--color-dark-blue)]"}`}>
                <NumberTicker value={s.value} suffix={s.suffix} />
              </div>
              <div className={`text-[11px] uppercase tracking-widest mt-3 font-medium ${onDark ? "text-white/70" : "text-[var(--color-mid-blue)]"}`}>
                {s.label}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
