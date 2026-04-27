import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { SectorIndex } from "../SectorIndex";
import { FlowLines } from "../motion/FlowLines";
import { PageShell } from "../sections/PageShell";
import { ServiceList } from "../sections/ServiceList";
import { CTASection } from "../sections/CTASection";

const services = [
  { number: "01", title: "Water supply works", description: "New mains laying, service connections, meter installs and network extensions on housing and commercial sites." },
  { number: "02", title: "Gas supply", description: "Gas mains, service connections, riser works and safe site isolation delivered by accredited crews." },
  { number: "03", title: "Electricity supply", description: "LV and HV ducting routes, service cabinets and connection works coordinated with DNO programmes." },
  { number: "04", title: "Ducting", description: "Multi-utility ducting installation, marker tape, warning mesh and chamber setting-out." },
  { number: "05", title: "Jointing", description: "Cable and pipe jointing delivered to operator standards, including LV jointing and pressure testing." },
  { number: "06", title: "Mains laying & connections", description: "From bulk mains to final service connections - one crew, one programme, one point of contact." },
];

const utilitiesAccreditations = ["WIRS", "GIRS", "NERS", "NRSWA"];

export function UtilitiesPage() {
  return (
    <PageShell>
      <SectorIndex label="03 / UTILITIES" />

      <section className="relative bg-white overflow-hidden pt-[140px] pb-16 lg:pt-[180px] lg:pb-24 border-b border-[var(--color-border)]">
        <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeIn><span className="eyebrow mb-6">Sector 03 · Utilities</span></FadeIn>
          <AnimatedHeading as="h1" className="max-w-4xl mt-4 mb-8" stagger={40}>
            Water, gas, power - laid and connected.
          </AnimatedHeading>
          <FadeIn delay={260}>
            <p className="text-[var(--color-charcoal)] text-lg md:text-xl leading-relaxed max-w-3xl mb-12">
              Utility supply works for housing, industrial and local authority schemes across the UK. From new mains to the final service connection - one accredited crew, one programme, one point of contact.
            </p>
          </FadeIn>
          <div className="h-[280px] lg:h-[340px] border-t border-b border-[var(--color-border)]">
            <FlowLines />
          </div>
          <div className="grid grid-cols-3 gap-8 mt-6 text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">
            <span><span className="inline-block w-3 h-[2px] align-middle bg-[var(--color-dark-blue)] mr-2"></span>Power</span>
            <span><span className="inline-block w-3 h-[2px] align-middle bg-[var(--color-mid-blue)] mr-2"></span>Water</span>
            <span><span className="inline-block w-3 h-[2px] align-middle bg-[var(--color-cyan)] mr-2"></span>Gas</span>
          </div>
        </div>
      </section>

      <ServiceList eyebrow="What we deliver" heading="Three utilities. One accountable crew." items={services} />

      <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <span className="eyebrow">Utilities accreditations</span>
                <h2 className="text-[36px] lg:text-[56px] font-semibold mt-6 max-w-2xl leading-[1.05] text-[var(--color-dark-blue)]">
                  Certified to lay mains,<br />trained to connect homes.
                </h2>
              </div>
              <p className="text-[var(--color-mid-blue)] text-sm max-w-sm uppercase tracking-wider font-medium">
                Placeholder list - to confirm with client
              </p>
            </div>
          </FadeIn>
          <div className="flex flex-wrap gap-3">
            {utilitiesAccreditations.map((a, i) => (
              <FadeIn key={a} delay={i * 80}>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dark-blue)] border border-[var(--color-border-strong)] px-4 py-3 bg-white font-medium">
                  {a}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Utilities enquiries" heading="Need mains laid? Let's talk." />
    </PageShell>
  );
}
