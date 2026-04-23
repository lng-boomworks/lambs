import { Radio, HardHat, Zap, Home } from "lucide-react";
import { withBase } from "../utils/paths";

interface MegaMenuProps {
  onClose: () => void;
}

const commercial = [
  { icon: Radio, title: "Telecoms", blurb: "FTTH, fibre, splicing, surveys.", href: "/telecoms" },
  { icon: HardHat, title: "Civil Works", blurb: "Excavation, reinstatement, drainage.", href: "/civil-works" },
  { icon: Zap, title: "Utilities", blurb: "Water, gas, power. Mains to meter.", href: "/utilities" },
];

const domestic = [
  { icon: Home, title: "Private Works", blurb: "Driveways, resin, block paving, patios, dropped kerbs.", href: "/private-works" },
];

export function MegaMenu({ onClose }: MegaMenuProps) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[760px] bg-white border border-[var(--color-border)] shadow-xl z-[60]"
      onClick={onClose}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-0">
        <div className="p-8">
          <div className="eyebrow mb-6">Commercial</div>
          <div className="grid grid-cols-1 gap-1">
            {commercial.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.href}
                  href={withBase(c.href)}
                  className="group flex items-start gap-4 p-4 -mx-4 hover:bg-[var(--color-light-grey)] transition-colors duration-300"
                >
                  <span className="flex items-center justify-center w-10 h-10 bg-[var(--color-dark-blue)] text-white group-hover:bg-[var(--color-cyan)] group-hover:text-[var(--color-dark-blue)] transition-colors duration-300">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h4 className="text-[var(--color-dark-blue)] font-semibold text-[17px] mb-1">{c.title}</h4>
                    <p className="text-[var(--color-mid-blue)] text-[13px] leading-snug">{c.blurb}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <div className="p-8 bg-[var(--color-light-grey)] border-l border-[var(--color-border)]">
          <div className="eyebrow mb-6">Domestic</div>
          {domestic.map((d) => {
            const Icon = d.icon;
            return (
              <a
                key={d.href}
                href={withBase(d.href)}
                className="group flex items-start gap-4 -mx-4 p-4 hover:bg-white transition-colors duration-300"
              >
                <span className="flex items-center justify-center w-10 h-10 bg-[var(--color-dark-blue)] text-white group-hover:bg-[var(--color-cyan)] group-hover:text-[var(--color-dark-blue)] transition-colors duration-300">
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <div>
                  <h4 className="text-[var(--color-dark-blue)] font-semibold text-[17px] mb-1">{d.title}</h4>
                  <p className="text-[var(--color-mid-blue)] text-[13px] leading-snug">{d.blurb}</p>
                </div>
              </a>
            );
          })}
          <a href={withBase("/map")} className="block mt-6 pt-6 border-t border-[var(--color-border)] text-[13px] text-[var(--color-dark-blue)] hover:text-[var(--color-cyan)] transition-colors">
            See where we're working now →
          </a>
        </div>
      </div>
    </div>
  );
}
