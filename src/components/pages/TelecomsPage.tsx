import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";
import { Button } from "../Button";
import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { ServiceList } from "../sections/ServiceList";
import { CTASection } from "../sections/CTASection";

const heroImage = "https://picsum.photos/seed/lambs-telecoms-fibre/1400/1800";
const caseImage = "https://picsum.photos/seed/lambs-fujitsu-motif/1600/1200";

const services = [
  {
    number: "01",
    title: "FTTH / FTTP rollout",
    description:
      "Full-fibre to the home and premises. Design-and-build, surveys, splicing and commissioning for national operators.",
  },
  {
    number: "02",
    title: "Blown fibre & splicing",
    description:
      "Microduct blowing, fusion splicing, OTDR testing and certification to operator standards.",
  },
  {
    number: "03",
    title: "Directional drilling",
    description:
      "Moling and horizontal directional drilling for low-impact cable installs under highways, driveways and gardens.",
  },
  {
    number: "04",
    title: "Mole ploughing",
    description:
      "High-speed duct and cable installation across verges, footpaths and rural routes with minimal reinstatement.",
  },
  {
    number: "05",
    title: "Surveys & design",
    description:
      "Pre-build surveys, route planning and on-street validation to keep builds on programme.",
  },
  {
    number: "06",
    title: "Cabinet installs",
    description:
      "PCP and FTTC cabinet foundations, installations, power connections and commissioning.",
  },
];

const telecomsAccreditations = [
  "NRSWA",
  "Streetworks",
  "CSCS",
  "NEBOSH",
  "ECS",
];

export function TelecomsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Sector 01 · Telecoms"
        heading="From survey to splice. At national scale."
        lede="We've rolled out fibre in the housing estates, the city centres and the harder-to-reach streets where the programme lives or dies. Lambs UK is a trusted telecoms delivery partner for the UK's largest operators."
        image={heroImage}
        imageAlt="Lambs engineer installing fibre"
        sectionIndex="01 / Telecoms"
      />

      <ServiceList
        eyebrow="What we deliver"
        heading="A full-stack telecoms crew, under one roof."
        items={services}
      />

      {/* ============ CASE STUDY ============ */}
      <section className="bg-[var(--color-cream)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <RevealImage
                src={caseImage}
                alt="Virgin Media Motif programme"
                aspect="aspect-[5/4]"
              />
            </div>
            <div className="lg:col-span-6">
              <FadeIn>
                <span className="eyebrow mb-6">Flagship programme</span>
              </FadeIn>
              <AnimatedHeading as="h2" className="mt-6 mb-8 max-w-xl">
                Fujitsu · Virgin Media Motif
              </AnimatedHeading>
              <FadeIn delay={200}>
                <p className="text-[var(--color-concrete)] text-lg leading-relaxed mb-10 max-w-xl">
                  As a trusted Fujitsu delivery partner, Lambs UK runs one of the
                  largest crews on the Virgin Media Motif programme — one of the
                  UK's most significant full-fibre build-outs.
                </p>
              </FadeIn>
              <div className="grid grid-cols-2 gap-px bg-[var(--color-border-strong)] max-w-lg mb-10">
                <FadeIn delay={280} className="bg-[var(--color-cream)] p-6">
                  <div className="font-display text-[48px] lg:text-[56px] leading-none font-semibold">
                    2,500<span className="text-[var(--color-hivis)]">+</span>
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-concrete)] mt-2">
                    Jobs / week
                  </div>
                </FadeIn>
                <FadeIn delay={360} className="bg-[var(--color-cream)] p-6">
                  <div className="font-display text-[48px] lg:text-[56px] leading-none font-semibold">
                    10k<span className="text-[var(--color-hivis)]">+</span>
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-concrete)] mt-2">
                    Homes / month
                  </div>
                </FadeIn>
              </div>
              <FadeIn delay={440}>
                <Button href="/case-studies" variant="primary" size="md" arrow="up-right">
                  See case studies
                </Button>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="bg-[var(--color-warm-white)] py-20 border-y border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <span className="eyebrow">Telecoms accreditations</span>
                <h3 className="font-display text-[28px] lg:text-[36px] font-semibold mt-4 max-w-xl">
                  Qualified crews, certified to operator standard.
                </h3>
              </div>
              {/* NOTE: Accreditations placeholder — confirm exact schemes with client */}
              <p className="text-[var(--color-concrete)] text-sm max-w-sm font-mono uppercase tracking-wider">
                Placeholder list — to confirm
              </p>
            </div>
          </FadeIn>
          <div className="flex flex-wrap gap-3">
            {telecomsAccreditations.map((a, i) => (
              <FadeIn key={a} delay={i * 80}>
                <span className="logo-tile font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-concrete)] border border-[var(--color-border-strong)] px-4 py-3">
                  {a}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Planning a fibre programme?"
        heading="Let's walk the route."
      />
    </PageShell>
  );
}
