import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";

interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

interface ServiceListProps {
  eyebrow: string;
  heading: string;
  items: ServiceItem[];
}

export function ServiceList({ eyebrow, heading, items }: ServiceListProps) {
  return (
    <section className="bg-white py-24 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <FadeIn><span className="eyebrow">{eyebrow}</span></FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="max-w-3xl">{heading}</AnimatedHeading>
          </div>
        </div>

        <ul className="border-t border-[var(--color-border-strong)]">
          {items.map((item, i) => (
            <FadeIn as="span" key={item.title} delay={i * 80} className="block border-b border-[var(--color-border-strong)] group hover:bg-[var(--color-light-grey)] transition-colors duration-400">
              <div className="grid grid-cols-12 gap-6 py-8 lg:py-10">
                <div className="col-span-12 md:col-span-2 text-xs uppercase tracking-widest text-[var(--color-mid-blue)] font-medium">
                  {item.number}
                </div>
                <div className="col-span-12 md:col-span-10">
                  <h3 className="text-[var(--color-dark-blue)] text-[22px] lg:text-[28px] font-semibold mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-charcoal)] text-[15px] leading-relaxed max-w-3xl">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
