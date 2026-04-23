import { ArrowDown, ArrowUpRight, Radio, HardHat, Zap, Home } from "lucide-react";
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";
import { Button } from "../Button";
import { NumberTicker } from "../NumberTicker";
import { PageShell } from "../sections/PageShell";
import { CTASection } from "../sections/CTASection";
import { UKMap } from "../map/UKMap";

const heroImage = "/images/hero/home-field.webp";
const aboutImage = "/images/hero/careers-crew.webp";

const commercialSectors = [
  {
    icon: Radio,
    number: "01",
    title: "Telecoms",
    blurb: "FTTH/FTTP rollouts, blown fibre, splicing, surveys, mole ploughing, directional drilling and cabinet installs for the UK's largest operators.",
    href: "/telecoms",
  },
  {
    icon: HardHat,
    number: "02",
    title: "Civil Works",
    blurb: "Excavation, reinstatement, road works, footways, drainage, ducting and chamber installation — NRSWA-compliant, delivered by direct crews.",
    href: "/civil-works",
  },
  {
    icon: Zap,
    number: "03",
    title: "Utilities",
    blurb: "Water, gas and electricity supply works. Ducting, jointing, mains laying and service connections across housing, industrial and local authority sites.",
    href: "/utilities",
  },
];

const domesticSector = {
  icon: Home,
  number: "04",
  title: "Private Works",
  blurb: "Driveways, resin, block paving, patios, groundworks, drainage, dropped kerbs. Domestic civils with the same standards as our commercial programmes.",
  href: "/private-works",
};

const clients = [
  { name: "Fujitsu", logo: "/images/clients/fujitsu.webp" },
  { name: "Barratt Developments", logo: "/images/clients/barratt.webp" },
  { name: "OCU Group", logo: "/images/clients/ocu-group.webp" },
  { name: "Kelly Group", logo: "/images/clients/kelly-group.webp" },
  { name: "MJ Quinn", logo: "/images/clients/mj-quinn.webp" },
  { name: "Circet", logo: "/images/clients/circet.webp" },
  { name: "M Group", logo: "/images/clients/mgroup.webp" },
  { name: "MAP Group", logo: "/images/clients/map-group.webp" },
  { name: "Freedom Fibre", logo: "/images/clients/freedom-fibre.webp" },
  { name: "Svella Connect", logo: "/images/clients/svella.webp" },
  { name: "JN Civils", logo: "/images/clients/jn-civils.webp" },
  { name: "STL", logo: "/images/clients/stl.webp" },
  { name: "Unified Infra", logo: "/images/clients/united-infra.webp" },
  { name: "PJS", logo: "/images/clients/pjs.webp" },
  { name: "Nano", logo: "/images/clients/nano.webp" },
  { name: "CellEx", logo: "/images/clients/cellex.webp" },
  { name: "Core Line Fibre", logo: "/images/clients/cf.webp" },
  { name: "FT Surfacing", logo: "/images/clients/ft-surfacing.webp" },
  { name: "BWP Consultants", logo: "/images/clients/bwp.webp" },
];

const stats = [
  { value: 100, suffix: "+", label: "Directly employed" },
  { value: 30, suffix: "", label: "Audits / month" },
  { value: 2500, suffix: "+", label: "Motif jobs / week" },
  { value: 37, suffix: " yrs", label: "Est. 1988" },
];

export function HomePage() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative bg-white overflow-hidden min-h-[100svh] flex items-end">
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 pointer-events-none">
          <div className="reveal-image is-visible h-full w-full">
            <img src={heroImage} alt="" className="h-full w-full object-cover opacity-40 lg:opacity-80" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent lg:from-white lg:via-white/40" aria-hidden="true" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-[160px] lg:pt-[200px] pb-20 lg:pb-28 w-full">
          <div className="flex items-center justify-between mb-16 lg:mb-24">
            <FadeIn><span className="eyebrow">Infrastructure Services · Est. 1988</span></FadeIn>
            <FadeIn delay={120}>
              <span className="hidden md:flex items-center gap-2 text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] animate-pulse" />
                Actively mobilising · UK-wide
              </span>
            </FadeIn>
          </div>

          <AnimatedHeading as="h1" className="max-w-[1100px] mb-14" stagger={40}>
            Infrastructure services across the UK. Safely, compliantly, on programme.
          </AnimatedHeading>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-6">
              <FadeIn delay={280}>
                <p className="text-[var(--color-charcoal)] text-lg md:text-xl leading-relaxed max-w-xl">
                  Lambs Group is a family-run, Warrington-based contractor delivering
                  telecoms, civil works, utilities and domestic works for operators,
                  developers, local authorities and homeowners. Directly employed crews.
                  Compliance-first delivery.
                </p>
              </FadeIn>
            </div>

            <div className="lg:col-span-6 flex flex-col items-start lg:items-end gap-6">
              <FadeIn delay={420}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button href="/contact" variant="primary" size="lg">Start a project</Button>
                  <Button href="/about" variant="secondary" size="lg" arrow="up-right">Our story</Button>
                </div>
              </FadeIn>
              <FadeIn delay={540}>
                <a href="#sectors" className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] hover:text-[var(--color-cyan)] transition-colors font-medium">
                  Scroll to explore
                  <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                </a>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="bg-[var(--color-light-grey)] py-16 border-y border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-[48px] lg:text-[64px] leading-none font-semibold text-[var(--color-dark-blue)]">
                  <NumberTicker value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] mt-3 font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section id="sectors" className="bg-white py-24 lg:py-36 relative">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
            <div className="lg:col-span-4">
              <FadeIn><span className="eyebrow">Four sectors · One contractor</span></FadeIn>
            </div>
            <div className="lg:col-span-8">
              <AnimatedHeading as="h2" className="max-w-3xl">
                We design, dig, joint, reinstate and finish.
              </AnimatedHeading>
              <FadeIn delay={280}>
                <p className="text-[var(--color-charcoal)] text-lg leading-relaxed mt-8 max-w-2xl">
                  From national fibre rollouts to homeowner driveways — delivered end-to-end by directly employed crews. One contractor, one point of accountability.
                </p>
              </FadeIn>
            </div>
          </div>

          <div className="mb-6"><span className="eyebrow">Commercial</span></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {commercialSectors.map((sector, i) => {
              const Icon = sector.icon;
              return (
                <FadeIn key={sector.title} delay={i * 160}>
                  <a
                    href={sector.href}
                    className="group relative block bg-white border border-[var(--color-border-strong)] p-8 lg:p-10 h-full transition-all duration-500 hover:border-[var(--color-dark-blue)] hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-12">
                      <span className="text-xs uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">{sector.number}</span>
                      <ArrowUpRight className="w-5 h-5 text-[var(--color-dark-blue)] opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    <div className="w-14 h-14 flex items-center justify-center bg-[var(--color-dark-blue)] mb-8 group-hover:bg-[var(--color-cyan)] transition-colors duration-500">
                      <Icon className="w-7 h-7 text-white group-hover:text-[var(--color-dark-blue)] transition-colors duration-500" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-[28px] lg:text-[32px] leading-none font-semibold mb-5 text-[var(--color-dark-blue)]">{sector.title}</h3>
                    <p className="text-[var(--color-charcoal)] text-[15px] leading-relaxed">{sector.blurb}</p>
                  </a>
                </FadeIn>
              );
            })}
          </div>

          <div className="mb-6"><span className="eyebrow">Domestic</span></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn className="md:col-span-3">
              <a
                href={domesticSector.href}
                className="group relative block bg-[var(--color-light-grey)] border border-[var(--color-border-strong)] p-8 lg:p-10 transition-all duration-500 hover:border-[var(--color-dark-blue)] hover:-translate-y-1"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-1">
                    <span className="text-xs uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">{domesticSector.number}</span>
                  </div>
                  <div className="md:col-span-2">
                    <div className="w-14 h-14 flex items-center justify-center bg-[var(--color-dark-blue)] group-hover:bg-[var(--color-cyan)] transition-colors duration-500">
                      <domesticSector.icon className="w-7 h-7 text-white group-hover:text-[var(--color-dark-blue)] transition-colors duration-500" strokeWidth={1.8} />
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="text-[28px] lg:text-[32px] leading-none font-semibold mb-3 text-[var(--color-dark-blue)]">{domesticSector.title}</h3>
                    <p className="text-[var(--color-charcoal)] text-[15px] leading-relaxed">{domesticSector.blurb}</p>
                  </div>
                  <div className="md:col-span-1 flex md:justify-end">
                    <ArrowUpRight className="w-6 h-6 text-[var(--color-dark-blue)] opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* LIVE MAP EMBED */}
      <section className="bg-white py-24 lg:py-32 border-t border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
            <div className="lg:col-span-4">
              <FadeIn><span className="eyebrow">Live works</span></FadeIn>
            </div>
            <div className="lg:col-span-8">
              <AnimatedHeading as="h2" className="max-w-3xl">Where we're working this week.</AnimatedHeading>
              <FadeIn delay={200}>
                <p className="text-[var(--color-charcoal)] text-lg leading-relaxed mt-6 max-w-2xl">
                  Live programmes across telecoms, civils, utilities and domestic works. Updated weekly.
                </p>
              </FadeIn>
            </div>
          </div>
          <UKMap variant="embed" />
          <div className="mt-10 flex justify-end">
            <Button href="/map" variant="secondary" size="md" arrow="up-right">Full map</Button>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-6">
              <RevealImage src={aboutImage} alt="Lambs Group operatives on site" aspect="aspect-[4/5]" />
            </div>
            <div className="lg:col-span-6">
              <FadeIn><span className="eyebrow mb-8">Who we are</span></FadeIn>
              <AnimatedHeading as="h2" className="mt-6 mb-8">Family-run since 1988. Directly employed workforce.</AnimatedHeading>
              <FadeIn delay={200}>
                <div className="space-y-5 text-[var(--color-charcoal)] text-lg leading-relaxed max-w-xl">
                  <p>Founded as S Lamb Construction in 1988 and now trading as Lambs Group, we deliver infrastructure services across the UK — directly employed operatives, NRSWA-trained, compliance-first.</p>
                  <p>Over 100 directly employed operatives and engineers. 30 van audits a month. NEBOSH-accredited supervision on every site. Trusted by Fujitsu, Virgin Media, Barratt Developments and local authorities across the UK.</p>
                </div>
              </FadeIn>
              <FadeIn delay={320}>
                <div className="mt-10">
                  <Button href="/about" variant="primary" size="lg" arrow="up-right">Read our story</Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS LOGO WALL */}
      <section className="bg-white border-y border-[var(--color-border)] py-20">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="flex items-center justify-between mb-12">
              <span className="eyebrow">Trusted by</span>
              <span className="hidden md:block text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">
                Operators · Developers · Local Authorities
              </span>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-px bg-[var(--color-border)]">
            {clients.map((client, i) => (
              <FadeIn key={client.name} delay={i * 40}>
                <div className="logo-tile bg-white h-24 flex items-center justify-center px-6">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-10 max-w-full w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
