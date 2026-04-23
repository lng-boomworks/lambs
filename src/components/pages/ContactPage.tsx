import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { PageShell } from "../sections/PageShell";

type Mode = "commercial" | "domestic";

const offices = [
  { name: "Head Office", lines: ["Tatton Court", "Tatton Road", "Warrington"], phone: "01925 810 991", phoneHref: "tel:01925810991" },
  { name: "Recruitment", lines: ["Prestwood Court", "Warrington"], phone: "01925 850 982", phoneHref: "tel:01925850982" },
];

export function ContactPage() {
  const [mode, setMode] = useState<Mode>("commercial");
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageShell>
      <section className="relative bg-white overflow-hidden pt-[160px] pb-16 lg:pt-[200px] lg:pb-24 border-b border-[var(--color-border)]">
        <div className="grid-bg absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeIn><span className="eyebrow mb-6">Contact · Start a project</span></FadeIn>
          <AnimatedHeading as="h1" className="max-w-5xl mt-6 mb-8">
            Let's talk. We answer our own phones.
          </AnimatedHeading>
          <FadeIn delay={240}>
            <p className="text-[var(--color-charcoal)] text-lg md:text-xl max-w-2xl leading-relaxed">
              Tell us about the project. We'll come back within one working day with a plan, a price and a person's name at the end of the phone.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-[var(--color-light-grey)] py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7">
              <div className="flex gap-0 mb-10 border-b border-[var(--color-border-strong)]">
                <button
                  onClick={() => setMode("commercial")}
                  className={`px-6 py-4 text-[13px] uppercase tracking-[0.14em] font-semibold transition-colors duration-300 border-b-2 -mb-px ${
                    mode === "commercial" ? "text-[var(--color-dark-blue)] border-[var(--color-cyan)]" : "text-[var(--color-mid-blue)] border-transparent hover:text-[var(--color-dark-blue)]"
                  }`}
                >
                  Commercial brief
                </button>
                <button
                  onClick={() => setMode("domestic")}
                  className={`px-6 py-4 text-[13px] uppercase tracking-[0.14em] font-semibold transition-colors duration-300 border-b-2 -mb-px ${
                    mode === "domestic" ? "text-[var(--color-dark-blue)] border-[var(--color-cyan)]" : "text-[var(--color-mid-blue)] border-transparent hover:text-[var(--color-dark-blue)]"
                  }`}
                >
                  Homeowner quote
                </button>
              </div>

              {submitted ? (
                <FadeIn>
                  <div className="bg-[var(--color-dark-blue)] text-white p-10">
                    <h3 className="text-2xl font-semibold mb-3">Thanks — we've got it.</h3>
                    <p className="text-white/80">We'll be in touch within one working day.</p>
                  </div>
                </FadeIn>
              ) : (
                <FadeIn delay={120}>
                  {mode === "commercial" ? (
                    <CommercialForm onSubmit={() => setSubmitted(true)} />
                  ) : (
                    <DomesticForm onSubmit={() => setSubmitted(true)} />
                  )}
                </FadeIn>
              )}
            </div>

            <div className="lg:col-span-5">
              <FadeIn delay={180}>
                <span className="eyebrow mb-6">Where to find us</span>
                <h3 className="text-[var(--color-dark-blue)] text-[26px] lg:text-[32px] font-semibold mt-6 mb-10">
                  Based in Warrington. On site everywhere.
                </h3>
              </FadeIn>

              <div className="flex flex-col gap-px bg-[var(--color-border-strong)]">
                {offices.map((office, i) => (
                  <FadeIn key={office.name} delay={i * 160} className="bg-white p-8">
                    <div className="text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] mb-4 font-medium">
                      {office.name}
                    </div>
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="w-4 h-4 mt-1.5 text-[var(--color-dark-blue)]" strokeWidth={1.8} />
                      <address className="not-italic text-[var(--color-dark-blue)] leading-relaxed">
                        {office.lines.map((line) => <div key={line}>{line}</div>)}
                      </address>
                    </div>
                    <a href={office.phoneHref} className="flex items-center gap-3 nav-link text-[var(--color-dark-blue)] text-sm">
                      <Phone className="w-4 h-4" strokeWidth={1.8} />
                      {office.phone}
                    </a>
                  </FadeIn>
                ))}
                <FadeIn delay={360} className="bg-white p-8">
                  <div className="text-[11px] uppercase tracking-widest text-[var(--color-mid-blue)] mb-4 font-medium">
                    General enquiries
                  </div>
                  <a href="mailto:info@lambsgroup.co.uk" className="flex items-center gap-3 nav-link text-[var(--color-dark-blue)] text-sm">
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

function CommercialForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form className="flex flex-col gap-6 bg-white p-8 lg:p-10 border border-[var(--color-border)]" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
      <input type="hidden" name="subject" value="Commercial project enquiry" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>
      <SelectField label="Sector" name="sector" options={["Telecoms", "Civil Works", "Utilities", "Mixed / not sure"]} />
      <TextareaField label="Project brief" name="message" required />
      <div className="pt-2">
        <Button variant="primary" size="lg" type="submit">Send brief</Button>
      </div>
    </form>
  );
}

function DomesticForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form className="flex flex-col gap-6 bg-white p-8 lg:p-10 border border-[var(--color-border)]" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
      <input type="hidden" name="subject" value="Private Works quote request" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Your name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Postcode" name="postcode" required />
      </div>
      <Field label="Address" name="address" />
      <SelectField label="Finish" name="finish" options={["Tarmac", "Resin", "Block paving", "Patio", "Drainage", "Dropped kerb", "Not sure / mix"]} />
      <SelectField label="Timing" name="timing" options={["ASAP", "Within 1 month", "Within 3 months", "Later this year", "No rush"]} />
      <TextareaField label="Anything else?" name="notes" />
      <div className="pt-2">
        <Button variant="primary" size="lg" type="submit">Send quote request</Button>
      </div>
    </form>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] font-medium">
        {label}{required && <span className="text-[var(--color-cyan)] ml-0.5">*</span>}
      </span>
      <input type={type} name={name} required={required} className="bg-transparent border-0 border-b border-[var(--color-border-strong)] py-3 text-[var(--color-dark-blue)] focus:border-[var(--color-dark-blue)] focus:border-b-2 focus:outline-none transition-colors" />
    </label>
  );
}
function TextareaField({ label, name, required }: { label: string; name: string; required?: boolean }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] font-medium">
        {label}{required && <span className="text-[var(--color-cyan)] ml-0.5">*</span>}
      </span>
      <textarea name={name} required={required} rows={5} className="bg-transparent border-0 border-b border-[var(--color-border-strong)] py-3 text-[var(--color-dark-blue)] focus:border-[var(--color-dark-blue)] focus:border-b-2 focus:outline-none transition-colors resize-none" />
    </label>
  );
}
function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] font-medium">{label}</span>
      <select name={name} className="bg-transparent border-0 border-b border-[var(--color-border-strong)] py-3 text-[var(--color-dark-blue)] focus:border-[var(--color-dark-blue)] focus:border-b-2 focus:outline-none transition-colors">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
