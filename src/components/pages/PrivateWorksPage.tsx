import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { SectorIndex } from "../SectorIndex";
import { BeforeAfter } from "../motion/BeforeAfter";
import { PageShell } from "../sections/PageShell";
import { CTASection } from "../sections/CTASection";
import { PrivateServicesGrid } from "./private/PrivateServicesGrid";
import { FinishesGallery } from "./private/FinishesGallery";
import { PortfolioGallery } from "./private/PortfolioGallery";
import { PricingBand } from "./private/PricingBand";
import { QuoteForm } from "./private/QuoteForm";

const beforeSrc = "https://picsum.photos/seed/pw-before/1600/1000";
const afterSrc = "https://picsum.photos/seed/pw-after/1600/1000";

export function PrivateWorksPage() {
  return (
    <PageShell>
      <SectorIndex label="04 / PRIVATE WORKS" />

      <section className="relative bg-white pt-[140px] pb-20 lg:pt-[180px] lg:pb-28 border-b border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <FadeIn><span className="eyebrow mb-6">Sector 04 · Private Works · Domestic</span></FadeIn>
              <AnimatedHeading as="h1" className="mt-4 mb-8" stagger={40}>
                Your driveway, finished right.
              </AnimatedHeading>
              <FadeIn delay={260}>
                <p className="text-[var(--color-charcoal)] text-lg md:text-xl leading-relaxed max-w-md mb-8">
                  Tarmac, resin, block paving, patios, drainage and dropped kerbs - laid by the same crews that work on our commercial programmes. Directly employed. Compliance-first. Fixed quotes.
                </p>
              </FadeIn>
              <FadeIn delay={380}>
                <Button href="#quote" variant="primary" size="lg">Get a quote</Button>
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <BeforeAfter
                beforeSrc={beforeSrc}
                afterSrc={afterSrc}
                beforeAlt="Driveway before - cracked tarmac"
                afterAlt="Driveway after - new resin finish"
              />
            </div>
          </div>
        </div>
      </section>

      <PrivateServicesGrid />
      <FinishesGallery />
      <PortfolioGallery />
      <PricingBand />
      <QuoteForm id="quote" />

      <CTASection
        eyebrow="Private Works"
        heading="Ready to start your driveway?"
        primaryLabel="Get a quote"
        primaryHref="#quote"
      />
    </PageShell>
  );
}
