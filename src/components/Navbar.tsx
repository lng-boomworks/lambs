import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "./Button";

const navLinks = [
  { name: "Telecoms", path: "/telecoms" },
  { name: "Civil Works", path: "/civil-works" },
  { name: "Utilities", path: "/utilities" },
  { name: "About", path: "/about" },
  { name: "Team", path: "/team" },
  { name: "Case Studies", path: "/case-studies" },
  { name: "Careers", path: "/careers" },
];

export function Navbar() {
  const [location, setLocation] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setLocation(window.location.pathname);
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-[rgba(10,14,26,0.78)] backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 h-[76px] flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group" aria-label="Lambs UK home">
          <span className="relative flex items-center">
            <span className="w-2.5 h-2.5 bg-[var(--color-hivis)] block mr-3" aria-hidden="true" />
            <span className="font-display text-[22px] font-semibold text-white tracking-tight">
              LAMBS
            </span>
            <span className="font-mono text-[10px] text-white/50 ml-2 mt-1 uppercase tracking-widest">
              UK
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-7 font-mono text-[12px] uppercase tracking-[0.14em]">
            {navLinks.map((link) => (
              <li key={link.path}>
                <a
                  href={link.path}
                  className={`nav-link text-white/75 hover:text-white transition-colors duration-300 ${
                    location === link.path ? "is-active text-white" : ""
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5 pl-6 border-l border-white/15">
            <a
              href="tel:01925810991"
              className="hidden xl:flex items-center gap-2 text-[13px] text-white/80 hover:text-[var(--color-hivis)] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" strokeWidth={2} />
              <span className="font-mono tracking-wide">01925 810 991</span>
            </a>
            <Button href="/contact" variant="accent" size="md">
              Start a project
            </Button>
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute top-[76px] left-0 right-0 bg-[var(--color-ink)] border-b border-white/10 transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          <ul className="flex flex-col gap-1">
            <li>
              <a
                href="/"
                className="block py-3 font-display text-[22px] text-white hover:text-[var(--color-hivis)] transition-colors border-b border-white/10"
              >
                Home
              </a>
            </li>
            {navLinks.map((link) => (
              <li key={link.path}>
                <a
                  href={link.path}
                  className={`block py-3 font-display text-[22px] transition-colors border-b border-white/10 ${
                    location === link.path
                      ? "text-[var(--color-hivis)]"
                      : "text-white hover:text-[var(--color-hivis)]"
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/contact"
                className={`block py-3 font-display text-[22px] transition-colors border-b border-white/10 ${
                  location === "/contact"
                    ? "text-[var(--color-hivis)]"
                    : "text-white hover:text-[var(--color-hivis)]"
                }`}
              >
                Contact
              </a>
            </li>
          </ul>
          <div className="pt-4 flex flex-col gap-3">
            <a
              href="tel:01925810991"
              className="flex items-center gap-2 text-white/80 font-mono text-sm"
            >
              <Phone className="w-4 h-4" />
              01925 810 991
            </a>
            <Button href="/contact" variant="accent" className="w-full">
              Start a project
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
