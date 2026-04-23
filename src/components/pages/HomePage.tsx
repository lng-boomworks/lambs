import { ArrowDown, ArrowUpRight, Radio, HardHat, Zap } from "lucide-react";
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";
import { Button } from "../Button";
import { PageShell } from "../sections/PageShell";
import { StatStrip } from "../sections/StatStrip";
import { CTASection } from "../sections/CTASection";

// Placeholder imagery — replace with real site photography later.
const heroImage = "https://picsum.photos/seed/lambs-hero-infrastructure/1800/2200";
const aboutImage = "https://picsum.photos/seed/lambs-team-civils/1400/1800";

const sectors = [
  {
    icon: Radio,
    number: "01",
    title: "Telecoms",
    blurb:
      "FTTH/FTTP rollouts, blown fibre, splicing, surveys, mole ploughing, directional drilling and cabinet installs for the UK's largest operators.",
    href: "/telecoms",
    tags: ["FTTH", "Fibre", "NRSWA"],
  },
  {
    icon: HardHat,
    number: "02",
    title: "Civil Works",
    blurb:
      "Excavation, reinstatement, road works, footways, drainage, ducting and chamber installation — NRSWA-compliant, delivered by direct crews.",
    href: "/civil-works",
    tags: ["NRSWA", "Reinstatement", "Drainage"],
  },
  {
    icon: Zap,
    number: "03",
    title: "Utilities",
    blurb:
      "Water, gas and electricity supply works. Ducting, jointing, mains laying and service connections across housing, industrial and local authority sites.",
    href: "/utilities",
    tags: ["Water", "Gas", "Power"],
  },
];

const clients = [
  "Fujitsu",
  "Virgin Media",
  "Barratt Developments",
  "Alfred McAlpine",
  "Bury Council",
  "Kier",
];

export function HomePage() {
  return (
    <PageShell>
      {/* ============ HERO ============ */}
      <section className="relative bg-[var(--color-ink)] text-white overflow-hidden min-h-[100svh] flex items-end">
        <div className="absolute inset-0 grid-bg-dark opacity-50" aria-hidden="true" />

        {/* Hero image — right side, reveal on load */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 pointer-events-none">
          <div className="reveal-image is-visible h-full w-full">
            <img
              src={heroImage}
              alt=""
              className="h-full w-full object-cover opacity-30 lg:opacity-55"
            />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink)]/70 to-transparent lg:from-[var(--color-ink)] lg:via-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-[160px] lg:pt-[200px] pb-20 lg:pb-28 w-full">
          <div className="flex items-center justify-between mb-16 lg:mb-24">
            <FadeIn>
              <span className="eyebrow eyebrow-dark">Infrastructure Contractor · Est. 1988</span>
            </FadeIn>
            <FadeIn delay={120}>
              <span className="hidden md:flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/45">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-hivis)] animate-pulse" />
                Actively mobilising · UK-wide
              </span>
            </FadeIn>
          </div>

          <AnimatedHeading
            as="h1"
            className="text-white max-w-[1100px] mb-14"
            stagger={70}
          >
            Building Britain's infrastructure since 1988.
          </AnimatedHeading>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-6">
              <FadeIn delay={280}>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl">
                  Lambs UK is a family-run, Warrington-based contractor delivering
                  telecoms, civil works and utilities for operators, developers and
                  local authorities. Direct labour. Direct accountability.
                </p>
              </FadeIn>
            </div>

            <div className="lg:col-span-6 flex flex-col items-start lg:items-end gap-6">
              <FadeIn delay={420}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button href="/contact" variant="accent" size="lg">
                    Start a project
                  </Button>
                  <Button href="/about" variant="outline-white" size="lg" arrow="up-right">
                    Our story
                  </Button>
                </div>
              </FadeIn>
              <FadeIn delay={540}>
                <a
                  href="#sectors"
                  className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/50 hover:text-[var(--color-hivis)] transition-colors"
                >
                  Scroll to explore
                  <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                </a>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STAT STRIP ============ */}
      <StatStrip />

      {/* ============ SECTORS ============ */}
      <section id="sectors" className="bg-[var(--color-warm-white)] py-24 lg:py-36 relative">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
            <div className="lg:col-span-4">
              <FadeIn>
                <span className="eyebrow">Three sectors · One operator</span>
              </FadeIn>
            </div>
            <div className="lg:col-span-8">
              <AnimatedHeading as="h2" className="max-w-3xl">
                We design, dig, joint and reinstate.
              </AnimatedHeading>
              <FadeIn delay={280}>
                <p className="text-[var(--color-concrete)] text-lg leading-relaxed mt-8 max-w-2xl">
                  From fibre-to-the-home rollouts to full civil reinstatement and
                  utilities connections — delivered end-to-end by directly-employed
                  crews. No subcontracting shuffle, no hand-offs, no surprises.
                </p>
              </FadeIn>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sectors.map((sector, i) => {
              const Icon = sector.icon;
              return (
                <FadeIn key={sector.title} delay={i * 160}>
                  <a
                    href={sector.href}
                    className="group relative block bg-white border border-[var(--color-border)] p-8 lg:p-10 h-full transition-all duration-500 hover:border-[var(--color-ink)] hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-12">
                      <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-concrete)]">
                        {sector.number}
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-[var(--color-ink)] opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>

                    <div className="w-14 h-14 flex items-center justify-center bg-[var(--color-ink)] mb-8 group-hover:bg-[var(--color-hivis)] transition-colors duration-500">
                      <Icon className="w-7 h-7 text-white group-hover:text-[var(--color-ink)] transition-colors duration-500" strokeWidth={1.8} />
                    </div>

                    <h3 className="font-display text-[32px] leading-none font-semibold mb-5">
                      {sector.title}
                    </h3>
                    <p className="text-[var(--color-concrete)] text-[15px] leading-relaxed mb-8">
                      {sector.blurb}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-6 border-t border-[var(--color-border)]">
                      {sector.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-concrete)] px-2.5 py-1 border border-[var(--color-border)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ ABOUT TEASER ============ */}
      <section className="bg-[var(--color-cream)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-6">
              <RevealImage
                src={aboutImage}
                alt="Lambs UK operatives on site"
                aspect="aspect-[4/5]"
              />
            </div>
            <div className="lg:col-span-6">
              <FadeIn>
                <span className="eyebrow mb-8">Who we are</span>
              </FadeIn>
              <AnimatedHeading as="h2" className="mt-6 mb-8">
                Family-run since 1988. Direct labour, always.
              </AnimatedHeading>
              <FadeIn delay={200}>
                <div className="space-y-5 text-[var(--color-concrete)] text-lg leading-relaxed max-w-xl">
                  <p>
                    Founded as S Lamb Construction by Simon Lamb in 1988, Lambs UK
                    has grown into one of the North West's most trusted infrastructure
                    contractors. We're still family-run, still Warrington-based, and
                    still obsessive about doing the work ourselves.
                  </p>
                  <p>
                    Over 100 directly-employed operatives and engineers. 30 van audits
                    a month. NRSWA-trained, NEBOSH-accredited supervision on every job.
                    That's how you keep Fujitsu, Virgin Media and Barratt Developments
                    on the phone.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={320}>
                <div className="mt-10">
                  <Button href="/about" variant="primary" size="lg" arrow="up-right">
                    Read our story
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLIENTS LOGO WALL ============ */}
      <section className="bg-[var(--color-warm-white)] border-y border-[var(--color-border)] py-20">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="flex items-center justify-between mb-12">
              <span className="eyebrow">Trusted by</span>
              <span className="hidden md:block font-mono text-[11px] uppercase tracking-widest text-[var(--color-concrete)]">
                Operators · Developers · Local Authorities
              </span>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[var(--color-border)]">
            {clients.map((client, i) => (
              <FadeIn key={client} delay={i * 80}>
                {/* Placeholder logo tile — replace with actual SVG logos */}
                <div className="logo-tile bg-[var(--color-warm-white)] h-24 flex items-center justify-center">
                  <span className="font-display text-[var(--color-ink)]/70 text-lg font-semibold tracking-tight">
                    {client}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <CTASection />
    </PageShell>
  );
}
