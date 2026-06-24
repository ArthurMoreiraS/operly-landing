import { Headphones, Lock, Shield, Zap } from "lucide-react";

const pillars = [
  { icon: Zap, title: "Setup rápido", description: "Cadastre serviços e abra a agenda sem projeto longo de implantação." },
  { icon: Headphones, title: "Suporte humano", description: "Fale com uma pessoa quando precisar configurar ou tirar uma dúvida." },
  { icon: Lock, title: "Sem fidelidade", description: "Cancele quando quiser, sem multa ou carência escondida." },
  { icon: Shield, title: "Dados exportáveis", description: "Clientes, histórico e faturamento continuam pertencendo ao seu negócio." },
];

export function SocialProof() {
  return (
    <section className="bg-black/15 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-white md:text-5xl">Construído para a rotina do lava-rápido</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-300">Rápido para aprender, simples para operar e fácil de cancelar.</p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="bg-card p-6">
              <pillar.icon className="mb-5 h-6 w-6 text-primary" />
              <h3 className="mb-2 font-semibold text-white">{pillar.title}</h3>
              <p className="text-sm leading-6 text-gray-300">{pillar.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center gap-5 rounded-2xl border border-primary/25 bg-primary/[0.06] p-8 text-center md:flex-row md:text-left">
          <Shield className="h-9 w-9 shrink-0 text-primary" />
          <div>
            <h3 className="text-lg font-bold text-white">Garantia de 14 dias</h3>
            <p className="mt-1 text-sm leading-6 text-gray-300">Teste o Operly completo. Se não fizer sentido para sua operação, solicite o reembolso dentro do período.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
