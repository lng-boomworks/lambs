import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";
import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { CTASection } from "../sections/CTASection";

const leadership = [
  { name: "Simon Lamb", role: "Managing Director", bio: "Founded the business in 1988. Still walks sites. Still picks up the phone.", image: "/images/team/simon-lamb.webp" },
  { name: "Amanda Lamb", role: "Director", bio: "Runs the business alongside Simon. Finance, HR, and keeping the wheels on.", image: "/images/team/amanda-lamb.webp" },
  { name: "Ray Pennington", role: "Operations Director", bio: "Leads operational delivery across every live programme - telecoms, civils, utilities and domestic works.", image: "/images/team/ray-pennington.webp" },
];

const motifCrew = [
  { name: "Sam B.", role: "Lead Jointer", image: "https://picsum.photos/seed/motif-sam/600/800" },
  { name: "Chris H.", role: "Splicer", image: "https://picsum.photos/seed/motif-chris/600/800" },
  { name: "Danny M.", role: "Drilling Op.", image: "https://picsum.photos/seed/motif-danny/600/800" },
  { name: "Paul R.", role: "Ground Crew", image: "https://picsum.photos/seed/motif-paul/600/800" },
  { name: "Lee T.", role: "QC Inspector", image: "https://picsum.photos/seed/motif-lee/600/800" },
];

export function TeamPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="The team"
        heading="People you'll actually talk to."
        lede="Lambs Group is built on long tenures. The directors founded the business. The managers have worked here for decades. The operatives are directly employed."
        sectionIndex="- / Team"
      />

      <section className="bg-white py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-4">
              <FadeIn><span className="eyebrow">Directors &amp; managers</span></FadeIn>
            </div>
            <div className="lg:col-span-8">
              <AnimatedHeading as="h2" className="max-w-3xl">The people who run the programmes.</AnimatedHeading>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {leadership.map((person, i) => (
              <FadeIn key={person.name} delay={i * 120}>
                <article className="group">
                  <RevealImage src={person.image} alt={person.name} aspect="aspect-[3/4]" className="mb-6" />
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] mb-2 font-medium border-b border-[var(--color-cyan)] pb-1 inline-block">
                    {person.role}
                  </div>
                  <h3 className="text-[var(--color-dark-blue)] text-[24px] lg:text-[28px] font-semibold mb-3 leading-tight mt-1">
                    {person.name}
                  </h3>
                  <p className="text-[var(--color-charcoal)] text-[15px] leading-relaxed">{person.bio}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
            <div className="lg:col-span-4">
              <FadeIn><span className="eyebrow">Flagship crew</span></FadeIn>
            </div>
            <div className="lg:col-span-8">
              <AnimatedHeading as="h2" className="max-w-3xl">On the Motif crew.</AnimatedHeading>
              <FadeIn delay={200}>
                <p className="text-[var(--color-charcoal)] text-lg leading-relaxed mt-6 max-w-2xl">
                  A selection of the team delivering ~2,500 jobs per week on the Virgin Media Motif programme. Same crew, same van, same name you'll see on your street.
                </p>
              </FadeIn>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {motifCrew.map((p, i) => (
              <FadeIn key={p.name} delay={i * 70}>
                <article>
                  <RevealImage src={p.image} alt={p.name} aspect="aspect-[3/4]" className="mb-3" />
                  <h4 className="text-[var(--color-dark-blue)] font-semibold text-[14px]">{p.name}</h4>
                  <p className="text-[var(--color-mid-blue)] text-[11px] uppercase tracking-widest mt-1 font-medium">{p.role}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Join the team" heading="We're always looking for good operatives." primaryLabel="See vacancies" primaryHref="/careers" />
    </PageShell>
  );
}
