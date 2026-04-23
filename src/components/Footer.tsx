import { ArrowUpRight } from "lucide-react";

const linkGroups: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Sectors",
    links: [
      { label: "Telecoms", href: "/telecoms" },
      { label: "Civil Works", href: "/civil-works" },
      { label: "Utilities", href: "/utilities" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "01925 810 991", href: "tel:01925810991" },
      { label: "01925 850 982", href: "tel:01925850982" },
      { label: "info@lambsgroup.co.uk", href: "mailto:info@lambsgroup.co.uk" },
    ],
  },
];

// NOTE: Accreditations below are placeholders — confirm exact schemes
// and logos with the client before launch.
const accreditations = [
  "ISO 9001",
  "ISO 14001",
  "ISO 45001",
  "CHAS",
  "Constructionline",
  "NRSWA",
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-white/70 relative">
      {/* Hi-vis stripe */}
      <div className="hivis-stripe h-2 w-full" aria-hidden="true" />

      {/* Accreditations strip */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-10 flex flex-wrap items-center justify-between gap-6">
          <span className="eyebrow eyebrow-dark">Accredited &amp; Certified</span>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {accreditations.map((a) => (
              <span
                key={a}
                className="logo-tile font-mono text-[11px] uppercase tracking-[0.18em] text-white/55 border border-white/15 px-3 py-2"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand pillar */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-3 h-3 bg-[var(--color-hivis)] block" aria-hidden="true" />
              <span className="font-display text-[28px] font-semibold text-white tracking-tight">
                LAMBS
              </span>
              <span className="font-mono text-[11px] text-white/50 uppercase tracking-widest mt-1.5">
                UK
              </span>
            </div>

            <h3 className="font-display text-white text-[30px] lg:text-[36px] leading-[1.05] max-w-md mb-8">
              Building Britain's infrastructure since 1988.
            </h3>

            <div className="flex flex-col gap-2 text-[14px] font-mono text-white/60 max-w-sm">
              <span>Tatton Court, Tatton Road, Warrington</span>
              <span>Prestwood Court (Recruitment), Warrington</span>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h4 className="eyebrow eyebrow-dark mb-6">{group.title}</h4>
                <ul className="flex flex-col gap-3.5 text-[15px]">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="nav-link text-white/75 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="mt-24 pb-6 overflow-hidden">
          <div
            className="font-display text-white/5 font-bold tracking-[-0.05em] leading-[0.8] whitespace-nowrap select-none"
            style={{ fontSize: "clamp(120px, 20vw, 320px)" }}
            aria-hidden="true"
          >
            LAMBS UK
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs font-mono uppercase tracking-wider text-white/50">
            © {new Date().getFullYear()} Lambs UK. Est. 1988. Family-run. UK-wide.
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/70 hover:text-[var(--color-hivis)] transition-colors"
          >
            Start a project
            <ArrowUpRight className="w-3.5 h-3.5 btn-arrow" />
          </a>
        </div>
      </div>
    </footer>
  );
}
