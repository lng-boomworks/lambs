import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";

interface PageHeroProps {
  eyebrow: string;
  heading: string;
  lede: string;
  image?: string;
  imageAlt?: string;
  /** Page index label, e.g. "02 / Telecoms" shown top right */
  sectionIndex?: string;
}

/**
 * PageHero — reusable hero for sector / inner pages. Dark background,
 * huge display heading with staggered word reveal, accompanying lede
 * and a reveal image on the right.
 */
export function PageHero({
  eyebrow,
  heading,
  lede,
  image,
  imageAlt = "",
  sectionIndex,
}: PageHeroProps) {
  return (
    <section className="relative bg-[var(--color-ink)] text-white overflow-hidden pt-[120px] pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="grid-bg-dark absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-start justify-between mb-12 lg:mb-20">
          <FadeIn>
            <span className="eyebrow eyebrow-dark">{eyebrow}</span>
          </FadeIn>
          {sectionIndex && (
            <FadeIn delay={100}>
              <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                {sectionIndex}
              </span>
            </FadeIn>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <AnimatedHeading as="h1" className="text-white mb-10">
              {heading}
            </AnimatedHeading>
            <FadeIn delay={300}>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl">
                {lede}
              </p>
            </FadeIn>
          </div>

          {image && (
            <div className="lg:col-span-5">
              <RevealImage
                src={image}
                alt={imageAlt}
                aspect="aspect-[4/5]"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
