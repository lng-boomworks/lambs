import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

const linkGroups = [
  {
    title: "Commercial",
    links: [
      { label: "Telecoms", href: "/telecoms" },
      { label: "Civil Works", href: "/civil-works" },
      { label: "Utilities", href: "/utilities" },
    ],
  },
  {
    title: "Domestic",
    links: [{ label: "Private Works", href: "/private-works" }],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Our Work", href: "/work" },
      { label: "How We Deliver", href: "/how-we-deliver" },
      { label: "Careers", href: "/careers" },
      { label: "Live Map", href: "/map" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "01925 810 991", href: "tel:01925810991" },
      { label: "01925 850 982 (Recruitment)", href: "tel:01925850982" },
      { label: "info@lambsgroup.co.uk", href: "mailto:info@lambsgroup.co.uk" },
    ],
  },
];

const accreditations = [
  "ISO 9001", "ISO 14001", "ISO 45001", "CHAS", "Constructionline", "NRSWA",
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-dark-blue)] text-white/80 relative">
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-10 flex flex-wrap items-center justify-between gap-6">
          <span className="eyebrow eyebrow-dark">Accredited &amp; Certified</span>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {accreditations.map((a) => (
              <span
                key={a}
                className="text-[11px] uppercase tracking-[0.18em] text-white/60 border border-white/20 px-3 py-2 font-medium"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Logo variant="white" width={160} />
            <h3 className="text-white text-[24px] lg:text-[28px] font-semibold leading-[1.15] max-w-sm mt-10 mb-8">
              Infrastructure services across the UK. Safely, compliantly, on programme.
            </h3>
            <div className="flex flex-col gap-2 text-[13px] text-white/60 max-w-sm">
              <span>Tatton Court, Tatton Road, Warrington</span>
              <span>Prestwood Court (Recruitment), Warrington</span>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-10">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h4 className="eyebrow eyebrow-dark mb-6">{group.title}</h4>
                <ul className="flex flex-col gap-3 text-[14px]">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="nav-link text-white/75 hover:text-white transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs uppercase tracking-wider text-white/50">
            © {new Date().getFullYear()} Lambs Group. Est. 1988.
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white/70 hover:text-[var(--color-cyan)] transition-colors"
          >
            Start a project
            <ArrowUpRight className="w-3.5 h-3.5 btn-arrow" />
          </a>
        </div>
      </div>
    </footer>
  );
}
