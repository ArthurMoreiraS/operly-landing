import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/landing/SectionHeader";

const bullets = [
  "Lembrete automático na véspera e no dia do serviço",
  "Cliente confirma presença com um toque",
  "Confirmações e faltas aparecem no seu painel",
];

const messages = [
  { from: "business", text: "Oi, Carlos! Lembrete: sua Lavagem completa é amanhã às 09:00. Confirma presença?", time: "18:02" },
  { from: "client", text: "Confirmado ✅", time: "18:05" },
  { from: "business", text: "Perfeito! Te esperamos amanhã. 🚗", time: "18:05" },
] as const;

export function WhatsAppSection() {
  return (
    <section id="lembretes" className="px-4 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <SectionHeader
            align="left"
            className="mb-8"
            eyebrow="Lembretes automáticos"
            title="Cliente que recebe lembrete, aparece"
            subtitle="O Operly avisa seus clientes pelo WhatsApp antes de cada serviço — e você só acompanha as confirmações."
          />
          <ul className="mx-auto max-w-md space-y-4 md:mx-0">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-3 text-sm text-white">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-4 w-4" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-sm text-gray-400 md:text-left">
            Operações com lembrete automático registram <span className="font-semibold text-primary">até 50% menos faltas</span>.*
          </p>
          <p className="mt-2 text-center text-xs text-gray-500 md:text-left">
            *Estimativa com base no uso do produto. Resultados variam conforme a operação.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[340px]">
          <span className="sr-only">
            Simulação de conversa: o Operly envia um lembrete do serviço agendado, o cliente responde confirmando e recebe
            a confirmação final.
          </span>
          {/* Moldura de celular com conversa estilo chat (sem logo do WhatsApp). */}
          <div aria-hidden="true" className="rounded-[2.5rem] border border-white/15 bg-[hsl(213_25%_12%)] p-3 shadow-2xl">
            <div className="overflow-hidden rounded-[2rem] bg-[hsl(213_25%_10%)]">
              <div className="flex items-center gap-3 border-b border-white/5 bg-white/[0.04] px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">LB</div>
                <div>
                  <p className="text-sm font-semibold text-white">Lava-Rápido do Bairro</p>
                  <p className="text-[11px] text-emerald-400">online</p>
                </div>
              </div>
              <div className="space-y-3 px-3 py-5">
                {messages.map((message, index) => (
                  <Reveal
                    key={index}
                    delay={index * 150}
                    from={message.from === "client" ? "right" : "left"}
                    className={`flex ${message.from === "client" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-5 ${
                        message.from === "client" ? "rounded-br-sm bg-emerald-700/80 text-white" : "rounded-bl-sm bg-white/10 text-gray-100"
                      }`}
                    >
                      {message.text}
                      <span className="mt-1 block text-right text-[10px] text-white/50">{message.time}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
