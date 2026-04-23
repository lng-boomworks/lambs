import { AnimatedHeading } from "../../AnimatedHeading";
import { FadeIn } from "../../FadeIn";
import { NumberTicker } from "../../NumberTicker";

const qc = [
  { value: 30, label: "Van audits every month" },
  { value: 100, suffix: "%", label: "NEBOSH supervision on every site" },
  { value: 100, suffix: "+", label: "NRSWA-trained operatives" },
];

export function MotifQC() {
  return (
    <section className="bg-white py-24 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <FadeIn><span className="eyebrow">What it takes</span></FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="max-w-3xl">Quality control, visible, auditable, week on week.</AnimatedHeading>
            <FadeIn delay={200}>
              <p className="text-[var(--color-charcoal)] text-lg leading-relaxed mt-6 max-w-2xl">
                Motif is a scale programme. Quality doesn't hold at scale without system. Ours is a combination of on-site audits, supervision ratios, and training investment per operative.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border-strong)]">
          {qc.map((q, i) => (
            <FadeIn key={q.label} delay={i * 120} className="bg-white p-10 lg:p-14">
              <div className="text-[var(--color-dark-blue)] text-[56px] lg:text-[72px] leading-none font-semibold">
                <NumberTicker value={q.value} suffix={q.suffix || ""} />
              </div>
              <div className="text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] mt-4 font-medium">
                {q.label}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
