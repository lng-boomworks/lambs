import { AnimatedHeading } from "../../AnimatedHeading";
import { FadeIn } from "../../FadeIn";
import { NumberTicker } from "../../NumberTicker";

const stats = [
  { value: 2500, suffix: "+", label: "Jobs per week" },
  { value: 10000, suffix: "+", label: "Homes per month" },
  { value: 80, suffix: "+", label: "Vans on the road" },
  { value: 120, suffix: "+", label: "Engineers on roster" },
  { value: 6, suffix: " yrs", label: "On programme" },
];

export function MotifNumbers() {
  return (
    <section className="bg-[var(--color-dark-blue)] text-white py-24 lg:py-36 relative">
      <div className="grid-bg-dark absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <FadeIn><span className="eyebrow eyebrow-dark">By the numbers</span></FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="text-white max-w-3xl">What Motif looks like, every week.</AnimatedHeading>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-white/10 border border-white/10">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 100} className="bg-[var(--color-dark-blue)] p-8 lg:p-10">
              <div className="text-[44px] lg:text-[72px] leading-none font-semibold text-white">
                <NumberTicker value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-[11px] uppercase tracking-widest text-[var(--color-cyan)] mt-3 font-medium">
                {s.label}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
