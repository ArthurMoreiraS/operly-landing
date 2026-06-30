import { ArrowRight, Check, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const problems = [
  "WhatsApp lotado de mensagens não respondidas",
  "Clientes esquecem e não aparecem",
  "Faturamento conferido só no fim do dia",
  "Agenda de papel rasurada e confusa",
];

const solutions = [
  "Agenda organizada e disponível online",
  "Lembretes automáticos antes do serviço",
  "Dashboard financeiro em tempo real",
  "Histórico completo de clientes e veículos",
];

export function ProblemSolution({ onDemoClick }: { onDemoClick: () => void }) {
  return (
    <section className="bg-black/15 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">O CRM para lava-rápidos no Brasil</h2>
          <p className="text-lg text-gray-300">Troque a correria desorganizada por uma operação que você consegue acompanhar.</p>
        </div>
        <div className="grid items-stretch gap-8 md:grid-cols-2">
          <Reveal from="left" className="rounded-3xl border border-red-500/20 bg-card/60 p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-400"><X size={20} /></div>
              <h3 className="text-2xl font-semibold text-white">Antes: operação no improviso</h3>
            </div>
            <ul className="space-y-4">
              {problems.map((problem) => <li key={problem} className="flex items-start gap-3 text-gray-300"><X className="mt-1 shrink-0 text-red-400" size={18} /><span>{problem}</span></li>)}
            </ul>
          </Reveal>
          <Reveal from="right" className="relative overflow-hidden rounded-3xl border border-primary/35 bg-primary/[0.06] p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary"><Check size={20} /></div>
              <h3 className="text-2xl font-semibold text-white">Depois: operação no Operly</h3>
            </div>
            <ul className="space-y-4">
              {solutions.map((solution) => <li key={solution} className="flex items-start gap-3 text-white"><Check className="mt-1 shrink-0 text-primary" size={18} /><span>{solution}</span></li>)}
            </ul>
            <button type="button" onClick={onDemoClick} className="mt-8 flex w-full items-center justify-between border-t border-white/10 pt-6 text-sm font-medium text-primary">
              <span>Agendar demonstração</span><ArrowRight size={16} />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
