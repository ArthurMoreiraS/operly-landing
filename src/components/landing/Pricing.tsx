import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { ANNUAL_PRICE, MONTHLY_PRICE } from "@/lib/plans";

const features = [
  "Agendamentos ilimitados",
  "Dashboard financeiro",
  "Gestão de clientes e veículos",
  "Lembretes automáticos via WhatsApp",
  "Ordens de serviço digitais",
  "Planos recorrentes para clientes",
  "Usuários ilimitados",
  "Suporte via WhatsApp",
];

export function Pricing({ onDemoClick }: { onDemoClick: () => void }) {
  // Abre no anual: é o plano que queremos ancorar, e a economia fica visível de cara.
  const [annual, setAnnual] = useState(true);
  const price = annual ? ANNUAL_PRICE : MONTHLY_PRICE;
  const monthlySaving = MONTHLY_PRICE - ANNUAL_PRICE;

  return (
    <section id="pricing" className="section-alt px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Preço" title="Um plano com acesso completo" subtitle="Escolha cobrança mensal ou anual." className="mb-12" />
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <span className={`text-sm font-medium transition-colors ${!annual ? "text-white" : "text-gray-400"}`}>
            Mensal
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            aria-label="Alternar entre cobrança mensal e anual"
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
            Anual
            <span className="ml-2 inline-flex rounded-full bg-primary/15 px-2 py-1 text-xs font-semibold text-primary">
              Economize R$ {monthlySaving}/mês
            </span>
          </span>
        </div>
        <Reveal immediate key={annual ? "annual" : "monthly"} className="card-hover mx-auto max-w-md rounded-3xl border border-primary/60 bg-primary/[0.06] p-8 shadow-xl shadow-primary/10">
          <div className="mb-8 text-center">
            <p className="mb-4 text-sm font-semibold text-primary">Operly completo</p>
            <div className="flex items-end justify-center gap-1"><span className="mb-2 text-gray-300">R$</span><span className="text-6xl font-bold text-white">{price}</span><span className="mb-2 text-gray-300">/mês</span></div>
            <p className="mt-3 text-sm text-gray-400">{annual ? `Cobrado anualmente, R$ ${price * 12}/ano (economia de R$ ${monthlySaving * 12})` : `Ou R$ ${ANNUAL_PRICE}/mês no plano anual`}</p>
            <p className="mt-1 text-xs text-gray-400">Menos de R$ {Math.round(price / 30)} por dia.</p>
          </div>
          <ul className="mb-8 space-y-3">
            {features.map((feature) => <li key={feature} className="flex items-center gap-3 text-sm text-white"><Check className="h-4 w-4 shrink-0 text-primary" />{feature}</li>)}
          </ul>
          <Button onClick={onDemoClick} className="h-12 w-full">Ver o Operly funcionando</Button>
          <p className="mt-3 text-center text-xs text-gray-400">Videochamada de 30 min · sem fidelidade, cancele quando quiser</p>
        </Reveal>
      </div>
    </section>
  );
}
