import { PhoneCall, MapPinned, PencilRuler, Truck, Construction, ShieldCheck, FileCheck } from "lucide-react";
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { ScrollProgress } from "../ScrollProgress";
import { PageShell } from "../sections/PageShell";
import { PageHero } from "../sections/PageHero";
import { CTASection } from "../sections/CTASection";

const stages = [
  { icon: PhoneCall, number: "01", title: "Brief", promise: "You call. We listen.", body: "Send the brief. Scope, timing, sector, constraints. We read it, ring you back within one working day, and tell you honestly whether we're the right crew for it.", chip: "1 working day", image: "https://picsum.photos/seed/stage-brief/1000/700" },
  { icon: MapPinned, number: "02", title: "Survey", promise: "We walk the route.", body: "On-site survey with our own crew. Marker paint, measurements, photos, sketch. We find what the drawings don't show — and give you a report before we quote.", chip: "Directly employed surveyors", image: "https://picsum.photos/seed/stage-survey/1000/700" },
  { icon: PencilRuler, number: "03", title: "Design", promise: "We draw it first.", body: "Route design, material schedule, programme. Coordinated with client drawings and operator specs. Reviewed internally before you see it.", chip: "Operator-standard drawings", image: "https://picsum.photos/seed/stage-design/1000/700" },
  { icon: Truck, number: "04", title: "Mobilise", promise: "We move the crew.", body: "Permit pulls, PPE drop, vehicle pre-checks, crew brief. Everyone on site knows the plan before the first dig.", chip: "Morning audit call", image: "https://picsum.photos/seed/stage-mobilise/1000/700" },
  { icon: Construction, number: "05", title: "Deliver", promise: "We dig, duct, joint, splice, lay, finish.", body: "Delivery by directly employed crews. NRSWA-compliant. NEBOSH-supervised. No subcontracting cascade.", chip: "Direct PAYE labour", image: "https://picsum.photos/seed/stage-deliver/1000/700" },
  { icon: ShieldCheck, number: "06", title: "Reinstate", promise: "We leave it right.", body: "Permanent reinstatement to NRSWA standard. Compacted, rolled, signed, photographed. Every defect addressed before we leave.", chip: "NRSWA-compliant", image: "https://picsum.photos/seed/stage-reinstate/1000/700" },
  { icon: FileCheck, number: "07", title: "Handover", promise: "We sign it over.", body: "As-built drawings, test records, photos, RAMS logs, sign-off. Handover pack sent. Six-month defect window covered.", chip: "Full handover pack", image: "https://picsum.photos/seed/stage-handover/1000/700" },
];

export function HowWeDeliverPage() {
  return (
    <PageShell>
      <ScrollProgress />

      <PageHero
        eyebrow="How we deliver"
        heading="From brief to handover. Seven stages."
        lede="Every Lambs Group programme runs through the same seven stages. Sometimes briefly, sometimes in depth — but always in order, always directly, always audited."
        sectionIndex="— / How We Deliver"
      />

      {stages.map((stage, i) => {
        const Icon = stage.icon;
        const darkBand = i % 2 === 1;
        return (
          <section
            key={stage.number}
            className={`py-24 lg:py-36 ${darkBand ? "bg-[var(--color-dark-blue)] text-white" : "bg-white"}`}
          >
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="lg:col-span-7">
                  <img src={stage.image} alt={stage.title} className="w-full aspect-[4/3] object-cover" />
                </div>
                <div className="lg:col-span-5">
                  <FadeIn>
                    <div className={`text-xs uppercase tracking-widest font-semibold mb-5 text-[var(--color-cyan)]`}>
                      Stage {stage.number}
                    </div>
                    <div className={`w-14 h-14 flex items-center justify-center mb-6 ${darkBand ? "bg-white text-[var(--color-dark-blue)]" : "bg-[var(--color-dark-blue)] text-white"}`}>
                      <Icon className="w-7 h-7" strokeWidth={1.8} />
                    </div>
                  </FadeIn>
                  <AnimatedHeading as="h2" className={`mb-6 max-w-md ${darkBand ? "text-white" : ""}`}>
                    {stage.title}
                  </AnimatedHeading>
                  <FadeIn delay={180}>
                    <p className={`text-[22px] lg:text-[28px] font-semibold leading-tight mb-6 ${darkBand ? "text-[var(--color-cyan)]" : "text-[var(--color-dark-blue)]"}`}>
                      {stage.promise}
                    </p>
                    <p className={`text-[15px] leading-relaxed mb-8 max-w-md ${darkBand ? "text-white/80" : "text-[var(--color-charcoal)]"}`}>
                      {stage.body}
                    </p>
                    <span className={`inline-block text-[11px] uppercase tracking-widest px-3 py-2 font-medium ${darkBand ? "border border-white/30 text-white/80" : "border border-[var(--color-border-strong)] text-[var(--color-dark-blue)]"}`}>
                      {stage.chip}
                    </span>
                  </FadeIn>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CTASection eyebrow="Work with us" heading="Start at Stage 01. We'll take it from there." />
    </PageShell>
  );
}
