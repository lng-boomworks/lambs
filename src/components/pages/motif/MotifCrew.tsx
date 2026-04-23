import { AnimatedHeading } from "../../AnimatedHeading";
import { FadeIn } from "../../FadeIn";
import { RevealImage } from "../../RevealImage";

const crew = [
  { name: "Ian Gee", role: "Team Manager", image: "https://picsum.photos/seed/motif-ian/500/700" },
  { name: "Sam B.", role: "Lead Jointer", image: "https://picsum.photos/seed/motif-sam/500/700" },
  { name: "Chris H.", role: "Splicer", image: "https://picsum.photos/seed/motif-chris/500/700" },
  { name: "Danny M.", role: "Drilling Op.", image: "https://picsum.photos/seed/motif-danny/500/700" },
  { name: "Paul R.", role: "Ground Crew", image: "https://picsum.photos/seed/motif-paul/500/700" },
  { name: "Lee T.", role: "QC Inspector", image: "https://picsum.photos/seed/motif-lee/500/700" },
  { name: "Nathan K.", role: "Surveyor", image: "https://picsum.photos/seed/motif-nathan/500/700" },
  { name: "Olly W.", role: "Fibre Blower", image: "https://picsum.photos/seed/motif-olly/500/700" },
];

export function MotifCrew() {
  return (
    <section className="bg-white py-24 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <FadeIn><span className="eyebrow">Inside the crew</span></FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="max-w-3xl">The people on the programme.</AnimatedHeading>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-8 px-5 sm:px-8 lg:px-12">
        <div className="flex gap-6 min-w-max">
          {crew.map((p, i) => (
            <FadeIn key={p.name} delay={i * 60} className="w-[220px] lg:w-[260px] flex-shrink-0">
              <RevealImage src={p.image} alt={p.name} aspect="aspect-[3/4]" className="mb-4" />
              <h4 className="text-[var(--color-dark-blue)] font-semibold text-[18px]">{p.name}</h4>
              <p className="text-[var(--color-mid-blue)] text-[11px] uppercase tracking-widest mt-1 font-medium">{p.role}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
