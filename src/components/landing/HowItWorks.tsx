import { BellRing, ClipboardList, Share2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/landing/SectionHeader";

const steps = [
  { icon: ClipboardList, title: "Cadastre seus serviços", description: "Adicione lavagens, pacotes, preços e duração de cada serviço." },
  { icon: Share2, title: "Compartilhe seu link", description: "Seus clientes escolhem serviço e horário pelo celular, a qualquer hora." },
  { icon: BellRing, title: "Acompanhe a operação", description: "Lembretes reduzem faltas, enquanto cada serviço entra no painel financeiro." },
];

export function HowItWorks() {
  return (
    <section className="section-alt px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Como funciona"
          title="Da configuração ao primeiro agendamento"
          subtitle="Três passos que refletem o fluxo real do seu negócio."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal as="article" key={step.title} delay={index * 80} className="border-t border-white/15 pt-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">Passo {index + 1}</span>
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
