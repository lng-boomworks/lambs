import { useState } from "react";
import { ArrowLeft, MapPin, Briefcase, Clock, Users } from "lucide-react";
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { PageShell } from "../sections/PageShell";
import { withBase } from "../../utils/paths";
import { submitForm } from "../../utils/submit-form";
import type { Vacancy } from "../../data/vacancies";

interface JobPageProps {
  vacancy: Vacancy;
}

export function JobPage({ vacancy }: JobPageProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "preview" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const result = await submitForm(e.currentTarget, "careers-application");
    if (result.status === "ok") setStatus("done");
    else if (result.status === "preview") setStatus("preview");
    else {
      setStatus("error");
      setError(result.message);
    }
  }

  const meta = [
    { icon: MapPin, label: vacancy.location },
    { icon: Briefcase, label: vacancy.type },
    ...(vacancy.salary ? [{ icon: Clock, label: vacancy.salary }] : []),
    { icon: Users, label: `Reports to ${vacancy.reports}` },
  ];

  return (
    <PageShell>
      <section className="relative bg-white overflow-hidden pt-[140px] pb-16 lg:pt-[180px] lg:pb-20 border-b border-[var(--color-border)]">
        <div className="grid-bg absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <a
              href={withBase("/careers")}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] hover:text-[var(--color-dark-blue)] font-medium mb-8 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All vacancies
            </a>
          </FadeIn>

          <FadeIn delay={80}>
            <span className="eyebrow mb-6">Current vacancy</span>
          </FadeIn>
          <AnimatedHeading as="h1" className="max-w-4xl mt-4 mb-10">
            {vacancy.title}
          </AnimatedHeading>

          <FadeIn delay={240}>
            <div className="flex flex-wrap gap-x-8 gap-y-3 mb-10">
              {meta.map((m) => {
                const Icon = m.icon;
                return (
                  <span key={m.label} className="inline-flex items-center gap-2 text-[13px] text-[var(--color-dark-blue)]">
                    <Icon className="w-4 h-4 text-[var(--color-cyan)]" strokeWidth={1.8} />
                    {m.label}
                  </span>
                );
              })}
            </div>
          </FadeIn>

          <FadeIn delay={320}>
            <p className="text-[var(--color-charcoal)] text-lg md:text-xl leading-relaxed max-w-3xl">
              {vacancy.summary}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7 flex flex-col gap-16">
              <JobSection title="What you'll do" items={vacancy.responsibilities} />
              <JobSection title="What you'll bring" items={vacancy.requirements} />
              {vacancy.nice.length > 0 && (
                <JobSection title="Nice to have" items={vacancy.nice} muted />
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <FadeIn>
                  <span className="eyebrow mb-6">Apply</span>
                  <h2 className="text-[var(--color-dark-blue)] text-[28px] lg:text-[36px] font-semibold mt-6 mb-3 leading-tight">
                    Send us your CV.
                  </h2>
                  <p className="text-[var(--color-charcoal)] text-[15px] leading-relaxed mb-8 max-w-md">
                    We read every application. Expect a call back within one working day.
                  </p>
                </FadeIn>

                {status === "done" || status === "preview" ? (
                  <FadeIn>
                    <div className="bg-[var(--color-dark-blue)] text-white p-10">
                      <h3 className="text-2xl font-semibold mb-3">Thanks — we've got it.</h3>
                      <p className="text-white/80">
                        {status === "preview"
                          ? "Preview mode — the form handler isn't configured yet, so this submission wasn't sent. In production we'd be in touch within one working day."
                          : "We'll be in touch within one working day."}
                      </p>
                    </div>
                  </FadeIn>
                ) : (
                  <FadeIn delay={120}>
                    <form
                      className="flex flex-col gap-6 bg-white p-8 lg:p-10 border border-[var(--color-border)]"
                      onSubmit={handleSubmit}
                      encType="multipart/form-data"
                    >
                      <input type="hidden" name="role" value={vacancy.title} />
                      <input type="hidden" name="role_slug" value={vacancy.slug} />
                      {/* Honeypot — real users never fill this. */}
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        className="sr-only"
                        aria-hidden="true"
                      />

                      <Field label="Full name" name="name" required />
                      <Field label="Email" name="email" type="email" required />
                      <Field label="Phone" name="phone" type="tel" required />
                      <Field label="Location / postcode" name="location" />

                      <CvField fileName={fileName} onChange={setFileName} />

                      <TextareaField
                        label="Cover note"
                        name="message"
                        placeholder="Briefly — relevant tickets, current notice period, anything you want us to know."
                      />

                      {error && (
                        <p className="text-[13px] text-red-600">
                          {error}
                        </p>
                      )}

                      <div className="pt-2">
                        <Button variant="primary" size="lg" type="submit">
                          {status === "sending" ? "Sending…" : `Apply for ${vacancy.title}`}
                        </Button>
                      </div>

                      <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-mid-blue)] mt-2">
                        Prefer email? Send your CV to{" "}
                        <a
                          href={`mailto:careers@lambsgroup.co.uk?subject=Application — ${encodeURIComponent(vacancy.title)}`}
                          className="text-[var(--color-dark-blue)] underline underline-offset-2 decoration-[var(--color-cyan)]"
                        >
                          careers@lambsgroup.co.uk
                        </a>
                      </p>
                    </form>
                  </FadeIn>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function JobSection({ title, items, muted = false }: { title: string; items: string[]; muted?: boolean }) {
  return (
    <FadeIn>
      <div>
        <span className="eyebrow mb-6 block">{title}</span>
        <ul className="flex flex-col gap-4 mt-6">
          {items.map((it) => (
            <li key={it} className="flex items-start gap-4">
              <span className={`mt-2 w-2 h-2 flex-shrink-0 ${muted ? "bg-[var(--color-mid-blue)]" : "bg-[var(--color-cyan)]"}`} />
              <span className={`text-[15px] lg:text-[16px] leading-relaxed ${muted ? "text-[var(--color-mid-blue)]" : "text-[var(--color-charcoal)]"}`}>
                {it}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
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

function TextareaField({ label, name, placeholder, required }: { label: string; name: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] font-medium">
        {label}{required && <span className="text-[var(--color-cyan)] ml-0.5">*</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={4}
        placeholder={placeholder}
        className="bg-transparent border-0 border-b border-[var(--color-border-strong)] py-3 text-[var(--color-dark-blue)] placeholder:text-[var(--color-mid-blue)]/60 focus:border-[var(--color-dark-blue)] focus:border-b-2 focus:outline-none transition-colors resize-none"
      />
    </label>
  );
}

function CvField({ fileName, onChange }: { fileName: string | null; onChange: (n: string | null) => void }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mid-blue)] font-medium">
        CV <span className="text-[var(--color-cyan)] ml-0.5">*</span>
      </span>
      <div className="flex items-center gap-4 py-3 border-b border-[var(--color-border-strong)]">
        <input
          type="file"
          name="cv"
          required
          accept=".pdf,.doc,.docx,.odt,.rtf,.txt"
          onChange={(e) => onChange(e.target.files?.[0]?.name ?? null)}
          className="text-[13px] text-[var(--color-dark-blue)] file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[var(--color-dark-blue)] file:text-white file:text-[11px] file:uppercase file:tracking-[0.14em] file:font-medium file:cursor-pointer hover:file:bg-[var(--color-cyan)] hover:file:text-[var(--color-dark-blue)] file:transition-colors"
        />
        {fileName && (
          <span className="text-[12px] text-[var(--color-dark-blue)] truncate max-w-[200px]">{fileName}</span>
        )}
      </div>
      <span className="text-[11px] text-[var(--color-mid-blue)] mt-1">
        PDF or Word doc, up to 10&nbsp;MB
      </span>
    </label>
  );
}
