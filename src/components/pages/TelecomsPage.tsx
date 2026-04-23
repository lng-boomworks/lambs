import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";
import { Button } from "../Button";
import { NumberTicker } from "../NumberTicker";
import { SectorIndex } from "../SectorIndex";
import { FibreDraw } from "../motion/FibreDraw";
import { PageShell } from "../sections/PageShell";
import { ServiceList } from "../sections/ServiceList";
import { CTASection } from "../sections/CTASection";

const caseImage = "/images/utilities/job-06.webp";

const services = [
  { number: "01", title: "FTTH / FTTP rollout", description: "Full-fibre to the home and premises. Design-and-build, surveys, splicing and commissioning for national operators." },
  { number: "02", title: "Blown fibre & splicing", description: "Microduct blowing, fusion splicing, OTDR testing and certification to operator standards." },
  { number: "03", title: "Directional drilling", description: "Moling and horizontal directional drilling for low-impact cable installs under highways, driveways and gardens." },
  { number: "04", title: "Mole ploughing", description: "High-speed duct and cable installation across verges, footpaths and rural routes with minimal reinstatement." },
  { number: "05", title: "Surveys & design", description: "Pre-build surveys, route planning and on-street validation to keep builds on programme." },
  { number: "06", title: "Cabinet installs", description: "PCP and FTTC cabinet foundations, installations, power connections and commissioning." },
];

const telecomsAccreditations = ["NRSWA", "Streetworks", "CSCS", "NEBOSH", "ECS"];

export function TelecomsPage() {
  return (
    <PageShell>
      <SectorIndex label="01 / TELECOMS" />

      <section className="relative bg-[var(--color-dark-blue)] overflow-hidden min-h-[90svh] flex items-end">
        <div className="absolute inset-0 grid-bg-dark opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none">
          <FibreDraw />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-[180px] pb-20 w-full">
          <FadeIn><span className="eyebrow eyebrow-dark mb-8">Sector 01 · Telecoms</span></FadeIn>
          <AnimatedHeading as="h1" className="text-white max-w-4xl mt-8 mb-10" stagger={40}>
            From survey to splice. At national scale.
          </AnimatedHeading>
          <FadeIn delay={280}>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              Trusted fibre delivery for the UK's largest operators. FTTH, FTTP, blown fibre, splicing, directional drilling — delivered by directly employed crews, compliant to operator standard.
            </p>
          </FadeIn>
        </div>
      </section>

      <ServiceList
        eyebrow="What we deliver"
        heading="A full-stack telecoms crew, under one roof."
        items={services}
      />

      <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <RevealImage src={caseImage} alt="Virgin Media Motif programme" aspect="aspect-[5/4]" />
            </div>
            <div className="lg:col-span-6">
              <FadeIn><span className="eyebrow mb-6">Flagship programme</span></FadeIn>
              <AnimatedHeading as="h2" className="mt-6 mb-8 max-w-xl">
                Fujitsu · Virgin Media Motif
              </AnimatedHeading>
              <FadeIn delay={200}>
                <p className="text-[var(--color-charcoal)] text-lg leading-relaxed mb-10 max-w-xl">
                  Lambs Group runs one of the largest operational crews on Virgin Media's Motif programme — a major UK full-fibre build-out delivered in partnership with Fujitsu.
                </p>
              </FadeIn>
              <div className="grid grid-cols-2 gap-px bg-[var(--color-border-strong)] max-w-lg mb-10">
                <FadeIn delay={280} className="bg-[var(--color-light-grey)] p-6">
                  <div className="text-[48px] lg:text-[56px] leading-none font-semibold text-[var(--color-dark-blue)]">
                    <NumberTicker value={2500} /><span className="text-[var(--color-cyan)]">+</span>
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] mt-2 font-medium">Jobs / week</div>
                </FadeIn>
                <FadeIn delay={360} className="bg-[var(--color-light-grey)] p-6">
                  <div className="text-[48px] lg:text-[56px] leading-none font-semibold text-[var(--color-dark-blue)]">
                    <NumberTicker value={10000} /><span className="text-[var(--color-cyan)]">+</span>
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] mt-2 font-medium">Homes / month</div>
                </FadeIn>
              </div>
              <FadeIn delay={440}>
                <Button href="/work/motif" variant="primary" size="md" arrow="up-right">Read the Motif story</Button>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-y border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <span className="eyebrow">Telecoms accreditations</span>
                <h3 className="text-[28px] lg:text-[36px] font-semibold mt-4 max-w-xl text-[var(--color-dark-blue)]">
                  Qualified crews, certified to operator standard.
                </h3>
              </div>
              <p className="text-[var(--color-mid-blue)] text-sm max-w-sm uppercase tracking-wider font-medium">
                Placeholder list — to confirm with client
              </p>
            </div>
          </FadeIn>
          <div className="flex flex-wrap gap-3">
            {telecomsAccreditations.map((a, i) => (
              <FadeIn key={a} delay={i * 80}>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dark-blue)] border border-[var(--color-border-strong)] px-4 py-3 font-medium">
                  {a}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Planning a fibre programme?" heading="Let's walk the route." />
    </PageShell>
  );
}
