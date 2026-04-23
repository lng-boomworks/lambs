import { useEffect, useRef, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number; // ms
  y?: number;     // initial Y offset in px
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "span";
}

/**
 * FadeIn - section-level reveal. Slides up + fades in on scroll-into-view
 * using silky cubic-bezier easing. Honors prefers-reduced-motion.
 */
export function FadeIn({
  children,
  delay = 0,
  y = 28,
  className = "",
  as: Tag = "div",
}: FadeInProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      el.classList.add("is-visible");
      return;
    }

    el.style.setProperty("--fade-y", `${y}px`);
    el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, y]);

  const Component = Tag as never;
  return (
    <Component ref={ref} className={`fade-in ${className}`}>
      {children}
    </Component>
  );
}
