import { AnimatedHeading } from "../../AnimatedHeading";
import { FadeIn } from "../../FadeIn";
import { NumberTicker } from "../../NumberTicker";

export function MotifHero() {
  return (
    <section className="relative bg-[var(--color-dark-blue)] text-white overflow-hidden min-h-[100svh] flex items-end">
      <div className="grid-bg-dark absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-[160px] lg:pt-[220px] pb-20 w-full">
        <FadeIn><span className="eyebrow eyebrow-dark mb-8">Flagship programme · Telecoms</span></FadeIn>
        <AnimatedHeading as="h1" className="text-white max-w-[1100px] mt-8 mb-14" stagger={40}>
          Virgin Media Motif. Britain's fibre, laid.
        </AnimatedHeading>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-6">
            <FadeIn delay={280}>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-xl">
                Lambs Group runs one of the largest operational crews on Virgin Media's Motif programme — in partnership with Fujitsu. Built in the North West, delivered across the UK.
              </p>
            </FadeIn>
          </div>
          <div className="lg:col-span-6 flex lg:justify-end">
            <FadeIn delay={420}>
              <div>
                <div className="text-white text-[80px] lg:text-[140px] leading-none font-semibold tracking-tight">
                  <NumberTicker value={2500} suffix="+" />
                </div>
                <div className="text-[11px] uppercase tracking-widest text-[var(--color-cyan)] mt-2 font-semibold">
                  Jobs per week
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
