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
        lede="A live view of every Lambs Group programme currently active. Filter by sector. Click a dot for detail. Updated weekly by the Warrington team."
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
