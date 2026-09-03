import { Headphones, Lock, Shield, Zap } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/landing/SectionHeader";

const pillars = [
  { icon: Zap, title: "Fast setup", description: "Add services and open your booking calendar without a lengthy implementation project." },
  { icon: Headphones, title: "Human support", description: "Talk to a real person whenever you need help setting up or answering a question." },
  { icon: Lock, title: "No long-term contract", description: "Cancel anytime, with no cancellation fee or hidden lock-in." },
  { icon: Shield, title: "Exportable data", description: "Your customers, history, and revenue data continue to belong to your business." },
];

const metrics = [
  { value: "−50%", label: "fewer no-shows", context: "with automated reminders*" },
  { value: "24/7", label: "online booking", context: "customers book without calling" },
  { value: "CA$0", label: "cancellation fee", context: "no long-term contract or lock-in" },
  { value: "< 10 min", label: "to get started", context: "from signup to online booking" },
];

export function TrustBlock() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Why Operly"
          title="Try Operly without the risk"
          subtitle="No long-term contract, a refund guarantee, and data you can always export."
        />

        {/* 14-day refund guarantee. */}
        <Reveal className="mb-12 flex flex-col items-center gap-5 rounded-3xl border border-primary/40 bg-primary/[0.06] p-8 text-center md:flex-row md:text-left">
          <Shield className="h-12 w-12 shrink-0 text-primary" />
          <div>
            <h3 className="text-xl font-bold text-white">14-day money-back guarantee</h3>
            <p className="mt-1 leading-7 text-gray-300">
              Use the complete Operly platform for 14 days. If it is not right for your operation, request a refund within that period.
            </p>
          </div>
        </Reveal>

        {/* Trust pillars. */}
        <div className="mb-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="bg-card p-6">
              <pillar.icon className="mb-5 h-6 w-6 text-primary" />
              <h3 className="mb-2 font-semibold text-white">{pillar.title}</h3>
              <p className="text-sm leading-6 text-gray-300">{pillar.description}</p>
            </article>
          ))}
        </div>

        {/* Product metrics. */}
        <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-card p-6 text-center md:p-8">
              <div className="mb-2 text-3xl font-bold tabular-nums text-primary md:text-4xl">{metric.value}</div>
              <div className="mb-1 text-sm font-semibold text-white">{metric.label}</div>
              <div className="text-xs leading-5 text-gray-400">{metric.context}</div>
            </div>
          ))}
        </Reveal>
        <p className="mt-6 text-center text-xs text-gray-400">*Illustrative no-show reduction based on product usage. Results vary by business.</p>
      </div>
    </section>
  );
}
