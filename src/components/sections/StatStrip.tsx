import { FadeIn } from "../FadeIn";

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

interface StatStripProps {
  stats?: Stat[];
  dark?: boolean;
}

const defaultStats: Stat[] = [
  { value: "37", suffix: "+", label: "Years building Britain" },
  { value: "100", suffix: "+", label: "Direct-employed operatives" },
  { value: "2,500", label: "Jobs completed per week" },
  { value: "10,000", label: "Homes connected per month" },
];

export function StatStrip({ stats = defaultStats, dark = false }: StatStripProps) {
  return (
    <section
      className={`relative ${
        dark ? "bg-[var(--color-ink)] text-white" : "bg-[var(--color-cream)]"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-black/10">
          {stats.map((stat, i) => (
            <FadeIn
              key={stat.label}
              delay={i * 120}
              className={`p-8 lg:p-10 ${
                dark ? "bg-[var(--color-ink)]" : "bg-[var(--color-cream)]"
              }`}
            >
              <div className="flex flex-col gap-3">
                <div
                  className={`font-display text-[56px] lg:text-[80px] leading-none font-semibold tracking-[-0.04em] ${
                    dark ? "text-white" : "text-[var(--color-ink)]"
                  }`}
                >
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-[var(--color-hivis)]">{stat.suffix}</span>
                  )}
                </div>
                <div
                  className={`font-mono text-[11px] uppercase tracking-[0.14em] ${
                    dark ? "text-white/60" : "text-[var(--color-concrete)]"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
