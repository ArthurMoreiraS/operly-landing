import { Headphones, Lock, Shield, Zap } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/landing/SectionHeader";

const pillars = [
  { icon: Zap, title: "Setup rápido", description: "Cadastre serviços e abra a agenda sem projeto longo de implantação." },
  { icon: Headphones, title: "Suporte humano", description: "Fale com uma pessoa quando precisar configurar ou tirar uma dúvida." },
  { icon: Lock, title: "Sem fidelidade", description: "Cancele quando quiser, sem multa ou carência escondida." },
  { icon: Shield, title: "Dados exportáveis", description: "Clientes, histórico e faturamento continuam pertencendo ao seu negócio." },
];

const metrics = [
  { value: "−50%", label: "em faltas", context: "com lembretes automáticos*" },
  { value: "24h", label: "de agenda aberta", context: "cliente marca pelo link, sem ligar" },
  { value: "R$ 0", label: "de multa para cancelar", context: "sem fidelidade ou carência" },
  { value: "< 10 min", label: "para começar", context: "do cadastro à agenda online" },
];

export function TrustBlock() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Por que confiar"
          title="Contratar o Operly tem volta"
          subtitle="Sem fidelidade, com garantia de reembolso e com seus dados sempre exportáveis."
        />

        {/* Herói do bloco: garantia de 14 dias */}
        <Reveal className="mb-12 flex flex-col items-center gap-5 rounded-3xl border border-primary/40 bg-primary/[0.06] p-8 text-center md:flex-row md:text-left">
          <Shield className="h-12 w-12 shrink-0 text-primary" />
          <div>
            <h3 className="text-xl font-bold text-white">Garantia de reembolso em 14 dias</h3>
            <p className="mt-1 leading-7 text-gray-300">
              Use o Operly completo por 14 dias. Se não fizer sentido para sua operação, é só pedir o reembolso dentro do período.
            </p>
          </div>
        </Reveal>

        {/* Pilares */}
        <div className="mb-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="bg-card p-6">
              <pillar.icon className="mb-5 h-6 w-6 text-primary" />
              <h3 className="mb-2 font-semibold text-white">{pillar.title}</h3>
              <p className="text-sm leading-6 text-gray-300">{pillar.description}</p>
            </article>
          ))}
        </div>

        {/* Métricas */}
        <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-card p-6 text-center md:p-8">
              <div className="mb-2 text-3xl font-bold tabular-nums text-primary md:text-4xl">{metric.value}</div>
              <div className="mb-1 text-sm font-semibold text-white">{metric.label}</div>
              <div className="text-xs leading-5 text-gray-400">{metric.context}</div>
            </div>
          ))}
        </Reveal>
        <p className="mt-6 text-center text-xs text-gray-400">*Redução de faltas estimada com base no uso do produto. Resultados variam conforme a operação.</p>
      </div>
    </section>
  );
}
