import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ElementType } from "react";
import { cn } from "@/lib/utils";

type RevealProps<T extends ElementType> = {
  as?: T;
  /** Direção da entrada. */
  from?: "up" | "left" | "right";
  /** Atraso da transição em ms (para efeito escalonado). */
  delay?: number;
  /** Anima assim que monta, sem esperar entrar na viewport (use acima da dobra). */
  immediate?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/**
 * Substitui as animações de entrada do framer-motion por CSS + IntersectionObserver.
 * Mantém o mesmo efeito (fade + translate) com custo de bundle praticamente zero
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
