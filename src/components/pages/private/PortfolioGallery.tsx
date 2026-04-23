import { useState } from "react";
import { FadeIn } from "../../FadeIn";
import { AnimatedHeading } from "../../AnimatedHeading";
import { BeforeAfter } from "../../motion/BeforeAfter";

type Category = "All" | "Resin" | "Block paving" | "Tarmac" | "Patio";

interface PortfolioItem {
  id: string;
  category: Category;
  title: string;
  location: string;
  beforeSrc: string;
  afterSrc: string;
}

const portfolio: PortfolioItem[] = [
  { id: "1", category: "Resin", title: "Resin drive — Warrington", location: "Warrington", beforeSrc: "https://picsum.photos/seed/p1b/900/600", afterSrc: "https://picsum.photos/seed/p1a/900/600" },
  { id: "2", category: "Block paving", title: "Block paving — Altrincham", location: "Altrincham", beforeSrc: "https://picsum.photos/seed/p2b/900/600", afterSrc: "https://picsum.photos/seed/p2a/900/600" },
  { id: "3", category: "Tarmac", title: "Tarmac relay — Lymm", location: "Lymm", beforeSrc: "https://picsum.photos/seed/p3b/900/600", afterSrc: "https://picsum.photos/seed/p3a/900/600" },
  { id: "4", category: "Patio", title: "Indian stone patio — Hale", location: "Hale", beforeSrc: "https://picsum.photos/seed/p4b/900/600", afterSrc: "https://picsum.photos/seed/p4a/900/600" },
  { id: "5", category: "Resin", title: "Resin with border — Knutsford", location: "Knutsford", beforeSrc: "https://picsum.photos/seed/p5b/900/600", afterSrc: "https://picsum.photos/seed/p5a/900/600" },
  { id: "6", category: "Block paving", title: "Herringbone — Stockton Heath", location: "Stockton Heath", beforeSrc: "https://picsum.photos/seed/p6b/900/600", afterSrc: "https://picsum.photos/seed/p6a/900/600" },
];

const categories: Category[] = ["All", "Resin", "Block paving", "Tarmac", "Patio"];

export function PortfolioGallery() {
  const [filter, setFilter] = useState<Category>("All");
  const filtered = filter === "All" ? portfolio : portfolio.filter((p) => p.category === filter);

  return (
    <section className="bg-[var(--color-light-grey)] py-24 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-4">
            <FadeIn><span className="eyebrow">Recent work</span></FadeIn>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading as="h2" className="max-w-2xl">Before and after.</AnimatedHeading>
            <FadeIn delay={200}>
              <p className="text-[var(--color-charcoal)] text-lg leading-relaxed mt-6 max-w-2xl">
                A sample of recent Private Works projects across the North West. Drag the slider on each to compare.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 text-[12px] uppercase tracking-[0.14em] font-medium transition-colors duration-300 ${
                filter === c
                  ? "bg-[var(--color-cyan)] text-[var(--color-dark-blue)]"
                  : "border border-[var(--color-border-strong)] text-[var(--color-dark-blue)] hover:border-[var(--color-dark-blue)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((p, i) => (
            <FadeIn key={p.id} delay={i * 80}>
              <article>
                <BeforeAfter beforeSrc={p.beforeSrc} afterSrc={p.afterSrc} beforeAlt={`${p.title} — before`} afterAlt={`${p.title} — after`} />
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[var(--color-dark-blue)] font-semibold text-[18px] leading-tight">{p.title}</h3>
                    <p className="text-[var(--color-mid-blue)] text-[12px] uppercase tracking-widest mt-1 font-medium">
                      {p.category} · {p.location}
                    </p>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
