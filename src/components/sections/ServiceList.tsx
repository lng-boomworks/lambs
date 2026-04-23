import { ArrowUpRight } from "lucide-react";
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

/**
 * ServiceList — large numbered list with heading-on-scroll. Used across
 * sector pages (Telecoms, Civil Works, Utilities).
 */
export function ServiceList({ eyebrow, heading, items }: ServiceListProps) {
  return (
    <section className="bg-[var(--color-warm-white)] py-24 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-4">
            <FadeIn>
              <span className="eyebrow">{eyebrow}</span>
            </FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="max-w-3xl">
              {heading}
            </AnimatedHeading>
          </div>
        </div>

        <ul className="border-t border-[var(--color-border-strong)]">
          {items.map((item, i) => (
            <FadeIn
              key={item.title}
              as="span"
              delay={i * 80}
              className="block group border-b border-[var(--color-border-strong)]"
            >
              <div className="grid grid-cols-12 items-start gap-6 py-10 lg:py-12 transition-colors duration-500 hover:bg-[var(--color-cream)]">
                <div className="col-span-12 md:col-span-2 font-mono text-xs uppercase tracking-widest text-[var(--color-concrete)]">
                  {item.number}
                </div>
                <div className="col-span-12 md:col-span-5">
                  <h3 className="font-display text-[28px] md:text-[36px] leading-tight font-semibold">
                    {item.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-4 text-[var(--color-concrete)] text-[15px] leading-relaxed">
                  {item.description}
                </div>
                <div className="col-span-12 md:col-span-1 flex md:justify-end">
                  <ArrowUpRight className="w-6 h-6 text-[var(--color-ink)] opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
