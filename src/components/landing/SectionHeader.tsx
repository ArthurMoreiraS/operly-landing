import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** "center" (default) or "left" for two-column sections. */
  align?: "center" | "left";
  className?: string;
};

/** Standard section header: eyebrow + title + subtitle. */
export function SectionHeader({ eyebrow, title, subtitle, align = "center", className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-14", align === "center" ? "text-center" : "text-center md:text-left", className)}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">{title}</h2>
      {subtitle && (
        <p className={cn("text-lg leading-8 text-gray-300", align === "center" && "mx-auto max-w-2xl")}>{subtitle}</p>
      )}
    </div>
  );
}
