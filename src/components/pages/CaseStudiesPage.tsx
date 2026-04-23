import { ArrowUpRight } from "lucide-react";
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";
import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { CTASection } from "../sections/CTASection";

const studies = [
  {
    number: "01",
    client: "Fujitsu · Virgin Media",
    title: "Virgin Media Motif — national fibre rollout",
    summary:
      "One of the largest operational crews on Virgin Media's Motif full-fibre programme. ~2,500 jobs per week and ~10,000 homes connected per month, delivered on programme and to operator quality standard.",
    sector: "Telecoms",
    image: "https://picsum.photos/seed/lambs-cs-motif/1600/1200",
    stats: [
      { value: "2,500+", label: "Jobs / week" },
      { value: "10k+", label: "Homes / month" },
    ],
  },
  {
    number: "02",
    client: "Barratt Developments",
    title: "National housebuilder civils framework",
    summary:
      "Long-standing civils and reinstatement partner to one of the UK's largest housebuilders. Site infrastructure, drainage, ducting and road works across multiple live developments.",
    sector: "Civil Works",
    image: "https://picsum.photos/seed/lambs-cs-barratt/1600/1200",
    stats: [
      { value: "Multi-site", label: "Live delivery" },
      { value: "Repeat", label: "Framework client" },
    ],
  },
  {
    number: "03",
    client: "Bury Council · Local Authority",
    title: "Local authority highways reinstatement",
    summary:
      "NRSWA-compliant highway reinstatement programmes for Bury Council and other North West local authorities. Permanent reinstatement, footways and defect rectification.",
    sector: "Civil Works",
    image: "https://picsum.photos/seed/lambs-cs-council/1600/1200",
    stats: [
      { value: "NRSWA", label: "Compliant" },
      { value: "UK-wide", label: "Authority work" },
    ],
  },
];

export function CaseStudiesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Case studies"
        heading="The work, not the marketing."
        lede="A few of the programmes we've delivered. More on request — much of our best work is under NDA, but we can walk you through comparable builds and introduce you to the team that ran them."
        sectionIndex="— / Case Studies"
      />

      <section className="bg-[var(--color-warm-white)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-24 lg:gap-36">
            {studies.map((study, i) => (
              <article
                key={study.number}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
              >
                <div
                  className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <RevealImage
                    src={study.image}
                    alt={study.title}
                    aspect="aspect-[4/3]"
                  />
                </div>
                <div
                  className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <FadeIn>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-concrete)]">
                        {study.number}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-hivis-dim)]">
                        {study.sector}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-concrete)] mb-4">
                      {study.client}
                    </div>
                  </FadeIn>
                  <AnimatedHeading as="h2" className="mb-8 max-w-md">
                    {study.title}
                  </AnimatedHeading>
                  <FadeIn delay={220}>
                    <p className="text-[var(--color-concrete)] text-[16px] leading-relaxed mb-8">
                      {study.summary}
                    </p>
                  </FadeIn>
                  <div className="grid grid-cols-2 gap-px bg-[var(--color-border-strong)] mb-8 max-w-md">
                    {study.stats.map((stat, j) => (
                      <FadeIn
                        key={stat.label}
                        delay={300 + j * 80}
                        className="bg-[var(--color-warm-white)] p-5"
                      >
                        <div className="font-display text-[36px] lg:text-[44px] leading-none font-semibold">
                          {stat.value}
                        </div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-concrete)] mt-2">
                          {stat.label}
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                  <FadeIn delay={460}>
                    <a
                      href="/contact"
                      className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--color-ink)]"
                    >
                      Discuss a similar programme
                      <ArrowUpRight className="w-4 h-4 btn-arrow" />
                    </a>
                  </FadeIn>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Ready to brief us?" heading="Your programme. Our crew. One point of contact." />
    </PageShell>
  );
}
