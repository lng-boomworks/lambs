import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";

interface CTASectionProps {
  eyebrow?: string;
  heading?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTASection({
  eyebrow = "Start a project",
  heading = "Your project. Our crew. One point of contact.",
  primaryLabel = "Start a project",
  primaryHref = "/contact",
  secondaryLabel = "Call 01925 810 991",
  secondaryHref = "tel:01925810991",
}: CTASectionProps) {
  return (
    <section className="bg-[var(--color-dark-blue)] text-white py-24 lg:py-32 relative overflow-hidden">
      <div className="grid-bg-dark absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <FadeIn><span className="eyebrow eyebrow-dark mb-6">{eyebrow}</span></FadeIn>
            <AnimatedHeading as="h2" className="text-white max-w-3xl mt-8">
              {heading}
            </AnimatedHeading>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 items-start lg:items-end">
            <Button href={primaryHref} variant="primary" size="lg">{primaryLabel}</Button>
            <Button href={secondaryHref} variant="outline-white" size="lg" arrow="none">{secondaryLabel}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
