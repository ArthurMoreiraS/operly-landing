import { BellRing, ClipboardList, Share2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/landing/SectionHeader";

const steps = [
  { icon: ClipboardList, title: "Add your services", description: "Set up washes, packages, prices, and the duration of each service." },
  { icon: Share2, title: "Share your booking link", description: "Customers choose a service and time from their phone, whenever it suits them." },
  { icon: BellRing, title: "Run your operation", description: "Reminders help reduce no-shows while every service flows into your financial dashboard." },
];

export function HowItWorks() {
  return (
    <section className="section-alt px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="How it works"
          title="From setup to your first booking"
          subtitle="Three steps built around the way your business actually runs."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal as="article" key={step.title} delay={index * 80} className="border-t border-white/15 pt-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">Step {index + 1}</span>
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{step.title}</h3>
              <p className="leading-7 text-gray-300">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
