import { BarChart3, CalendarDays, Check, ClipboardCheck, MessageCircle, Repeat } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/landing/SectionHeader";

export function FeaturesShowcase() {
  return (
    <section id="funcionalidades" className="section-alt px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Funcionalidades"
          title="Tudo que a operação precisa, num painel só"
          subtitle="Agenda, financeiro e clientes conectados — sem planilha paralela."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {/* Agenda online (grande) */}
          <Reveal className="card-hover rounded-3xl border border-white/10 bg-card/60 p-6 md:col-span-2">
            <CalendarDays className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-2 text-xl font-semibold text-white">Agenda online</h3>
            <p className="mb-6 text-sm leading-6 text-gray-300">Seus clientes agendam pelo link, e cada horário entra direto no painel.</p>
            <div aria-hidden="true" className="space-y-2">
              {[
                { time: "09:00", label: "Lavagem completa · Gol prata", busy: true },
                { time: "10:30", label: "Polimento · Corolla preto", busy: true },
                { time: "11:30", label: "Horário livre", busy: false },
              ].map((slot) => (
                <div
                  key={slot.time}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-sm ${
                    slot.busy ? "border-primary/25 bg-primary/[0.07] text-white" : "border-dashed border-white/15 text-gray-500"
                  }`}
                >
                  <span className={`rounded px-1.5 py-0.5 text-xs font-semibold ${slot.busy ? "bg-primary/15 text-primary" : "bg-white/5 text-gray-500"}`}>
                    {slot.time}
                  </span>
                  {slot.label}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Ordens de serviço (pequena) */}
          <Reveal delay={80} className="card-hover rounded-3xl border border-white/10 bg-card/60 p-6">
            <ClipboardCheck className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-2 text-xl font-semibold text-white">Ordens de serviço</h3>
            <p className="mb-6 text-sm leading-6 text-gray-300">Cada carro no pátio com status e responsável.</p>
            <div aria-hidden="true" className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm">
              <p className="mb-2 font-medium text-white">OS #482 · HB20 branco</p>
              <span className="inline-flex rounded-full bg-amber-400/15 px-2 py-0.5 text-xs font-semibold text-amber-300">Em andamento</span>
            </div>
          </Reveal>

          {/* Planos recorrentes (pequena) */}
          <Reveal className="card-hover rounded-3xl border border-white/10 bg-card/60 p-6">
            <Repeat className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-2 text-xl font-semibold text-white">Planos recorrentes</h3>
            <p className="mb-6 text-sm leading-6 text-gray-300">Transforme clientes avulsos em mensalistas.</p>
            <div aria-hidden="true" className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-3 py-1.5 text-xs font-semibold text-primary">
              <Check className="h-3.5 w-3.5" /> Mensalista · Lavagem semanal
            </div>
          </Reveal>

          {/* Painel financeiro (grande) */}
          <Reveal delay={80} className="card-hover rounded-3xl border border-white/10 bg-card/60 p-6 md:col-span-2">
            <BarChart3 className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-2 text-xl font-semibold text-white">Painel financeiro</h3>
            <p className="mb-6 text-sm leading-6 text-gray-300">Faturamento do dia, da semana e do mês sem calculadora na mão.</p>
            <div aria-hidden="true" className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs text-gray-400">Faturamento do mês</p>
                <p className="text-3xl font-bold tabular-nums text-white">R$ 18.400</p>
                <p className="text-xs font-semibold text-primary">+12% vs mês passado</p>
              </div>
              <div className="flex h-16 max-w-40 flex-1 items-end gap-1.5">
                {[40, 65, 50, 80, 70, 100].map((height, index) => (
                  <div key={index} className="flex-1 rounded-t bg-primary/60" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Lembretes (banner de largura total; a seção detalhada fica logo acima) */}
          <Reveal className="card-hover rounded-3xl border border-white/10 bg-card/60 p-6 md:col-span-3">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <MessageCircle className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-white">Lembretes automáticos no WhatsApp</h3>
                  <p className="text-sm leading-6 text-gray-300">O recurso que mais reduz faltas — na véspera e no dia do serviço.</p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-3 py-1.5 text-xs font-semibold text-primary">
                <Check className="h-3.5 w-3.5" /> Incluído no plano
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
