import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { RevealImage } from "../RevealImage";
import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { CTASection } from "../sections/CTASection";

const team = [
  {
    name: "Simon Lamb",
    role: "Managing Director",
    bio: "Founded the business in 1988. Still walks sites. Still picks up the phone.",
    image: "https://picsum.photos/seed/lambs-simon/900/1200",
  },
  {
    name: "Amanda Lamb",
    role: "Director",
    bio: "Runs the business alongside Simon. Finance, HR and the things that keep the wheels on.",
    image: "https://picsum.photos/seed/lambs-amanda/900/1200",
  },
  {
    name: "Dave Edmonds",
    role: "Operations Manager",
    bio: "Runs day-to-day delivery across every live programme. Former site foreman. Knows every operative by name.",
    image: "https://picsum.photos/seed/lambs-dave/900/1200",
  },
  {
    name: "Tony Potts",
    role: "Health & Safety",
    bio: "NEBOSH-accredited. Keeps every site legal, tidy and accident-free.",
    image: "https://picsum.photos/seed/lambs-tony/900/1200",
  },
  {
    name: "Brian Saidie",
    role: "Health & Safety",
    bio: "Audits, toolbox talks and close-out reporting across the operational crew.",
    image: "https://picsum.photos/seed/lambs-brian/900/1200",
  },
  {
    name: "Ian Gee",
    role: "Team Manager",
    bio: "Front-line team lead on the Virgin Media Motif programme — 2,500 jobs a week, week in, week out.",
    image: "https://picsum.photos/seed/lambs-ian/900/1200",
  },
];

export function TeamPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="The team"
        heading="People you'll actually talk to."
        lede="Lambs UK is built on long tenures. The directors founded the business. The managers have worked here for decades. The operatives are directly employed. That's the whole trick."
        sectionIndex="— / Team"
      />

      <section className="bg-[var(--color-warm-white)] py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-4">
              <FadeIn>
                <span className="eyebrow">Directors & managers</span>
              </FadeIn>
            </div>
            <div className="lg:col-span-8">
              <AnimatedHeading as="h2" className="max-w-3xl">
                The people who run the programmes.
              </AnimatedHeading>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map((person, i) => (
              <FadeIn key={person.name} delay={i * 120}>
                <article className="group">
                  <RevealImage
                    src={person.image}
                    alt={person.name}
                    aspect="aspect-[3/4]"
                    className="mb-6"
                  />
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-concrete)] mb-2">
                    {person.role}
                  </div>
                  <h3 className="font-display text-[26px] lg:text-[30px] font-semibold mb-3 leading-tight">
                    {person.name}
                  </h3>
                  <p className="text-[var(--color-concrete)] text-[15px] leading-relaxed">
                    {person.bio}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Join the team"
        heading="We're always looking for good operatives."
        primaryLabel="See vacancies"
        primaryHref="/careers"
      />
    </PageShell>
  );
}
