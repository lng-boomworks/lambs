import { useState, useEffect } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";
import { BASE_URL, withBase } from "../utils/paths";

const topLinks = [
  { name: "Our Work", path: "/work" },
  { name: "How We Deliver", path: "/how-we-deliver" },
  { name: "About", path: "/about" },
  { name: "Team", path: "/team" },
  { name: "Careers", path: "/careers" },
];

interface NavbarProps {
  darkHero?: boolean;
}

export function Navbar({ darkHero = false }: NavbarProps) {
  const [location, setLocation] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSectorsOpen, setIsSectorsOpen] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    const stripped = BASE_URL && path.startsWith(BASE_URL) ? path.slice(BASE_URL.length) || "/" : path;
    setLocation(stripped);
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onDark = isScrolled || darkHero;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-[var(--color-dark-blue)] border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 h-[76px] flex items-center justify-between">
        <a href={withBase("/")} className="flex items-center" aria-label="Lambs Group home">
          <Logo variant={onDark ? "white" : "colour"} width={140} />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-7 text-[12px] uppercase tracking-[0.14em] font-medium">
            <li
              onMouseEnter={() => setIsSectorsOpen(true)}
              onMouseLeave={() => setIsSectorsOpen(false)}
              className="relative"
            >
              <button
                type="button"
                className={`nav-link inline-flex flex-row items-center gap-2 bg-transparent border-0 p-0 m-0 text-[12px] uppercase tracking-[0.14em] font-medium cursor-pointer transition-colors duration-300 ${
                  onDark ? "text-white/80 hover:text-white" : "text-[var(--color-dark-blue)] hover:text-[var(--color-cyan)]"
                }`}
                aria-expanded={isSectorsOpen}
                aria-haspopup="true"
              >
                <span>Sectors</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${isSectorsOpen ? "rotate-180" : ""}`}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
              {isSectorsOpen && <MegaMenu onClose={() => setIsSectorsOpen(false)} />}
            </li>
            {topLinks.map((link) => (
              <li key={link.path}>
                <a
                  href={withBase(link.path)}
                  className={`nav-link transition-colors duration-300 ${
                    onDark ? "text-white/80 hover:text-white" : "text-[var(--color-dark-blue)] hover:text-[var(--color-cyan)]"
                  } ${location === link.path ? "is-active" : ""}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className={`flex items-center gap-5 pl-6 border-l ${onDark ? "border-white/20" : "border-[var(--color-mid-blue)]/30"}`}>
            <a
              href="tel:01925810991"
              className={`hidden xl:flex items-center gap-2 text-[13px] transition-colors ${
                onDark ? "text-white/80 hover:text-[var(--color-cyan)]" : "text-[var(--color-dark-blue)] hover:text-[var(--color-cyan)]"
              }`}
            >
              <Phone className="w-3.5 h-3.5" strokeWidth={2} />
              <span className="tracking-wide">01925 810 991</span>
            </a>
            <Button href="/contact" variant="primary" size="md">Start a project</Button>
          </div>
        </nav>

        <button
          className={`lg:hidden p-2 ${onDark ? "text-white" : "text-[var(--color-dark-blue)]"}`}
          onClick={() => setIsMobileMenuOpen((p) => !p)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        className={`lg:hidden absolute top-[76px] left-0 right-0 bg-[var(--color-dark-blue)] border-b border-white/10 transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-5">
          <div className="eyebrow eyebrow-dark">Commercial</div>
          <a href={withBase("/telecoms")} className="block py-2 text-[22px] text-white font-semibold hover:text-[var(--color-cyan)]">Telecoms</a>
          <a href={withBase("/civil-works")} className="block py-2 text-[22px] text-white font-semibold hover:text-[var(--color-cyan)]">Civil Works</a>
          <a href={withBase("/utilities")} className="block py-2 text-[22px] text-white font-semibold hover:text-[var(--color-cyan)]">Utilities</a>

          <div className="eyebrow eyebrow-dark mt-4">Domestic</div>
          <a href={withBase("/private-works")} className="block py-2 text-[22px] text-white font-semibold hover:text-[var(--color-cyan)]">Private Works</a>

          <div className="eyebrow eyebrow-dark mt-4">Company</div>
          {topLinks.map((link) => (
            <a key={link.path} href={withBase(link.path)} className="block py-2 text-[20px] text-white/90 font-medium hover:text-[var(--color-cyan)]">
              {link.name}
            </a>
          ))}
          <a href={withBase("/contact")} className="block py-2 text-[20px] text-white/90 font-medium hover:text-[var(--color-cyan)]">Contact</a>

          <div className="pt-6 flex flex-col gap-3">
            <a href="tel:01925810991" className="flex items-center gap-2 text-white/80 text-sm">
              <Phone className="w-4 h-4" /> 01925 810 991
            </a>
            <Button href="/contact" variant="primary" className="w-full">Start a project</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
