import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { CTASection } from "../sections/CTASection";
import { UKMap } from "../map/UKMap";

export function MapPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Live works map"
        heading="Where we're working, this week."
        lede="We operate across the North West and Yorkshire, with the flexibility to support projects nationwide through our dedicated travelling crews. Filter by sector, click a dot for detail. Updated weekly by the Warrington team."
        sectionIndex="- / Map"
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <UKMap variant="full" />
        </div>
      </section>

      <CTASection eyebrow="See yourself on the map?" heading="Let's talk about your programme." />
    </PageShell>
  );
}
