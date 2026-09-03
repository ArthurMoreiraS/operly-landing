import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { ANNUAL_PRICE, MONTHLY_PRICE } from "@/lib/plans";

const features = [
  "Unlimited appointments",
  "Financial dashboard",
  "Customer and vehicle management",
  "Automated WhatsApp reminders",
  "Digital work orders",
  "Recurring customer memberships",
  "Unlimited users",
  "WhatsApp support",
];

export function Pricing({ onDemoClick }: { onDemoClick: () => void }) {
  // Default to annual billing so the savings are visible immediately.
  const [annual, setAnnual] = useState(true);
  const price = annual ? ANNUAL_PRICE : MONTHLY_PRICE;
  const monthlySaving = MONTHLY_PRICE - ANNUAL_PRICE;

  return (
    <section id="pricing" className="section-alt px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Pricing" title="One plan. Full access." subtitle="Choose monthly or annual billing." className="mb-12" />
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <span className={`text-sm font-medium transition-colors ${!annual ? "text-white" : "text-gray-400"}`}>
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            aria-label="Switch between monthly and annual billing"
            onClick={() => setAnnual((current) => !current)}
            className={`relative h-7 w-14 rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              annual ? "border-primary bg-primary" : "border-white/15 bg-white/10"
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                annual ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors ${annual ? "text-white" : "text-gray-400"}`}>
            Annual
            <span className="ml-2 inline-flex rounded-full bg-primary/15 px-2 py-1 text-xs font-semibold text-primary">
              Save CA&#36;{monthlySaving}/month
            </span>
          </span>
        </div>
        <Reveal immediate key={annual ? "annual" : "monthly"} className="card-hover mx-auto max-w-md rounded-3xl border border-primary/60 bg-primary/[0.06] p-8 shadow-xl shadow-primary/10">
          <div className="mb-8 text-center">
            <p className="mb-4 text-sm font-semibold text-primary">Complete Operly</p>
            <div className="flex items-end justify-center gap-1"><span className="mb-2 text-gray-300">CA&#36;</span><span className="text-6xl font-bold text-white">{price}</span><span className="mb-2 text-gray-300">/month</span></div>
            <p className="mt-3 text-sm text-gray-400">{annual ? `Billed annually at CA$${price * 12}/year (save CA$${monthlySaving * 12})` : `Or CA$${ANNUAL_PRICE}/month with annual billing`}</p>
            <p className="mt-1 text-xs text-gray-400">Less than CA&#36;{Math.round(price / 30)} per day. Prices in CAD.</p>
          </div>
          <ul className="mb-8 space-y-3">
            {features.map((feature) => <li key={feature} className="flex items-center gap-3 text-sm text-white"><Check className="h-4 w-4 shrink-0 text-primary" />{feature}</li>)}
          </ul>
          <Button onClick={onDemoClick} className="h-12 w-full">See Operly in action</Button>
          <p className="mt-3 text-center text-xs text-gray-400">30-minute video call · no long-term contract, cancel anytime</p>
        </Reveal>
      </div>
    </section>
  );
}
