import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { MONTHLY_PRICE } from "@/lib/plans";

// Setting both fraction digit bounds keeps whole-dollar formatting consistent.
const cad = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const WEEKS_PER_MONTH = 4.33;
/** Illustrative share of no-shows recovered with reminders. */
const RECOVERY_RATE = 0.5;
/** Average operating days per month for the revenue context line. */
const WORKING_DAYS_PER_MONTH = 26;

type SliderFieldProps = {
  id: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
};

function SliderField({ id, label, min, max, step = 1, value, format, onChange }: SliderFieldProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-gray-300">{label}</label>
        <span className="rounded-lg bg-white/5 px-2 py-1 text-sm font-semibold tabular-nums text-white">{format(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={format(value)}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full cursor-pointer accent-primary"
      />
    </div>
  );
}

export function RoiCalculator({ onDemoClick }: { onDemoClick: () => void }) {
  const [carsPerDay, setCarsPerDay] = useState(15);
  const [ticket, setTicket] = useState(80);
  const [noShowsPerWeek, setNoShowsPerWeek] = useState(4);

  const monthlyLoss = Math.round(noShowsPerWeek * ticket * WEEKS_PER_MONTH);
  const recovered = Math.round(monthlyLoss * RECOVERY_RATE);
  const monthlyRevenue = Math.round(carsPerDay * ticket * WORKING_DAYS_PER_MONTH);
  const multiple = recovered / MONTHLY_PRICE;

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Run the numbers"
          title="How much revenue are no-shows costing you?"
          subtitle="A quick estimate based on how your business operates today."
        />
        <Reveal className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-card/60 p-6 md:p-10">
          <div className="space-y-6">
            <SliderField id="roi-cars" label="Cars per day" min={1} max={60} value={carsPerDay} format={(value) => `${value}`} onChange={setCarsPerDay} />
            <SliderField id="roi-ticket" label="Average ticket" min={30} max={300} step={5} value={ticket} format={(value) => cad.format(value)} onChange={setTicket} />
            <SliderField id="roi-noshows" label="No-shows per week" min={0} max={20} value={noShowsPerWeek} format={(value) => `${value}`} onChange={setNoShowsPerWeek} />
          </div>
          <div className="mt-8 rounded-2xl border border-primary/25 bg-primary/[0.06] p-6 text-center">
            <p className="text-sm text-gray-300">At roughly {cad.format(monthlyRevenue)}/month in revenue, no-shows cost</p>
            <p className="my-2 text-4xl font-bold text-primary md:text-5xl">
              {cad.format(monthlyLoss)}
              <span className="text-lg font-semibold text-gray-300">/month</span>
            </p>
            <p className="text-sm text-gray-300">
              Automated reminders could help recover ~<span className="font-semibold text-white">{cad.format(recovered)}/month</span>
              {multiple >= 1 && <> — {multiple.toFixed(1)}× the monthly Operly subscription</>}
            </p>
          </div>
          <div className="mt-6 flex flex-col items-center gap-3">
            <Button size="lg" className="w-full rounded-full sm:w-auto sm:px-10" onClick={onDemoClick}>See Operly in action</Button>
            <p className="text-xs text-gray-500">Illustrative estimate. Results vary by business.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
