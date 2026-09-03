import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const CalScheduler = lazy(() => import("./CalScheduler"));

function SchedulerPlaceholder() {
  return (
    <div className="flex h-[640px] items-center justify-center text-sm text-gray-400">
      Loading calendar…
    </div>
  );
}

export function CalEmbed() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  // Load the larger embed only when this section approaches the viewport.
  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="demo-scheduler" className="relative overflow-hidden px-3 py-16 md:px-4 md:py-24">
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-card/65 p-4 shadow-2xl sm:p-6 md:p-10">
        <div className="grid items-center gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div className="text-center md:text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Demo</p>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">See Operly working for your business</h2>
            <p className="mb-8 leading-7 text-gray-300">Choose a time. In 30 minutes, we’ll show you how to organize appointments, customers, and revenue.</p>
            <ul className="mx-auto max-w-sm space-y-4 text-left md:mx-0">
              {["Guided initial setup", "A demo based on your workflow", "No obligation to subscribe"].map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm text-white"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary"><Check className="h-4 w-4" /></span>{benefit}</li>
              ))}
            </ul>
          </div>
          <div ref={shellRef} className="cal-shell overflow-hidden rounded-2xl border border-white/10 bg-background p-2 sm:p-4">
            {load ? (
              <Suspense fallback={<SchedulerPlaceholder />}>
                <CalScheduler />
              </Suspense>
            ) : (
              <SchedulerPlaceholder />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
