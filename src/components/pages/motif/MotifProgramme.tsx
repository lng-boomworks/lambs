import { AnimatedHeading } from "../../AnimatedHeading";
import { FadeIn } from "../../FadeIn";
import { FibreDraw } from "../../motion/FibreDraw";

export function MotifProgramme() {
  return (
    <section className="bg-white py-24 lg:py-36 relative">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <FadeIn><span className="eyebrow">The programme</span></FadeIn>
            <AnimatedHeading as="h2" className="mt-6 mb-8 max-w-md">
              One of the UK's largest full-fibre builds.
            </AnimatedHeading>
            <FadeIn delay={200}>
              <div className="space-y-5 text-[var(--color-charcoal)] text-lg leading-relaxed max-w-md">
                <p>Motif is Virgin Media's national full-fibre rollout, built in partnership with Fujitsu. Lambs Group is one of Fujitsu's trusted delivery partners — and runs one of the largest operational crews on the programme.</p>
                <p>Our scope covers survey, mole ploughing, directional drilling, duct installation, blowing, splicing, testing and reinstatement — end-to-end delivery by directly employed operatives.</p>
              </div>
            </FadeIn>
          </div>
          <div className="lg:col-span-7">
            <div className="relative bg-[var(--color-dark-blue)] aspect-[5/4] overflow-hidden">
              <FibreDraw />
              <div className="absolute bottom-6 left-6 right-6 text-white/80 text-[11px] uppercase tracking-widest font-medium">
                Splice nodes · live, pulsing · fibre route indicative
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
