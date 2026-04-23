import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";

interface CTASectionProps {
  eyebrow?: string;
  heading?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function CTASection({
  eyebrow = "Start a project",
  heading = "Infrastructure needs a steady hand. Let's talk.",
  body = "Whether you're planning a full-fibre rollout, a housing development, or a utility reinstatement, we'll scope, price and mobilise with no subcontracting surprises.",
  primaryHref = "/contact",
  primaryLabel = "Get in touch",
  secondaryHref = "tel:01925810991",
  secondaryLabel = "01925 810 991",
}: CTASectionProps) {
  return (
    <section className="relative bg-[var(--color-ink)] text-white overflow-hidden">
      <div className="grid-bg-dark absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="hivis-stripe h-1.5 w-full" aria-hidden="true" />

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-36">
        <FadeIn>
          <span className="eyebrow eyebrow-dark mb-8">{eyebrow}</span>
        </FadeIn>
        <AnimatedHeading
          as="h2"
          className="text-white max-w-4xl mt-6 mb-10"
        >
          {heading}
        </AnimatedHeading>
        <FadeIn delay={200}>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
            {body}
          </p>
        </FadeIn>
        <FadeIn delay={320}>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href={primaryHref} variant="accent" size="lg">
              {primaryLabel}
            </Button>
            <Button href={secondaryHref} variant="outline-white" size="lg" arrow="none">
              {secondaryLabel}
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
