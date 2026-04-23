import { useState } from "react";
import { FadeIn } from "../../FadeIn";
import { AnimatedHeading } from "../../AnimatedHeading";
import { Button } from "../../Button";

interface QuoteFormProps {
  id?: string;
}

export function QuoteForm({ id }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id={id} className="bg-[var(--color-light-grey)] py-24 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <FadeIn><span className="eyebrow mb-6">Get a quote</span></FadeIn>
            <AnimatedHeading as="h2" className="mt-4 mb-6 max-w-md">Your driveway, measured free.</AnimatedHeading>
            <FadeIn delay={200}>
              <p className="text-[var(--color-charcoal)] text-lg leading-relaxed max-w-md">
                Tell us about your drive. We'll come out, measure up, and send a fixed-price quote within 48 hours. No deposit, no pushy sales, no surprise extras.
              </p>
            </FadeIn>
          </div>
          <div className="lg:col-span-7">
            {submitted ? (
              <FadeIn>
                <div className="bg-[var(--color-dark-blue)] text-white p-10">
                  <h3 className="text-2xl font-semibold mb-3">Thanks - we've got it.</h3>
                  <p className="text-white/80">We'll be in touch within one working day to arrange a free on-site measure.</p>
                </div>
              </FadeIn>
            ) : (
              <FadeIn delay={120}>
                <form
                  className="flex flex-col gap-6 bg-white p-8 lg:p-10 border border-[var(--color-border)]"
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                >
                  <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
                  <input type="hidden" name="subject" value="Private Works quote request" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Your name" name="name" required />
                    <Field label="Email" name="email" type="email" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Phone" name="phone" type="tel" />
                    <Field label="Postcode" name="postcode" required />
                  </div>
                  <Field label="Address line 1" name="address" />
                  <Field label="Approx area (m²)" name="area" type="number" />
                  <SelectField
                    label="Finish interest"
                    name="finish"
                    options={["Tarmac", "Resin", "Block paving", "Patio", "Drainage", "Dropped kerb", "Not sure / mix"]}
                  />
                  <SelectField
                    label="Target timing"
                    name="timing"
                    options={["As soon as possible", "Within 1 month", "Within 3 months", "Later this year", "No rush"]}
                  />
                  <FileField label="Photos of the area (optional)" name="photos" />
                  <TextareaField label="Anything else we should know?" name="notes" />

                  <div className="pt-2">
                    <Button variant="primary" size="lg" type="submit">Send quote request</Button>
                  </div>
                </form>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] font-medium">
        {label}{required && <span className="text-[var(--color-cyan)] ml-0.5">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="bg-transparent border-0 border-b border-[var(--color-border-strong)] py-3 text-[var(--color-dark-blue)] focus:border-[var(--color-dark-blue)] focus:border-b-2 focus:outline-none transition-colors"
      />
    </label>
  );
}
function TextareaField({ label, name }: { label: string; name: string }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] font-medium">{label}</span>
      <textarea
        name={name}
        rows={4}
        className="bg-transparent border-0 border-b border-[var(--color-border-strong)] py-3 text-[var(--color-dark-blue)] focus:border-[var(--color-dark-blue)] focus:border-b-2 focus:outline-none transition-colors resize-none"
      />
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
function FileField({ label, name }: { label: string; name: string }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] font-medium">{label}</span>
      <input
        type="file"
        name={name}
        accept="image/*"
        multiple
        className="text-sm text-[var(--color-charcoal)] file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[var(--color-dark-blue)] file:text-white file:text-sm file:uppercase file:tracking-wide hover:file:bg-[var(--color-cyan)] hover:file:text-[var(--color-dark-blue)] transition-colors"
      />
    </label>
  );
}
