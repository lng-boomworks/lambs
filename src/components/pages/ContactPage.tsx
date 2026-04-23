import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { PageShell } from "../sections/PageShell";

const offices = [
  {
    name: "Head Office",
    lines: ["Tatton Court", "Tatton Road", "Warrington"],
    phone: "01925 810 991",
    phoneHref: "tel:01925810991",
  },
  {
    name: "Recruitment",
    lines: ["Prestwood Court", "Warrington"],
    phone: "01925 850 982",
    phoneHref: "tel:01925850982",
  },
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative bg-[var(--color-ink)] text-white overflow-hidden pt-[160px] pb-24 lg:pt-[200px] lg:pb-32">
        <div className="grid-bg-dark absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between mb-14">
            <FadeIn>
              <span className="eyebrow eyebrow-dark">Contact · Start a project</span>
            </FadeIn>
            <FadeIn delay={100}>
              <span className="font-mono text-xs uppercase tracking-widest text-white/40 hidden md:block">
                — / Contact
              </span>
            </FadeIn>
          </div>
          <AnimatedHeading as="h1" className="text-white max-w-5xl mb-10">
            Let's talk. We answer our own phones.
          </AnimatedHeading>
          <FadeIn delay={300}>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
              Tell us about the programme. We'll come back to you within one
              working day with a plan, a price and a person's name at the end
              of the phone.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact grid */}
      <section className="bg-[var(--color-warm-white)] py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Form */}
            <div className="lg:col-span-7">
              <FadeIn>
                <span className="eyebrow mb-6">Start a project</span>
                <h2 className="font-display text-[36px] lg:text-[48px] font-semibold mt-6 mb-10 leading-[1.05]">
                  Send us the brief.
                </h2>
              </FadeIn>

              {submitted ? (
                <FadeIn>
                  <div className="border border-[var(--color-ink)] p-10 bg-[var(--color-cream)]">
                    <h3 className="font-display text-2xl font-semibold mb-3">Thanks — we've got it.</h3>
                    <p className="text-[var(--color-concrete)]">
                      We'll be in touch within one working day.
                    </p>
                  </div>
                </FadeIn>
              ) : (
                <FadeIn delay={120}>
                  <form
                    className="flex flex-col gap-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Field label="Name" name="name" required />
                      <Field label="Company" name="company" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Field label="Email" name="email" type="email" required />
                      <Field label="Phone" name="phone" type="tel" />
                    </div>
                    <SelectField
                      label="Sector"
                      name="sector"
                      options={["Telecoms", "Civil Works", "Utilities", "Mixed / not sure"]}
                    />
                    <TextareaField label="Project brief" name="message" required />
                    <div className="pt-2">
                      <Button variant="accent" size="lg" type="submit">
                        Send brief
                      </Button>
                    </div>
                  </form>
                </FadeIn>
              )}
            </div>

            {/* Info */}
            <div className="lg:col-span-5">
              <FadeIn delay={180}>
                <span className="eyebrow mb-6">Where to find us</span>
                <h3 className="font-display text-[28px] lg:text-[32px] font-semibold mt-6 mb-10">
                  Based in Warrington. On site everywhere.
                </h3>
              </FadeIn>

              <div className="flex flex-col gap-px bg-[var(--color-border-strong)]">
                {offices.map((office, i) => (
                  <FadeIn key={office.name} delay={i * 160} className="bg-[var(--color-warm-white)] p-8 border border-[var(--color-border)]">
                    <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-concrete)] mb-4">
                      {office.name}
                    </div>
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="w-4 h-4 mt-1.5 text-[var(--color-ink)]" strokeWidth={1.8} />
                      <address className="not-italic text-[var(--color-ink)] leading-relaxed">
                        {office.lines.map((line) => (
                          <div key={line}>{line}</div>
                        ))}
                      </address>
                    </div>
                    <a
                      href={office.phoneHref}
                      className="flex items-center gap-3 nav-link text-[var(--color-ink)] font-mono text-sm"
                    >
                      <Phone className="w-4 h-4" strokeWidth={1.8} />
                      {office.phone}
                    </a>
                  </FadeIn>
                ))}

                <FadeIn delay={360} className="bg-[var(--color-warm-white)] p-8 border border-[var(--color-border)]">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-concrete)] mb-4">
                    General enquiries
                  </div>
                  <a
                    href="mailto:info@lambsgroup.co.uk"
                    className="flex items-center gap-3 nav-link text-[var(--color-ink)] font-mono text-sm"
                  >
                    <Mail className="w-4 h-4" strokeWidth={1.8} />
                    info@lambsgroup.co.uk
                  </a>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

/* ---------- Form primitives ---------- */

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-concrete)]">
        {label}
        {required && <span className="text-[var(--color-hivis-dim)]"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="bg-transparent border-0 border-b border-[var(--color-border-strong)] py-3 text-[var(--color-ink)] focus:border-[var(--color-ink)] focus:outline-none transition-colors"
      />
    </label>
  );
}

function TextareaField({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-concrete)]">
        {label}
        {required && <span className="text-[var(--color-hivis-dim)]"> *</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={5}
        className="bg-transparent border-0 border-b border-[var(--color-border-strong)] py-3 text-[var(--color-ink)] focus:border-[var(--color-ink)] focus:outline-none transition-colors resize-none"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-concrete)]">
        {label}
      </span>
      <select
        name={name}
        className="bg-transparent border-0 border-b border-[var(--color-border-strong)] py-3 text-[var(--color-ink)] focus:border-[var(--color-ink)] focus:outline-none transition-colors"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}
