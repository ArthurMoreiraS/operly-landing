import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ElementType } from "react";
import { cn } from "@/lib/utils";

type RevealProps<T extends ElementType> = {
  as?: T;
  /** Entry direction. */
  from?: "up" | "left" | "right";
  /** Transition delay in milliseconds for staggered effects. */
  delay?: number;
  /** Animate on mount without waiting for the viewport (use above the fold). */
  immediate?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/**
 * Replaces framer-motion entry animations with CSS and IntersectionObserver.
 * Preserves the fade-and-translate effect with almost no bundle overhead.
 * e respeita `prefers-reduced-motion`.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  from = "up",
  delay = 0,
  immediate = false,
  className,
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (immediate) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <Tag
      ref={ref}
      data-from={from}
      className={cn("reveal", shown && "reveal-in", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
