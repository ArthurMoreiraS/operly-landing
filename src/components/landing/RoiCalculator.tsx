import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { MONTHLY_PRICE } from "@/lib/plans";

// minimumFractionDigits é obrigatório junto do maximum: currency assume mínimo 2 e o Intl lança RangeError.
const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const WEEKS_PER_MONTH = 4.33;
/** Fração das faltas recuperadas com lembretes — coerente com a métrica "−50% de faltas". */
const RECOVERY_RATE = 0.5;
/** Dias úteis médios de operação por mês, para a linha de contexto de faturamento. */
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
          eyebrow="Faça as contas"
          title="Quanto você está deixando na mesa?"
          subtitle="Estimativa rápida com base na sua operação hoje."
        />
        <Reveal className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-card/60 p-6 md:p-10">
          <div className="space-y-6">
            <SliderField id="roi-cars" label="Carros por dia" min={1} max={60} value={carsPerDay} format={(value) => `${value}`} onChange={setCarsPerDay} />
            <SliderField id="roi-ticket" label="Ticket médio" min={30} max={300} step={5} value={ticket} format={(value) => brl.format(value)} onChange={setTicket} />
            <SliderField id="roi-noshows" label="Faltas por semana" min={0} max={20} value={noShowsPerWeek} format={(value) => `${value}`} onChange={setNoShowsPerWeek} />
          </div>
          <div className="mt-8 rounded-2xl border border-primary/25 bg-primary/[0.06] p-6 text-center">
            <p className="text-sm text-gray-300">Com um faturamento de ~{brl.format(monthlyRevenue)}/mês, as faltas custam</p>
            <p className="my-2 text-4xl font-bold text-primary md:text-5xl">
              {brl.format(monthlyLoss)}
              <span className="text-lg font-semibold text-gray-300">/mês</span>
            </p>
            <p className="text-sm text-gray-300">
              Com lembretes automáticos você recupera ~<span className="font-semibold text-white">{brl.format(recovered)}/mês</span>
              {multiple >= 1 && <> — {multiple.toFixed(1).replace(".", ",")}× a mensalidade do Operly</>}
            </p>
          </div>
          <div className="mt-6 flex flex-col items-center gap-3">
            <Button size="lg" className="w-full rounded-full sm:w-auto sm:px-10" onClick={onDemoClick}>Ver o Operly funcionando</Button>
            <p className="text-xs text-gray-500">Estimativa ilustrativa. Resultados variam conforme a operação.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
