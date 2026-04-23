import { FadeIn } from "../../FadeIn";
import { AnimatedHeading } from "../../AnimatedHeading";

const finishes = [
  { name: "Resin — Autumn Gold", image: "https://picsum.photos/seed/resin-autumn/500/500" },
  { name: "Resin — Silver Birch", image: "https://picsum.photos/seed/resin-silver/500/500" },
  { name: "Resin — Charcoal Mix", image: "https://picsum.photos/seed/resin-charcoal/500/500" },
  { name: "Block — Bradstone Charcoal", image: "https://picsum.photos/seed/block-charcoal/500/500" },
  { name: "Block — Marshalls Natural", image: "https://picsum.photos/seed/block-natural/500/500" },
  { name: "Indian Stone — Kandla Grey", image: "https://picsum.photos/seed/stone-kandla/500/500" },
];

export function FinishesGallery() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <FadeIn><span className="eyebrow">Finishes</span></FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="max-w-2xl">Pick your finish.</AnimatedHeading>
            <FadeIn delay={200}>
              <p className="text-[var(--color-charcoal)] text-lg leading-relaxed mt-6 max-w-2xl">
                A selection of the most-requested finishes. Ask us for samples of anything not listed — most major manufacturer ranges are available to order.
              </p>
            </FadeIn>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {finishes.map((f, i) => (
            <FadeIn key={f.name} delay={i * 80}>
              <div className="group relative aspect-square overflow-hidden">
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-[var(--color-cyan)] transition-all duration-400" />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[var(--color-dark-blue)]/90 to-transparent">
                  <p className="text-white text-[12px] font-medium leading-tight">{f.name}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
