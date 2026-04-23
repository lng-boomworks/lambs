import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { CTASection } from "../sections/CTASection";
import { ArrowUpRight } from "lucide-react";

const reasons = [
  {
    number: "01",
    title: "Directly employed",
    body: "Not agency, not sub-sub. PAYE contracts, real training, career progression and long tenures.",
  },
  {
    number: "02",
    title: "Proper training",
    body: "NRSWA, CSCS, NEBOSH — we invest in the tickets and the time it takes to earn them.",
  },
  {
    number: "03",
    title: "Real progression",
    body: "A lot of our managers started on a shovel. We promote from within and we mean it.",
  },
  {
    number: "04",
    title: "Family values",
    body: "Still family-run after 37 years. We look after our people because we know their names.",
  },
];

// Placeholder vacancies — wire to recruitment feed later
const vacancies = [
  {
    title: "Fibre Jointer",
    location: "North West",
    type: "Full-time · Direct PAYE",
  },
  {
    title: "NRSWA Operative",
    location: "North West",
    type: "Full-time · Direct PAYE",
  },
  {
    title: "Groundworker",
    location: "UK-wide",
    type: "Full-time · Direct PAYE",
  },
  {
    title: "Site Supervisor",
    location: "Warrington HQ",
    type: "Full-time · Direct PAYE",
  },
];

export function CareersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Careers at Lambs UK"
        heading="Work with people who stick around."
        lede="We've been directly employing operatives since 1988. If you want to come and work on proper jobs, learn real trades and actually know who your boss is, we'd like to hear from you."
        sectionIndex="— / Careers"
      />

      {/* Why Lambs */}
      <section className="bg-[var(--color-warm-white)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-4">
              <FadeIn>
                <span className="eyebrow">Why work here</span>
              </FadeIn>
            </div>
            <div className="lg:col-span-8">
              <AnimatedHeading as="h2" className="max-w-3xl">
                Four reasons our people stay.
              </AnimatedHeading>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border-strong)]">
            {reasons.map((r, i) => (
              <FadeIn key={r.title} delay={i * 140} className="bg-[var(--color-warm-white)] p-10 lg:p-14">
                <div className="flex items-start gap-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-hivis-dim)]">
                    {r.number}
                  </span>
                  <div>
                    <h3 className="font-display text-[26px] lg:text-[32px] font-semibold mb-4 leading-tight">
                      {r.title}
                    </h3>
                    <p className="text-[var(--color-concrete)] text-[15px] leading-relaxed">
                      {r.body}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Vacancies */}
      <section className="bg-[var(--color-cream)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
              <FadeIn>
                <span className="eyebrow">Current vacancies</span>
              </FadeIn>
              <AnimatedHeading as="h2" className="mt-6 max-w-md">
                Roles we're recruiting for.
              </AnimatedHeading>
            </div>
            <div className="lg:col-span-7 flex lg:justify-end lg:items-end">
              <FadeIn delay={200}>
                <p className="text-[var(--color-concrete)] text-base leading-relaxed max-w-md">
                  We're always open to speaking with qualified operatives. Don't
                  see the right role listed? Send us your CV anyway — we'll keep
                  it on file for the next programme.
                </p>
              </FadeIn>
            </div>
          </div>

          <ul className="border-t border-[var(--color-border-strong)]">
            {vacancies.map((v, i) => (
              <FadeIn
                key={v.title}
                as="span"
                delay={i * 100}
                className="block border-b border-[var(--color-border-strong)]"
              >
                <a
                  href="/contact"
                  className="group grid grid-cols-12 items-center gap-6 py-8 lg:py-10 hover:bg-[var(--color-warm-white)] transition-colors duration-500"
                >
                  <span className="col-span-12 md:col-span-5 font-display text-[26px] lg:text-[32px] font-semibold">
                    {v.title}
                  </span>
                  <span className="col-span-6 md:col-span-3 font-mono text-[11px] uppercase tracking-widest text-[var(--color-concrete)]">
                    {v.location}
                  </span>
                  <span className="col-span-6 md:col-span-3 font-mono text-[11px] uppercase tracking-widest text-[var(--color-concrete)]">
                    {v.type}
                  </span>
                  <span className="col-span-12 md:col-span-1 flex md:justify-end">
                    <ArrowUpRight className="w-5 h-5 btn-arrow" />
                  </span>
                </a>
              </FadeIn>
            ))}
          </ul>

          <FadeIn delay={500}>
            <div className="mt-16 flex flex-col md:flex-row gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Send us your CV
              </Button>
              <Button href="tel:01925850982" variant="ghost" size="lg" arrow="none">
                Recruitment line · 01925 850 982
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection
        eyebrow="Join the crew"
        heading="Good operatives welcome. Always."
      />
    </PageShell>
  );
}
