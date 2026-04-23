import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";
import { Button } from "../Button";
import { SectorIndex } from "../SectorIndex";
import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { CTASection } from "../sections/CTASection";
import { ArrowUpRight } from "lucide-react";

const reasons = [
  { number: "01", title: "Directly employed", body: "PAYE contracts, real training, career progression and long tenures. Not agency, not sub-sub." },
  { number: "02", title: "Proper training", body: "NRSWA, CSCS, NEBOSH — we invest in the tickets and the time it takes to earn them." },
  { number: "03", title: "Real progression", body: "Many of our managers started on a shovel. We promote from within." },
  { number: "04", title: "Family values", body: "Family-run since 1988. We look after our people because we know their names." },
];

const vacancies = [
  { title: "Fibre Jointer", location: "North West", type: "Full-time · PAYE", days: 4 },
  { title: "NRSWA Operative", location: "North West", type: "Full-time · PAYE", days: 7 },
  { title: "Groundworker", location: "UK-wide", type: "Full-time · PAYE", days: 2 },
  { title: "Site Supervisor", location: "Warrington HQ", type: "Full-time · PAYE", days: 14 },
];

const lifeImages = [
  "https://picsum.photos/seed/life-1/900/600",
  "https://picsum.photos/seed/life-2/900/600",
  "https://picsum.photos/seed/life-3/900/600",
];

export function CareersPage() {
  return (
    <PageShell>
      <SectorIndex label="— / CAREERS" />
      <PageHero
        eyebrow="Careers at Lambs Group"
        heading="Work with people who stick around."
        lede="Directly employed operatives since 1988. If you want proper jobs, real trades, and to actually know who your boss is, we'd like to hear from you."
        sectionIndex="— / Careers"
      />

      <section className="bg-white py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-4">
              <FadeIn><span className="eyebrow">Why work here</span></FadeIn>
            </div>
            <div className="lg:col-span-8">
              <AnimatedHeading as="h2" className="max-w-3xl">Four reasons our people stay.</AnimatedHeading>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border-strong)]">
            {reasons.map((r, i) => (
              <FadeIn key={r.title} delay={i * 140} className="bg-white p-10 lg:p-14">
                <div className="flex items-start gap-6">
                  <span className="text-xs uppercase tracking-widest text-[var(--color-cyan)] font-semibold">{r.number}</span>
                  <div>
                    <h3 className="text-[var(--color-dark-blue)] text-[24px] lg:text-[30px] font-semibold mb-4 leading-tight">{r.title}</h3>
                    <p className="text-[var(--color-charcoal)] text-[15px] leading-relaxed">{r.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
            <div className="lg:col-span-5">
              <FadeIn><span className="eyebrow">Current vacancies</span></FadeIn>
              <AnimatedHeading as="h2" className="mt-6 max-w-md">Roles we're recruiting for.</AnimatedHeading>
            </div>
            <div className="lg:col-span-7 flex lg:justify-end lg:items-end">
              <FadeIn delay={200}>
                <p className="text-[var(--color-charcoal)] text-base leading-relaxed max-w-md">
                  Always open to speaking with qualified operatives. Don't see your role? Send us your CV anyway — we'll keep it on file.
                </p>
              </FadeIn>
            </div>
          </div>

          <ul className="border-t border-[var(--color-border-strong)]">
            {vacancies.map((v, i) => (
              <FadeIn key={v.title} as="span" delay={i * 100} className="block border-b border-[var(--color-border-strong)]">
                <a href="/contact" className="group grid grid-cols-12 items-center gap-6 py-8 lg:py-10 hover:bg-white transition-colors duration-500 px-2">
                  <span className="col-span-12 md:col-span-4 text-[var(--color-dark-blue)] text-[22px] lg:text-[28px] font-semibold">{v.title}</span>
                  <span className="col-span-6 md:col-span-3 text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">{v.location}</span>
                  <span className="col-span-6 md:col-span-3 text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">{v.type}</span>
                  <span className="col-span-6 md:col-span-1 text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">{v.days}d ago</span>
                  <span className="col-span-6 md:col-span-1 flex md:justify-end">
                    <ArrowUpRight className="w-5 h-5 text-[var(--color-dark-blue)] group-hover:text-[var(--color-cyan)] btn-arrow" />
                  </span>
                </a>
              </FadeIn>
            ))}
          </ul>

          <FadeIn delay={500}>
            <div className="mt-16 flex flex-col md:flex-row gap-4">
              <Button href="/contact" variant="primary" size="lg">Send us your CV</Button>
              <Button href="tel:01925850982" variant="secondary" size="lg" arrow="none">Recruitment line · 01925 850 982</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeIn><span className="eyebrow mb-8 block">Life on site</span></FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lifeImages.map((img, i) => (
              <FadeIn key={img} delay={i * 120}>
                <RevealImage src={img} alt="Life on site" aspect="aspect-[3/2]" />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Join the crew" heading="Good operatives welcome. Always." />
    </PageShell>
  );
}
