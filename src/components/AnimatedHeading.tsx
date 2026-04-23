import { useEffect, useRef, type ElementType, type ReactNode } from "react";

interface AnimatedHeadingProps {
  children: string;
  as?: ElementType;
  className?: string;
  stagger?: number; // ms between words
  delay?: number;   // ms initial delay
  /** Optional node rendered at end (e.g. trailing badge) */
  trailing?: ReactNode;
}

/**
 * AnimatedHeading - splits text into words and reveals each word with a
 * staggered slide-up + fade + subtle rotation on scroll into view.
 *
 * Uses pure CSS classes defined in global.css (.heading-reveal .word span)
 * so server-rendered output already has all the markup - no FOUC.
 */
export function AnimatedHeading({
  children,
  as: Tag = "h2",
  className = "",
  stagger = 40,
  delay = 0,
  trailing,
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = children.split(/(\s+)/).filter((w) => w.trim().length > 0);

  return (
    <Tag
      ref={ref as never}
      className={`heading-reveal ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="word">
          <span
            style={{
              transitionDelay: `${delay + i * stagger}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
      {trailing}
    </Tag>
  );
}
