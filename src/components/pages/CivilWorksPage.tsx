import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { ServiceList } from "../sections/ServiceList";
import { CTASection } from "../sections/CTASection";

const heroImage = "https://picsum.photos/seed/lambs-civils-excavation/1400/1800";

const services = [
  {
    number: "01",
    title: "Excavation",
    description:
      "Bulk dig, service trenches, chamber bases and deep excavations using modern plant and trained operators.",
  },
  {
    number: "02",
    title: "Reinstatement",
    description:
      "Permanent and interim reinstatement to NRSWA standards — footways, carriageways, block paving and verges.",
  },
  {
    number: "03",
    title: "Road works",
    description:
      "Carriageway excavations, resurfacing and safe temporary traffic management on adopted and private roads.",
  },
  {
    number: "04",
    title: "Footways",
    description:
      "Tactile paving, kerbing, edge restraints and block paving for new developments and reinstatement schemes.",
  },
  {
    number: "05",
    title: "Drainage",
    description:
      "Surface and foul drainage, SUDS features and connection works for developers and local authorities.",
  },
  {
    number: "06",
    title: "Ducting & chambers",
    description:
      "Multi-service ducting routes, jointing chambers, toby boxes and frame-and-cover installs.",
  },
];

const clients = [
  "Barratt Developments",
  "Alfred McAlpine",
  "Bury Council",
  "Local Authorities · UK-wide",
];

export function CivilWorksPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Sector 02 · Civil Works"
        heading="Dig, duct, reinstate. Done properly."
        lede="We've been doing civils since 1988. From housing estate enabling works to local authority reinstatement frameworks, Lambs UK brings a full civils capability to every programme."
        image={heroImage}
        imageAlt="Civil works reinstatement"
        sectionIndex="02 / Civil Works"
      />

      <ServiceList
        eyebrow="What we deliver"
        heading="Civil works, done once, done right."
        items={services}
      />

      {/* Client roster */}
      <section className="bg-[var(--color-cream)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-4">
              <FadeIn>
                <span className="eyebrow">Notable clients</span>
              </FadeIn>
            </div>
            <div className="lg:col-span-8">
              <AnimatedHeading as="h2" className="max-w-3xl">
                Developers and authorities who come back.
              </AnimatedHeading>
              <FadeIn delay={240}>
                <p className="text-[var(--color-concrete)] text-lg leading-relaxed mt-8 max-w-2xl">
                  From national housebuilders to county councils, our civil works
                  clients share one thing: repeat orders. No handovers, no sub-subbies,
                  no reason to look elsewhere.
                </p>
              </FadeIn>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border-strong)]">
            {clients.map((client, i) => (
              <FadeIn
                key={client}
                delay={i * 120}
                className="bg-[var(--color-cream)] p-8 lg:p-10 min-h-[180px] flex items-end"
              >
                <h3 className="font-display text-[24px] lg:text-[28px] leading-tight font-semibold">
                  {client}
                </h3>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Civil works enquiries"
        heading="Let's scope your next programme."
      />
    </PageShell>
  );
}
