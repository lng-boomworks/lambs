import { useEffect, useRef } from "react";

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  aspect?: string; // tailwind aspect class or custom (e.g. "aspect-[4/5]")
  loading?: "eager" | "lazy";
  priority?: boolean;
}

/**
 * RevealImage — reveals an image with a clip-path wipe + scale-down + opacity
 * fade when it scrolls into view. Hover adds a slow zoom.
 *
 * Animation styles live in global.css (.reveal-image).
 */
export function RevealImage({
  src,
  alt,
  className = "",
  aspect = "aspect-[4/3]",
  loading = "lazy",
  priority = false,
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);

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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-image ${aspect} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : loading}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  );
}
