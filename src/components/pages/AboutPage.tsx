import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";
import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { CTASection } from "../sections/CTASection";

const storyImage = "https://picsum.photos/seed/lambs-warrington-hq/1600/2000";
const fieldImage = "https://picsum.photos/seed/lambs-crew-on-site/1600/1200";

const values = [
  {
    number: "01",
    title: "Direct labour",
    description:
      "Over 100 directly-employed operatives and engineers. No cascaded subcontractors, no finger-pointing when things get tight.",
  },
  {
    number: "02",
    title: "Obsessive quality",
    description:
      "30 van audits every month. NRSWA-trained operatives and NEBOSH-accredited supervision on every site.",
  },
  {
    number: "03",
    title: "Family values",
    description:
      "Still run by Simon & Amanda Lamb. Still answering the phone. Still remembering every operative's name.",
  },
  {
    number: "04",
    title: "Long relationships",
    description:
      "Our clients come back year after year — because we build trust the same way we build networks: one connection at a time.",
  },
];

const timeline = [
  {
    year: "1988",
    title: "Founded as S Lamb Construction",
    body: "Simon Lamb starts the business with a single crew and a clear philosophy: do the work yourself.",
  },
  {
    year: "1990s",
    title: "Civil works expansion",
    body: "Growing reputation across the North West for drainage, reinstatement and footway schemes.",
  },
  {
    year: "2000s",
    title: "Telecoms specialism",
    body: "First fibre contracts. Lambs becomes a trusted telecoms civils partner for national operators.",
  },
  {
    year: "2010s",
    title: "Utilities arm launched",
    body: "Expansion into water, gas and electricity connections across housing and industrial schemes.",
  },
  {
    year: "Today",
    title: "Fujitsu · Virgin Media Motif",
    body: "2,500 jobs per week and 10,000 homes connected per month on one of the UK's biggest full-fibre programmes.",
  },
];

export function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Lambs UK"
        heading="Thirty-seven years of building, by hand."
        lede="Lambs UK is a family-run infrastructure contractor based in Warrington. We've been quietly getting on with it since 1988 — telecoms, civils and utilities, delivered by people we directly employ."
        image={storyImage}
        imageAlt="Lambs UK Warrington headquarters"
        sectionIndex="— / About"
      />

      <section className="bg-[var(--color-warm-white)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <FadeIn>
                <span className="eyebrow">The story</span>
              </FadeIn>
              <AnimatedHeading as="h2" className="mt-6 max-w-xl">
                A Warrington yard. A clear idea.
              </AnimatedHeading>
            </div>
            <div className="lg:col-span-7 space-y-6 text-[var(--color-concrete)] text-lg leading-relaxed">
              <FadeIn delay={180}>
                <p>
                  In 1988, Simon Lamb founded S Lamb Construction with a small team
                  and a simple idea: if you want the work done properly, employ the
                  people who do it. Subcontracting other subcontractors, he'd seen,
                  was a quick way to lose control of quality and safety.
                </p>
              </FadeIn>
              <FadeIn delay={260}>
                <p>
                  Nearly four decades later — now trading as Lambs UK — the company
                  is still based in Warrington, still family-run by Simon and his
                  wife Amanda Lamb, and still employing its operatives directly.
                  Over 100 of them, delivering civils, telecoms and utilities work
                  from the North West to the south coast.
                </p>
              </FadeIn>
              <FadeIn delay={340}>
                <p>
                  The work has grown — from footway jobs and service connections in
                  the early days, to one of the largest operational crews on the
                  Virgin Media Motif full-fibre rollout today. The values haven't.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-ink)] text-white py-24 lg:py-36 relative">
        <div className="grid-bg-dark absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-4">
              <FadeIn>
                <span className="eyebrow eyebrow-dark">What we stand for</span>
              </FadeIn>
            </div>
            <div className="lg:col-span-8">
              <AnimatedHeading as="h2" className="text-white max-w-3xl">
                Four things we don't compromise on.
              </AnimatedHeading>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            {values.map((v, i) => (
              <FadeIn
                key={v.title}
                delay={i * 140}
                className="bg-[var(--color-ink)] p-10 lg:p-14"
              >
                <div className="flex items-start gap-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-hivis)]">
                    {v.number}
                  </span>
                  <div>
                    <h3 className="font-display text-[28px] lg:text-[34px] font-semibold text-white mb-4 leading-tight">
                      {v.title}
                    </h3>
                    <p className="text-white/65 text-[15px] leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-cream)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <FadeIn>
                <span className="eyebrow">Milestones</span>
              </FadeIn>
              <AnimatedHeading as="h2" className="mt-6 mb-10 max-w-md">
                Three decades, one direction.
              </AnimatedHeading>
              <FadeIn delay={200}>
                <RevealImage
                  src={fieldImage}
                  alt="Lambs crew at work"
                  aspect="aspect-[4/5]"
                />
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <ul className="border-t border-[var(--color-border-strong)]">
                {timeline.map((item, i) => (
                  <FadeIn
                    key={item.year}
                    as="span"
                    delay={i * 100}
                    className="block border-b border-[var(--color-border-strong)] py-8 lg:py-10"
                  >
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-12 md:col-span-3 font-mono text-sm uppercase tracking-widest text-[var(--color-hivis-dim)]">
                        {item.year}
                      </div>
                      <div className="col-span-12 md:col-span-9">
                        <h3 className="font-display text-[24px] lg:text-[28px] font-semibold mb-3 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-[var(--color-concrete)] text-[15px] leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection eyebrow="Work with us" heading="Thirty-seven years in. Still answering the phone." />
    </PageShell>
  );
}
