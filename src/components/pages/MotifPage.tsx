import { PageShell } from "../sections/PageShell";
import { CTASection } from "../sections/CTASection";
import { MotifHero } from "./motif/MotifHero";
import { MotifProgramme } from "./motif/MotifProgramme";
import { MotifNumbers } from "./motif/MotifNumbers";
import { MotifCrew } from "./motif/MotifCrew";
import { MotifWeek } from "./motif/MotifWeek";
import { MotifQC } from "./motif/MotifQC";

export function MotifPage() {
  return (
    <PageShell>
      <MotifHero />
      <MotifProgramme />
      <MotifNumbers />
      <MotifCrew />
      <MotifWeek />
      <MotifQC />
      <CTASection
        eyebrow="Work with us"
        heading="Your programme. Our crew. Motif-tested."
        primaryLabel="Start a project"
        primaryHref="/contact"
        secondaryLabel="See all case studies"
        secondaryHref="/work"
      />
    </PageShell>
  );
}
