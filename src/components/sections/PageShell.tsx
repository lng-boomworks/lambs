import type { ReactNode } from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

interface PageShellProps {
  children: ReactNode;
  /** Set when the page's hero has a dark background so the navbar
   *  renders in on-dark mode before the user scrolls. */
  darkHero?: boolean;
}

export function PageShell({ children, darkHero = false }: PageShellProps) {
  return (
    <>
      <Navbar darkHero={darkHero} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
