import { FadeIn } from "../FadeIn";
import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { ServiceList } from "../sections/ServiceList";
import { CTASection } from "../sections/CTASection";

const heroImage = "https://picsum.photos/seed/lambs-utilities-mains/1400/1800";

const services = [
  {
    number: "01",
    title: "Water supply works",
    description:
      "New mains laying, service connections, meter installs and network extensions on housing and commercial sites.",
  },
  {
    number: "02",
    title: "Gas supply",
    description:
      "Gas mains, service connections, riser works and safe site isolation delivered by accredited crews.",
  },
  {
    number: "03",
    title: "Electricity supply",
    description:
      "LV and HV ducting routes, service cabinets and connection works coordinated with DNO programmes.",
  },
  {
    number: "04",
    title: "Ducting",
    description:
      "Multi-utility ducting installation, marker tape, warning mesh and chamber setting-out.",
  },
  {
    number: "05",
    title: "Jointing",
    description:
      "Cable and pipe jointing delivered to operator standards, including LV jointing and pressure testing.",
  },
  {
    number: "06",
    title: "Mains laying & connections",
    description:
      "From bulk mains to final service connections — one crew, one programme, one point of contact.",
  },
];

// NOTE: Utilities accreditations placeholder — confirm with client
const utilitiesAccreditations = [
  "WIRS",
  "GIRS",
  "NERS",
  "NRSWA",
  "CHAS",
];

export function UtilitiesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Sector 03 · Utilities"
        heading="Water, gas, power — laid and connected."
        lede="Lambs UK delivers utility supply works for housing, industrial and local authority schemes across the UK. From new mains to the final service connection, we plan the route, run the crew and hit the programme."
        image={heroImage}
        imageAlt="Utilities mains laying"
        sectionIndex="03 / Utilities"
      />

      <ServiceList
        eyebrow="What we deliver"
        heading="Three utilities. One accountable crew."
        items={services}
      />

      {/* Accreditations */}
      <section className="bg-[var(--color-cream)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <span className="eyebrow">Utilities accreditations</span>
                <h2 className="font-display text-[36px] lg:text-[56px] font-semibold mt-6 max-w-2xl leading-[1.05]">
                  Certified to lay mains,<br />trained to connect homes.
                </h2>
              </div>
              <p className="text-[var(--color-concrete)] text-sm max-w-sm font-mono uppercase tracking-wider">
                Placeholder list — to confirm
              </p>
            </div>
          </FadeIn>
          <div className="flex flex-wrap gap-3">
            {utilitiesAccreditations.map((a, i) => (
              <FadeIn key={a} delay={i * 80}>
                <span className="logo-tile font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-concrete)] border border-[var(--color-border-strong)] px-4 py-3 bg-white">
                  {a}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Utilities enquiries"
        heading="Need mains laid? Let's talk."
      />
    </PageShell>
  );
}
