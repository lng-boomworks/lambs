import { AnimatedHeading } from "../../AnimatedHeading";
import { FadeIn } from "../../FadeIn";

const days = [
  { day: "Mon", activity: "Pre-mob · morning audit call · survey walks", tag: "Survey" },
  { day: "Tue", activity: "Mobilise crews · start delivery routes", tag: "Delivery" },
  { day: "Wed", activity: "Delivery · splicing · blowing · jointing", tag: "Delivery" },
  { day: "Thu", activity: "Delivery · permit renewals · client update", tag: "Delivery" },
  { day: "Fri", activity: "Reinstatement · close-out · audit reporting", tag: "Reinstatement" },
];

export function MotifWeek() {
  return (
    <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <FadeIn><span className="eyebrow">A week on Motif</span></FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="max-w-2xl">Monday to Friday, on programme.</AnimatedHeading>
          </div>
        </div>

        <ul className="border-t border-[var(--color-border-strong)]">
          {days.map((d, i) => (
            <FadeIn as="span" key={d.day} delay={i * 90} className="block border-b border-[var(--color-border-strong)]">
              <div className="grid grid-cols-12 items-center gap-6 py-6 lg:py-7">
                <div className="col-span-3 md:col-span-2 text-[var(--color-cyan)] text-[28px] lg:text-[36px] font-semibold uppercase tracking-tight">
                  {d.day}
                </div>
                <div className="col-span-6 md:col-span-8 text-[var(--color-dark-blue)] text-[16px] lg:text-[20px] leading-snug font-medium">
                  {d.activity}
                </div>
                <div className="col-span-3 md:col-span-2 text-right text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">
                  {d.tag}
                </div>
              </div>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
