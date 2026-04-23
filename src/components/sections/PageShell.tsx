import type { ReactNode } from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

interface PageShellProps {
  children: ReactNode;
}

/**
 * PageShell wraps page content with the Navbar, main slot and Footer.
 * Using a single client island avoids multiple hydration boundaries.
 */
export function PageShell({ children }: PageShellProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
