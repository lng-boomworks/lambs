import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";
import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { CTASection } from "../sections/CTASection";

const storyImage = "/images/hero/careers-crew.webp";
const fieldImage = "/images/utilities/job-03.webp";

const values = [
  { number: "01", title: "Directly employed workforce", description: "75+ directly employed operatives and engineers. Not agency, not sub-sub. PAYE, trained, accountable.", chip: "75+ operatives" },
  { number: "02", title: "Compliance-first delivery", description: "NRSWA-trained, NEBOSH-accredited supervision. 55 van audits per month. Audited, logged, actioned.", chip: "55 audits / month" },
  { number: "03", title: "Family-run, thirty-seven years", description: "Still run by Simon & Amanda Lamb. Still answering the phone. Still remembering every operative's name.", chip: "Est. 1988" },
  { number: "04", title: "Long client relationships", description: "Our clients come back year after year. Trust built one programme at a time.", chip: "Repeat clients" },
];

const timeline = [
  { year: "1988", title: "Founded as S Lamb Construction", body: "Simon Lamb starts the business with a single crew. Direct delivery, no subcontracting shuffle." },
  { year: "1990s", title: "Civil works expansion", body: "Growing reputation across the North West for drainage, reinstatement and footway schemes." },
  { year: "2000s", title: "Telecoms specialism", body: "First fibre contracts. Lambs becomes a trusted telecoms civils partner for national operators." },
  { year: "2010s", title: "Utilities arm launched", body: "Expansion into water, gas and electricity connections across housing and industrial schemes." },
  { year: "Today", title: "Motif · Virgin Media", body: "One of the largest operational crews on Virgin Media's Motif programme. 2,500 jobs per week, 10,000 homes per month." },
];

export function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Lambs Group"
        heading="Thirty-seven years delivering infrastructure."
        lede="Lambs Group is a family-run infrastructure contractor based in Warrington. Telecoms, civils, utilities and domestic works, delivered by directly employed crews across the UK since 1988."
        image={storyImage}
        imageAlt="Lambs Group Warrington headquarters"
        sectionIndex="- / About"
      />

      <section className="bg-white py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <FadeIn><span className="eyebrow">The story</span></FadeIn>
              <AnimatedHeading as="h2" className="mt-6 max-w-xl">A Warrington yard. A clear idea.</AnimatedHeading>
            </div>
            <div className="lg:col-span-7 space-y-6 text-[var(--color-charcoal)] text-lg leading-relaxed">
              <FadeIn delay={180}>
                <p>In 1988, Simon Lamb founded S Lamb Construction with a small team and a clear principle: employ the people who do the work. Subcontracting through multiple layers, he'd seen, undermines quality and safety.</p>
              </FadeIn>
              <FadeIn delay={260}>
                <p>Today - now trading as Lambs Group - the company is still based in Warrington, still family-run by Simon and his wife Amanda Lamb, and still employing its operatives directly. Over 75 of them, delivering civils, telecoms, utilities and domestic works from the North West to the south coast.</p>
              </FadeIn>
              <FadeIn delay={340}>
                <p>Bigger projects. Same principles.</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-dark-blue)] text-white py-24 lg:py-36 relative">
        <div className="grid-bg-dark absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-4">
              <FadeIn><span className="eyebrow eyebrow-dark">What we stand for</span></FadeIn>
            </div>
            <div className="lg:col-span-8">
              <AnimatedHeading as="h2" className="text-white max-w-3xl">Four things we don't compromise on.</AnimatedHeading>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 140} className="bg-[var(--color-dark-blue)] p-10 lg:p-14">
                <div className="flex items-start gap-6">
                  <span className="text-xs uppercase tracking-widest text-[var(--color-cyan)] font-medium">{v.number}</span>
                  <div>
                    <h3 className="text-white text-[26px] lg:text-[32px] font-semibold mb-4 leading-tight">{v.title}</h3>
                    <p className="text-white/75 text-[15px] leading-relaxed mb-5">{v.description}</p>
                    <span className="inline-block text-[11px] uppercase tracking-widest text-[var(--color-cyan)] border border-[var(--color-cyan)]/50 px-3 py-1.5 font-medium">
                      {v.chip}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <FadeIn><span className="eyebrow">Milestones</span></FadeIn>
              <AnimatedHeading as="h2" className="mt-6 mb-10 max-w-md">Three decades, one direction.</AnimatedHeading>
              <FadeIn delay={200}>
                <RevealImage src={fieldImage} alt="Lambs crew at work" aspect="aspect-[4/5]" />
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <ul className="border-t border-[var(--color-border-strong)]">
                {timeline.map((item, i) => (
                  <FadeIn key={item.year} as="span" delay={i * 100} className="block border-b border-[var(--color-border-strong)] py-8 lg:py-10">
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-12 md:col-span-3 text-sm uppercase tracking-widest text-[var(--color-cyan)] font-semibold">
                        {item.year}
                      </div>
                      <div className="col-span-12 md:col-span-9">
                        <h3 className="text-[var(--color-dark-blue)] text-[22px] lg:text-[26px] font-semibold mb-3 leading-tight">{item.title}</h3>
                        <p className="text-[var(--color-charcoal)] text-[15px] leading-relaxed">{item.body}</p>
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
