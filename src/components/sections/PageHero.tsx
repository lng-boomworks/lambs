import type { ReactNode } from "react";
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";

interface PageHeroProps {
  eyebrow: string;
  heading: string;
  lede?: string;
  image?: string;
  imageAlt?: string;
  sectionIndex?: string;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  heading,
  lede,
  image,
  imageAlt,
  sectionIndex,
  children,
}: PageHeroProps) {
  return (
    <section className="relative bg-white overflow-hidden pt-[140px] pb-16 lg:pt-[180px] lg:pb-24 border-b border-[var(--color-border)]">
      <div className="grid-bg absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between mb-10">
          <FadeIn><span className="eyebrow">{eyebrow}</span></FadeIn>
          {sectionIndex && (
            <FadeIn delay={100}>
              <span className="hidden md:block text-xs uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">
                {sectionIndex}
              </span>
            </FadeIn>
          )}
        </div>

        <div className={image ? "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end" : ""}>
          <div className={image ? "lg:col-span-7" : ""}>
            <AnimatedHeading as="h1" className="max-w-4xl mb-8">{heading}</AnimatedHeading>
            {lede && (
              <FadeIn delay={260}>
                <p className="text-[var(--color-charcoal)] text-lg md:text-xl leading-relaxed max-w-2xl">
                  {lede}
                </p>
              </FadeIn>
            )}
            {children}
          </div>
          {image && (
            <div className="lg:col-span-5">
              <RevealImage src={image} alt={imageAlt || ""} aspect="aspect-[4/5]" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
