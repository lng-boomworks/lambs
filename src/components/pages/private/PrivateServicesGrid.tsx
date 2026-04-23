import { Construction, Layers, Grid3x3, SquareStack, Droplets, ArrowDownToLine, Hammer } from "lucide-react";
import { FadeIn } from "../../FadeIn";
import { AnimatedHeading } from "../../AnimatedHeading";

const services = [
  { icon: Construction, title: "Tarmac", blurb: "Full driveway relays and overlays in quality-graded tarmac, sealed and rolled." },
  { icon: Layers, title: "Resin", blurb: "UV-stable resin-bound finishes in a range of aggregates — permeable and long-lasting." },
  { icon: Grid3x3, title: "Block paving", blurb: "Traditional and contemporary block paving in Marshalls, Brett and Bradstone ranges." },
  { icon: SquareStack, title: "Patios", blurb: "Indian stone, porcelain and natural stone patios laid to full manufacturer spec." },
  { icon: Droplets, title: "Drainage", blurb: "ACO channel drains, soakaways and SUDS-compliant drainage for driveways and patios." },
  { icon: ArrowDownToLine, title: "Dropped kerbs", blurb: "Council-approved dropped kerb applications, construction and highway reinstatement." },
  { icon: Hammer, title: "Groundworks", blurb: "Domestic groundworks — excavation, levelling, foundations, edging and site prep." },
];

export function PrivateServicesGrid() {
  return (
    <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <FadeIn><span className="eyebrow">What we do</span></FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="max-w-3xl">
              Seven domestic services. One accountable crew.
            </AnimatedHeading>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border-strong)]">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={s.title} delay={i * 100} className="bg-[var(--color-light-grey)] p-8 group hover:bg-white transition-colors duration-500">
                <div className="w-12 h-12 flex items-center justify-center bg-[var(--color-dark-blue)] group-hover:bg-[var(--color-cyan)] transition-colors duration-500 mb-6">
                  <Icon className="w-6 h-6 text-white group-hover:text-[var(--color-dark-blue)] transition-colors duration-500" strokeWidth={1.8} />
                </div>
                <h3 className="text-[22px] lg:text-[26px] font-semibold text-[var(--color-dark-blue)] mb-3 leading-tight">
                  {s.title}
                </h3>
                <p className="text-[var(--color-charcoal)] text-[15px] leading-relaxed">{s.blurb}</p>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
