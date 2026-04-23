import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";
import { Button } from "../Button";
import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { CTASection } from "../sections/CTASection";
import { withBase } from "../../utils/paths";

type Sector = "All" | "Telecoms" | "Civil Works" | "Utilities" | "Private Works";

const studies = [
  { id: "motif", flagship: true, client: "Fujitsu · Virgin Media", title: "Virgin Media Motif — national fibre rollout", summary: "One of the largest operational crews on Virgin Media's Motif full-fibre programme. 2,500 jobs per week, 10,000 homes connected per month.", sector: "Telecoms" as Sector, image: "/images/utilities/job-02.webp", stats: [{ value: "2,500+", label: "Jobs / week" }, { value: "10k+", label: "Homes / month" }], href: "/work/motif" },
  { id: "barratt", flagship: false, client: "Barratt Developments", title: "National housebuilder civils framework", summary: "Long-standing civils and reinstatement partner to one of the UK's largest housebuilders.", sector: "Civil Works" as Sector, image: "/images/utilities/job-11.webp", stats: [{ value: "Multi-site", label: "Live delivery" }, { value: "Repeat", label: "Framework client" }], href: "/contact" },
  { id: "bury", flagship: false, client: "Bury Council", title: "Local authority highways reinstatement", summary: "NRSWA-compliant highway reinstatement programmes for Bury Council and other North West local authorities.", sector: "Civil Works" as Sector, image: "/images/utilities/job-01.webp", stats: [{ value: "NRSWA", label: "Compliant" }, { value: "UK-wide", label: "Authority work" }], href: "/contact" },
];

const sectors: Sector[] = ["All", "Telecoms", "Civil Works", "Utilities", "Private Works"];

export function CaseStudiesPage() {
  const [filter, setFilter] = useState<Sector>("All");
  const filtered = filter === "All" ? studies : studies.filter((s) => s.sector === filter);
  const flagship = filtered.find((s) => s.flagship);
  const rest = filtered.filter((s) => !s.flagship);

  return (
    <PageShell>
      <PageHero
        eyebrow="Our Work"
        heading="The work, not the marketing."
        lede="A selection of programmes we've delivered. More on request — much of our best work is under NDA, but we can walk you through comparable builds and introduce you to the team that ran them."
        sectionIndex="— / Our Work"
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap gap-2 mb-16">
            {sectors.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 text-[12px] uppercase tracking-[0.14em] font-medium transition-colors duration-300 ${
                  filter === s ? "bg-[var(--color-cyan)] text-[var(--color-dark-blue)]" : "border border-[var(--color-border-strong)] text-[var(--color-dark-blue)] hover:border-[var(--color-dark-blue)]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {flagship && (
            <FadeIn>
              <a href={flagship.href} className="group block bg-[var(--color-dark-blue)] text-white mb-24 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 aspect-video lg:aspect-auto lg:min-h-[520px] relative overflow-hidden">
                    <img src={withBase(flagship.image)} alt={flagship.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                  <div className="lg:col-span-5 p-10 lg:p-14 flex flex-col justify-center">
                    <span className="eyebrow eyebrow-dark mb-6">Flagship · {flagship.sector}</span>
                    <div className="text-[11px] uppercase tracking-widest text-white/60 mb-4 font-medium">{flagship.client}</div>
                    <h2 className="text-white text-[32px] lg:text-[44px] font-semibold leading-tight mb-6">{flagship.title}</h2>
                    <p className="text-white/80 text-[15px] leading-relaxed mb-8">{flagship.summary}</p>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      {flagship.stats.map((stat) => (
                        <div key={stat.label}>
                          <div className="text-[36px] font-semibold leading-none">{stat.value}</div>
                          <div className="text-[11px] uppercase tracking-widest text-white/60 mt-2 font-medium">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <Button href={flagship.href} variant="primary" size="md" arrow="up-right">Read the Motif story</Button>
                  </div>
                </div>
              </a>
            </FadeIn>
          )}

          <div className="flex flex-col gap-24 lg:gap-32">
            {rest.map((study, i) => (
              <article key={study.id} className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="lg:col-span-7">
                  <RevealImage src={study.image} alt={study.title} aspect="aspect-[4/3]" />
                </div>
                <div className="lg:col-span-5">
                  <FadeIn>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs uppercase tracking-widest text-[var(--color-cyan)] font-semibold">{study.sector}</span>
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] mb-4 font-medium">{study.client}</div>
                  </FadeIn>
                  <AnimatedHeading as="h2" className="mb-8 max-w-md">{study.title}</AnimatedHeading>
                  <FadeIn delay={220}>
                    <p className="text-[var(--color-charcoal)] text-[16px] leading-relaxed mb-8">{study.summary}</p>
                  </FadeIn>
                  <div className="grid grid-cols-2 gap-px bg-[var(--color-border-strong)] mb-8 max-w-md">
                    {study.stats.map((stat, j) => (
                      <FadeIn key={stat.label} delay={300 + j * 80} className="bg-white p-5">
                        <div className="text-[32px] lg:text-[40px] leading-none font-semibold text-[var(--color-dark-blue)]">{stat.value}</div>
                        <div className="text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] mt-2 font-medium">{stat.label}</div>
                      </FadeIn>
                    ))}
                  </div>
                  <FadeIn delay={460}>
                    <a href={study.href} className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest text-[var(--color-dark-blue)] font-semibold">
                      Discuss a similar programme
                      <ArrowUpRight className="w-4 h-4 btn-arrow" />
                    </a>
                  </FadeIn>
                </div>
              </article>
            ))}
          </div>

          <FadeIn delay={400}>
            <div className="mt-24 pt-12 border-t border-[var(--color-border-strong)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <p className="text-[var(--color-charcoal)] text-lg max-w-2xl">See where we're working today — across the UK.</p>
              <Button href="/map" variant="secondary" size="md" arrow="up-right">Live works map</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection eyebrow="Ready to brief us?" heading="Your programme. Our crew. One point of contact." />
    </PageShell>
  );
}
