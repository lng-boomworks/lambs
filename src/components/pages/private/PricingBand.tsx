import { FadeIn } from "../../FadeIn";
import { AnimatedHeading } from "../../AnimatedHeading";

// NOTE: pricing bands are indicative — to confirm with client before launch
const pricing = [
  { finish: "Tarmac", from: "£55", unit: "per m²" },
  { finish: "Resin-bound", from: "£90", unit: "per m²" },
  { finish: "Block paving", from: "£85", unit: "per m²" },
  { finish: "Indian stone patio", from: "£110", unit: "per m²" },
  { finish: "ACO drainage", from: "£65", unit: "per linear m" },
  { finish: "Dropped kerb", from: "£950", unit: "complete" },
];

export function PricingBand() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-4">
            <FadeIn><span className="eyebrow">Indicative pricing</span></FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="max-w-2xl">Honest starting prices.</AnimatedHeading>
            <FadeIn delay={200}>
              <p className="text-[var(--color-charcoal)] text-lg leading-relaxed mt-6 max-w-2xl">
                Every job is quoted individually, but these are our typical starting points. Supply, lay, compact and clean-down included. No deposit required.
              </p>
            </FadeIn>
          </div>
        </div>

        <ul className="border-t border-[var(--color-border-strong)]">
          {pricing.map((p, i) => (
            <FadeIn as="span" key={p.finish} delay={i * 60} className="block border-b border-[var(--color-border-strong)]">
              <div className="grid grid-cols-12 items-center py-6 lg:py-7 gap-6">
                <div className="col-span-12 md:col-span-6">
                  <h3 className="text-[var(--color-dark-blue)] text-[20px] lg:text-[24px] font-semibold">{p.finish}</h3>
                </div>
                <div className="col-span-6 md:col-span-3 text-[var(--color-mid-blue)] text-[12px] uppercase tracking-widest font-medium">
                  From
                </div>
                <div className="col-span-6 md:col-span-3 text-right text-[var(--color-dark-blue)] text-[20px] lg:text-[24px] font-semibold">
                  {p.from} <span className="text-[12px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium ml-1">{p.unit}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </ul>

        <FadeIn delay={500}>
          <p className="text-[var(--color-mid-blue)] text-sm mt-8 uppercase tracking-wider font-medium">
            * Indicative only. Full quotation provided after free on-site measure.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
